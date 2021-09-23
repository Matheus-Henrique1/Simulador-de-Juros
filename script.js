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
  var valortotal = valor.valueAsNumber;
  var meses = prazo.valueAsNumber * 12;
  var jurosAno = juros.valueAsNumber;
  var jurosMes = (1 + jurosAno) ** (1 / 12) - 1;
  var amortizacao = valortotal / meses;
  document.getElementById("meses").valueAsNumber = meses;
  document.getElementById("jurosMes").valueAsNumber = jurosMes;

  for (var i = 0; i < 5; i++) {
    var saldoDevedor = valortotal - i * amortizacao;
    var jurosP = saldoDevedor * jurosMes;
    var tr = tbody.children[i];
    tr.children[1].textContent = amortizacao.toFixed(2);
    tr.children[2].textContent = jurosP.toFixed(2);
    tr.children[3].textContent = (amortizacao + jurosP).toFixed(2);
  }

  var totaljuros = 0;
  for (var i = 0; i < meses; i++) {
    var saldoDevedor = valortotal - i * amortizacao;
    var jurosP = saldoDevedor * jurosMes;
    totaljuros += jurosP;
  }
  document.getElementById("jurosAcumulado").value = totaljuros.toFixed(2);
}

calcular();
