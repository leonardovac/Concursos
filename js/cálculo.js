function mostrarAviso(title, message) {
    let content = `<div class="toast-header">
                <img alt="" class="rounded me-2" src="">
                <strong class="me-auto">${title}</strong>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="toast" type="button"></button>
            </div>
            <div class="toast-body">${message}</div>`
    let notificacao = document.getElementById('notificação');
    notificacao.innerHTML = content;
    bootstrap.Toast.getOrCreateInstance(notificacao).show()
}

// Calculo da nota
function calcular(escola) {
    let Materias, inputID;

    if (escola === "ESA") {
        Materias = {PT:0, MAT:0, GEO:0, HIS:0, ING:0}
        inputID = ["PT", "MAT", "GEO", "HIS", "ING"]
    } else if (escola === "EsPCEx") {
        Materias = {PT:0, FIS:0, QUI:0, MAT:0, GEO:0, HIS:0, ING:0}
        inputID = ["PT", "FIS", "QUI", "MAT", "GEO", "HIS", "ING"]
    }

    let Acertos = 0;
    let contemNegativos = false;
    for (let i = 0; i < inputID.length; i++) {
        Acertos += Materias[`${inputID[i]}`] = Number(document.getElementById(escola+'-'+inputID[i]).value);
        if (Materias[`${inputID[i]}`] < 0) {
            contemNegativos = true;
            Materias[`${inputID[i]}`] = 0
        }
    }

    console.log(Acertos)
    console.log(Materias)

    if (contemNegativos) {
        mostrarAviso("VAC", "🤓 Acertos negativos?");
    } else {
        let NotaFinal, Percentual;
        if (escola === "ESA") {
            NotaFinal = ((10/14 * Materias.PT) + (10/14 * Materias.MAT) + (5/6 * Materias.GEO) + (5/6 * Materias.HIS) + Materias.ING)/4
            Percentual = (Acertos/50)*100
        } else if (escola === "EsPCEx") {
            NotaFinal = ((2 * Materias.PT/20*10) + (1.5 * Materias.FIS/12 * 10) + ((Materias.QUI/12 * 10) + (2 * Materias.MAT/20*10) +
                        (Materias.GEO/12*10) + (Materias.HIS/12*10) + (1.5 * Materias.ING/12*10))) / 10
            Percentual = (Acertos/100)*100
        }
        mostrarResultado("Nota", NotaFinal, Percentual)
    }
    //}
}

function mostrarResultado(string, nota, percentual) {
    const resultado = document.querySelector(".resultado");

    let tipoBarra;
    if (nota < 6) {
        tipoBarra = "bg-danger"
    } else if (nota < 8) {
        tipoBarra = "bg-warning"
    } else if (nota < 9) {
        tipoBarra = "bg-info"
    } else {
        tipoBarra = "bg-success"
    }

    let barra = `<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${percentual}" aria-valuemin="0" aria-valuemax="50" style="height:12px">
                            <div class="progress-bar ${tipoBarra}" style="width: ${percentual}%">${percentual}%</div>
                        </div>`

    if (nota < 6)
        resultado.innerHTML = `<div class="alert alert-danger" role="alert">${string} = ${nota}${barra}</div>`
    else if (nota < 8)
        resultado.innerHTML = `<div class="alert alert-warning" role="alert">${string} = ${nota}${barra}</div>`
    else if (nota < 9)
        resultado.innerHTML = `<div class="alert alert-info" role="alert">${string} = ${nota}${barra}</div>`
    else
        resultado.innerHTML = `<div class="alert alert-success" role="alert">${string} = ${nota}${barra}</div>`
}