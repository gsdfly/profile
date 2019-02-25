// (function(doc, win) {
//   var clientWidth = win.innerWidth
//     || doc.documentElement.clientWidth
//     || doc.body.clientWidth;
//   var docEl = doc.documentElement;
//   var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//   var recalc = function() {
//     if (!clientWidth) return
//     docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
//   };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false)
//   doc.addEventListener('DOMContentLoaded', recalc, false)
// })(document, window)
