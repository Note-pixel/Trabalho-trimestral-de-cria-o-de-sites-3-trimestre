/* UNOA - comportamento da Home */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('lista-categorias').innerHTML = UNOA.categorias.map(function (c) {
    return '<a class="cat" href="' + UNOA.url('paginas/categoria.html?c=' + c.id) + '"><span class="cat__icone" style="background:' + c.cor + '">' + UNOA.icone(c.icone) + '</span>' + c.nome + '</a>';
  }).join('');
  function grade(id, ids) { document.getElementById(id).innerHTML = ids.map(function (i) { return UNOA.cartaoProduto(UNOA.produto(i)); }).join(''); }
  grade('grade-ofertas', UNOA.ofertasDaSemana); grade('grade-procurados', UNOA.maisProcurados);
  document.querySelectorAll('[data-img]').forEach(function (el) { var k = el.dataset.img.split('.'); el.src = UNOA.img(k[0], k[1]); });
  document.querySelectorAll('[data-busca]').forEach(function (b) { b.addEventListener('click', function () { location.href = UNOA.url('paginas/busca.html?q=' + encodeURIComponent(b.dataset.busca)); }); });
  var f = document.getElementById('form-hero');
  f.addEventListener('submit', function (e) { e.preventDefault(); location.href = UNOA.url('paginas/busca.html?q=' + encodeURIComponent(f.q.value)); });
  document.getElementById('copiar-cupom').addEventListener('click', function () {
    (navigator.clipboard ? navigator.clipboard.writeText(UNOA.cupom.codigo) : Promise.resolve()).then(function () { UNOA.toast('Cupom ' + UNOA.cupom.codigo + ' copiado'); }, function () { UNOA.toast('Cupom: ' + UNOA.cupom.codigo); });
  });
});