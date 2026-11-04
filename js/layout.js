/* UNOA - cabeçalho, mega menu, dropdown da conta e rodapé (injetados em #cabecalho e #rodape) */
(function () {
  var u = UNOA.url, I = UNOA.icone;
  var nav = [['Tecnologia', 'categoria.html?c=tecnologia', true], ['Casa e Organização', 'categoria.html?c=casa'], ['Moda e Acessórios', 'categoria.html?c=moda'],
    ['Beleza e Cuidados', 'categoria.html?c=beleza'], ['Hobbies e Lazer', 'categoria.html?c=hobbies'], ['Ofertas da semana', 'ofertas.html']];
  function cabecalho() {
    var itens = nav.map(function (n) {
      return '<li class="nav__item">' + (n[2] ? '<button type="button" aria-expanded="false" aria-controls="mega">' + n[0] + '</button>' : '<a href="' + u('paginas/' + n[1]) + '">' + n[0] + '</a>') + '</li>';
    }).join('');
    var pop = ['fone-sem-fio', 'carregador-portatil', 'mouse-sem-fio'].map(function (id) {
      var p = UNOA.produto(id);
      return '<a class="mega__pop" href="' + u('paginas/produto.html?id=' + id) + '"><span class="img-caixa"><img src="' + UNOA.img.apply(null, p.imagem.split('.')) + '" alt="' + p.nome + '"></span>' + p.nome + '</a>';
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
      '<div class="mega" id="mega"><div class="container mega__grade">' +
        '<div><h3>Tecnologia</h3><ul class="mega__links"><li><a href="' + u('paginas/categoria.html?c=tecnologia') + '">Fones de ouvido</a></li><li><a href="' + u('paginas/categoria.html?c=tecnologia') + '">Carregadores</a></li><li><a href="' + u('paginas/categoria.html?c=tecnologia') + '">Acessórios para celular</a></li><li><a href="' + u('paginas/categoria.html?c=tecnologia') + '">Periféricos</a></li></ul><a class="link-sublinhado" href="' + u('paginas/categoria.html?c=tecnologia') + '">Ver tudo em Tecnologia</a></div>' +
        '<div><div class="mega__rotulo">Mais procurados</div>' + pop + '</div>' +
        '<div class="mega__destaque"><div><h3>Fones e acessórios</h3><p>Tecnologia com frete e prazo claros.</p><a class="btn" href="' + u('paginas/busca.html?q=fone') + '">Ver fones</a></div><div class="img-caixa"><img src="' + UNOA.img('banners', 'menu-tecnologia') + '" alt="Fone de ouvido em destaque"></div></div>' +
      '</div></div>' +
      '<div class="dropdown" id="dd-conta"><div class="dropdown__titulo">Olá! Entre ou crie sua conta</div><p>Acompanhe pedidos e salve favoritos.</p>' +
        '<a class="btn btn--bloco" href="' + u('paginas/entrar.html') + '">Entrar</a><a class="btn btn--contorno btn--bloco" href="' + u('paginas/criar-conta.html') + '">Criar conta</a>' +
        '<div class="dropdown__menu"><a href="' + u('paginas/acesse-conta.html') + '">' + I('usuario') + 'Minha conta</a><a href="' + u('paginas/meus-pedidos.html') + '">' + I('pedido') + 'Meus pedidos</a><a href="' + u('paginas/favoritos.html') + '">' + I('coracao') + 'Favoritos</a><a href="' + u('paginas/enderecos.html') + '">' + I('local') + 'Endereços</a><a href="#">' + I('ajuda') + 'Ajuda</a></div>' +
        '<div class="dropdown__cupom"><b>Cupom ' + UNOA.cupom.codigo + '</b><br>' + UNOA.cupom.descricao + '.</div></div>' +
    '</header>';
  }
  function rodape() {
    var col = function (t, l) { return '<div><h4>' + t + '</h4><ul>' + l.map(function (x) { return '<li><a href="' + u('paginas/' + x[1]) + '">' + x[0] + '</a></li>'; }).join('') + '</ul></div>'; };
    return '<footer class="rodape"><div class="container"><div class="rodape__grade">' +
      '<div><div class="logo">UNOA</div><p>Muita variedade, zero complicação.</p></div>' +
      col('Categorias', [['Tecnologia', 'categoria.html?c=tecnologia'], ['Casa e Organização', 'categoria.html?c=casa'], ['Moda e Acessórios', 'categoria.html?c=moda'], ['Beleza e Cuidados', 'categoria.html?c=beleza'], ['Hobbies e Lazer', 'categoria.html?c=hobbies']]) +
      col('Ajuda', [['Entrega e prazos', '#'], ['Trocas e devoluções', '#'], ['Pagamento', '#']]) +
      col('Conta', [['Meus pedidos', 'meus-pedidos.html'], ['Favoritos', 'favoritos.html'], ['Entrar', 'entrar.html']]) +
      '</div><div class="rodape__base"><div class="rodape__pag"><span>Pix</span><span>Cartão</span><span>Boleto</span></div><span>UNOA é um projeto acadêmico fictício.</span></div></div></footer>';
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
    if (c) c.innerHTML = cabecalho(); if (r) r.innerHTML = rodape();
    var m = document.querySelector('.nav__item button'); if (m) m.addEventListener('click', function () { alternar(m, document.getElementById('mega')); });
    var a = document.getElementById('btn-conta'); if (a) a.addEventListener('click', function () { alternar(a, document.getElementById('dd-conta')); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.header')) fechar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
    UNOA.atualizarContadores();
  });
})();