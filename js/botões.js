function mudarConcurso(escola) {
    let escolas = ["ESA", "EsPCEx"]
    for (let e = 0; e < escolas.length; e++) {
        document.getElementById(escolas[e]).style.display="none";
        }
    document.getElementById(escola).style.display = "block";
}

//Zerando o elemento resultado e desabilitando o botão Calcular
function limpar() {
    const resultado = document.querySelector(".resultado");
    resultado.innerHTML = "";
}