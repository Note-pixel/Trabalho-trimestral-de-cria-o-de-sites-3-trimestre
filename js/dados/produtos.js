/* UNOA - banco de dados temporário de produtos (cada um com sua própria referência de imagem) */
UNOA.categorias = [
  { id: 'tecnologia', nome: 'Tecnologia', icone: 'celular', cor: '#E8DDF3' },
  { id: 'casa', nome: 'Casa e Organização', icone: 'casa', cor: '#E6EDE8' },
  { id: 'moda', nome: 'Moda e Acessórios', icone: 'moda', cor: '#F8DDD5' },
  { id: 'beleza', nome: 'Beleza e Cuidados', icone: 'brilho', cor: '#E8DDF3' },
  { id: 'hobbies', nome: 'Hobbies e Lazer', icone: 'jogo', cor: '#E6EDE8' }
];
UNOA.produtos = [
  { id: 'fone-sem-fio', nome: 'Fone de ouvido sem fio', categoria: 'tecnologia', preco: 129.90, precoAntigo: 149.90, nota: 4.6, avaliacoes: 230, parcelas: 10, imagem: 'produtos.fone-sem-fio' },
  { id: 'carregador-portatil', nome: 'Carregador portátil', categoria: 'tecnologia', preco: 89.90, precoAntigo: 99.90, nota: 4.8, avaliacoes: 301, parcelas: 10, imagem: 'produtos.carregador-portatil' },
  { id: 'organizador-gavetas', nome: 'Organizador de gavetas', categoria: 'casa', preco: 39.90, precoAntigo: 45.90, nota: 4.4, avaliacoes: 156, parcelas: 10, imagem: 'produtos.organizador-gavetas' },
  { id: 'caneca-ceramica', nome: 'Caneca de cerâmica', categoria: 'casa', preco: 34.90, precoAntigo: 39.90, nota: 4.5, avaliacoes: 88, parcelas: 10, imagem: 'produtos.caneca-ceramica' },
  { id: 'luminaria-mesa', nome: 'Luminária de mesa', categoria: 'casa', preco: 79.90, nota: 4.7, avaliacoes: 64, parcelas: 10, imagem: 'produtos.luminaria-mesa' },
  { id: 'mouse-sem-fio', nome: 'Mouse sem fio', categoria: 'tecnologia', preco: 69.90, nota: 4.5, avaliacoes: 142, parcelas: 10, imagem: 'produtos.mouse-sem-fio' },
  { id: 'fone-esportivo', nome: 'Fone esportivo Bluetooth', categoria: 'tecnologia', preco: 89.90, nota: 4.4, avaliacoes: 412, parcelas: 10, imagem: 'produtos.fone-esportivo' },
  { id: 'estojo-fones', nome: 'Estojo para fones', categoria: 'moda', preco: 24.90, nota: 4.4, avaliacoes: 58, parcelas: 10, imagem: 'produtos.estojo-fones' },
  { id: 'fone-cancelamento', nome: 'Fone com cancelamento de ruído', categoria: 'tecnologia', preco: 249.90, nota: 4.7, avaliacoes: 98, parcelas: 10, imagem: 'produtos.fone-cancelamento' },
  { id: 'fone-com-fio', nome: 'Fone de ouvido com fio', categoria: 'tecnologia', preco: 39.90, nota: 4.3, avaliacoes: 75, parcelas: 10, imagem: 'produtos.fone-com-fio' }
];
UNOA.ofertasDaSemana = ['fone-sem-fio', 'carregador-portatil', 'organizador-gavetas', 'caneca-ceramica'];
UNOA.maisProcurados = ['luminaria-mesa', 'mouse-sem-fio', 'fone-esportivo', 'estojo-fones'];
UNOA.produto = function (id) { return UNOA.produtos.find(function (p) { return p.id === id; }); };
UNOA.moeda = function (v) { return 'R$ ' + v.toFixed(2).replace('.', ','); };
UNOA.cupom = { codigo: 'UNOA10', descricao: 'R$ 10 de desconto na primeira compra', valor: 10 };

UNOA.produtos = UNOA.produtos.concat([
  { id: 'suporte-celular', nome: 'Suporte para celular', categoria: 'tecnologia', preco: 19.90, nota: 4.3, avaliacoes: 88, parcelas: 10, imagem: 'produtos.suporte-celular' },
  { id: 'cabo-usb-c', nome: 'Cabo USB-C trançado', categoria: 'tecnologia', preco: 24.90, precoAntigo: 29.90, nota: 4.6, avaliacoes: 320, parcelas: 10, imagem: 'produtos.cabo-usb-c' },
  { id: 'cesto-organizador', nome: 'Cesto organizador', categoria: 'casa', preco: 44.90, nota: 4.5, avaliacoes: 110, parcelas: 10, imagem: 'produtos.cesto-organizador' },
  { id: 'vela-aromatica', nome: 'Vela aromática', categoria: 'casa', preco: 32.90, precoAntigo: 39.90, nota: 4.7, avaliacoes: 140, parcelas: 10, imagem: 'produtos.vela-aromatica' },
  { id: 'bolsa-tiracolo', nome: 'Bolsa tiracolo', categoria: 'moda', preco: 89.90, precoAntigo: 109.90, nota: 4.5, avaliacoes: 88, parcelas: 10, imagem: 'produtos.bolsa-tiracolo' },
  { id: 'carteira-couro', nome: 'Carteira de couro', categoria: 'moda', preco: 69.90, nota: 4.6, avaliacoes: 120, parcelas: 10, imagem: 'produtos.carteira-couro' },
  { id: 'lenco-seda', nome: 'Lenço de seda', categoria: 'moda', preco: 39.90, nota: 4.2, avaliacoes: 34, parcelas: 10, imagem: 'produtos.lenco-seda' },
  { id: 'oculos-sol', nome: 'Óculos de sol', categoria: 'moda', preco: 79.90, precoAntigo: 94.90, nota: 4.4, avaliacoes: 60, parcelas: 10, imagem: 'produtos.oculos-sol' },
  { id: 'creme-hidratante', nome: 'Creme hidratante facial', categoria: 'beleza', preco: 49.90, precoAntigo: 59.90, nota: 4.6, avaliacoes: 212, parcelas: 10, imagem: 'produtos.creme-hidratante' },
  { id: 'sabonete-artesanal', nome: 'Kit de sabonetes artesanais', categoria: 'beleza', preco: 29.90, nota: 4.5, avaliacoes: 97, parcelas: 10, imagem: 'produtos.sabonete-artesanal' },
  { id: 'escova-facial', nome: 'Escova de limpeza facial', categoria: 'beleza', preco: 59.90, nota: 4.4, avaliacoes: 76, parcelas: 10, imagem: 'produtos.escova-facial' },
  { id: 'necessaire', nome: 'Necessaire de viagem', categoria: 'beleza', preco: 34.90, precoAntigo: 39.90, nota: 4.3, avaliacoes: 51, parcelas: 10, imagem: 'produtos.necessaire' },
  { id: 'jogo-tabuleiro', nome: 'Jogo de tabuleiro estratégico', categoria: 'hobbies', preco: 119.90, precoAntigo: 139.90, nota: 4.8, avaliacoes: 180, parcelas: 10, imagem: 'produtos.jogo-tabuleiro' },
  { id: 'quebra-cabeca', nome: 'Quebra-cabeça 500 peças', categoria: 'hobbies', preco: 54.90, nota: 4.6, avaliacoes: 93, parcelas: 10, imagem: 'produtos.quebra-cabeca' },
  { id: 'kit-aquarela', nome: 'Kit de aquarela', categoria: 'hobbies', preco: 44.90, nota: 4.5, avaliacoes: 67, parcelas: 10, imagem: 'produtos.kit-aquarela' },
  { id: 'caderno-sketch', nome: 'Caderno de desenho', categoria: 'hobbies', preco: 29.90, precoAntigo: 34.90, nota: 4.4, avaliacoes: 45, parcelas: 10, imagem: 'produtos.caderno-sketch' }
]);

/* Variações de cor por categoria: [nome, hex] */
UNOA.produtos.forEach(function (p) {
  p.cores = p.cores || ({
    tecnologia: [['Preto', '#2D2438'], ['Branco', '#F4F1EC'], ['Bege', '#D9CFC2']],
    casa: [['Natural', '#D9CFC2'], ['Branco', '#F4F1EC'], ['Cinza', '#9A939F']],
    moda: [['Bege', '#D9CFC2'], ['Lilás', '#C9B6E4'], ['Preto', '#2D2438']],
    beleza: [['Natural', '#E8D9C8'], ['Rosé', '#E9BFB8'], ['Branco', '#F4F1EC']],
    hobbies: [['Natural', '#D9CFC2'], ['Colorido', '#F2A98E'], ['Preto', '#2D2438']]
  }[p.categoria] || [['Único', '#D9CFC2']]);
});

/* Prazo (dias) e frete grátis por produto */
UNOA.produtos.forEach(function (p, i) {
  if (!p.prazo) p.prazo = ({ tecnologia: 3, casa: 7, moda: 5, beleza: 3, hobbies: 9 }[p.categoria] || 7) + (i % 2) * 2;
  if (p.freteGratis === undefined) p.freteGratis = p.preco >= 89.9;
});
UNOA.dataEm = function (n) { var d = new Date(); d.setDate(d.getDate() + n); return d.getDate() + ' de ' + ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][d.getMonth()]; };
UNOA.cupons = { UNOA10: 10, PRESENTE15: 15, BEMVINDO5: 5 };
UNOA.subcategorias = {
  tecnologia: [['Fones de ouvido', 'fone'], ['Carregadores', 'carregador'], ['Acessórios para celular', 'celular'], ['Periféricos', 'mouse']],
  casa: [['Organizadores', 'organizador'], ['Cerâmica e mesa', 'caneca'], ['Iluminação', 'luminária'], ['Aromas', 'vela']],
  moda: [['Bolsas', 'bolsa'], ['Carteiras', 'carteira'], ['Óculos', 'óculos'], ['Estojos', 'estojo']],
  beleza: [['Skincare', 'creme'], ['Banho', 'sabonete'], ['Acessórios', 'escova'], ['Viagem', 'necessaire']],
  hobbies: [['Jogos', 'jogo'], ['Quebra-cabeças', 'quebra'], ['Arte', 'aquarela'], ['Papelaria', 'caderno']]
};

UNOA.descricoes = {
  'suporte-celular': 'Suporte dobrável e ajustável para apoiar o celular na mesa.',
  'cabo-usb-c': 'Cabo trançado resistente para carregar e transferir dados.',
  'fone-sem-fio': 'Fone intra-auricular com estojo de carregamento e bateria de longa duração.',
  'carregador-portatil': 'Power bank compacto com carga rápida para o dia todo.',
  'mouse-sem-fio': 'Mouse ergonômico sem fio, silencioso e preciso.',
  'fone-esportivo': 'Fone Bluetooth com encaixe firme para treinos e corridas.',
  'fone-cancelamento': 'Headphone com cancelamento de ruído e almofadas macias.',
  'fone-com-fio': 'Fone com fio e microfone, simples e prático.',
  'cesto-organizador': 'Cesto trançado para organizar prateleiras e armários.',
  'vela-aromatica': 'Vela de baunilha para deixar a casa mais acolhedora.',
  'organizador-gavetas': 'Organizador de madeira para separar objetos nas gavetas.',
  'caneca-ceramica': 'Caneca de cerâmica artesanal para café e chá.',
  'luminaria-mesa': 'Luminária de mesa com luz suave e design delicado.',
  'bolsa-tiracolo': 'Bolsa tiracolo compacta com alça ajustável.',
  'carteira-couro': 'Carteira de couro com divisórias para cartões e notas.',
  'lenco-seda': 'Lenço de seda macio para usar no pescoço ou na bolsa.',
  'oculos-sol': 'Óculos de sol com lentes escuras e proteção UV.',
  'estojo-fones': 'Estojo rígido para guardar fones e cabos sem enrolar.',
  'creme-hidratante': 'Creme facial com hidratação leve para o dia a dia.',
  'sabonete-artesanal': 'Kit de sabonetes artesanais com aromas variados.',
  'escova-facial': 'Escova de silicone para limpeza facial profunda.',
  'necessaire': 'Necessaire espaçosa para levar seus cosméticos em viagens.',
  'jogo-tabuleiro': 'Jogo de tabuleiro estratégico para jogar com amigos e família.',
  'quebra-cabeca': 'Quebra-cabeça de 500 peças com imagem colorida.',
  'kit-aquarela': 'Kit de aquarela com cartelas de cores, pincéis e acessórios.',
  'caderno-sketch': 'Caderno de desenho com folhas firmes para esboços.'
};
UNOA.produtos.forEach(function (p) { p.descricao = UNOA.descricoes[p.id] || p.nome; });