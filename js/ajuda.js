document.addEventListener('DOMContentLoaded', function () {
  function abrir() {
    var alvo = location.hash && document.querySelector(location.hash);
    if (alvo && alvo.tagName === 'DETAILS') { alvo.open = true; alvo.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  abrir(); window.addEventListener('hashchange', abrir);
});
