
const janeiro = new Mes("janeiro");
janeiro.adicionarLancamento(new Lancamento("Salário", "receita", 3000));
janeiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1000));
janeiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200));
janeiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
janeiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100));


const fevereiro = new Mes("fevereiro");
fevereiro.adicionarLancamento(new Lancamento("Salário", "receita", 3000));
fevereiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
fevereiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 250));
fevereiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));

const marco = new Mes("marco");
marco.adicionarLancamento(new Lancamento("Salário", "receita", 4000));
marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
marco.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200));
marco.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
marco.adicionarLancamento(new Lancamento("Internet", "despesa", 200));


const abril = new Mes("abril");
abril.adicionarLancamento(new Lancamento("Salário", "receita", 4000));


const ano = new Ano();
ano.adicionarMes(janeiro);
ano.adicionarMes(fevereiro);
ano.adicionarMes(marco);
ano.adicionarMes(abril);
ano.calcularSaldo();


janeiro.adicionarLancamento(new Lancamento("Escola", "despesa", 500));
fevereiro.adicionarLancamento(new Lancamento("Escola", "despesa", 400));
marco.adicionarLancamento(new Lancamento("Escola", "despesa", 500));
ano.calcularSaldo();

console.log(ano.meses);

function addElement (parent, elementType, text) { // parâmetros necessarios (onde vai add?, qual  elem será criado?, e o text)
    const element = document.createElement(elementType); //criei elemento
    if (text !== "" && text !== undefined && text !== null &&  text !== 0) {
        element.innerText = text;
    }
    parent.appendChild(element); 
}


function renderizar () {
    const app = document.getElementById("app");
    if (app.firstChild) {
        app.firstChild.remove();// apaga o primeiro elemento 
    }
    const painel = document.createElement("div");
    const cores = ["red", "yellow", "green", "blue"];
    const grafico = document.createElement("div");
    grafico.className = "grafico";
    for (const mes of ano.meses) {
        const  coluna = document.createElement("div");
        coluna.className = "grafico-coluna";
        const cor = document.createElement("div");
        cor.style.height = (mes.totalizador.saldo*100)/10000;
        cor.style.background = cores.pop();
        coluna.appendChild(cor);
        const nomeDoMes = document.createElement("div");
        nomeDoMes.className = "grafico-coluna-texto";
        nomeDoMes.innerText = mes.nome;
        coluna.appendChild(cor);
        coluna.appendChild(nomeDoMes);
        grafico.appendChild(coluna);
    }
    painel.appendChild(grafico);
    
    for (const mes of ano.meses) { 
        addElement(painel, "h4" , mes.nome);    
        const tabelaLancamentos = document.createElement("table");
        tabelaLancamentos.className = "tabela-lancamentos";
        for (const lancamento of mes.lancamentos) { 
            const linhaLancamento = document.createElement("tr");
            addElement(linhaLancamento, "td", lancamento.categoria);
            addElement(linhaLancamento, "td", formatarDinheiro(lancamento.getValorString()));
            tabelaLancamentos.appendChild(linhaLancamento);
        }
        const linhaJuros = document.createElement("tr");
        addElement(linhaJuros, "th", "Juros");
        addElement(linhaJuros, "th", mes.totalizador.juros);
        tabelaLancamentos.appendChild(linhaJuros);
        const linhaRendimentos = document.createElement("tr");
        addElement(linhaRendimentos, "th", "Rendimentos");
        addElement(linhaRendimentos, "th", formatarDinheiro(mes.totalizador.rendimentos));
        tabelaLancamentos.appendChild(linhaRendimentos);
        const linhaSaldo = document.createElement("tr");
        addElement(linhaSaldo, "th", "Total");
        addElement(linhaSaldo, "th", formatarDinheiro(mes.totalizador.saldo));
        tabelaLancamentos.appendChild(linhaSaldo);
        painel.appendChild(tabelaLancamentos);
    }
    app.appendChild(painel);
} 

renderizar(); //por causa do if posso chamar a função quantas vezes quiser pois apagará o primeiro elemento


function adicionarLancamento () {
    const mes = document.getElementById("mes");
    const categoria = document.getElementById("categoria");
    const tipo = document.getElementById("tipo");
    const valor = document.getElementById("valor");
    
    ano.adicionarLancamento(mes.value,new Lancamento(categoria.value, tipo.value, parseFloat(valor.value)))
    ano.calcularSaldo();
    renderizar();
    mes.value = ano.meses[0].nome;
    categoria.value ='';
    tipo.value ='';
    categoria.value ='';
 }


const botao = document.getElementById("botao");
botao.addEventListener("click", adicionarLancamento);

const mesSelect = document.getElementById("mes");
for ( const mes of ano.meses) {
    const option = document.createElement("option");
    option.text = mes.nome;
    mesSelect.add(option);
}



