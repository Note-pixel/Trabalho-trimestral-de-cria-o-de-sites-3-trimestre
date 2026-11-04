UNOA.estado = (function () {
  function ler(k) { try { return JSON.parse(localStorage.getItem('unoa.' + k)) || []; } catch (e) { return []; } }
  function gravar(k, v) { try { localStorage.setItem('unoa.' + k, JSON.stringify(v)); } catch (e) {} }
  return {
    favoritos: function () { return ler('favoritos'); },
    alternarFavorito: function (id) {
      var f = ler('favoritos'), i = f.indexOf(id);
      if (i >= 0) f.splice(i, 1); else f.push(id);
      gravar('favoritos', f); UNOA.atualizarContadores && UNOA.atualizarContadores(); return i < 0;
    },
    carrinho: function () { return ler('carrinho'); },
    adicionar: function (id, qtd) {
      var c = ler('carrinho'), it = c.find(function (x) { return x.id === id; });
      if (it) it.qtd += qtd || 1; else c.push({ id: id, qtd: qtd || 1 });
      gravar('carrinho', c); UNOA.atualizarContadores && UNOA.atualizarContadores();
    },
    totalItens: function () { return ler('carrinho').reduce(function (s, x) { return s + x.qtd; }, 0); }
  };
})();