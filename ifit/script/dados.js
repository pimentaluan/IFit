import exercicios from './bancodetreinos.js';

let partesDoCorpo = ['Tórax, Ombro ou Tríceps', 'Costas, Abdômen ou Bíceps', 'Parte Inferior, Pernas ou Glúteo'];
let diaAtual = 0;

function gerarParteTrabalhada(dias, lesao) {
  let partes = [];
  let i = 0;
  while (partes.length < dias) {
    let parte = partesDoCorpo[i % partesDoCorpo.length];
    if (parte !== lesao) {
      partes.push(parte);
    }
    i++;
  }
  return partes;
}

function selecionarExerciciosAleatorios(exercicios, quantidade) {
  let selecionados = [];
  while (selecionados.length < quantidade && exercicios.length > 0) {
    let indice = Math.floor(Math.random() * exercicios.length);
    selecionados.push(exercicios[indice]);
    exercicios.splice(indice, 1);
  }
  return selecionados;
}

function montarTreinos() {
  let dias = Number(document.querySelector('#dias').value);
  let lesao = document.querySelector('#lesao').value;
  let objetivo = document.querySelector("#objetivo").value.toLowerCase();
  let local = document.querySelector("#local").value;

  let partesTrabalhadas = gerarParteTrabalhada(dias, lesao);

  let treinos = [];

  for (let parte of partesTrabalhadas) {
    let possiveisExercicios = exercicios[parte].filter(exercicio =>
      exercicio.objetivo.toLowerCase() === objetivo &&
      (local === 'Academia' || exercicio.local === local)
    );

    if (possiveisExercicios.length === 0) {
      console.log(`Não há exercícios disponíveis para ${parte} com o objetivo ${objetivo} no local ${local}.`);
      continue;
    }

    let exerciciosSelecionados = selecionarExerciciosAleatorios(possiveisExercicios, Math.min(possiveisExercicios.length, 6 + Math.floor(Math.random() * 3)));

    treinos.push({
      parteDoCorpo: parte,
      exercicios: exerciciosSelecionados
    });
  }

  console.log('Treinos: ', treinos);
  return treinos;
}

function mostrarDia(dia) {
  let treinos = montarTreinos();

  if (!treinos || !Array.isArray(treinos)) {
    console.error('A função montarTreinos() deve retornar um array!');
    return;
  }


  if (dia >= treinos.length) {
    diaAtual = 0;
    dia = 0;
  }

  if (dia < 0) {
    diaAtual = treinos.length - 1;
    dia = treinos.length - 1;
  }

  let infoCaracteristicas = document.querySelector('#infoCaracteristicas');

  if (infoCaracteristicas) {
    infoCaracteristicas.style.display = 'none';
  } else {
    console.error('Elemento #infoCaracteristicas não encontrado!');
    return;
  }

  let treinosList = document.querySelector("#treinos");

  if (treinosList) {
    treinosList.innerHTML = '';
  } else {
    console.error('Elemento #treinos não encontrado!');
    return;
  }

  let navegacao = document.querySelector('#navegacao');
  navegacao.style.display = 'block';

  let treinoItem = document.createElement("li");
  treinoItem.className = "treino";

  let parteDoCorpo = document.createElement("h2");
  parteDoCorpo.textContent = `Dia ${dia + 1}: ${treinos[dia].parteDoCorpo}`;
  treinoItem.appendChild(parteDoCorpo);

  for (let exercicio of treinos[dia].exercicios) {
    let exercicioDiv = document.createElement("div");

    let exercicioNome = document.createElement("span");
    exercicioNome.className = "exercicio";
    exercicioNome.textContent = exercicio.nome;

    let detalhesDiv = document.createElement('div');
    detalhesDiv.className = 'detalhes';
    detalhesDiv.innerHTML = `${exercicio.series} séries - ${exercicio.repeticoes} repetições`;
    detalhesDiv.style.display = 'none';

    exercicioNome.addEventListener('click', function() {
      detalhesDiv.style.display = detalhesDiv.style.display === 'none' ? 'block' : 'none';
    });

    exercicioDiv.appendChild(exercicioNome);
    exercicioDiv.appendChild(detalhesDiv);

    treinoItem.appendChild(exercicioDiv);
  }

  treinosList.appendChild(treinoItem);
}


document.querySelector('#montarTreino').addEventListener('click', function() {
  diaAtual = 0;
  mostrarDia(diaAtual);
});

document.querySelector('#proximoDia').addEventListener('click', function() {
  diaAtual++;
  mostrarDia(diaAtual);
});

document.querySelector('#diaAnterior').addEventListener('click', function() {
  diaAtual--;
  mostrarDia(diaAtual);
});

novasop.addEventListener('click', function() {
  return montarTreinos()
});
