/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/js/utils/index.js ***!
  \*******************************/
function onClickOutside(item, selector) {
  window.addEventListener('click', e => {
    if (!(item.contains(e.target) || e.target === item)) {
      item.classList.remove(selector)
    }
  })
}

function menu() {
  const collection = document.querySelectorAll('.menu-item')

  collection.forEach(item => {

    const isDropdownTrigger = item.classList.contains('dropdown-item__trigger')

    item.addEventListener('click', e => {
      collection.forEach(item => item.classList.remove('active'))

      if (isDropdownTrigger) {
        e.stopPropagation()
        const innerMenu = item.closest('.dropdown-item').querySelector('.dropdown-item__inner-menu')
        innerMenu.classList.add('expanded')
        item.classList.add('active')

        onClickOutside(item, 'active')
        onClickOutside(innerMenu, 'expanded')
      } else {
        item.classList.add('active')
        onClickOutside(item, 'active')
      }
    })

  })

}

window.addEventListener('DOMContentLoaded', menu)

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNHRyb2NrZXQtZGFzaGJvYXJkLy4vc3JjL2pzL3V0aWxzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIG9uQ2xpY2tPdXRzaWRlKGl0ZW0sIHNlbGVjdG9yKSB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBpZiAoIShpdGVtLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBlLnRhcmdldCA9PT0gaXRlbSkpIHtcclxuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKHNlbGVjdG9yKVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lbnUoKSB7XHJcbiAgY29uc3QgY29sbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWl0ZW0nKVxyXG5cclxuICBjb2xsZWN0aW9uLmZvckVhY2goaXRlbSA9PiB7XHJcblxyXG4gICAgY29uc3QgaXNEcm9wZG93blRyaWdnZXIgPSBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24taXRlbV9fdHJpZ2dlcicpXHJcblxyXG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICBjb2xsZWN0aW9uLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKVxyXG5cclxuICAgICAgaWYgKGlzRHJvcGRvd25UcmlnZ2VyKSB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIGNvbnN0IGlubmVyTWVudSA9IGl0ZW0uY2xvc2VzdCgnLmRyb3Bkb3duLWl0ZW0nKS5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24taXRlbV9faW5uZXItbWVudScpXHJcbiAgICAgICAgaW5uZXJNZW51LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZGVkJylcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcblxyXG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlKGl0ZW0sICdhY3RpdmUnKVxyXG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlKGlubmVyTWVudSwgJ2V4cGFuZGVkJylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgb25DbGlja091dHNpZGUoaXRlbSwgJ2FjdGl2ZScpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIH0pXHJcblxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIG1lbnUpXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==