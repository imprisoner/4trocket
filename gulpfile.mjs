import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import postcss from 'gulp-postcss'
import postcssImport from 'postcss-import'
import pug from 'gulp-pug'
import clean from 'gulp-clean'
import imagemin, { mozjpeg, optipng, svgo, gifsicle } from 'gulp-imagemin'
import sourcemaps from 'gulp-sourcemaps'
import browserSyncInstance from 'browser-sync'
import webpack from 'webpack-stream'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import webpackConfig from './webpack.config.mjs'
import tailwindConfig from './tailwind.config.js'

const { series, parallel, src, dest, watch } = gulp
const browserSync = browserSyncInstance.create()
const sass = gulpSass(dartSass)


const compiler = {
  js() {
    return src(['src/js/*.js, src/js/utils/index.js'])
      .pipe(webpack({
        config: webpackConfig
      }))
      .pipe(src('src/js/vendor/*.js'))
      .pipe(dest('dist/js/'))
    // .pipe(browserSync.stream())
  },
  jsVendor() {
    return src('src/js/vendor/*.js').pipe(dest('dist/js/vendor/'))
  },
  sass() {
    return src('src/styles/*.scss')
      // .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([
        postcssImport,
        tailwindcss(tailwindConfig),
        autoprefixer
      ]))
      // .pipe(sourcemaps.write())
      .pipe(dest('dist/styles/'))
    // .pipe(browserSync.stream())
  },
  pug() {
    return src('src/layouts/*.pug')
      .pipe(pug())
      .pipe(dest('dist/'))
    // .pipe(browserSync.stream())
  },
  html() {
    return src('src/layouts/*.html')
      .pipe(dest('dist/'))
  }
}

const watcher = {
  js() {
    return watch(['src/js/*', 'src/js/utils/*'], { ignoreInitial: false }, series(compiler.js, reload))
  },
  jsVendor() {
    return watch('src/js/vendor/*', { ignoreInitial: false }, series(compiler.jsVendor, reload))
  },
  sass() {
    return watch('src/styles/**/*', { ignoreInitial: false }, series(compiler.sass, reload))
  },
  pug() {
    return watch('src/layouts/**/*.pug', { ignoreInitial: false }, series(compiler.pug, reload))
  },
  html() {
    return watch('src/layouts/**/*.html', { ignoreInitial: false }, series(compiler.html, compiler.sass, reload))
  },
  fonts() {
    return watch('src/assets/fonts', { ignoreInitial: false }, series(fonts, reload))
  },
  svg() {
    return watch('src/assets/svg', { ignoreInitial: false }, series(processSVG, reload))
  },
  images() {
    return watch('src/assets/img', { ignoreInitial: false }, series(processImages, reload))
  },
  mocks() {
    return watch('src/assets/mock/*', { ignoreInitial: false }, series(mockData, reload))
  }
}

function cleanOutput(cb) {
  return src('dist/*').pipe(clean())
}

export function fonts(cb) {
  console.log('fonts')
  return src('src/assets/fonts/**/*').pipe(dest('dist/assets/fonts'))
}

export function processImages(cb) {
  return src('src/assets/img/**/*')
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 75, progressive: true }),
      optipng({ optimizationLevel: 5 })
    ]))
    .pipe(dest('dist/assets/images'))
}

function processSVG() {
  return src('src/assets/svg/**/*')
    .pipe(imagemin([
      svgo()
    ]))
    .pipe(dest('dist/assets/svg'))
}

function mockData() {
  return src('src/assets/mock/**/*').pipe(dest('dist/assets/mock/'))
}

function serve(cb) {
  browserSync.init({ server: { baseDir: './dist' }, open: false })
  cb()
}

function reload(cb) {
  browserSync.reload()
  cb()
}

export function withWebpack() {
  return src('src/js/common.js')
    .pipe(webpack({
      config: webpackConfig
    }))
    .pipe(dest('dist/js'))
}

export const dev =
  series(
    cleanOutput,
    serve,
    parallel(watcher.js, watcher.jsVendor, watcher.sass, watcher.html, watcher.fonts, watcher.svg, watcher.images, watcher.mocks)
  )

export const build =
  series(cleanOutput, compiler.js, compiler.jsVendor, compiler.sass, compiler.html, fonts, processSVG, processImages, mockData)