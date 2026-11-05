document.addEventListener('DOMContentLoaded', function () {
  var modo = document.body.dataset.modo, qs = new URLSearchParams(location.search);
  var p = UNOA.produto(qs.get('id')) || UNOA.produto('fone-sem-fio'), id = p.id, U = UNOA.url, M = UNOA.moeda, raiz = document.getElementById('pg');
  var img = function (x) { return UNOA.img.apply(null, x.imagem.split('.')); };
  var caixa = function (x, c) { return '<div class="img-caixa ' + (c || '') + '"><img src="' + img(x) + '" alt="' + x.nome + '"></div>'; };
  var estrelas = function (n) { return '<span class="estrelas">' + '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n)) + '</span>'; };
  var crumbs = function (fim) { return '<nav class="crumbs"><a href="' + U('index.html') + '">Início</a> › <a href="' + U('paginas/categoria.html?c=' + p.categoria) + '">' + UNOA.categorias.find(function (c) { return c.id === p.categoria; }).nome + '</a> › <a href="' + U('paginas/produto.html?id=' + id) + '">' + p.nome + '</a> › ' + fim + '</nav>'; };
  var abas = function (a) { return '<nav class="abas">' + [['Descrição', 'produto-descricao'], ['Avaliações (' + p.avaliacoes + ')', 'produto-avaliacoes'], ['Fotos', 'produto-fotos']].map(function (t) { return '<a href="' + U('paginas/' + t[1] + '.html?id=' + id) + '"' + (t[1] === a ? ' aria-current="page"' : '') + '>' + t[0] + '</a>'; }).join('') + '</nav>'; };
  var sugestoes = function (t) { return '<div class="secao__topo" style="margin-top:40px"><h2 class="secao__titulo">' + t + '</h2></div><div class="grade-produtos">' + UNOA.produtos.filter(function (x) { return x.id !== id; }).slice(0, 4).map(UNOA.cartaoProduto).join('') + '</div>'; };
  var avs = [['Chegou rápido', 'Chegou rápido e o som é muito bom.', 'Camila R.', 5], ['Boa bateria', 'Bateria dura bem e o encaixe é confortável.', 'Rafael S.', 4], ['Bonito e confortável', 'O estojo é pequeno e cabe em qualquer bolsa.', 'Juliana M.', 5], ['Vale o preço', 'Funciona bem para o dia a dia e o frete foi claro.', 'Marcos T.', 4]];
  var R = {};

  var dataEm = function (n) { var d = new Date(); d.setDate(d.getDate() + n); return d.getDate() + ' de ' + ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][d.getMonth()]; };
  var resumoNotas = function () {
    return '<div class="painel"><div class="nota-grande">' + String(p.nota).replace('.', ',') + '</div>' + estrelas(p.nota) + '<small>' + p.avaliacoes + ' avaliações no total</small>' +
      [72, 18, 6, 2, 2].map(function (v, i) { return '<div class="barra-nota"><span>' + (5 - i) + '★</span><i><b style="width:' + v + '%"></b></i><span>' + v + '%</span></div>'; }).join('') +
      '<a class="btn" href="' + U('paginas/avaliar-produto.html?id=' + id) + '">Escrever avaliação</a></div>';
  };
  var todasAvs = function () {
    var salvas = JSON.parse(localStorage.getItem('unoa.avaliacoes') || '[]').filter(function (a) { return a.id === id; }).map(function (a) { return [a.titulo, a.texto, a.autor, a.nota]; });
    return salvas.concat(avs);
  };
  var cardAv = function (a, i) {
    return '<div class="avaliacao"><div style="display:flex;justify-content:space-between">' + estrelas(a[3]) + '<small>Há ' + (i + 1) + (i ? ' semanas' : ' semana') + '</small></div><b>' + a[0] + '</b>' + a[1] + '<br><small>' + a[2] + ' · Compra verificada</small><div class="util"><button type="button" data-util>Foi útil? Sim</button></div></div>';
  };
  R.detalhe = function () {
    var cor = p.cores[0][0], fav = UNOA.estado.favoritos().indexOf(id) >= 0;
    return '<div class="container">' + crumbs('Detalhes') + '<div class="prod"><div class="prod__thumbs">' +
      p.cores.map(function (c, i) { return '<button type="button" class="img-caixa" data-cor="' + c[0] + '" aria-current="' + (i === 0) + '" aria-label="Ver cor ' + c[0] + '"><img src="' + UNOA.imgCor(p, c[0]) + '" alt="' + p.nome + ' na cor ' + c[0] + '"></button>'; }).join('') + '</div>' +
      '<a href="' + U('paginas/produto-fotos.html?id=' + id) + '" class="img-caixa prod__principal"><img data-cor-img src="' + UNOA.imgCor(p, cor) + '" alt="' + p.nome + '"></a>' +
      '<div class="painel"><span class="selo" style="align-self:flex-start">Em estoque</span><h2>' + p.nome + '</h2><a href="#comentarios">' + estrelas(p.nota) + ' <small>' + String(p.nota).replace('.', ',') + ' · ' + p.avaliacoes + ' avaliações</small></a>' +
      '<div class="preco-grande">' + M(p.preco) + (p.precoAntigo ? '<s>' + M(p.precoAntigo) + '</s>' : '') + '</div><small>' + p.parcelas + 'x de ' + M(p.preco / p.parcelas) + ' sem juros</small>' +
      '<div class="aviso">Use o cupom <b>' + UNOA.cupom.codigo + '</b> e ganhe R$ 10 na primeira compra.</div>' +
      '<div><small>Cor: <b id="cor-nome">' + cor + '</b></small><div class="cores" id="cores">' + p.cores.map(function (c, i) { return '<button type="button" data-cor="' + c[0] + '" style="background:' + c[1] + '" aria-pressed="' + (i === 0) + '" aria-label="' + c[0] + '"></button>'; }).join('') + '</div></div>' +
      '<div><small>Quantidade</small><div class="qtd"><button id="menos" type="button" aria-label="Diminuir">−</button><output id="qtd">1</output><button id="mais" type="button" aria-label="Aumentar">+</button></div></div>' +
      '<div><small><b>Entrega</b></small><div class="cep"><input id="cep" value="90010-000" aria-label="CEP"><button class="btn btn--contorno" id="calc" type="button">Calcular</button></div><small id="frete">Chega até ' + dataEm(9) + ' · R$ 12,90</small></div>' +
      '<button class="btn" id="add" type="button">Adicionar ao carrinho</button><button class="btn btn--contorno" id="comprar" type="button">Comprar agora</button>' +
      '<button type="button" class="btn btn--contorno" id="btn-fav" data-fav="' + id + '" aria-pressed="' + fav + '"><span class="off">♡ Salvar nos favoritos</span><span class="on">♥ Nos favoritos</span></button>' +
      '<a class="link-sublinhado" href="' + U('paginas/comparar.html?ids=' + id + ',carregador-portatil,fone-cancelamento') + '">Adicionar para comparar</a></div></div>' + abas('') +
      '<section id="comentarios"><div class="secao__topo"><h2 class="secao__titulo">Comentários de clientes (' + p.avaliacoes + ')</h2><a class="link-sublinhado" href="' + U('paginas/produto-avaliacoes.html?id=' + id) + '">Ver todas as avaliações</a></div><div class="resumo-nota">' + resumoNotas() + '<div>' + todasAvs().slice(0, 3).map(cardAv).join('') + '</div></div></section>' + sugestoes('Quem viu também viu') + '</div>';
  };
  R.fotos = function () {
    return '<div class="container">' + crumbs('Fotos') + '<h1>Fotos do produto</h1><div class="prod" style="grid-template-columns:1fr 340px"><div class="img-caixa prod__principal" id="foto-grande"><img src="' + img(p) + '" alt="' + p.nome + '"></div>' +
      '<div class="painel"><h2>' + p.nome + '</h2><div class="preco-grande">' + M(p.preco) + '</div><button class="btn" id="add">Adicionar ao carrinho</button><a class="btn btn--contorno" href="' + U('paginas/produto.html?id=' + id) + '">Voltar ao produto</a></div></div>' +
      '<div class="prod__thumbs" style="flex-direction:row;margin-top:16px">' + [1, 2, 3, 4, 5].map(function (i) { return '<div class="img-caixa" style="width:90px;height:90px"><img src="' + img(p) + '" alt="Foto ' + i + '"></div>'; }).join('') + '</div></div>';
  };
  R.descricao = function () {
    return '<div class="container">' + crumbs('Detalhes') + '<h1>Descrição e características</h1>' + abas('produto-descricao') + '<div class="duas"><div class="painel"><h2>Descrição</h2><p>' + p.nome + ' pensado para o dia a dia. Leve, prático e fácil de guardar. As informações abaixo são exemplos do projeto.</p>' +
      '<h2>Características</h2><table class="tabela"><tr><th>Cor</th><td>Preto</td></tr><tr><th>Tipo</th><td>Intra-auricular sem fio</td></tr><tr><th>Acompanha</th><td>Estojo de carregamento</td></tr><tr><th>Troca</th><td>Em até 7 dias</td></tr></table>' +
      '<h2>Entrega e devolução</h2><p>Frete e prazo calculados pelo CEP, antes de pagar.<br>Troca em até 7 dias.<br>Compra segura.</p></div>' +
      '<div class="painel">' + caixa(p, '') + '<h2>' + p.nome + '</h2><div class="preco-grande">' + M(p.preco) + '</div><button class="btn" id="add">Adicionar ao carrinho</button><a class="btn btn--contorno" href="' + U('paginas/produto.html?id=' + id) + '">Voltar ao produto</a></div></div></div>';
  };
  R.avaliacoes = function () {
    return '<div class="container">' + crumbs('Avaliações') + '<h1>Avaliações (' + p.avaliacoes + ')</h1>' + abas('produto-avaliacoes') + '<div class="resumo-nota">' + resumoNotas() + '<div><div class="chips-linha" id="filtro-av">' + [['Todas', 0], ['5★', 5], ['4★', 4], ['3★', 3]].map(function (f, i) { return '<button type="button" class="chip" data-n="' + f[1] + '" aria-pressed="' + (i === 0) + '">' + f[0] + '</button>'; }).join('') + '</div><div id="lista-av"></div></div></div></div>';
  };
  R.avaliar = function () {
    return '<div class="container">' + crumbs('Avaliar') + '<h1>Avalie o produto</h1><p>Sua avaliação ajuda outras pessoas a decidir.</p><div class="duas"><form class="painel form" id="form-av"><label>Sua nota</label><div class="estrelas-input" id="est">' + [1, 2, 3, 4, 5].map(function (i) { return '<button type="button" data-n="' + i + '" aria-label="' + i + ' estrelas">★</button>'; }).join('') + '</div>' +
      '<label>O que você mais gostou?</label><div class="chips-linha">' + ['Som', 'Conforto', 'Bateria', 'Custo-benefício'].map(function (c) { return '<button type="button" class="chip" aria-pressed="false" data-chip>' + c + '</button>'; }).join('') + '</div><label for="tit">Título da avaliação</label><input id="tit" type="text" placeholder="Resuma em poucas palavras"><label for="txt">Sua avaliação</label><textarea id="txt" maxlength="500" placeholder="Conte como foi sua experiência com o produto."></textarea><label>Fotos do produto (opcional)</label><input type="file" accept="image/jpeg,image/png"><small>JPG ou PNG, até 5 MB.</small>' +
      '<div style="margin-top:16px;display:flex;gap:16px;align-items:center"><button class="btn" type="submit">Enviar avaliação</button><a class="link-sublinhado" href="' + U('paginas/produto.html?id=' + id) + '">Cancelar</a></div></form>' +
      '<div class="painel">' + caixa(p) + '<h2>' + p.nome + '</h2><div class="aviso">Compra verificada</div></div></div></div>';
  };
  R.enviada = function () {
    return '<div class="container">' + crumbs('Avaliação enviada') + '<div class="check">✓</div><h1>Obrigado pela avaliação</h1><p>Sua avaliação será publicada em breve e vai ajudar outras pessoas.</p><div style="display:flex;gap:10px;margin-top:16px"><a class="btn" href="' + U('paginas/produto.html?id=' + id) + '">Voltar ao produto</a><a class="btn btn--contorno" href="' + U('index.html') + '">Continuar comprando</a></div>' + sugestoes('Você também pode gostar') + '</div>';
  };
  R.adicionado = function () {
    return '<div class="container"><nav class="crumbs"><a href="' + U('index.html') + '">Início</a> › <a href="' + U('paginas/carrinho.html') + '">Carrinho</a> › Item adicionado</nav><div style="display:flex;gap:12px;align-items:center"><div class="check" style="margin:0">✓</div><div><h1 style="margin:0">Adicionado ao carrinho</h1><small>O item foi reservado e aguarda você finalizar seu pedido.</small></div></div>' +
      '<div class="duas" style="margin-top:20px"><div class="painel" style="flex-direction:row;gap:16px;align-items:center"><div style="width:90px">' + caixa(p) + '</div><div><b>' + p.nome + '</b><br><small>Cor: Preto · 1 un.</small><div class="preco-grande" style="font-size:18px">' + M(p.preco) + '</div></div></div>' +
      '<div class="painel" style="background:var(--lilas)"><b>Seu carrinho</b><div style="display:flex;justify-content:space-between">Subtotal <b>' + M(p.preco) + '</b></div><a class="btn" href="' + U('paginas/carrinho.html') + '">Ir para o carrinho</a><a class="btn btn--contorno" href="' + U('index.html') + '">Continuar comprando</a></div></div>' + sugestoes('Aproveite e leve também') + '</div>';
  };
  R.comparar = function () {
    var ids = (qs.get('ids') || 'fone-sem-fio,fone-cancelamento,fone-esportivo').split(','), l = ids.map(UNOA.produto).filter(Boolean);
    var linha = function (t, f) { return '<tr><th>' + t + '</th>' + l.map(function (x) { return '<td>' + f(x) + '</td>'; }).join('') + '</tr>'; };
    return '<div class="container"><nav class="crumbs"><a href="' + U('index.html') + '">Início</a> › Comparar produtos</nav><h1>Comparar produtos</h1><p>Veja as diferenças lado a lado e escolha com segurança.</p><div class="comp" style="margin-top:16px"><table class="tabela">' +
      linha('Produto', function (x) { return caixa(x, 'card__img') + '<b>' + x.nome + '</b>'; }) + linha('Preço', function (x) { return '<b>' + M(x.preco) + '</b>'; }) + linha('Avaliação', function (x) { return '★ ' + String(x.nota).replace('.', ',') + ' (' + x.avaliacoes + ')'; }) +
      linha('Entrega', function () { return 'Até ' + dataEm(9); }) + linha('Frete', function () { return 'R$ 12,90'; }) + linha('Total com frete', function (x) { return '<b>' + M(x.preco + 12.9) + '</b>'; }) + linha('', function (x) { return '<a class="btn" href="' + U('paginas/produto.html?id=' + x.id) + '">Ver produto</a>'; }) + '</table></div><div class="painel" style="margin-top:20px"><h2>O que muda entre eles?</h2><p>Compare preço, entrega e avaliações para escolher o que combina com você. Cada modelo tem pontos fortes específicos.</p><small>Custo final real · Prazos confiáveis · Opiniões de clientes</small></div></div>';
  };

  raiz.innerHTML = R[modo]();
  document.title = p.nome + ' — UNOA';
  var $ = function (s) { return document.getElementById(s); };
  var add = $('add'); if (add) add.onclick = function () { UNOA.estado.adicionar(id, Number(($('qtd') || {}).textContent) || 1, ($('cor-nome') || {}).textContent); location.href = U('paginas/adicionado-carrinho.html?id=' + id); };
  if ($('mais')) { $('mais').onclick = function () { $('qtd').textContent = Math.min(10, +$('qtd').textContent + 1); }; $('menos').onclick = function () { $('qtd').textContent = Math.max(1, +$('qtd').textContent - 1); }; }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cor]'); if (!b || !$('cor-nome')) return; var n = b.dataset.cor;
    document.querySelectorAll('[data-cor]').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.cor === n); if (x.closest('.prod__thumbs')) x.setAttribute('aria-current', x.dataset.cor === n); });
    $('cor-nome').textContent = n; var src = UNOA.imgCor(p, n); document.querySelectorAll('[data-cor-img]').forEach(function (im) { im.setAttribute('src', src); });
  });
  if ($('calc')) $('calc').onclick = function () { $('frete').textContent = 'Chega até ' + dataEm(9) + ' · R$ 12,90 (CEP ' + $('cep').value + ')'; };
  if ($('est')) { var nota = 0; $('est').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; nota = +b.dataset.n; $('est').querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', +x.dataset.n <= nota); }); }; $('form-av').onsubmit = function (e) { e.preventDefault(); if (!nota) return UNOA.toast('Escolha uma nota de 1 a 5'); var l = JSON.parse(localStorage.getItem('unoa.avaliacoes') || '[]'); l.unshift({ id: id, nota: nota, titulo: $('tit').value.trim() || 'Sem título', texto: $('txt').value.trim(), autor: 'Você' }); try { localStorage.setItem('unoa.avaliacoes', JSON.stringify(l)); } catch (x) {} location.href = U('paginas/avaliacao-enviada.html?id=' + id); }; }
  if ($('comprar')) $('comprar').onclick = function () { UNOA.estado.adicionar(id, Number($('qtd').textContent) || 1, $('cor-nome').textContent); location.href = U('paginas/carrinho.html'); };
  if ($('lista-av')) {
    var filtro = 0, pinta = function () { var l = todasAvs().filter(function (a) { return !filtro || a[3] === filtro; }); $('lista-av').innerHTML = l.length ? l.map(cardAv).join('') : '<p>Nenhuma avaliação com esse filtro.</p>'; };
    pinta();
    $('filtro-av').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; filtro = +b.dataset.n; this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); pinta(); };
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-util]'); if (b) { b.textContent = 'Obrigado pelo feedback ✓'; b.disabled = true; } });
  document.querySelectorAll('[data-chip]').forEach(function (b) { b.onclick = function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); }; });
});