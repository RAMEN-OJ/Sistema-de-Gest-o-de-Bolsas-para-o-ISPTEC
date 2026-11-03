// Texto repetido nas 7 bolsas. Troca por uma descrição própria de cada uma
// (as externas dizem "interna" por engano).
const DESC = "Esta bolsa é interna, tem um subsídio de 58mil kzs é elegível para pessoas dos 18 aos 22 anos de idade";

let bolsas = [
    { id: 1, titulo: "Bolsa Interna Inagbe", pais: "Angola", descricao: DESC, idadeMax: 22 },
    { id: 2, titulo: "Bolsa Externa Inagbe", pais: "Portugal", descricao: DESC, idadeMax: 22 },
    { id: 3, titulo: "Bolsa Externa Inagbe", pais: "Hungria", descricao: DESC, idadeMax: 22 },
    { id: 4, titulo: "Bolsa Externa Inagbe", pais: "Itália", descricao: DESC, idadeMax: 22 },
    { id: 5, titulo: "Bolsa Externa Inagbe", pais: "Brasil", descricao: DESC, idadeMax: 22 },
    { id: 6, titulo: "Bolsa Externa Inagbe", pais: "África do Sul", descricao: DESC, idadeMax: 22 },
    { id: 7, titulo: "Bolsa Externa Inagbe", pais: "Namíbia", descricao: DESC, idadeMax: 22 }
];

// Senhas como TEXTO ("1234"), porque o input do formulário devolve sempre texto.
// (Só para teste: num sistema real as senhas ficam com hash no backend.)
let usuarios = [
    { id: 1, nome: "Marta", email: "marta@teste.co", senha: "1234", dataNascimento: "12/03/2003", tipo: "admin" },
    { id: 2, nome: "Abílio", email: "abilio@teste.co", senha: "12345", dataNascimento: "12/03/2003", tipo: "aluno" },
    { id: 3, nome: "Rui", email: "rui@teste.co", senha: "3212", dataNascimento: "12/03/2003", tipo: "aluno" }
];

let mentorias = [
    { id: 1, mentor: "Dr. João", tipoBolsa: "externa", contacto: "992992992", preco: "5000 kzs", area: "Bolsas no estrangeiro", bio: "Orientador em candidaturas a bolsas externas. Ajuda com cartas de motivação e entrevistas.", foto: "" },
    { id: 2, mentor: "Dra. Marta Silva", tipoBolsa: "interna", contacto: "a definir", preco: "Gratuito", area: "Bolsas internas", bio: "Acompanha candidaturas a bolsas internas e prepara a documentação.", foto: "" },
    { id: 3, mentor: "Eng. Paulo Mendes", tipoBolsa: "externa", contacto: "a definir", preco: "3000 kzs", area: "Engenharia e Tecnologia", bio: "Mentor para quem quer estudar engenharia e tecnologia fora do país.", foto: "" },
    { id: 4, mentor: "Dra. Ana Costa", tipoBolsa: "externa", contacto: "a definir", preco: "5000 kzs", area: "Ciência de Dados", bio: "Apoia candidaturas na área de dados e inteligência artificial.", foto: "" }
];
