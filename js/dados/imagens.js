window.UNOA = window.UNOA || {};
UNOA.imagens = {
  produtos: {
    'suporte-celular': 'produtos/suporte-celular.jpg',
    'cabo-usb-c': 'produtos/cabo-usb-c.jpg',
    'fone-sem-fio': 'produtos/fone-sem-fio.jpg',
    'carregador-portatil': 'produtos/carregador-portatil.jpg',
    'mouse-sem-fio': 'produtos/mouse-sem-fio.jpg',
    'fone-esportivo': 'produtos/fone-esportivo.jpg',
    'fone-cancelamento': 'produtos/fone-cancelamento.jpg',
    'fone-com-fio': 'produtos/fone-com-fio.jpg',
    'cesto-organizador': 'produtos/cesto-organizador.jpg',
    'vela-aromatica': 'produtos/vela-aromatica.jpg',
    'organizador-gavetas': 'produtos/organizador-gavetas.jpg',
    'caneca-ceramica': 'produtos/caneca-ceramica.jpg',
    'luminaria-mesa': 'produtos/luminaria-mesa.jpg',
    'bolsa-tiracolo': 'produtos/bolsa-tiracolo.jpg',
    'carteira-couro': 'produtos/carteira-couro.jpg',
    'lenco-seda': 'produtos/lenco-seda.jpg',
    'oculos-sol': 'produtos/oculos-sol.jpg',
    'estojo-fones': 'produtos/estojo-fones.jpg',
    'creme-hidratante': 'produtos/creme-hidratante.jpg',
    'sabonete-artesanal': 'produtos/sabonete-artesanal.jpg',
    'escova-facial': 'produtos/escova-facial.jpg',
    'necessaire': 'produtos/necessaire.jpg',
    'jogo-tabuleiro': 'produtos/jogo-tabuleiro.jpg',
    'quebra-cabeca': 'produtos/quebra-cabeca.jpg',
    'kit-aquarela': 'produtos/kit-aquarela.jpg',
    'caderno-sketch': 'produtos/caderno-sketch.jpg'
  },
  banners: {
    'hero-audio': 'banners/hero-audio.jpg',
    'hero-organizador': 'banners/hero-organizador.jpg',
    'hero-ceramica': 'banners/hero-ceramica.jpg',
    'presentes': 'banners/presentes.jpg',
    'organize-cada-cantinho': 'banners/organize-cada-cantinho.jpg',
    'fones-e-acessorios': 'banners/fones-e-acessorios.jpg',
    'menu-tecnologia': 'banners/menu-tecnologia.jpg',
    'menu-casa': 'banners/menu-casa.jpg',
    'menu-moda': 'banners/menu-moda.jpg',
    'menu-beleza': 'banners/menu-beleza.jpg',
    'menu-hobbies': 'banners/menu-hobbies.jpg'
  },
  categorias: {},
  identidade: {
    'logo-unoa': '#'
  },

  coresProduto: {
    'suporte-celular-preto': '#',
    'suporte-celular-branco': '#',
    'suporte-celular-bege': '#',
    'cabo-usb-c-preto': '#',
    'cabo-usb-c-branco': '#',
    'cabo-usb-c-bege': '#',
    'fone-sem-fio-preto': '#',
    'fone-sem-fio-branco': '#',
    'fone-sem-fio-bege': '#',
    'carregador-portatil-preto': '#',
    'carregador-portatil-branco': '#',
    'carregador-portatil-bege': '#',
    'mouse-sem-fio-preto': '#',
    'mouse-sem-fio-branco': '#',
    'mouse-sem-fio-bege': '#',
    'fone-esportivo-preto': '#',
    'fone-esportivo-branco': '#',
    'fone-esportivo-bege': '#',
    'fone-cancelamento-preto': '#',
    'fone-cancelamento-branco': '#',
    'fone-cancelamento-bege': '#',
    'fone-com-fio-preto': '#',
    'fone-com-fio-branco': '#',
    'fone-com-fio-bege': '#',
    'cesto-organizador-natural': '#',
    'cesto-organizador-branco': '#',
    'cesto-organizador-cinza': '#',
    'vela-aromatica-natural': '#',
    'vela-aromatica-branco': '#',
    'vela-aromatica-cinza': '#',
    'organizador-gavetas-natural': '#',
    'organizador-gavetas-branco': '#',
    'organizador-gavetas-cinza': '#',
    'caneca-ceramica-natural': '#',
    'caneca-ceramica-branco': '#',
    'caneca-ceramica-cinza': '#',
    'luminaria-mesa-natural': '#',
    'luminaria-mesa-branco': '#',
    'luminaria-mesa-cinza': '#',
    'bolsa-tiracolo-bege': '#',
    'bolsa-tiracolo-lilas': '#',
    'bolsa-tiracolo-preto': '#',
    'carteira-couro-bege': '#',
    'carteira-couro-lilas': '#',
    'carteira-couro-preto': '#',
    'lenco-seda-bege': '#',
    'lenco-seda-lilas': '#',
    'lenco-seda-preto': '#',
    'oculos-sol-bege': '#',
    'oculos-sol-lilas': '#',
    'oculos-sol-preto': '#',
    'estojo-fones-bege': '#',
    'estojo-fones-lilas': '#',
    'estojo-fones-preto': '#',
    'creme-hidratante-natural': '#',
    'creme-hidratante-rose': '#',
    'creme-hidratante-branco': '#',
    'sabonete-artesanal-natural': '#',
    'sabonete-artesanal-rose': '#',
    'sabonete-artesanal-branco': '#',
    'escova-facial-natural': '#',
    'escova-facial-rose': '#',
    'escova-facial-branco': '#',
    'necessaire-natural': '#',
    'necessaire-rose': '#',
    'necessaire-branco': '#',
    'jogo-tabuleiro-natural': '#',
    'jogo-tabuleiro-colorido': '#',
    'jogo-tabuleiro-preto': '#',
    'quebra-cabeca-natural': '#',
    'quebra-cabeca-colorido': '#',
    'quebra-cabeca-preto': '#',
    'kit-aquarela-natural': '#',
    'kit-aquarela-colorido': '#',
    'kit-aquarela-preto': '#',
    'caderno-sketch-natural': '#',
    'caderno-sketch-colorido': '#',
    'caderno-sketch-preto': '#'
  }
};
 

UNOA.img = function (grupo, chave) {
  var v = (UNOA.imagens[grupo] || {})[chave];
  if (!v || v === '#') return '#';
  return (document.body.dataset.base || '') + 'imagens/' + v;
};
UNOA.url = function (caminho) { return (document.body.dataset.base || '') + caminho; };
 

UNOA.imgCor = function (p, cor) {
  var k = p.id + '-' + String(cor).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-');
  var v = (UNOA.imagens.coresProduto || {})[k];
  if (v && v !== '#') return (document.body.dataset.base || '') + 'imagens/' + v;
  return UNOA.img.apply(null, p.imagem.split('.'));
};