async function showAddress(cep) {
    var errorMessage = document.getElementById('erro');
    errorMessage.innerHTML = "";
    try {
        var getCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var getConvertedCEP = await getCEP.json();
        if (getConvertedCEP.erro) {
            throw Error('CEP não existente!');
        }
        var city = document.getElementById('cidade');
        var address = document.getElementById('endereco');
        var state = document.getElementById('estado');

        city.value = getConvertedCEP.localidade;
        address.value = getConvertedCEP.logradouro;
        state.value = getConvertedCEP.uf;

        console.log(getConvertedCEP);
        return getConvertedCEP;
    } catch (erro) {
        errorMessage.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => showAddress(cep.value));