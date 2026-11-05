/* UNOA - menu lateral das páginas de conta. Uso: UNOA.lateralConta('pedidos') */
UNOA.lateralConta = function (atual) {
  var u = {};
  try { u = JSON.parse(localStorage.getItem('unoa.usuario')) || {}; } catch (e) {}
  var nome = u.nome || 'Visitante', email = u.email || 'Entre para ver seus dados';
  var itens = [
    ['minha', 'Minha conta', 'minha-conta.html', 'usuario'],
    ['pedidos', 'Meus pedidos', 'meus-pedidos.html', 'pedido'],
    ['favoritos', 'Favoritos', 'favoritos.html', 'coracao'],
    ['enderecos', 'Endereços', 'enderecos.html', 'local'],
    ['ajuda', 'Ajuda', 'ajuda.html', 'ajuda']
  ];
  return '<aside class="lateral" aria-label="Menu da conta">' +
    '<div class="lateral__user"><i class="avatar">' + nome.charAt(0).toUpperCase() + '</i><div><b>' + nome + '</b><small>' + email + '</small></div></div>' +
    itens.map(function (i) {
      return '<a href="' + UNOA.url('paginas/' + i[2]) + '"' + (i[0] === atual ? ' aria-current="page"' : '') + '>' + UNOA.icone(i[3], 'width="15" height="15"') + ' ' + i[1] + '</a>';
    }).join('') +
    '<a href="#" data-sair>' + UNOA.icone('seta', 'width="15" height="15"') + ' Sair da conta</a></aside>';
};
