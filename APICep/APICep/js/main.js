'use strict';

  //TEM ESSA FORMA fetch(url).then(resposta => resposta.json() ).then(console.log);
  //fetch retorna valor (promise) .then é metodo promise manda os dados de retorno para o console log
  // toda promise traz consigo (response e um regex (um erro)) // response tem o metodo json (json tmb retorna uma promise)

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) =>{ //recebe o endereco  o valor do json
    document.getElementById('endereco').value = endereco.logradouro;// aqui tem que ser igual API
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value;     
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url); // recebo o resultado do fetch(promise) /await aguardar eu resolver/ ja dá o retorno do response
        const endereco = await dados.json();//pego os dados e aplico a função json que me retorna  o json que to querendo
        if (endereco.hasOwnProperty('erro')){// antes de enviar pra preencher formulário/ se esse obj tem essa propiedade(error)
            document.getElementById('endereco').value = 'CEP não encontrado'
        }else{
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
}
document.getElementById('cep')
        .addEventListener('focusout' , pesquisarCep); //evento quando sair do campo vai para funçao pesquisar Cep
