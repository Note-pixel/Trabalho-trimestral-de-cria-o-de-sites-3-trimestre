/* UNOA - card de produto reutilizável. opts: { entrega, comparar, marcado } */
UNOA.cartaoProduto = function (p, opts) {
  opts = opts && typeof opts === 'object' ? opts : {};
  var fav = UNOA.estado.favoritos().indexOf(p.id) >= 0;
  var desc = p.precoAntigo ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;
  var frete = p.freteGratis ? 0 : 12.9;
  var link = UNOA.url('paginas/produto.html') + '?id=' + p.id;
  var entrega = opts.entrega
    ? '<div class="card__entrega">Chega até ' + UNOA.dataEm(p.prazo || 7) + (p.freteGratis ? ' · <span class="tag-gratis">Frete grátis</span>' : '') + '</div>' +
      '<span class="tag-total">Total com entrega: ' + UNOA.moeda(p.preco + frete) + '</span>'
    : '';
  var cmp = opts.comparar
    ? '<label class="card__cmp"><input type="checkbox" data-cmp="' + p.id + '"' + (opts.marcado ? ' checked' : '') + '> Comparar</label>'
    : '';
  return '<article class="card" data-id="' + p.id + '">' +
    '<div class="card__midia">' +
      '<a class="card__img img-caixa" href="' + link + '"><img src="' + UNOA.img.apply(null, p.imagem.split('.')) + '" alt="' + p.nome + '" loading="lazy"></a>' +
      '<button class="card__fav" type="button" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="Favoritar ' + p.nome + '">' + UNOA.icone('coracao') + '</button>' +
      '<div class="card__acoes">' +
        '<button class="btn btn--bloco" type="button" data-comprar-card="' + p.id + '">Comprar agora</button>' +
        '<button class="btn btn--contorno btn--bloco" type="button" data-add-card="' + p.id + '">Adicionar ao carrinho</button>' +
      '</div>' +
    '</div>' +
    '<h3 class="card__nome"><a href="' + link + '">' + p.nome + '</a></h3>' +
    '<div class="card__nota"><b>★</b> ' + p.nota.toFixed(1).replace('.', ',') + ' (' + p.avaliacoes + ')</div>' +
    '<div class="card__preco"><strong>' + UNOA.moeda(p.preco) + '</strong>' + (desc ? '<s>' + UNOA.moeda(p.precoAntigo) + '</s><span class="tag-desc">-' + desc + '%</span>' : '') + '</div>' +
    '<div class="card__parcela">' + p.parcelas + 'x sem juros</div>' + entrega + cmp + '</article>';
};

document.addEventListener('click', function (e) {
  var fav = e.target.closest('[data-fav]');
  if (fav) {
    e.preventDefault();
    fav.setAttribute('aria-pressed', UNOA.estado.alternarFavorito(fav.dataset.fav));
    return;
  }
  var add = e.target.closest('[data-add-card]'), comprar = e.target.closest('[data-comprar-card]');
  var id = add ? add.dataset.addCard : comprar ? comprar.dataset.comprarCard : null;
  if (!id) return;
  var p = UNOA.produto(id);
  UNOA.estado.adicionar(id, 1, p.cores && p.cores[0] ? p.cores[0][0] : undefined);
  if (comprar) { location.href = UNOA.url('paginas/carrinho.html'); return; }
  UNOA.toast(p.nome + ' adicionado ao carrinho');
});
