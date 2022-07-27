function contar(){
    let ini = Number(document.getElementById('txti').value)
    let fim = Number(document.getElementById('txtf').value)
    let passo = Number(document.getElementById('txtp').value)
    let res = document.getElementById('res')

    if (ini === 0 || fim === 0 || passo=== 0){
        alert('ERRO')
    }else{
        res.innerHTML = 'Contando... '
        let i = ini
        let f = fim
        let p = passo
        if (i < f) {
            for(let c = i; c <= f; c += p) {
                res.innerHTML +=`${c} \u{1F449}`
            }
            res.innerHTML += `\u{1F3C1}`
        }

        
    }

}
