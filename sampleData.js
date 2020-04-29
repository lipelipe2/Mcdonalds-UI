const api_url = 'https://apimcd.herokuapp.com/api';

const productNameSanduichesList = [
    "Big Mac®",
    "Big Tasty®",
    "CBO®",
    "Filet-o-Fish®",
    "McVeggie",
    "Double Cheeseburger"
];

const productExtraSanduichesList = [
    "Sem Molhos",
    "Sem Ketchup",
    "Sem Pickle"
];

const productNameAcompanhamentosList = [
    "Batata",
    "Batata (grande)",
    "Sopa",
    "Salada"
];

const productNameBebidasList = [
    "Agua",
    "Compal",
    "Ice Tea",
    "Fanta",
    "Coca-Cola"
];

const productExtraBebidasList = [
    "Sem Gelo",
    "Natural"
];

class Order {
    constructor(nome, id, produtos = [], productId, finalizado = false, extra = false) {
        if (id)
            this.id = id;
        this.nome = nome;
        this.produtos = produtos;
        this.productId = 1;
        this.finalizado = finalizado;
        this.developer = "Filipe Marques";
        this.extra = extra;
    }

    addProduct(produto, extra) {
        const product = { prodId: this.productId++, nome: produto, extra: (extra) ? extra : "" };
        this.produtos.push(product);
        return product;
    }

    setId(id) {
        this.id = id;
    }

    temExtra(i) {
        return this.produtos[i].extra != "";
    }

    estaFinalizado() {
        return this.finalizado;
    }

    prodToString(i) {
        return this.produtos[i].extra == "" ? this.produtos[i].nome : this.produtos[i].nome + " : " + this.produtos[i].extra;
    }
}

