/* UNOA - conta: acesse sua conta, minha conta, endereços (modo em <body data-modo>) */
document.addEventListener('DOMContentLoaded', function () {
  var modo = document.body.dataset.modo, qs = new URLSearchParams(location.search), U = UNOA.url, raiz = document.getElementById('pg'), ck = qs.get('checkout') === '1';
  var $ = function (s) { return document.getElementById(s); };
  var L = function (k, d) { try { var v = JSON.parse(localStorage.getItem('unoa.' + k)); return v == null ? d : v; } catch (e) { return d; } };
  var S = function (k, v) { try { localStorage.setItem('unoa.' + k, JSON.stringify(v)); } catch (e) {} };
  var crumbs = function (t) { return '<nav class="crumbs"><a href="' + U('index.html') + '">Início</a> › ' + t + '</nav>'; };
  var sufixo = ck ? '?checkout=1' : '';
  var R = {}, depois = {};

  R.acesse = function () {
    return '<div class="container">' + crumbs('Minha conta') + '<h1>Acesse sua conta</h1><p>Acompanhe pedidos, salve favoritos e compre mais rápido.</p><div class="duas-colunas">' +
      '<form class="painel" id="f" novalidate><h2>Já tenho conta</h2><small>Entre com seu e-mail e senha.</small><small>Demonstração: demo@unoa.com / unoa1234</small><div id="msg"></div>' +
      '<div class="campo"><label for="em">E-mail</label><input id="em" type="email" placeholder="seu.email@exemplo.com.br"><span class="erro" id="e-em"></span></div>' +
      '<div class="campo"><label for="sn">Senha</label><input id="sn" type="password" placeholder="Sua senha"><span class="erro" id="e-sn"></span></div>' +
      '<a class="link-sublinhado" href="' + U('paginas/esqueci-senha.html') + '">Esqueceu a senha?</a><label style="font-size:12px"><input type="checkbox" checked> Permanecer conectado neste navegador</label><button class="btn" type="submit">Entrar</button></form>' +
      '<div class="painel" style="background:var(--lilas)"><h2>Sou novo na UNOA</h2><ul class="lista-check"><li>✓ Acompanhe seus pedidos em um só lugar</li><li>✓ Salve favoritos para comparar depois</li><li>✓ Finalize compras com o endereço já salvo</li></ul><div class="aviso" style="background:#fff">Cupom <b>' + UNOA.cupom.codigo + '</b>: ' + UNOA.cupom.descricao + '.</div><a class="btn btn--contorno" style="background:#fff" href="' + U('paginas/criar-conta.html') + '">Criar conta</a></div></div>' +
      '<p style="text-align:center;margin:20px 0"><a class="link-sublinhado" href="' + U('index.html') + '">Continuar comprando sem conta →</a></p></div>';
  };
  depois.acesse = function () {
    $('f').onsubmit = function (e) {
      e.preventDefault(); var em = $('em').value.trim(), sn = $('sn').value, u = L('usuario', null);
      $('e-em').textContent = /^\S+@\S+\.\S+$/.test(em) ? '' : 'Digite um e-mail válido.'; $('e-sn').textContent = sn ? '' : 'Digite sua senha.';
      if ($('e-em').textContent || $('e-sn').textContent) return;
      if (em === 'demo@unoa.com' && sn === 'unoa1234') { u = { nome: 'Mariana Costa', email: em, senha: sn }; S('usuario', u); }
      if (!u || u.email !== em || u.senha !== sn) { $('msg').innerHTML = '<div class="msg-erro" role="alert">E-mail ou senha incorretos. Se ainda não tem conta, crie uma ao lado.</div>'; return; }
      S('sessao', true); location.href = U('paginas/minha-conta.html');
    };
  };

  R.minha = function () {
    var u = L('usuario', null);
    if (!L('sessao', false) || !u) return '<div class="container">' + crumbs('Minha conta') + '<div class="painel" style="align-items:flex-start;margin-top:16px"><h1>Acesse sua conta</h1><p>Entre para ver seus dados, pedidos e favoritos.</p><a class="btn" href="' + U('paginas/acesse-conta.html') + '">Entrar</a></div></div>';
    var card = function (t, n, h) { return '<a class="painel" href="' + U('paginas/' + h) + '"><small>' + t + '</small><b style="font-size:24px">' + n + '</b></a>'; };
    return '<div class="container">' + crumbs('Minha conta') + '<div class="com-lateral">' + UNOA.lateralConta('minha') + '<div><h1>Olá, ' + u.nome.split(' ')[0] + '!</h1><div class="duas-colunas" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">' +
      card('Pedidos', L('pedidos', []).length, 'meus-pedidos.html') + card('Favoritos', UNOA.estado.favoritos().length, 'favoritos.html') + card('Endereços', L('enderecos', []).length, 'enderecos.html') + '</div>' +
      '<div class="painel" style="margin-top:16px"><h2>Meus dados</h2><div><small>Nome</small><br><b>' + u.nome + '</b></div><div><small>E-mail</small><br><b>' + u.email + '</b></div></div>' +
      '<div class="aviso" style="margin-top:16px">Cupom <b>' + UNOA.cupom.codigo + '</b>: ' + UNOA.cupom.descricao + '.</div></div></div></div>';
  };

  R.enderecos = function () {
    var l = L('enderecos', []);
    return '<div class="container">' + crumbs('Endereços') + '<div class="painel" style="max-width:720px;margin:16px auto"><small>' + (ck ? 'LOCAL DE ENTREGA' : 'MINHA CONTA') + '</small><h1>' + (ck ? 'Escolha onde receber' : 'Meus endereços') + '</h1><small>Selecione um endereço salvo ou adicione um novo.</small>' +
      (l.length ? l.map(function (e, i) {
        return '<label class="opcao">' + (ck ? '<input type="radio" name="end" value="' + i + '"' + (i === 0 ? ' checked' : '') + '>' : '') + '<span><b>' + e.nome + '</b> <span class="selo">' + e.tipo + (e.principal ? ' · Principal' : '') + '</span><small>' + e.rua + ', ' + e.num + (e.comp ? ', ' + e.comp : '') + '<br>' + e.cidade + ', ' + e.uf + ' · ' + e.cep + '</small></span><a class="link-sublinhado" href="' + U('paginas/endereco-form.html?id=' + i + (ck ? '&checkout=1' : '')) + '">Editar</a></label>';
      }).join('') : '<div class="aviso">Você ainda não tem endereços salvos.</div>') +
      '<a class="btn btn--contorno" href="' + U('paginas/endereco-form.html' + sufixo) + '">+ Adicionar novo endereço</a>' +
      (ck && l.length ? '<button class="btn" id="usar" type="button">Usar este endereço →</button>' : '') +
      '<a class="link-sublinhado" href="' + U(ck ? 'paginas/entrega.html' : 'paginas/minha-conta.html') + '">Voltar</a></div></div>';
  };
  depois.enderecos = function () {
    var b = $('usar'); if (!b) return;
    b.onclick = function () {
      var e = L('enderecos', [])[+document.querySelector('[name=end]:checked').value], c = L('checkout', {});
      c.entrega = { nome: e.nome, cep: e.cep, rua: e.rua, num: e.num, comp: e.comp, cidade: e.cidade, uf: e.uf, tipo: (c.entrega || {}).tipo || 'padrao' };
      S('checkout', c); location.href = U('paginas/entrega.html');
    };
  };

  R.endereco = function () {
    var i = qs.get('id'), e = (i !== null ? L('enderecos', [])[+i] : null) || {}, edit = i !== null && !!e.rua;
    var c = function (id, rot, v, ph) { return '<div class="campo"><label for="' + id + '">' + rot + '</label><input id="' + id + '" value="' + (v || '') + '" placeholder="' + (ph || '') + '"><span class="erro" id="e-' + id + '"></span></div>'; };
    return '<div class="container">' + crumbs(edit ? 'Alterar endereço' : 'Adicionar endereço') + '<form class="painel" id="f" novalidate style="max-width:640px;margin:16px auto"><a class="link-sublinhado" href="' + U('paginas/enderecos.html' + sufixo) + '">‹ Voltar aos endereços</a>' +
      '<h1>' + (edit ? 'Alterar endereço' : 'Adicionar endereço') + '</h1><small>' + (edit ? 'Atualize os dados de entrega.' : 'Preencha os dados de entrega.') + '</small>' +
      c('nome', 'Nome de quem recebe', e.nome, 'Nome completo') + '<div class="campo"><label for="cep">CEP <a class="link-sublinhado" style="float:right" href="https://buscacepinter.correios.com.br" target="_blank" rel="noopener">Não sei meu CEP</a></label><input id="cep" value="' + (e.cep || '') + '" placeholder="00000-000" maxlength="9"><span class="erro" id="e-cep"></span></div>' +
      c('rua', 'Rua', e.rua, 'Nome da rua') + '<div class="grid2">' + c('num', 'Número', e.num, 'Ex.: 245') + c('comp', 'Complemento (opcional)', e.comp, 'Apto, bloco, sala') + c('cidade', 'Cidade', e.cidade) + c('uf', 'Estado', e.uf, 'UF') + '</div>' +
      c('ref', 'Referência (opcional)', e.ref, 'Ponto de referência para o entregador') + c('tel', 'Telefone de contato', e.tel, '(00) 00000-0000') +
      '<div class="campo"><label>Nome do endereço</label><div class="chips-linha" id="tipos">' + ['Casa', 'Trabalho', 'Outro'].map(function (t) { return '<button type="button" class="chip" data-t="' + t + '" aria-pressed="' + ((e.tipo || 'Casa') === t) + '">' + t + '</button>'; }).join('') + '</div></div>' +
      '<label style="font-size:12px"><input type="checkbox" id="pr"' + (e.principal || (!edit && !L('enderecos', []).length) ? ' checked' : '') + '> Definir como endereço principal</label>' +
      '<div style="display:flex;gap:16px;align-items:center"><button class="btn" type="submit">' + (edit ? 'Salvar alterações' : 'Salvar endereço') + '</button><a class="link-sublinhado" href="' + U('paginas/enderecos.html' + sufixo) + '">Cancelar</a></div>' +
      (edit ? '<button type="button" class="link-sublinhado" id="excluir" style="background:none;border:0;text-align:left;padding:0">Excluir endereço</button>' : '') + '<small>Seus dados estão protegidos.</small></form></div>';
  };
  depois.endereco = function () {
    var id = qs.get('id'), tipo = (id !== null && (L('enderecos', [])[+id] || {}).tipo) || 'Casa';
    $('tipos').onclick = function (ev) { var b = ev.target.closest('button'); if (!b) return; tipo = b.dataset.t; this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); };
    var cep = function () {
      var v = $('cep').value.trim(), d = v.replace('-', ''), m = '';
      if (!v) m = 'Informe o CEP.'; else if (!/^\d{8}$/.test(d)) m = 'CEP inválido. Digite 8 números.'; else if (d === '99999999') m = 'Não encontramos esse CEP. Confira os números ou preencha o endereço manualmente.';
      $('e-cep').textContent = m; $('cep').setAttribute('aria-invalid', !!m);
      if (!m && d === '90010000') { if (!$('rua').value) $('rua').value = 'Rua das Flores'; if (!$('cidade').value) $('cidade').value = 'Porto Alegre'; if (!$('uf').value) $('uf').value = 'RS'; }
      return !m;
    };
    $('cep').oninput = function () { var d = this.value.replace(/\D/g, '').slice(0, 8); this.value = d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d; };
    $('cep').onblur = cep;
    if ($('excluir')) $('excluir').onclick = function () { var l = L('enderecos', []); l.splice(+id, 1); S('enderecos', l); location.href = U('paginas/enderecos.html' + sufixo); };
    $('f').onsubmit = function (ev) {
      ev.preventDefault(); var ok = cep();
      ['nome', 'rua', 'num', 'cidade', 'uf'].forEach(function (k) { var m = $(k).value.trim() ? '' : 'Campo obrigatório.'; $('e-' + k).textContent = m; $(k).setAttribute('aria-invalid', !!m); if (m) ok = false; });
      if (!ok) return;
      var n = { nome: $('nome').value.trim(), cep: $('cep').value, rua: $('rua').value.trim(), num: $('num').value.trim(), comp: $('comp').value.trim(), cidade: $('cidade').value.trim(), uf: $('uf').value.trim().toUpperCase(), ref: $('ref').value.trim(), tel: $('tel').value.trim(), tipo: tipo, principal: $('pr').checked };
      var l = L('enderecos', []); if (n.principal) l.forEach(function (x) { x.principal = false; });
      if (id !== null && l[+id]) l[+id] = n; else l.push(n);
      l.sort(function (a, b) { return (b.principal ? 1 : 0) - (a.principal ? 1 : 0); });
      S('enderecos', l); location.href = U('paginas/enderecos.html' + sufixo);
    };
  };
  raiz.innerHTML = R[modo](); if (depois[modo]) depois[modo]();
});
