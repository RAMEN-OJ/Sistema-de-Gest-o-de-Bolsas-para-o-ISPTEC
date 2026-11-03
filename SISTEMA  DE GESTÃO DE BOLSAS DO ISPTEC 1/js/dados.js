// Fotos disponíveis em img/ (sem extensão). Ex.: ["angola", "portugal"]. Vazio = fundo colorido.
const FOTOS = [];

// ATENÇÃO: prazo, valor, documentos e links são EXEMPLOS. Confirma-os no site oficial de cada bolsa.
const SITE = "https://www.inagbe.gov.ao";
const DOCS = ["Bilhete de identidade válido", "Certificado de habilitações", "Carta de motivação", "Currículo actualizado"];
const externa = (id, pais, descricao) => ({ id, titulo: "Bolsa Externa Inagbe", pais, tipo: "externa", descricao, idadeMin: 18, idadeMax: 22,
    prazo: "Consultar o site oficial", valor: "Consultar o site oficial", docs: DOCS, link: SITE });

let bolsas = [
    { id: 1, titulo: "Bolsa Interna Inagbe", pais: "Angola", tipo: "interna", idadeMin: 18, idadeMax: 22, prazo: "Consultar o site oficial", valor: "58 mil Kz de subsídio", docs: DOCS, link: SITE,
      descricao: "Bolsa interna para estudar em Angola, com um subsídio de 58 mil Kz. Elegível para pessoas dos 18 aos 22 anos de idade." },
    externa(2, "Portugal", "Bolsa externa para estudar em Portugal, onde o ensino é feito em português. Elegível dos 18 aos 22 anos."),
    externa(3, "Hungria", "Bolsa externa para estudar na Hungria. Confirma no site oficial o idioma do curso. Elegível dos 18 aos 22 anos."),
    externa(4, "Itália", "Bolsa externa para estudar em Itália. Confirma no site oficial o idioma do curso. Elegível dos 18 aos 22 anos."),
    externa(5, "Brasil", "Bolsa externa para estudar no Brasil, com ensino em português. Elegível dos 18 aos 22 anos."),
    externa(6, "África do Sul", "Bolsa externa para estudar na África do Sul, com ensino em inglês. Elegível dos 18 aos 22 anos."),
    externa(7, "Namíbia", "Bolsa externa para estudar na Namíbia, com ensino em inglês. Elegível dos 18 aos 22 anos.")
];

// Senhas como TEXTO ("1234"), porque o input do formulário devolve sempre texto.
// (Só para teste: num sistema real as senhas ficam com hash no backend.)
let usuarios = [
    { id: 1, nome: "Marta", email: "marta@teste.co", senha: "1234", dataNascimento: "2003-03-12", tipo: "admin" },
    { id: 2, nome: "Abílio", email: "abilio@teste.co", senha: "12345", dataNascimento: "2003-03-12", tipo: "aluno" },
    { id: 3, nome: "Rui", email: "rui@teste.co", senha: "3212", dataNascimento: "2003-03-12", tipo: "aluno" }
];

let mentorias = [
    { id: 1, mentor: "Dr. João", tipoBolsa: "externa", contacto: "992992992", preco: "5000 kzs", area: "Bolsas no estrangeiro", bio: "Orientador em candidaturas a bolsas externas. Ajuda com cartas de motivação e entrevistas.", foto: "" },
    { id: 2, mentor: "Dra. Marta Silva", tipoBolsa: "interna", contacto: "a definir", preco: "Gratuito", area: "Bolsas internas", bio: "Acompanha candidaturas a bolsas internas e prepara a documentação.", foto: "" },
    { id: 3, mentor: "Eng. Paulo Mendes", tipoBolsa: "externa", contacto: "a definir", preco: "3000 kzs", area: "Engenharia e Tecnologia", bio: "Mentor para quem quer estudar engenharia e tecnologia fora do país.", foto: "" },
    { id: 4, mentor: "Dra. Ana Costa", tipoBolsa: "externa", contacto: "a definir", preco: "5000 kzs", area: "Ciência de Dados", bio: "Apoia candidaturas na área de dados e inteligência artificial.", foto: "" }
];
