window.addEventListener("load", function () {
  calcular();
  var formulario = document.getElementById("entradas");
  formulario.addEventListener("submit", onSubmit);
});

function onSubmit(evt) {
  evt.preventDefault();
  calcular();
}

var valor = document.getElementById("valor");
var prazo = document.getElementById("prazo");
var juros = document.getElementById("juros");
var tbody = document.querySelector("tbody");

function calcular() {
  var total = valor.valueAsNumber;
  var meses = prazo.valueAsNumber * 12;
  var jurosAA = juros.valueAsNumber;
  var jurosAM = (1 + jurosAA) ** (1 / 12) - 1;
  var amortizacao = total / meses;
  document.getElementById("meses").valueAsNumber = meses;
  document.getElementById("jurosam").valueAsNumber = jurosAM;

  for (var i = 0; i < 5; i++) {
    var saldoDevedor = total - i * amortizacao;
    var jurosP = saldoDevedor * jurosAM;
    var tr = tbody.children[i];
    tr.children[1].textContent = amortizacao.toFixed(2);
    tr.children[2].textContent = jurosP.toFixed(2);
    tr.children[3].textContent = (amortizacao + jurosP).toFixed(2);
  }

  var totalj = 0;
  for (var i = 0; i < meses; i++) {
    var saldoDevedor = total - i * amortizacao;
    var jurosP = saldoDevedor * jurosAM;
    totalj += jurosP;
  }
  document.getElementById("total").value = totalj.toFixed(2);
}

calcular();
