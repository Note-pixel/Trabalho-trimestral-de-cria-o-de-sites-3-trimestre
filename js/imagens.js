window.UNOA = window.UNOA || {};

UNOA.imagens = {
  produtos: {
    'fone-sem-fio': 'produtos/fone-sem-fio.jpg',
    'carregador-portatil': 'produtos/carregador-portatil.jpg',
    'organizador-gavetas': 'produtos/organizador-gavetas.jpg',
    'caneca-ceramica': 'produtos/caneca-ceramica.jpg',
    'luminaria-mesa': 'produtos/luminaria-mesa.jpg',
    'mouse-sem-fio': 'produtos/mouse-sem-fio.jpg',
    'fone-esportivo': 'produtos/fone-esportivo.jpg',
    'estojo-fones': 'produtos/estojo-fones.jpg',
    'fone-cancelamento': 'produtos/fone-cancelamento.jpg',
    'fone-com-fio': 'produtos/fone-com-fio.jpg'
  },

  banners: {
    'hero-audio': 'banners/hero-audio.jpg',
    'hero-organizador': 'banners/hero-organizador.jpg',
    'hero-ceramica': 'banners/hero-ceramica.jpg',
    'presentes': 'banners/presentes.jpg',
    'organize-cada-cantinho': 'banners/organize-cada-cantinho.jpg',
    'fones-e-acessorios': 'banners/fones-e-acessorios.jpg',
    'menu-tecnologia': 'banners/menu-tecnologia.jpg'
  },

  categorias: {},

  identidade: {
    'logo-unoa': 'identidade/logo-unoa.png'
  }
};

UNOA.img = function (grupo, chave) {
  var arquivo = (UNOA.imagens[grupo] || {})[chave];

  if (!arquivo) return '#';

  return (document.body.dataset.base || '') + 'imagens/' + arquivo;
};

UNOA.url = function (caminho) {
  return (document.body.dataset.base || '') + caminho;
};
UNOA.imgCor = function (produto, cor) {
  return UNOA.img.apply(null, produto.imagem.split('.'));
};