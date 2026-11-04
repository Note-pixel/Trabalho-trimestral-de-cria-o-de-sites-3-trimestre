window.UNOA = window.UNOA || {};
UNOA.imagens = {
  produtos: {
    'fone-sem-fio': '#', 'carregador-portatil': '#', 'organizador-gavetas': '#', 'caneca-ceramica': '#',
    'luminaria-mesa': '#', 'mouse-sem-fio': '#', 'fone-esportivo': '#', 'estojo-fones': '#',
    'fone-cancelamento': '#', 'fone-com-fio': '#'
  },
  banners: {
    'hero-audio': '#', 'hero-organizador': '#', 'hero-ceramica': '#',
    'presentes': '#', 'organize-cada-cantinho': '#', 'fones-e-acessorios': '#',
    'menu-tecnologia': '#'
  },
  categorias: {},
  identidade: { 'logo-unoa': '#' }
};
UNOA.base = document.currentScript ? '' : '';
UNOA.img = function (grupo, chave) {
  var v = (UNOA.imagens[grupo] || {})[chave];
  if (!v || v === '#') return '#';
  return (document.body.dataset.base || '') + 'imagens/' + v;
};
UNOA.url = function (caminho) { return (document.body.dataset.base || '') + caminho; };