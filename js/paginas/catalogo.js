/* UNOA - catálogo: busca, categoria, ofertas e presentes (modo em <body data-modo>) */
document.addEventListener('DOMContentLoaded', function () {
  var modo = document.body.dataset.modo, qs = new URLSearchParams(location.search), U = UNOA.url, M = UNOA.moeda, PAG = 6;
  var norm = function (s) { return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
  var $ = function (s) { return document.getElementById(s); }, raiz = $('catalogo-raiz');
  var E = { q: (qs.get('q') || '').trim(), c: qs.get('c') || '', ate: Number(qs.get('ate')) || 0, preco: 300, nota: 0, prazo: 0, gratis: false, cats: [], ordem: 'relevancia', visao: 'grade', pag: 1, cmp: [] };
  if (modo === 'busca' && /^presentes?$/.test(norm(E.q))) { location.replace(U('paginas/presentes.html')); return; }
  var cat = UNOA.categorias.find(function (c) { return c.id === E.c; });
  var titulos = { busca: E.q ? E.q : 'Todos os produtos', categoria: cat ? cat.nome : 'Categoria', ofertas: 'Ofertas da semana', presentes: 'Ideias de presentes' };
  document.title = titulos[modo] + ' — UNOA';
  var cep = function () { try { return JSON.parse(localStorage.getItem('unoa.cep')) || '90010-000'; } catch (e) { return '90010-000'; } };
  var nomeCat = function (id) { return UNOA.categorias.find(function (x) { return x.id === id; }).nome; };
  var escapar = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  function base() {
    var l = UNOA.produtos.slice();
    if (modo === 'categoria' && cat) l = l.filter(function (p) { return p.categoria === cat.id; });
    if (modo === 'ofertas') l = l.filter(function (p) { return p.precoAntigo; });
    if (modo === 'busca' && E.q) { var q = norm(E.q); l = l.filter(function (p) { return norm(p.nome).indexOf(q) >= 0 || norm(nomeCat(p.categoria)).indexOf(q) >= 0; }); }
    if (modo === 'presentes' && E.ate) l = l.filter(function (p) { return p.preco <= E.ate; });
    if ((modo === 'busca' || modo === 'ofertas') && E.cats.length) l = l.filter(function (p) { return E.cats.indexOf(p.categoria) >= 0; });
    return l;
  }
  function filtrar() {
    var l = base().filter(function (p) { return p.preco <= E.preco && p.nota >= E.nota && (!E.prazo || (p.prazo || 7) <= E.prazo) && (!E.gratis || p.freteGratis); });
    var o = { menor: function (a, b) { return a.preco - b.preco; }, maior: function (a, b) { return b.preco - a.preco; }, nota: function (a, b) { return b.nota - a.nota; } }[E.ordem];
    return o ? l.sort(o) : l;
  }
  function vazio() {
    var sug = UNOA.maisProcurados.map(function (i) { return UNOA.cartaoProduto(UNOA.produto(i)); }).join('');
    raiz.innerHTML = '<div class="container"><div class="vazio"><div><h1>Não encontramos resultados para “' + escapar(E.q) + '”</h1><p>Você quis dizer <a class="link-sublinhado" href="' + U('paginas/busca.html?q=fone') + '">fone de ouvido</a>?</p>' +
      '<ul><li>Confira a ortografia das palavras digitadas.</li><li>Use termos mais simples, como “fone” ou “carregador”.</li><li>Navegue pelas categorias do catálogo.</li></ul>' +
      '<form class="busca-topo" action="' + U('paginas/busca.html') + '"><input name="q" placeholder="Ex.: fone Bluetooth, caneca..." aria-label="Nova busca"><button class="btn" style="height:30px">Buscar</button></form></div>' +
      '<div class="vazio__cats"><h3>Navegue por categoria</h3>' + UNOA.categorias.map(function (c) { return '<a href="' + U('paginas/categoria.html?c=' + c.id) + '">' + c.nome + '</a>'; }).join('') + '<a class="btn btn--bloco" href="' + U('paginas/busca.html') + '">Ver todos os produtos</a></div></div>' +
      '<div class="secao__topo"><h2 class="secao__titulo">Mais procurados</h2></div><div class="grade-produtos" style="padding-bottom:56px">' + sug + '</div></div>';
  }
  function topo() {
    var t = escapar(titulos[modo]), extra = '';
    if (modo === 'ofertas') extra = '<div class="hero-pagina"><h2>Ofertas da semana</h2><p>Preços reduzidos, com frete e prazo claros. Com o cupom ' + UNOA.cupom.codigo + ' você ganha mais R$ 10 na primeira compra.</p></div><div class="chips-linha" id="abas-cat">' + [['', 'Todas']].concat(UNOA.categorias.map(function (c) { return [c.id, c.nome]; })).map(function (c) { return '<button type="button" class="chip" data-tab="' + c[0] + '" aria-pressed="' + ((E.cats[0] || '') === c[0]) + '">' + c[1] + '</button>'; }).join('') + '</div>';
    if (modo === 'categoria' && cat) extra = '<div class="hero-pagina"><small>' + cat.nome.toUpperCase() + '</small><h2>Seu dia mais prático</h2><p>Produtos selecionados com frete e prazo claros.</p><a class="btn" href="#res-grade">Ver produtos</a></div><h2 class="secao__titulo" style="font-size:16px">Explore por tipo</h2><div class="chips-linha">' + (UNOA.subcategorias[cat.id] || []).map(function (s) { return '<a class="chip" href="' + U('paginas/busca.html?q=' + encodeURIComponent(s[1])) + '">' + s[0] + '</a>'; }).join('') + '</div>';
    if (modo === 'presentes') extra = '<div class="chips-linha">' + [['Todos', 0], ['Até R$ 50', 50], ['Até R$ 100', 100], ['Até R$ 200', 200]].map(function (c) { return '<button class="chip" type="button" data-ate="' + c[1] + '" aria-pressed="' + (E.ate === c[1]) + '">' + c[0] + '</button>'; }).join('') + '</div>';
    return '<div class="cat-topo"><div class="container"><nav class="crumbs"><a href="' + U('index.html') + '">Início</a> › ' + t + '</nav>' +
      (modo === 'ofertas' || modo === 'presentes' ? '' : '<div class="aviso-cep"><span>Entrega para: ' + cep() + '</span><button class="link-sublinhado" id="alt-cep" type="button" style="background:none;border:0">Alterar</button></div>') +
      '<h1>' + t + '<small>' + filtrar().length + ' resultados</small></h1>' + extra + '</div></div>';
  }
  function ativos() {
    var a = [];
    if (E.preco < 300) a.push(['preco', 'Até ' + M(E.preco)]);
    if (E.nota) a.push(['nota', E.nota + '★ ou mais']);
    if (E.prazo) a.push(['prazo', 'Até ' + E.prazo + ' dias']);
    if (E.gratis) a.push(['gratis', 'Frete grátis']);
    if (modo === 'busca') E.cats.forEach(function (c) { a.push(['cat:' + c, nomeCat(c)]); });
    $('ativos').innerHTML = a.map(function (x) { return '<button type="button" class="chip" data-rm="' + x[0] + '">' + x[1] + ' ✕</button>'; }).join('');
  }
  function barraCmp() {
    var n = E.cmp.length;
    $('barra-cmp').innerHTML = n ? '<span>' + n + ' selecionado(s) para comparar' + (n < 2 ? ' · escolha mais 1' : '') + '</span>' + (n >= 2 ? '<a class="btn" href="' + U('paginas/comparar.html?ids=' + E.cmp.join(',')) + '">Comparar produtos</a>' : '') : '';
  }
  function lista() {
    var l = filtrar(), pgs = Math.max(1, Math.ceil(l.length / PAG)); E.pag = Math.min(E.pag, pgs);
    $('res-grade').className = 'grade-produtos' + (E.visao === 'lista' ? ' lista' : '');
    var fatia = l.slice((E.pag - 1) * PAG, E.pag * PAG);
    $('res-grade').innerHTML = fatia.length ? fatia.map(function (p) { return UNOA.cartaoProduto(p, { entrega: true, comparar: true, marcado: E.cmp.indexOf(p.id) >= 0 }); }).join('') : '<p>Nenhum produto com esses filtros.</p>';
    $('res-total').textContent = l.length + ' resultados';
    var h = document.querySelector('.cat-topo h1 small'); if (h) h.textContent = l.length + ' resultados';
    $('paginas').innerHTML = pgs > 1 ? '<button class="chip" type="button" data-pg="' + Math.max(1, E.pag - 1) + '" aria-label="Página anterior">‹</button>' + Array.from({ length: pgs }, function (_, i) { return '<button class="chip" type="button" data-pg="' + (i + 1) + '" aria-pressed="' + (E.pag === i + 1) + '">' + (i + 1) + '</button>'; }).join('') + '<button class="chip" type="button" data-pg="' + Math.min(pgs, E.pag + 1) + '" aria-label="Próxima página">›</button>' : '';
    ativos(); barraCmp();
  }
  function radios(nome, lista, atual) { return lista.map(function (n) { return '<label><input type="radio" name="' + nome + '" value="' + n[0] + '"' + (atual === n[0] ? ' checked' : '') + '>' + n[1] + '</label>'; }).join(''); }
  function pagina() {
    var guarda = E.cats; E.cats = []; var achou = base().length; E.cats = guarda;
    if (modo === 'busca' && E.q && !achou) return vazio();
    raiz.innerHTML = topo() + '<div class="container catalogo"><aside class="filtros" aria-label="Filtros"><div style="display:flex;justify-content:space-between"><h2>Filtros</h2><button class="filtros__limpar" id="limpar" type="button">Limpar</button></div>' +
      '<div><h3>PREÇO (ATÉ)</h3><input id="f-preco" type="range" min="20" max="300" value="' + E.preco + '" aria-label="Preço máximo"><output id="o-preco">' + M(E.preco) + '</output></div>' +
      '<div><h3>AVALIAÇÃO</h3>' + radios('nota', [[0, 'Qualquer'], [4, '4 ou mais'], [4.5, '4,5 ou mais']], E.nota) + '</div>' +
      '<div><h3>PRAZO DE ENTREGA</h3>' + radios('prazo', [[0, 'Qualquer'], [3, 'Até 3 dias'], [7, 'Até 7 dias']], E.prazo) + '</div>' +
      '<label><input type="checkbox" id="f-gratis"' + (E.gratis ? ' checked' : '') + '> Frete grátis</label>' +
      (modo === 'busca' ? '<div><h3>CATEGORIA</h3>' + UNOA.categorias.map(function (c) { return '<label><input type="checkbox" data-cat="' + c.id + '"' + (E.cats.indexOf(c.id) >= 0 ? ' checked' : '') + '>' + c.nome + '</label>'; }).join('') + '</div>' : '') + '</aside>' +
      '<section><div class="barra"><span id="res-total"></span><div style="display:flex;gap:10px"><select id="ordem" aria-label="Ordenar">' + [['relevancia', 'Mais relevantes'], ['menor', 'Menor preço'], ['maior', 'Maior preço'], ['nota', 'Melhor avaliação']].map(function (o) { return '<option value="' + o[0] + '"' + (E.ordem === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>' +
      '<div class="visoes"><button type="button" data-v="grade" aria-pressed="' + (E.visao === 'grade') + '" aria-label="Grade">▦</button><button type="button" data-v="lista" aria-pressed="' + (E.visao === 'lista') + '" aria-label="Lista">☰</button></div></div></div>' +
      '<div id="ativos" class="chips-linha"></div><div id="res-grade"></div><div id="paginas" class="pag"></div></section></div><div class="barra-cmp" id="barra-cmp"></div>';
    lista();
  }
  raiz.oninput = function (e) { if (e.target.id === 'f-preco') { E.preco = +e.target.value; $('o-preco').textContent = M(E.preco); E.pag = 1; lista(); } };
  raiz.onchange = function (e) {
    var t = e.target;
    if (t.id === 'ordem') { E.ordem = t.value; lista(); }
    else if (t.name === 'nota') { E.nota = +t.value; E.pag = 1; lista(); }
    else if (t.name === 'prazo') { E.prazo = +t.value; E.pag = 1; lista(); }
    else if (t.id === 'f-gratis') { E.gratis = t.checked; E.pag = 1; lista(); }
    else if (t.dataset.cat) { var i = E.cats.indexOf(t.dataset.cat); if (t.checked && i < 0) E.cats.push(t.dataset.cat); if (!t.checked && i >= 0) E.cats.splice(i, 1); E.pag = 1; lista(); }
    else if (t.dataset.cmp) { var k = E.cmp.indexOf(t.dataset.cmp); if (t.checked) { if (E.cmp.length >= 3) { t.checked = false; UNOA.toast('Compare até 3 produtos'); } else E.cmp.push(t.dataset.cmp); } else if (k >= 0) E.cmp.splice(k, 1); barraCmp(); }
  };
  raiz.onclick = function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.id === 'limpar') { E.preco = 300; E.nota = 0; E.prazo = 0; E.gratis = false; E.cats = []; E.ordem = 'relevancia'; E.pag = 1; pagina(); }
    else if (b.dataset.rm) { var r = b.dataset.rm; if (r === 'preco') E.preco = 300; else if (r === 'nota') E.nota = 0; else if (r === 'prazo') E.prazo = 0; else if (r === 'gratis') E.gratis = false; else E.cats = E.cats.filter(function (c) { return c !== r.slice(4); }); E.pag = 1; pagina(); }
    else if (b.dataset.pg) { E.pag = +b.dataset.pg; lista(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else if (b.dataset.v) { E.visao = b.dataset.v; raiz.querySelectorAll('.visoes button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); lista(); }
    else if (b.dataset.tab !== undefined) { E.cats = b.dataset.tab ? [b.dataset.tab] : []; E.pag = 1; raiz.querySelectorAll('[data-tab]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); lista(); }
    else if (b.dataset.ate !== undefined) { E.ate = +b.dataset.ate; E.pag = 1; pagina(); }
    else if (b.id === 'alt-cep') { var v = prompt('Digite seu CEP (8 números)'); if (v && /^[0-9]{5}-?[0-9]{3}$/.test(v.trim())) { try { localStorage.setItem('unoa.cep', JSON.stringify(v.trim())); } catch (x) {} pagina(); } else if (v) UNOA.toast('CEP inválido'); }
  };
  pagina();
});
