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