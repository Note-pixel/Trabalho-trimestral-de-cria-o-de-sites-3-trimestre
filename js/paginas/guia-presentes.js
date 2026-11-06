/* UNOA - guia de presentes: escolhe ocasião, orçamento e destinatário */
document.addEventListener('DOMContentLoaded', function () {
  var U = UNOA.url, raiz = document.getElementById('pg'), sel = { quando: 'Aniversário', ate: '100', quem: '' };
  var grupo = function (k, lista) {
    return '<div class="chips-linha" data-g="' + k + '">' + lista.map(function (c) { return '<button type="button" class="chip" data-v="' + c[1] + '" aria-pressed="' + (sel[k] === c[1]) + '">' + c[0] + '</button>'; }).join('') + '</div>';
  };
  raiz.innerHTML = '<div class="container"><nav class="crumbs"><a href="' + U('index.html') + '">Início</a> › <a href="' + U('paginas/presentes.html') + '">Presentes</a> › Guia de presentes</nav>' +
    '<h1>Guia de presentes</h1><p>Responda rápido e veja ideias para qualquer ocasião.</p>' +
    '<div class="hero-pagina"><h2 style="font-size:16px">1. Para quando?</h2>' + grupo('quando', [['Aniversário', 'Aniversário'], ['Amigo secreto', 'Amigo secreto'], ['Agradecimento', 'Agradecimento'], ['Outra ocasião', 'Outra ocasião']]) +
    '<h2 style="font-size:16px">2. Quanto quer gastar?</h2>' + grupo('ate', [['Até R$ 50', '50'], ['Até R$ 100', '100'], ['Até R$ 200', '200'], ['Sem limite', '0']]) +
    '<h2 style="font-size:16px">3. Para quem? <small>(opcional)</small></h2>' + grupo('quem', [['Amiga', 'Amiga'], ['Amigo', 'Amigo'], ['Família', 'Família'], ['Colega', 'Colega']]) +
    '<button class="btn" id="ver" type="button">Ver ideias de presentes →</button></div>' +
    '<div id="ideias"></div>' +
    '<h2 class="secao__titulo">Ideias populares</h2><div class="ideias-cards">' +
    [['Até R$ 50', 'Pequenos gestos que fazem diferença.', 'paginas/presentes.html?ate=50'], ['Amigo secreto', 'Opções simples e com bom custo-benefício.', 'paginas/presentes.html?ate=100'], ['Para quem ama casa', 'Organização e decoração com estilo.', 'paginas/categoria.html?c=casa'], ['Para quem ama tecnologia', 'Fones, carregadores e acessórios.', 'paginas/categoria.html?c=tecnologia']].map(function (c) { return '<a class="ideia" href="' + U(c[2]) + '"><b>' + c[0] + '</b><span>' + c[1] + '</span><span class="link-sublinhado">Ver</span></a>'; }).join('') + '</div>' +
    '<div class="beneficios">' + [['Troca descomplicada', 'Se não servir, troque em até 7 dias.'], ['Cartão personalizado grátis', 'Escreva uma mensagem para quem vai receber.'], ['Entrega expressa possível', 'Opção expressa no checkout para chegar a tempo.']].map(function (b) { return '<div class="painel"><b>' + b[0] + '</b><small>' + b[1] + '</small></div>'; }).join('') + '</div></div>';
  raiz.addEventListener('click', function (e) {
    var b = e.target.closest('[data-v]');
    if (b) { var g = b.parentNode.dataset.g; sel[g] = (g === 'quem' && sel[g] === b.dataset.v) ? '' : b.dataset.v; b.parentNode.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.v === sel[g]); }); }
    if (e.target.id === 'ver') {
      var max = +sel.ate, l = UNOA.produtos.filter(function (p) { return !max || p.preco <= max; });
      document.getElementById('ideias').innerHTML = '<div class="secao__topo" style="margin-top:28px"><h2 class="secao__titulo">' + l.length + ' ideias para ' + sel.quando.toLowerCase() + (sel.quem ? ' (' + sel.quem.toLowerCase() + ')' : '') + '</h2><a class="link-sublinhado" href="' + U('paginas/presentes.html' + (max ? '?ate=' + max : '')) + '">Ver todas</a></div>' +
        (l.length ? '<div class="grade-produtos">' + l.map(function (p) { return UNOA.cartaoProduto(p); }).join('') + '</div>' : '<p>Nenhum produto nessa faixa. Tente um valor maior.</p>') + '<div style="height:32px"></div>';
      document.getElementById('ideias').scrollIntoView({ behavior: 'smooth' });
    }
  });
});
