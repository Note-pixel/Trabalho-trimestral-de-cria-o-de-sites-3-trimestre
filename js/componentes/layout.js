/* UNOA - cabeçalho, mega menu, dropdown da conta e rodapé (injetados em #cabecalho e #rodape) */
(function () {
  var u = UNOA.url, I = UNOA.icone;
  var nav = [['Tecnologia', 'categoria.html?c=tecnologia', 'tecnologia'], ['Casa e Organização', 'categoria.html?c=casa', 'casa'], ['Moda e Acessórios', 'categoria.html?c=moda', 'moda'],
    ['Beleza e Cuidados', 'categoria.html?c=beleza', 'beleza'], ['Hobbies e Lazer', 'categoria.html?c=hobbies', 'hobbies'], ['Ofertas da semana', 'ofertas.html']];
  function imgProduto(p) { return UNOA.img.apply(null, p.imagem.split('.')); }
  function cabecalho() {
    var itens = nav.map(function (n) {
      return '<li class="nav__item">' + (n[2] ? '<button type="button" data-mega="' + n[2] + '" aria-expanded="false" aria-controls="mega">' + n[0] + '</button>' : '<a href="' + u('paginas/' + n[1]) + '">' + n[0] + '</a>') + '</li>';
    }).join('');
    return '<div class="faixa-topo">Frete e prazo claros antes de pagar</div>' +
    '<header class="header"><div class="container header__linha">' +
      '<a class="logo" href="' + u('index.html') + '" aria-label="UNOA início">UNOA</a>' +
      '<form class="busca-topo" role="search" action="' + u('paginas/busca.html') + '">' + I('busca', 'width="16" height="16"') + '<input name="q" type="search" placeholder="O que você procura hoje?" aria-label="Buscar"></form>' +
      '<div class="acoes">' +
        '<a class="acao" href="' + u('paginas/favoritos.html') + '">' + I('coracao') + '<span>Favoritos</span></a>' +
        '<button class="acao" type="button" id="btn-conta" aria-expanded="false" aria-controls="dd-conta">' + I('usuario') + '<span>Conta</span></button>' +
        '<a class="acao" href="' + u('paginas/carrinho.html') + '">' + I('sacola') + '<i class="acao__badge" id="badge-carrinho" hidden>0</i><span>Carrinho</span></a>' +
      '</div></div>' +
      '<nav class="nav" aria-label="Categorias"><div class="container nav__linha"><ul class="nav__lista">' + itens + '</ul>' +
        '<a class="nav__presentes" href="' + u('paginas/presentes.html') + '">' + I('presente') + 'Presentes</a></div></nav>' +
      '<div class="mega" id="mega"></div>' +
      '<div class="dropdown" id="dd-conta"><div class="dropdown__titulo">Olá! Entre ou crie sua conta</div><p>Acompanhe pedidos e salve favoritos.</p>' +
        '<a class="btn btn--bloco" href="' + u('paginas/entrar.html') + '">Entrar</a><a class="btn btn--contorno btn--bloco" href="' + u('paginas/criar-conta.html') + '">Criar conta</a>' +
        '<div class="dropdown__menu"><a href="' + u('paginas/acesse-conta.html') + '">' + I('usuario') + 'Minha conta</a><a href="' + u('paginas/meus-pedidos.html') + '">' + I('pedido') + 'Meus pedidos</a><a href="' + u('paginas/favoritos.html') + '">' + I('coracao') + 'Favoritos</a><a href="' + u('paginas/enderecos.html') + '">' + I('local') + 'Endereços</a><a href="' + u('paginas/ajuda.html') + '">' + I('ajuda') + 'Ajuda</a></div>' +
        '<div class="dropdown__cupom"><b>Cupom ' + UNOA.cupom.codigo + '</b><br>' + UNOA.cupom.descricao + '.</div></div>' +
    '</header>';
  }
  function rodape() {
    var col = function (t, l) { return '<div><h4>' + t + '</h4><ul>' + l.map(function (x) { return '<li><a href="' + u('paginas/' + x[1]) + '">' + x[0] + '</a></li>'; }).join('') + '</ul></div>'; };
    return '<footer class="rodape"><div class="container"><div class="rodape__grade">' +
      '<div><div class="logo">UNOA</div><p>Muita variedade, zero complicação.</p></div>' +
      col('Categorias', [['Tecnologia', 'categoria.html?c=tecnologia'], ['Casa e Organização', 'categoria.html?c=casa'], ['Moda e Acessórios', 'categoria.html?c=moda'], ['Beleza e Cuidados', 'categoria.html?c=beleza'], ['Hobbies e Lazer', 'categoria.html?c=hobbies']]) +
      col('Ajuda', [['Entrega e prazos', 'ajuda.html#entrega'], ['Trocas e devoluções', 'ajuda.html#trocas'], ['Pagamento', 'ajuda.html#pagamento']]) +
      col('Conta', [['Meus pedidos', 'meus-pedidos.html'], ['Favoritos', 'favoritos.html'], ['Entrar', 'entrar.html']]) +
      '</div><div class="rodape__base"><div class="rodape__pag"><span>Pix</span><span>Cartão</span><span>Boleto</span></div><span>UNOA é um projeto acadêmico fictício.</span></div></div></footer>';
  }
  var destaques = { tecnologia: 'Fones e acessórios', casa: 'Organize cada cantinho', moda: 'Acessórios do dia a dia', beleza: 'Cuidados essenciais', hobbies: 'Tempo para você' };
  function megaHtml(id) {
    var c = UNOA.categorias.find(function (x) { return x.id === id; }), subs = UNOA.subcategorias[id] || [];
    var pops = UNOA.produtos.filter(function (p) { return p.categoria === id; }).slice(0, 3).map(function (p) {
      return '<a class="mega__pop" href="' + u('paginas/produto.html?id=' + p.id) + '"><span class="img-caixa"><img src="' + imgProduto(p) + '" alt="' + p.nome + '"></span>' + p.nome + '</a>';
    }).join('');
    return '<div class="container mega__grade"><div><h3>' + c.nome + '</h3><ul class="mega__links">' + subs.map(function (s) { return '<li><a href="' + u('paginas/busca.html?q=' + encodeURIComponent(s[1])) + '">' + s[0] + '</a></li>'; }).join('') + '</ul><a class="link-sublinhado" href="' + u('paginas/categoria.html?c=' + id) + '">Ver tudo em ' + c.nome + '</a></div>' +
      '<div><div class="mega__rotulo">Mais procurados</div>' + pops + '</div><div class="mega__destaque"><div><h3>' + destaques[id] + '</h3><p>Com frete e prazo claros.</p><a class="btn" href="' + u('paginas/categoria.html?c=' + id) + '">Ver categoria</a></div><div class="img-caixa"><img src="' + UNOA.img('banners', 'menu-' + id) + '" alt="' + c.nome + ' em destaque"></div></div></div>';
  }
  function cabecalhoCheckout() {
    return '<div class="faixa-topo">Frete e prazo claros antes de pagar</div><header class="header"><div class="container header__linha" style="justify-content:space-between"><a class="logo" href="' + u('index.html') + '">UNOA</a><div class="topo-seguro">' + I('escudo', 'width="14" height="14"') + ' Compra segura <a href="' + u('paginas/ajuda.html') + '">Ajuda</a></div></div></header>';
  }
  function rodapeCheckout() {
    return '<footer class="rodape-min container"><span><a href="' + u('paginas/ajuda.html#termos') + '">Termos de uso</a> · <a href="' + u('paginas/ajuda.html#privacidade') + '">Política de privacidade</a> · <a href="' + u('paginas/ajuda.html') + '">Ajuda</a></span><span>UNOA é um projeto acadêmico fictício.</span></footer>';
  }
  function aplicarSessao() {
    var logada = false, usr = {};
    try { logada = JSON.parse(localStorage.getItem('unoa.sessao')); usr = JSON.parse(localStorage.getItem('unoa.usuario')) || {}; } catch (e) {}
    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-sair]')) return;
      e.preventDefault();
      try { localStorage.setItem('unoa.sessao', 'false'); } catch (x) {}
      location.href = u('index.html');
    });
    var b = document.getElementById('btn-conta'), d = document.getElementById('dd-conta');
    if (!logada || !usr.nome || !b || !d) return;
    var primeiro = usr.nome.trim().split(' ')[0];
    b.querySelector('span').textContent = primeiro;
    b.querySelector('svg').outerHTML = '<i class="avatar">' + primeiro.charAt(0).toUpperCase() + '</i>';
    d.innerHTML = '<div class="dropdown__titulo">Olá, ' + primeiro + '!</div><p>' + usr.email + '</p><div class="dropdown__menu"><a href="' + u('paginas/minha-conta.html') + '">' + I('usuario') + 'Minha conta</a><a href="' + u('paginas/meus-pedidos.html') + '">' + I('pedido') + 'Meus pedidos</a><a href="' + u('paginas/favoritos.html') + '">' + I('coracao') + 'Favoritos</a><a href="' + u('paginas/enderecos.html') + '">' + I('local') + 'Endereços</a><a href="' + u('paginas/ajuda.html') + '">' + I('ajuda') + 'Ajuda</a><a href="#" data-sair>' + I('seta') + 'Sair da conta</a></div><div class="dropdown__cupom"><b>Cupom ' + UNOA.cupom.codigo + '</b><br>' + UNOA.cupom.descricao + '.</div>';
  }
  UNOA.atualizarContadores = function () {
    var b = document.getElementById('badge-carrinho'); if (!b) return;
    var n = UNOA.estado.totalItens(); b.textContent = n; b.hidden = n === 0;
  };
  UNOA.toast = function (msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200);
  };
  function fechar() {
    document.querySelectorAll('.mega,.dropdown').forEach(function (e) { e.classList.remove('aberto'); });
    document.querySelectorAll('[aria-expanded="true"]').forEach(function (e) { e.setAttribute('aria-expanded', 'false'); });
  }
  function alternar(btn, alvo) {
    var abrir = !alvo.classList.contains('aberto'); fechar();
    if (abrir) { alvo.classList.add('aberto'); btn.setAttribute('aria-expanded', 'true'); }
  }
  document.addEventListener('DOMContentLoaded', function () {
    var c = document.getElementById('cabecalho'), r = document.getElementById('rodape');
    var ck = document.body.hasAttribute('data-checkout');
    if (c) c.innerHTML = ck ? cabecalhoCheckout() : cabecalho();
    if (r) r.innerHTML = ck ? rodapeCheckout() : rodape();
    document.querySelectorAll('[data-mega]').forEach(function (m) {
      m.addEventListener('click', function () {
        var mg = document.getElementById('mega'), aberto = m.getAttribute('aria-expanded') === 'true'; fechar(); if (aberto) return;
        mg.innerHTML = megaHtml(m.dataset.mega); mg.classList.add('aberto'); m.setAttribute('aria-expanded', 'true');
      });
    });
    var a = document.getElementById('btn-conta');
    if (a) a.addEventListener('click', function () { alternar(a, document.getElementById('dd-conta')); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.header')) fechar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
    UNOA.atualizarContadores(); aplicarSessao();
  });
})();
