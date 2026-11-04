/* UNOA - ícones SVG de traço (inline) */
(function () {
  var p = {
    busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    coracao: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    sacola: '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    presente: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8s-1-4-4-4-2 4 4 4zm0 0s1-4 4-4 2 4-4 4z"/>',
    celular: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    casa: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
    moda: '<circle cx="12" cy="7" r="2"/><path d="M12 9v2l-8 6h16l-8-6"/>',
    brilho: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    jogo: '<rect x="3" y="7" width="18" height="11" rx="4"/><path d="M8 10v4M6 12h4M16 11h.01M18 13h.01"/>',
    ingresso: '<path d="M3 8h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/>',
    escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    caminhao: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>',
    troca: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
    pedido: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/>',
    ajuda: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
    local: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    seta: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  UNOA.icone = function (n, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' + (extra || '') + '>' + (p[n] || '') + '</svg>';
  };
})();