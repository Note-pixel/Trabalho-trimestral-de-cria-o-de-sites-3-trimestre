/* UNOA - catálogo único para busca, categoria, ofertas e presentes (modo vem de <body data-modo>) */
document.addEventListener('DOMContentLoaded', function () {
  var modo = document.body.dataset.modo, qs = new URLSearchParams(location.search);
  var norm = function (s) { return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
  var estado = { q: qs.get('q') || '', cat: qs.get('c') || '', ate: Number(qs.get('ate')) || 0, preco: 300, nota: 0, ordem: 'relevancia', visao: 'grade', tipos: [] };
  var raiz = document.getElementById('catalogo-raiz');
  var cat = UNOA.categorias.find(function (c) { return c.id === estado.cat; });
  var titulos = { busca: estado.q ? estado.q : 'Todos os produtos', categoria: cat ? cat.nome : 'Categoria', ofertas: 'Ofertas da semana', presentes: 'Ideias de presentes' };
  document.title = titulos[modo] + ' — UNOA';

  function base() {
    var l = UNOA.produtos.slice();
    if (modo === 'categoria' && cat) l = l.filter(function (p) { return p.categoria === cat.id; });
    if (modo === 'ofertas') l = l.filter(function (p) { return p.precoAntigo; });
    if (modo === 'busca' && estado.q) l = l.filter(function (p) { return norm(p.nome).indexOf(norm(estado.q)) >= 0 || norm(p.categoria).indexOf(norm(estado.q)) >= 0; });
    if (modo === 'presentes' && estado.ate) l = l.filter(function (p) { return p.preco <= estado.ate; });
    return l;
  }
  function filtrar() {
    var l = base().filter(function (p) { return p.preco <= estado.preco && p.nota >= estado.nota; });
    var o = { 'menor': function (a, b) { return a.preco - b.preco; }, 'maior': function (a, b) { return b.preco - a.preco; }, 'nota': function (a, b) { return b.nota - a.nota; } }[estado.ordem];
    return o ? l.sort(o) : l;
  }
  function vazio() {
    var sug = UNOA.maisProcurados.map(function (i) { return UNOA.cartaoProduto(UNOA.produto(i)); }).join('');
    raiz.innerHTML = '<div class="container"><div class="vazio"><div><h1>Não encontramos resultados para “' + estado.q + '”</h1>' +
      '<p>Você quis dizer <a class="link-sublinhado" href="' + UNOA.url('paginas/busca.html?q=fone') + '">fone de ouvido</a>?</p>' +
      '<ul><li>Confira a ortografia das palavras digitadas.</li><li>Use termos mais simples, como “fone” ou “carregador”.</li><li>Navegue pelas categorias do catálogo.</li></ul>' +
      '<form class="busca-topo" action="' + UNOA.url('paginas/busca.html') + '"><input name="q" placeholder="Ex.: fone Bluetooth, caneca..." aria-label="Nova busca"><button class="btn" style="height:30px">Buscar</button></form></div>' +
      '<div class="vazio__cats"><h3>Navegue por categoria</h3>' + UNOA.categorias.map(function (c) { return '<a href="' + UNOA.url('paginas/categoria.html?c=' + c.id) + '">' + c.nome + '</a>'; }).join('') +
      '<a class="btn btn--bloco" href="' + UNOA.url('paginas/busca.html') + '">Ver todas as categorias</a></div></div>' +
      '<div class="secao__topo"><h2 class="secao__titulo">Mais procurados</h2></div><div class="grade-produtos" style="padding-bottom:56px">' + sug + '</div></div>';
  }
  function topo() {
    var n = filtrar().length, t = titulos[modo];
    var extra = '';
    if (modo === 'ofertas') extra = '<div class="hero-pagina"><h2>Ofertas da semana</h2><p>Preços reduzidos, com frete e prazo claros. Com o cupom ' + UNOA.cupom.codigo + ' você ganha mais R$ 10 na primeira compra.</p></div>';
    if (modo === 'presentes') extra = '<div class="chips-linha" id="chips-preco">' + [['Todos', 0], ['Até R$ 50', 50], ['Até R$ 100', 100], ['Até R$ 200', 200]].map(function (c) { return '<button class="chip" data-ate="' + c[1] + '" aria-pressed="' + (estado.ate === c[1]) + '">' + c[0] + '</button>'; }).join('') + '</div>';
    return '<div class="cat-topo"><div class="container"><nav class="crumbs"><a href="' + UNOA.url('index.html') + '">Início</a> › ' + t + '</nav>' +
      (modo === 'ofertas' || modo === 'presentes' ? '' : '<div class="aviso-cep"><span>Entrega para: 90010-000</span><a class="link-sublinhado" href="#">Alterar</a></div>') +
      '<h1>' + t + '<small>' + n + ' resultados</small></h1>' + extra + '</div></div>';
  }
  function lista() {
    var l = filtrar();
    document.getElementById('res-grade').className = 'grade-produtos' + (estado.visao === 'lista' ? ' lista' : '');
    document.getElementById('res-grade').innerHTML = l.length ? l.map(UNOA.cartaoProduto).join('') : '<p>Nenhum produto com esses filtros.</p>';
    document.getElementById('res-total').textContent = l.length + ' resultados';
  }
  function pagina() {
    if (modo === 'busca' && estado.q && !base().length) return vazio();
    raiz.innerHTML = topo() + '<div class="container catalogo"><aside class="filtros" aria-label="Filtros"><div style="display:flex;justify-content:space-between"><h2>Filtros</h2><button class="filtros__limpar" id="limpar">Limpar</button></div>' +
      '<div><h3>PREÇO (ATÉ)</h3><input id="f-preco" type="range" min="20" max="300" value="' + estado.preco + '"><output id="o-preco">' + UNOA.moeda(estado.preco) + '</output></div>' +
      '<div><h3>AVALIAÇÃO</h3>' + [[0, 'Qualquer'], [4, '4 ou mais'], [4.5, '4,5 ou mais']].map(function (n) { return '<label><input type="radio" name="nota" value="' + n[0] + '"' + (estado.nota === n[0] ? ' checked' : '') + '>' + n[1] + '</label>'; }).join('') + '</div></aside>' +
      '<section><div class="barra"><span id="res-total"></span><div style="display:flex;gap:10px"><select id="ordem" aria-label="Ordenar"><option value="relevancia">Mais relevantes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="nota">Melhor avaliação</option></select>' +
      '<div class="visoes"><button data-v="grade" aria-pressed="true" aria-label="Grade">▦</button><button data-v="lista" aria-pressed="false" aria-label="Lista">☰</button></div></div></div><div id="res-grade"></div></section></div>';
    lista();
    document.getElementById('f-preco').oninput = function (e) { estado.preco = +e.target.value; document.getElementById('o-preco').textContent = UNOA.moeda(estado.preco); lista(); };
    document.getElementById('ordem').onchange = function (e) { estado.ordem = e.target.value; lista(); };
    document.getElementById('limpar').onclick = function () { estado.preco = 300; estado.nota = 0; estado.ordem = 'relevancia'; pagina(); };
    raiz.querySelectorAll('input[name=nota]').forEach(function (r) { r.onchange = function () { estado.nota = +r.value; lista(); }; });
    raiz.querySelectorAll('.visoes button').forEach(function (b) { b.onclick = function () { estado.visao = b.dataset.v; raiz.querySelectorAll('.visoes button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); lista(); }; });
    raiz.querySelectorAll('[data-ate]').forEach(function (b) { b.onclick = function () { estado.ate = +b.dataset.ate; pagina(); }; });
  }
  pagina();
});