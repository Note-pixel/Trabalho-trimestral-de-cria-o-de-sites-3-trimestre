/* UNOA - carrinho, favoritos, checkout, conta e pedidos (modo em <body data-modo>) */
document.addEventListener('DOMContentLoaded', function () {
  var modo = document.body.dataset.modo, qs = new URLSearchParams(location.search), U = UNOA.url, M = UNOA.moeda, raiz = document.getElementById('pg');
  var $ = function (s) { return document.getElementById(s); };
  var L = function (k, d) { try { var v = JSON.parse(localStorage.getItem('unoa.' + k)); return v == null ? d : v; } catch (e) { return d; } };
  var S = function (k, v) { try { localStorage.setItem('unoa.' + k, JSON.stringify(v)); } catch (e) {} UNOA.atualizarContadores(); };
  var dataEm = UNOA.dataEm;
  var itens = function () { return L('carrinho', []).map(function (i, k) { return { p: UNOA.produto(i.id), qtd: i.qtd, cor: i.cor, k: k }; }).filter(function (i) { return i.p; }); };
  var envio = function () { var e = (L('checkout', {}).entrega) || null; return e && e.tipo === 'expresso' ? { v: 24.9, d: 4, n: 'Expressa' } : { v: 12.9, d: 9, n: 'Padrão' }; };
  function totais() {
    var sub = itens().reduce(function (s, i) { return s + i.p.preco * i.qtd; }, 0), has = sub > 0;
    var c = has && L('cupom', 'on') === 'on' ? (UNOA.cupons[L('cupomCod', 'UNOA10')] || 0) : 0, f = has ? envio().v : 0;
    return { sub: sub, frete: f, cupom: c, total: Math.max(0, sub + f - c) };
  }
  function resumo(btn) {
    var t = totais();
    return '<aside class="resumo"><b>Resumo do pedido</b>' + itens().map(function (i) { return '<div class="lin"><span>' + i.p.nome + ' · ' + i.qtd + ' un.</span><span>' + M(i.p.preco * i.qtd) + '</span></div>'; }).join('') +
      '<div class="lin"><span>Subtotal</span><span>' + M(t.sub) + '</span></div><div class="lin"><span>Frete</span><span>' + M(t.frete) + '</span></div>' + (t.cupom ? '<div class="lin"><span>Cupom ' + L('cupomCod', 'UNOA10') + '</span><span>− ' + M(t.cupom) + '</span></div>' : '') +
      '<div class="lin total"><span>Total</span><span>' + M(t.total) + '</span></div><small>ou 3x de ' + M(t.total / 3) + ' sem juros</small>' + (btn || '') + '<small>Ambiente 100% seguro com criptografia SSL.</small></aside>';
  }
  var topo = function (t, extra) { return '<div class="container"><nav class="crumbs"><a href="' + U('index.html') + '">Início</a> › ' + t + '</nav>' + (extra || ''); };
  var passos = function (n) { return '<div class="passos">' + ['1. Entrega', '2. Pagamento', '3. Revisão'].map(function (s, i) { return i + 1 === n ? '<b>' + s + '</b>' : '<span>' + s + '</span>'; }).join(' › ') + '</div>'; };
  var vazio = function (msg, cta) { return '<div class="painel" style="align-items:flex-start"><h2>' + msg + '</h2><a class="btn" href="' + U(cta[1]) + '">' + cta[0] + '</a></div>'; };
  var sug = function (t) { var ids = itens().map(function (i) { return i.p.id; }); return '<div class="secao__topo" style="margin-top:40px"><h2 class="secao__titulo">' + t + '</h2></div><div class="grade-produtos">' + UNOA.produtos.filter(function (p) { return ids.indexOf(p.id) < 0; }).slice(0, 4).map(function (p) { return UNOA.cartaoProduto(p); }).join('') + '</div>'; };
  var semItens = function (t) { return topo(t, '<h1>' + t + '</h1>' + vazio('Seu carrinho está vazio', ['Explorar produtos', 'paginas/busca.html']) + '</div>'); };
  var R = {}, depois = {};

  R.carrinho = function () {
    var l = itens();
    if (!l.length) { return topo('Carrinho', '<h1>Seu carrinho</h1>' + vazio('Seu carrinho está vazio', ['Explorar categorias', 'paginas/busca.html']) + '<div class="aviso" style="margin-top:12px">Primeira compra? Use o cupom <b>UNOA10</b> e ganhe R$ 10 de desconto.</div>' + sug('Seus favoritos') + '</div>'); }
    return topo('Carrinho', '<h1>Seu carrinho <small>(' + UNOA.estado.totalItens() + ' itens)</small></h1><div class="duas"><div><div class="painel">' + l.map(function (i) {
      return '<div class="linha-item"><a class="img-caixa" href="' + U('paginas/produto.html?id=' + i.p.id) + '"><img src="' + UNOA.imgCor(i.p, i.cor) + '" alt="' + i.p.nome + '"></a><div><a href="' + U('paginas/produto.html?id=' + i.p.id) + '"><b>' + i.p.nome + '</b></a>' + (i.cor ? '<br><small>Cor: ' + i.cor + '</small>' : '') + '<div class="acoes-item"><div class="qtd"><button type="button" data-q="-1" data-k="' + i.k + '" aria-label="Diminuir">−</button><output>' + i.qtd + '</output><button type="button" data-q="1" data-k="' + i.k + '" aria-label="Aumentar">+</button></div><button type="button" data-rm="' + i.k + '">Remover</button><button type="button" data-fav="' + i.p.id + '" aria-pressed="' + (UNOA.estado.favoritos().indexOf(i.p.id) >= 0) + '">Salvar nos favoritos</button></div></div><b>' + M(i.p.preco * i.qtd) + '</b></div>';
    }).join('') + '</div><div class="painel" style="margin-top:12px;flex-direction:row;justify-content:space-between"><span>' + (L('cupom', 'on') === 'on' ? 'Cupom <b>' + L('cupomCod', 'UNOA10') + '</b> aplicado' : 'Cupom removido') + '</span><button class="link-sublinhado" id="cupom" type="button" style="background:none;border:0">' + (L('cupom', 'on') === 'on' ? 'Remover cupom' : 'Reaplicar ' + L('cupomCod', 'UNOA10')) + '</button></div><form class="painel" id="f-cupom" style="margin-top:12px;flex-direction:row"><input id="cod" placeholder="Tem um cupom? Digite o código" aria-label="Código do cupom" style="flex:1;height:40px;border:1px solid var(--borda);border-radius:var(--raio-sm);padding:0 12px"><button class="btn btn--contorno" type="submit">Aplicar</button></form><div class="painel" style="margin-top:12px;flex-direction:row;gap:6px;flex-wrap:wrap">Entrega para: <b>' + L('cep', '90010-000') + '</b> <button class="link-sublinhado" id="alt-cep" type="button" style="background:none;border:0">Alterar</button> · Chega até ' + dataEm(envio().d) + '</div></div>' +
      resumo('<a class="btn" href="' + U('paginas/entrega.html') + '">Ir para pagamento →</a><a class="link-sublinhado" href="' + U('index.html') + '">Continuar comprando</a>') + '</div>' + sug('Aproveite e leve também') + '</div>');
  };
  depois.carrinho = function () {
    raiz.onsubmit = function (e) {
      if (e.target.id !== 'f-cupom') return; e.preventDefault(); var cod = $('cod').value.trim().toUpperCase();
      if (UNOA.cupons[cod]) { S('cupomCod', cod); S('cupom', 'on'); render(); UNOA.toast('Cupom ' + cod + ' aplicado'); } else UNOA.toast('Cupom inválido. Tente UNOA10.');
    };
    raiz.onclick = function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var c = L('carrinho', []);
      if (b.dataset.q && c[+b.dataset.k]) { c[+b.dataset.k].qtd = Math.max(1, Math.min(10, c[+b.dataset.k].qtd + +b.dataset.q)); S('carrinho', c); render(); UNOA.toast('Quantidade atualizada'); }
      else if (b.dataset.rm !== undefined && c[+b.dataset.rm]) {
        var pos = +b.dataset.rm, rem = c.splice(pos, 1)[0]; S('carrinho', c); render();
        var t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.innerHTML = 'Item removido do carrinho. <button type="button" style="background:none;border:0;color:#fff;text-decoration:underline">Desfazer</button>'; document.body.appendChild(t);
        t.querySelector('button').onclick = function () { var c2 = L('carrinho', []); c2.splice(Math.min(pos, c2.length), 0, rem); S('carrinho', c2); t.remove(); render(); };
        setTimeout(function () { t.remove(); }, 6000);
      }
      else if (b.id === 'alt-cep') { var v = prompt('Digite seu CEP (8 números)'); if (v && /^[0-9]{5}-?[0-9]{3}$/.test(v.trim())) { S('cep', v.trim()); render(); } else if (v) UNOA.toast('CEP inválido'); }
      else if (b.id === 'cupom') { S('cupom', L('cupom', 'on') === 'on' ? 'off' : 'on'); render(); }
    };
  };

  R.favoritos = function () {
    var f = UNOA.estado.favoritos().map(UNOA.produto).filter(Boolean);
    return topo('Favoritos', '<h1>Favoritos <small>(' + f.length + ' produtos salvos)</small></h1>' + (f.length ? '<p><button class="link-sublinhado" id="limpar" type="button" style="background:none;border:0">Limpar favoritos</button></p>' : '') + (f.length ? '<div class="grade-produtos">' + f.map(function (p) {
      return '<div>' + UNOA.cartaoProduto(p) + '<label style="font-size:12px;display:block;margin:6px 0"><input type="checkbox" data-cmp="' + p.id + '"> Comparar</label><button class="btn btn--bloco" type="button" data-add="' + p.id + '">Adicionar ao carrinho</button><button class="link-sublinhado" data-rmfav="' + p.id + '" type="button" style="background:none;border:0;margin-top:6px">Remover</button></div>'; }).join('') + '</div><p style="margin-top:20px"><button class="btn btn--contorno" id="comparar" type="button">Comparar selecionados</button></p><div class="aviso" style="margin-top:16px"><b>Dica UNOA:</b> selecione de 2 a 3 produtos para comparar preço, frete e avaliações lado a lado.</div>' : vazio('Você ainda não salvou favoritos', ['Explorar produtos', 'paginas/busca.html'])) + sug('Você também pode gostar') + '</div>');
  };
  depois.favoritos = function () {
    raiz.onclick = function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.id === 'limpar') { S('favoritos', []); render(); return; }
      if (b.dataset.rmfav) { UNOA.estado.alternarFavorito(b.dataset.rmfav); render(); return; }
      if (b.dataset.add) { var p = UNOA.produto(b.dataset.add); UNOA.estado.adicionar(b.dataset.add, 1, p.cores[0][0]); UNOA.toast('Adicionado ao carrinho'); }
      if (b.id === 'comparar') { var ids = [].map.call(raiz.querySelectorAll('[data-cmp]:checked'), function (x) { return x.dataset.cmp; }).slice(0, 3); if (ids.length < 2) return UNOA.toast('Selecione 2 ou 3 produtos'); location.href = U('paginas/comparar.html?ids=' + ids.join(',')); }
    };
  };

  R.entrega = function () {
    if (!itens().length) return semItens('Entrega');
    var e = L('checkout', {}).entrega || {}, u = L('usuario', {});
    var c = function (id, rot, v, ph) { return '<div class="campo"><label for="' + id + '">' + rot + '</label><input id="' + id + '" value="' + (v || '') + '" placeholder="' + (ph || '') + '"><span class="erro" id="e-' + id + '"></span></div>'; };
    return topo('Entrega', passos(1) + '<div class="duas"><form class="painel" id="f" novalidate><h1>Entrega</h1><small>Informe onde você quer receber.</small><a class="link-sublinhado" href="' + U('paginas/enderecos.html?checkout=1') + '">Usar um endereço salvo</a>' + c('nome', 'Nome completo', e.nome || u.nome) + c('cep', 'CEP', e.cep, '00000-000') + c('rua', 'Rua', e.rua) +
      '<div class="grid2">' + c('num', 'Número', e.num) + c('comp', 'Complemento (opcional)', e.comp) + c('cidade', 'Cidade', e.cidade) + c('uf', 'Estado', e.uf, 'RS') + '</div><h2>Opção de entrega</h2>' +
      '<label class="opcao"><input type="radio" name="tipo" value="padrao"' + (e.tipo !== 'expresso' ? ' checked' : '') + '><span>Padrão · Chega até ' + dataEm(9) + '</span><b>R$ 12,90</b></label><label class="opcao"><input type="radio" name="tipo" value="expresso"' + (e.tipo === 'expresso' ? ' checked' : '') + '><span>Expressa · Chega até ' + dataEm(4) + '</span><b>R$ 24,90</b></label>' +
      '<div style="display:flex;gap:16px;align-items:center"><button class="btn" type="submit">Continuar</button><a class="link-sublinhado" href="' + U('paginas/carrinho.html') + '">Voltar ao carrinho</a></div></form>' + resumo() + '</div></div>');
  };
  depois.entrega = function () {
    if (!$('f')) return;
    document.querySelectorAll('[name=tipo]').forEach(function (r) {
      r.onchange = function () { var c = L('checkout', {}); c.entrega = c.entrega || {}; c.entrega.tipo = r.value; S('checkout', c); var a = document.querySelector('.resumo'); if (a) a.outerHTML = resumo(); };
    });
    $('f').onsubmit = function (ev) {
      ev.preventDefault(); var ok = true, v = {};
      ['nome', 'cep', 'rua', 'num', 'cidade', 'uf'].forEach(function (k) { v[k] = $(k).value.trim(); var m = !v[k] ? 'Campo obrigatório.' : (k === 'cep' && !/^\d{5}-?\d{3}$/.test(v[k]) ? 'CEP inválido.' : ''); $('e-' + k).textContent = m; $(k).setAttribute('aria-invalid', !!m); if (m) ok = false; });
      if (!ok) return; v.comp = $('comp').value.trim(); v.tipo = document.querySelector('[name=tipo]:checked').value;
      var c = L('checkout', {}); c.entrega = v; S('checkout', c); location.href = U('paginas/pagamento.html');
    };
  };

  R.pagamento = function () {
    if (!itens().length) return semItens('Pagamento');
    var p = L('checkout', {}).pagamento || { metodo: 'pix' };
    var op = function (v, t, d) { return '<label class="opcao"><input type="radio" name="m" value="' + v + '"' + (p.metodo === v ? ' checked' : '') + '><span><b>' + t + '</b><small>' + d + '</small></span></label>'; };
    return topo('Pagamento', passos(2) + '<div class="duas"><form class="painel" id="f" novalidate><h1>Pagamento</h1><small>Escolha como prefere pagar.</small><div id="msg"></div>' + op('pix', 'Pix', 'Aprovação imediata') + op('cartao', 'Cartão de crédito', 'Até 3x sem juros') +
      '<div class="cartao-campos" id="cartao"><div class="campo"><label for="num">Número do cartão</label><input id="num" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000"><span class="erro" id="e-num"></span></div><div class="campo"><label for="tit">Nome impresso no cartão</label><input id="tit"><span class="erro" id="e-tit"></span></div><div class="grid2"><div class="campo"><label for="val">Validade</label><input id="val" placeholder="MM/AA" maxlength="5"><span class="erro" id="e-val"></span></div><div class="campo"><label for="cvv">CVV</label><input id="cvv" type="password" maxlength="4"><span class="erro" id="e-cvv"></span></div></div><div class="campo"><label for="parc">Parcelas</label><select id="parc">' + [1, 2, 3].map(function (n) { return '<option value="' + n + '">' + n + 'x de ' + M(totais().total / n) + ' sem juros</option>'; }).join('') + '</select></div></div>' +
      op('boleto', 'Boleto bancário', 'Compensação em até 2 dias úteis') + '<div style="display:flex;gap:16px;align-items:center"><button class="btn" type="submit">Continuar</button><a class="link-sublinhado" href="' + U('paginas/entrega.html') + '">Voltar para entrega</a></div></form>' + resumo() + '</div></div>');
  };
  depois.pagamento = function () {
    if (!$('f')) return;
    var mostrar = function () { $('cartao').hidden = document.querySelector('[name=m]:checked').value !== 'cartao'; };
    document.querySelectorAll('[name=m]').forEach(function (r) { r.onchange = mostrar; }); mostrar();
    $('num').oninput = function () { this.value = this.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); };
    $('val').oninput = function () { var d = this.value.replace(/\D/g, '').slice(0, 4); this.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; };
    $('f').onsubmit = function (ev) {
      ev.preventDefault(); var m = document.querySelector('[name=m]:checked').value, pg = { metodo: m };
      if (m === 'cartao') {
        var erros = {
          num: $('num').value.replace(/\s/g, '').length !== 16 ? 'Confira o número do cartão.' : '',
          tit: !$('tit').value.trim() ? 'Informe o nome impresso.' : '',
          val: !/^(0[1-9]|1[0-2])\/\d{2}$/.test($('val').value) ? 'Validade inválida.' : '',
          cvv: !/^\d{3,4}$/.test($('cvv').value) ? 'CVV inválido.' : ''
        }, ok = true;
        Object.keys(erros).forEach(function (k) { $('e-' + k).textContent = erros[k]; $(k).setAttribute('aria-invalid', !!erros[k]); if (erros[k]) ok = false; });
        $('msg').innerHTML = ok ? '' : '<div class="msg-erro" role="alert">Não foi possível processar o pagamento. Confira os dados do cartão ou escolha outra forma de pagar.<br><small>Código do erro: REC-802 · Nenhuma cobrança foi efetuada no seu cartão.</small></div>';
        if (!ok) { $('f').querySelector('.btn').textContent = 'Tentar novamente'; return; }
        pg.final = $('num').value.replace(/\s/g, '').slice(-4); pg.parcelas = +$('parc').value;
      }
      var c = L('checkout', {}); c.pagamento = pg; S('checkout', c); location.href = U('paginas/revisao.html');
    };
  };

  R.revisao = function () {
    if (!itens().length) return semItens('Revisão');
    var c = L('checkout', {}), e = c.entrega, p = c.pagamento, t = totais();
    if (!e || !p) return topo('Revisão', '<h1>Revise seu pedido</h1>' + vazio('Complete a entrega e o pagamento antes.', ['Ir para entrega', 'paginas/entrega.html']) + '</div>');
    var nome = { pix: 'Pix · ' + M(t.total) + ' à vista', cartao: 'Cartão final ' + p.final + ' · ' + p.parcelas + 'x sem juros', boleto: 'Boleto bancário' }[p.metodo];
    return topo('Revisão', passos(3) + '<div class="duas"><div class="painel"><h1>Revise seu pedido</h1><h2>Itens</h2>' + itens().map(function (i) { return '<div class="lin" style="display:flex;justify-content:space-between"><span>' + i.p.nome + ' · ' + i.qtd + ' un.</span><b>' + M(i.p.preco * i.qtd) + '</b></div>'; }).join('') +
      '<h2>Entrega <a class="link-sublinhado" href="' + U('paginas/entrega.html') + '">Alterar</a></h2><p>' + e.nome + '<br>' + e.rua + ', ' + e.num + (e.comp ? ', ' + e.comp : '') + '<br>' + e.cidade + ', ' + e.uf + ' · ' + e.cep + '<br><b>' + envio().n + ' · Chega até ' + dataEm(envio().d) + '</b></p>' +
      '<h2>Pagamento <a class="link-sublinhado" href="' + U('paginas/pagamento.html') + '">Alterar</a></h2><p>' + nome + '</p><button class="btn" id="confirmar" type="button">✓ Confirmar pedido</button></div>' + resumo() + '</div></div>');
  };
  depois.revisao = function () {
    var b = $('confirmar'); if (!b) return;
    b.onclick = function () {
      var c = L('checkout', {}), t = totais(), n = String(Math.floor(100000 + Math.random() * 900000));
      var pedidos = L('pedidos', []); pedidos.unshift({ n: n, data: Date.now(), itens: itens().map(function (i) { return { id: i.p.id, qtd: i.qtd, cor: i.cor }; }), entrega: c.entrega, pagamento: c.pagamento, total: t.total, prazo: dataEm(envio().d) });
      S('pedidos', pedidos); S('carrinho', []); location.href = U('paginas/pedido-confirmado.html?n=' + n);
    };
  };

  var pagBloco = function (p) {
    var m = (p.pagamento || {}).metodo, cents = Math.round(p.total * 100);
    if (m === 'pix') { var cod = '00020126BR.GOV.BCB.PIX-UNOA-' + p.n + '-' + cents; return '<div class="painel" style="margin-bottom:12px"><h2>Pague com Pix</h2><div class="pix-box"><div class="qr">QR Code</div><div><small>Copia e cola</small><code>' + cod + '</code><button class="btn btn--contorno" type="button" data-copiar="' + cod + '">Copiar código</button></div></div></div>'; }
    if (m === 'boleto') { var lin = '23790.12345 60000.123456 78901.234567 8 ' + p.n + '0000' + cents; return '<div class="painel" style="margin-bottom:12px"><h2>Boleto bancário</h2><small>Vence em 3 dias. Compensação em até 2 dias úteis.</small><code>' + lin + '</code><button class="btn btn--contorno" type="button" data-copiar="' + lin + '">Copiar linha digitável</button></div>'; }
    return '';
  };
  var achar = function () { var l = L('pedidos', []); return l.find(function (x) { return x.n === qs.get('n'); }) || l[0]; };
  R.confirmado = function () {
    var p = achar(); if (!p) return topo('Pedido confirmado', vazio('Nenhum pedido encontrado.', ['Ir às compras', 'index.html']) + '</div>');
    return topo('Pedido confirmado', '<div class="check">✓</div><h1>Pedido confirmado</h1><p>Seu pedido foi recebido.</p><span class="selo">Pedido nº ' + p.n + '</span><div class="aviso" style="margin:16px 0"><b>Previsão de entrega: até ' + p.prazo + '</b></div>' + pagBloco(p) + '<div class="painel" style="margin-top:12px"><h2>Itens (' + p.itens.length + ')</h2>' + p.itens.map(function (i) { var x = UNOA.produto(i.id); return '<div style="display:flex;justify-content:space-between"><span>' + x.nome + (i.cor ? ' (' + i.cor + ')' : '') + ' · ' + i.qtd + ' un.</span><b>' + M(x.preco * i.qtd) + '</b></div>'; }).join('') + '<b>Total: ' + M(p.total) + '</b><a class="btn" href="' + U('paginas/acompanhar-pedido.html?n=' + p.n) + '">Acompanhar pedido</a><a class="btn btn--contorno" href="' + U('index.html') + '">Continuar comprando</a></div></div>');
  };
  depois.confirmado = function () { raiz.onclick = function (e) { var b = e.target.closest('[data-copiar]'); if (!b) return; (navigator.clipboard ? navigator.clipboard.writeText(b.dataset.copiar) : Promise.reject()).then(function () { UNOA.toast('Código copiado'); }, function () { UNOA.toast('Copie o código manualmente'); }); }; };

  var ETAPAS = ['Pedido confirmado', 'Pagamento aprovado', 'Em separação', 'Enviado', 'Entregue'];
  var etapa = function (p) { var h = Math.floor((Date.now() - p.data) / 3600000); return h >= 24 ? 3 : h >= 4 ? 2 : 1; };
  R.pedidos = function () {
    var l = L('pedidos', []);
    return topo('Meus pedidos', '<div class="com-lateral">' + UNOA.lateralConta('pedidos') + '<div><h1>Meus pedidos</h1>' + (l.length ? l.map(function (p) {
      var e = etapa(p);
      return '<div class="painel" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between"><b>Pedido nº ' + p.n + '</b><span class="selo">' + ETAPAS[e] + '</span></div><small>' + p.itens.map(function (i) { var x = UNOA.produto(i.id); return x ? x.nome : ''; }).join(', ') + '</small><div class="progresso"><i style="width:' + (e + 1) * 20 + '%"></i></div><small>Previsão de entrega: até ' + p.prazo + '</small><b>Total ' + M(p.total) + '</b><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="' + U('paginas/acompanhar-pedido.html?n=' + p.n) + '">Acompanhar</a><button class="btn btn--contorno" type="button" data-again="' + p.n + '">Comprar novamente</button></div></div>';
    }).join('') : vazio('Você ainda não fez pedidos', ['Ir às compras', 'index.html'])) + '</div></div></div>');
  };
  depois.pedidos = function () {
    raiz.onclick = function (e) {
      var b = e.target.closest('[data-again]'); if (!b) return;
      var p = L('pedidos', []).find(function (x) { return x.n === b.dataset.again; });
      if (p) { p.itens.forEach(function (i) { UNOA.estado.adicionar(i.id, i.qtd, i.cor); }); location.href = U('paginas/carrinho.html'); }
    };
  };
  R.acompanhar = function () {
    var p = achar(); if (!p) return topo('Acompanhar pedido', vazio('Nenhum pedido encontrado.', ['Ir às compras', 'index.html']) + '</div>');
    var at = etapa(p), e = p.entrega || {}, desc = ['Seu pedido foi recebido.', 'Transação confirmada.', 'Preparando seus itens com cuidado.', 'Código de rastreio: UN' + p.n + 'BR', 'Até ' + p.prazo];
    return topo('Acompanhar pedido', '<h1>Acompanhar pedido <small>nº ' + p.n + '</small></h1><div class="aviso"><b>Previsão de entrega: até ' + p.prazo + '</b></div>' +
      '<div class="duas" style="margin-top:12px"><div class="painel"><h2>Progresso da entrega</h2><ol class="tempo">' + ETAPAS.map(function (t, i) { return '<li class="' + (i < at ? 'ok' : i === at ? 'atual' : '') + '"><i>' + (i < at ? '✓' : '') + '</i><div><b>' + t + '</b><br>' + desc[i] + '</div></li>'; }).join('') + '</ol>' +
      '<div class="aviso">Quer receber atualizações pelo WhatsApp? <button class="link-sublinhado" id="wpp" type="button" style="background:none;border:0">Ativar alertas</button></div><small>Precisa de ajuda? <a class="link-sublinhado" href="' + U('paginas/ajuda.html') + '">Fale com a gente</a></small></div>' +
      '<div class="painel"><h2>Itens do pedido</h2>' + p.itens.map(function (i) { var x = UNOA.produto(i.id); return '<div style="display:flex;justify-content:space-between"><span>' + x.nome + (i.cor ? ' (' + i.cor + ')' : '') + ' · ' + i.qtd + ' un.</span><b>' + M(x.preco * i.qtd) + '</b></div>'; }).join('') +
      '<h2>Endereço de entrega</h2><p>' + (e.nome || '') + '<br>' + (e.rua || '') + ', ' + (e.num || '') + (e.comp ? ', ' + e.comp : '') + '<br>' + (e.cidade || '') + ', ' + (e.uf || '') + ' · ' + (e.cep || '') + '</p><b>Total pago: ' + M(p.total) + '</b></div></div></div>');
  };
  depois.acompanhar = function () { var w = $('wpp'); if (w) w.onclick = function () { UNOA.toast('Alertas ativados (demonstração)'); w.textContent = 'Ativado ✓'; }; };

  R.redefinir = function () {
    return '<div class="container"><div class="centro"><h1>Criar nova senha</h1><small>Escolha uma senha com pelo menos 8 caracteres.</small><form class="painel" id="f" novalidate><div class="campo"><label for="sn">Nova senha</label><input id="sn" type="password"><span class="erro" id="e-sn"></span></div><div class="campo"><label for="sn2">Confirmar senha</label><input id="sn2" type="password"><span class="erro" id="e-sn2"></span></div><button class="btn" type="submit">Salvar nova senha</button></form></div></div>';
  };
  depois.redefinir = function () {
    $('f').onsubmit = function (e) {
      e.preventDefault(); var a = $('sn').value, b = $('sn2').value;
      $('e-sn').textContent = a.length >= 8 ? '' : 'A senha precisa ter pelo menos 8 caracteres.'; $('e-sn2').textContent = a === b ? '' : 'As senhas não são iguais.';
      if ($('e-sn').textContent || $('e-sn2').textContent) return;
      var u = L('usuario', null); if (u) { u.senha = a; S('usuario', u); } UNOA.toast('Senha alterada! Faça login.'); setTimeout(function () { location.href = U('paginas/entrar.html'); }, 900);
    };
  };
  R.entrar = function () {
    return '<div class="container"><div class="centro"><h1>Entrar na UNOA</h1><small>Use seu e-mail para acessar seus pedidos e favoritos.</small><br><small>Demonstração: demo@unoa.com / unoa1234</small><form class="painel" id="f" novalidate><div id="msg"></div><div class="campo"><label for="em">E-mail</label><input id="em" type="email" placeholder="nome@email.com"><span class="erro" id="e-em"></span></div><div class="campo"><label for="sn">Senha</label><input id="sn" type="password" placeholder="Digite sua senha"><span class="erro" id="e-sn"></span></div><a class="link-sublinhado" href="' + U('paginas/esqueci-senha.html') + '">Esqueci minha senha</a><button class="btn" type="submit">Entrar</button></form><p style="text-align:center;margin-top:12px">Ainda não tem conta? <a class="link-sublinhado" href="' + U('paginas/criar-conta.html') + '">Criar conta</a></p></div></div>';
  };
  depois.entrar = function () {
    $('f').onsubmit = function (e) {
      e.preventDefault(); var em = $('em').value.trim(), sn = $('sn').value, u = L('usuario', null);
      $('e-em').textContent = /^\S+@\S+\.\S+$/.test(em) ? '' : 'Digite um e-mail válido, como nome@email.com.'; $('e-sn').textContent = sn ? '' : 'Digite sua senha.';
      if ($('e-em').textContent || $('e-sn').textContent) { $('msg').innerHTML = '<div class="msg-erro" role="alert">Revise os campos abaixo para continuar.</div>'; return; }
      if (em === 'demo@unoa.com' && sn === 'unoa1234') { u = { nome: 'Mariana Costa', email: em, senha: sn }; S('usuario', u); }
      if (!u || u.email !== em || u.senha !== sn) { $('msg').innerHTML = '<div class="msg-erro" role="alert">E-mail ou senha incorretos. Se ainda não tem conta, crie uma.</div>'; return; }
      S('sessao', true); location.href = U('index.html');
    };
  };
  R.criar = function () {
    return '<div class="container"><div class="centro"><h1>Criar conta</h1><small>Leva menos de um minuto.</small><form class="painel" id="f" novalidate><div class="campo"><label for="nm">Nome completo</label><input id="nm" placeholder="Como você se chama"><span class="erro" id="e-nm"></span></div><div class="campo"><label for="em">E-mail</label><input id="em" type="email" placeholder="nome@email.com"><span class="erro" id="e-em"></span></div><div class="campo"><label for="sn">Senha</label><input id="sn" type="password" placeholder="Crie uma senha"><div class="forca"><i></i><i></i><i></i></div><small>Use pelo menos 8 caracteres.</small><span class="erro" id="e-sn"></span></div><label style="font-size:12px"><input type="checkbox" id="ck"> Li e concordo com os <a class="link-sublinhado" href="' + U('paginas/ajuda.html#termos') + '">Termos de uso</a> e a <a class="link-sublinhado" href="' + U('paginas/ajuda.html#privacidade') + '">Política de privacidade</a>.</label><span class="erro" id="e-ck"></span><button class="btn" type="submit">Criar conta</button></form><p style="text-align:center;margin-top:12px">Já tem conta? <a class="link-sublinhado" href="' + U('paginas/entrar.html') + '">Entrar</a></p></div></div>';
  };
  depois.criar = function () {
    $('sn').oninput = function () { var v = this.value, n = (v.length >= 8) + /[A-Z]/.test(v) + /\d/.test(v); document.querySelectorAll('.forca i').forEach(function (i, k) { i.classList.toggle('on', k < n); }); };
    $('f').onsubmit = function (e) {
      e.preventDefault(); var v = { nome: $('nm').value.trim(), email: $('em').value.trim(), senha: $('sn').value }, ok = true;
      var er = { nm: v.nome ? '' : 'Informe seu nome.', em: /^\S+@\S+\.\S+$/.test(v.email) ? '' : 'Digite um e-mail válido.', sn: v.senha.length >= 8 ? '' : 'A senha precisa ter pelo menos 8 caracteres.', ck: $('ck').checked ? '' : 'Aceite os termos para continuar.' };
      Object.keys(er).forEach(function (k) { $('e-' + k).textContent = er[k]; if (er[k]) ok = false; });
      if (!ok) return; S('usuario', v); S('sessao', true); UNOA.toast('Conta criada! Bem-vinda(o), ' + v.nome.split(' ')[0]); setTimeout(function () { location.href = U('index.html'); }, 900);
    };
  };
  R.esqueci = function () {
    return '<div class="container"><div class="centro"><h1>Esqueci minha senha</h1><small>Digite seu e-mail e enviaremos um link para criar uma nova senha.</small><form class="painel" id="f" novalidate><div class="campo"><label for="em">E-mail</label><input id="em" type="email" placeholder="nome@email.com"><span class="erro" id="e-em"></span></div><button class="btn" type="submit">Enviar link</button></form><div id="ok"></div><p style="text-align:center;margin-top:12px"><a class="link-sublinhado" href="' + U('paginas/entrar.html') + '">← Voltar para entrar</a></p></div></div>';
  };
  depois.esqueci = function () { $('f').onsubmit = function (e) { e.preventDefault(); var ok = /^\S+@\S+\.\S+$/.test($('em').value); $('e-em').textContent = ok ? '' : 'Digite um e-mail válido.'; if (ok) $('ok').innerHTML = '<div class="aviso" style="margin-top:12px">Link enviado! (Demonstração: <a class="link-sublinhado" href="' + U('paginas/redefinir-senha.html') + '">abrir link de redefinição</a>) Não recebeu? Confira a caixa de spam.</div>'; }; };

  function render() { raiz.innerHTML = R[modo](); (depois[modo] || function () {})(); }
  render();
});
