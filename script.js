var IDS = ['about', 'edu', 'exp', 'skills', 'certs', 'interests', 'contact'];
var zTop = 100;
var active = null;

function openWin(id) {
  var i, prev, el, vw, w, ic;

  if (active && active !== id) {
    prev = document.getElementById('win-' + active);
    if (prev) {
      prev.classList.remove('open');
      prev.classList.remove('top');
    }
  }

  el = document.getElementById('win-' + id);
  if (!el) return;

  vw = window.innerWidth;
  w = parseInt(el.style.width) || 490;
  el.style.left = Math.round((vw - w) / 2) + 'px';
  el.style.top = '44px';

  el.classList.remove('win-enter');
  void el.offsetWidth;
  el.classList.add('open', 'top', 'win-enter');
  el.style.zIndex = ++zTop;

  active = id;

  for (i = 0; i < IDS.length; i++) {
    ic = document.getElementById('ic-' + IDS[i]);
    if (ic) ic.classList.remove('sel');
  }
  ic = document.getElementById('ic-' + id);
  if (ic) ic.classList.add('sel');
}

function closeWin(id) {
  var el = document.getElementById('win-' + id);
  var ic;
  if (!el) return;

  el.style.transition = 'opacity 0.13s, transform 0.13s';
  el.style.opacity = '0';
  el.style.transform = 'scale(0.91)';

  setTimeout(function () {
    el.classList.remove('open', 'top', 'win-enter');
    el.style.opacity = '';
    el.style.transform = '';
    el.style.transition = '';
    ic = document.getElementById('ic-' + id);
    if (ic) ic.classList.remove('sel');
    if (active === id) active = null;
  }, 130);
}

function setupDrag(id) {
  var bar = document.getElementById('drag-' + id);
  var win = document.getElementById('win-' + id);
  if (!bar || !win) return;
  var dragging = false, ox = 0, oy = 0;

  function onMove(e) {
    if (!dragging) return;
    win.style.left = (e.clientX - ox) + 'px';
    win.style.top  = Math.max(24, e.clientY - oy) + 'px';
  }
  function onUp() {
    dragging = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  }

  bar.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('tl')) return;
    dragging = true;
    ox = e.clientX - win.offsetLeft;
    oy = e.clientY - win.offsetTop;
    win.classList.add('top');
    win.style.zIndex = ++zTop;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

function tick() {
  var n = new Date();
  var days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var h  = n.getHours();
  var mi = ('0' + n.getMinutes()).slice(-2);
  var el = document.getElementById('clk');
  if (el) {
    el.textContent = days[n.getDay()] + ' ' + months[n.getMonth()] + ' ' + n.getDate() +
      '  ' + ((h % 12) || 12) + ':' + mi + ' ' + (h >= 12 ? 'PM' : 'AM');
  }
}

window.addEventListener('load', function () {
  var i;
  tick();
  setInterval(tick, 1000);
  for (i = 0; i < IDS.length; i++) {
    setupDrag(IDS[i]);
  }
  setTimeout(function () { openWin('about'); }, 300);
});
