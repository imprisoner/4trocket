module.exports = {
  mode: "jit",
  content: [
    // "./src/layouts/*.html",
    "./dist/*.html"
  ],
  theme: {
    colors: {
      red: {
        150: '#FFE6E6',
        200: '#FED2D2',
        300: '#FDAAAA',
        400: '#FF7452',
        300: '#FF5630',
        400: '#DE350B',
        500: '#BF2600'
      },
      yellow: {
        50: '#FFFAE6',
        75: '#FFF0B3',
        100: '#FFE380',
        200: '#FFC400',
        300: '#FFAB00',
        400: '#FF991F',
        500: '#FF8B00'
      },
      green: {
        50: '#E3FCEF',
        75: '#ABF5D1',
        100: '#79F2C0',
        200: '#57D9A3',
        300: '#36B37E',
        400: '#00875A',
        500: '#006644'
      },
      teal: {
        50: '#E6FCFF',
        75: '#B3F5FF',
        100: '#79E2F2',
        200: '#00C7E6',
        300: '#00B8D9',
        400: '#00A3BF',
        500: '#008DA6'
      },
      purple: {
        50: '#EAE6FF',
        75: '#C0B6F2',
        100: '#998DD9',
        200: '#8777D9',
        300: '#6554C0',
        400: '#5243AA',
        500: '#403294'
      },
      blue: {
        10: '#F0F7FF',
        20: '#E9F2FF',
        50: '#DEEBFF',
        75: '#B3D4FF',
        100: '#4C9AFF',
        200: '#2684FF',
        300: '#0065FF',
        400: '#0052CC',
        500: '#0747A6',
        600: '#063F92',
        700: '#05367F'
      },
      neutral: {
        0: '#FFFFFF',
        10: '#FAFBFC',
        20: '#F4F5F7',
        30: '#EBECF0',
        40: '#DFE1E6',
        50: '#C1C7D0',
        60: '#B3BAC5',
        70: '#A5ADBA',
        80: '#97A0AF',
        90: '#8993A4',
        100: '#7A869A',
        150: '#ECEEF1',
        200: '#6B778C',
        300: '#5E6C84',
        400: '#505F79',
        500: '#42526E',
        600: '#344563',
        700: '#253858',
        800: '#172B4D',
        900: '#091E42'
      },
      primary: {
        main: '#0052CC',
        surface: '#F0F7FF',
        border: '#B3D4FF',
        hover: '#0747A6',
        pressed: '#05367F',
        focus: '#DEEBFF'
      },
      danger: {
        main: '#E00000',
        surface: '#FFECEC',
        border: '#FFD7D7',
        hover: '#A20000',
        pressed: '#630000',
        150: '#FFE6E6',
        200: '#FED2D2',
        300: '#FDAAAA',
        400: '#FD8282',
        500: '#FC5A5A',
        600: '#FB2D2D',
        700: '#F60404',
        750: '#DF0404',
        800: '#C90404',
        850: '#B20303',
        900: '#9C0303',
      },
      warning: {
        // main: '#EA780E',
        // surface: '#FFF2E7',
        // border: '#FFCA99',
        // hover: '#D16603',
        // pressed: '#653508',
        50: '#FFFAE6',
        75: '#FFF0B3',
        100: '#FFE380',
        200: '#FFC400',
        300: '#FFAB00',
        400: '#FF991F',
        500: '#FF8B00'
      },
      success: {
        // main: '#008243',
        // surface: '#EBF5F0',
        // border: '#B3DAC7',
        // hover: '#006836',
        // pressed: '#005029',
        40: '#EBF5F0',
        50: '#E3FCEF',
        90: '#ABF5D1',
        100: '#79F2C0',
        200: '#57D9A3',
        300: '#36B37E',
        400: '#008243',
        500: '#006836',
        600: '#005029'
      },
      info: {
        main: '#0B5CD7',
        surface: '#ECF2FC',
        border: '#B6CFF3',
        hover: '#044DBA',
        pressed: '#043C8F'
      },
      transparent: 'transparent'
    },
    extend: {
      spacing: {
        15: '3.75rem'
      },
      flex: {
        '0-auto': '0 0 auto'
      },
      borderWidth: {
        3: '3px'
      },
      boxShadow: {
        '1': '0px 1px 2px rgba(0, 0, 0, 0.12)',
        '2': '0px 4px 8px rgba(0, 0, 0, 0.1)',
        'custom-inner': 'inset 1px 2px 2px rgba(0, 0, 0, 0.12)'
      },
      outlineWidth: {
        3: '3px'
      },
      fontSize: {
        's-rg': ['12px', {
          lineHeight: '16px', 
          fontWeight: '400'
        }],
        's-md': ['12px', {
          lineHeight: '16px', 
          fontWeight: '500'
        }],
        'm-rg': ['14px', {
          lineHeight: '20px', 
          fontWeight: '400',
          letterSpacing: '-0.006em'
        }],
        'm-md': ['14px', {
          lineHeight: '20px', 
          fontWeight: '500',
          letterSpacing: '-0.006em'
        }],
        'l-rg': ['16px', {
          lineHeight: '24px', 
          fontWeight: '400',
          letterSpacing: '-0.011em'
        }],
        'l-md': ['16px', {
          lineHeight: '24px', 
          fontWeight: '500',
          letterSpacing: '-0.011em'
        }],
        'heading-s': ['20px', {
          lineHeight: '28px', 
          letterSpacing: '-0.017em',
          fontWeight: '500',
        }],
        'heading-m': ['28px', {
          lineHeight: '36px', 
          letterSpacing: '-0.021em',
          fontWeight: '500',
        }],
        'heading-l': ['36px', {
          lineHeight: '44px', 
          letterSpacing: '-0.022em',
          fontWeight: '500',
        }],
        'heading-xxl': ['56px', {
          lineHeight: '68px', 
          fontWeight: '900'
        }]
      }
    },
  },
  plugins: [],
}