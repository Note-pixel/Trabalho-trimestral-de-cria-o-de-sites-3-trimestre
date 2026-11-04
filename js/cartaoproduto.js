/* UNOA - card de produto reutilizável */
UNOA.cartaoProduto = function (p) {
  var fav = UNOA.estado.favoritos().indexOf(p.id) >= 0;
  var desc = p.precoAntigo ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;
  return '<article class="card" data-id="' + p.id + '">' +
    '<a class="card__img img-caixa" href="' + UNOA.url('paginas/produto.html') + '?id=' + p.id + '">' +
      '<img src="' + UNOA.img.apply(null, p.imagem.split('.')) + '" alt="' + p.nome + '" loading="lazy">' +
      '<button class="card__fav" type="button" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="Favoritar ' + p.nome + '">' + UNOA.icone('coracao') + '</button>' +
    '</a>' +
    '<h3 class="card__nome">' + p.nome + '</h3>' +
    '<div class="card__nota"><b>★</b> ' + p.nota.toFixed(1).replace('.', ',') + ' (' + p.avaliacoes + ')</div>' +
    '<div class="card__preco"><strong>' + UNOA.moeda(p.preco) + '</strong>' +
      (desc ? '<s>' + UNOA.moeda(p.precoAntigo) + '</s><span class="tag-desc">-' + desc + '%</span>' : '') + '</div>' +
    '<div class="card__parcela">' + p.parcelas + 'x sem juros</div></article>';
};
/* delegação global: botão de favorito em qualquer card */
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-fav]'); if (!b) return;
  e.preventDefault();
  b.setAttribute('aria-pressed', UNOA.estado.alternarFavorito(b.dataset.fav));
});