document.addEventListener('DOMContentLoaded', function () {
  const calendarioDiv = document.getElementById('calendario');
  const totalDiasTrabalhadosSpan = document.getElementById('total-dias-trabalhados');
  const atendimentosCorpo = document.getElementById('atendimentos-corpo');
  const comissaoSpan = document.getElementById('comissao');
  const comissaoValorSpan = document.getElementById('comissao-valor');
  const complementacaoValorSpan = document.getElementById('complementacao-valor');
  const diaHoraSelecionadoDiv = document.getElementById('dia-hora-selecionado');
  const timePopup = document.getElementById('time-popup');
  const timeInput = document.getElementById('time-input');
  const timeConfirmButton = document.getElementById('time-confirm');
  const timeCancelButton = document.getElementById('time-cancel'); 

  let totalDiasTrabalhados = 0;
  let atendimentos = [];
  let selectedDay = null;
  let selectedTime = null;
  let diasTrabalhados = {}; 

  function gerarCalendario() {
    for (let i = 1; i <= 40; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.dataset.dia = i;

      if (diasTrabalhados[i]) {
        button.classList.add('trabalhado');
        if (diasTrabalhados[i] < '08:51') {
          button.classList.add('verde');
        } else {
          button.classList.add('vermelho');
        }
      }

      button.addEventListener('click', function () {
        selectedDay = this.dataset.dia;
        if (!diasTrabalhados[selectedDay]) {
          timePopup.classList.add('show');
        } else {
          diaHoraSelecionadoDiv.textContent = `Dia ${selectedDay}, Horário: ${diasTrabalhados[selectedDay]}`;
        }
      });

      calendarioDiv.appendChild(button);
    }
  }

  function atualizarTotalDiasTrabalhados() {
    totalDiasTrabalhados = document.querySelectorAll('#calendario button.trabalhado').length;
    totalDiasTrabalhadosSpan.textContent = totalDiasTrabalhados;
  }

  function adicionarAtendimento() {
    const dia = prompt('Dia do Atendimento:');
    const valor = parseFloat(prompt('Valor do Atendimento:'));

    if (dia && !isNaN(valor)) {
      atendimentos.push({
        dia: dia,
        valor: valor
      });
      atualizarTabelaAtendimentos();
      atualizarComissaoEComplementacao();
    } else {
      alert('Por favor, insira um dia e valor válidos.');
    }
  }

  function atualizarTabelaAtendimentos() {
    atendimentosCorpo.innerHTML = '';
    atendimentos.forEach((atendimento, index) => {
      const row = document.createElement('tr');
      const diaCell = document.createElement('td');
      const valorCell = document.createElement('td');
      const editCell = document.createElement('td');
      const editButton = document.createElement('button');

      diaCell.textContent = atendimento.dia;
      valorCell.textContent = 'R$ ' + atendimento.valor.toFixed(2);

      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => editarAtendimento(index));

      editCell.appendChild(editButton);
      row.appendChild(diaCell);
      row.appendChild(valorCell);
      row.appendChild(editCell);
      atendimentosCorpo.appendChild(row);
    });
  }

  function editarAtendimento(index) {
    const password = prompt('Por favor, insira a senha para editar:');
    if (password === '0110kn@m') {
      const novoDia = prompt('Novo Dia do Atendimento:', atendimentos[index].dia);
      const novoValor = parseFloat(prompt('Novo Valor do Atendimento:', atendimentos[index].valor));

      if (novoDia && !isNaN(novoValor)) {
        atendimentos[index] = {
          dia: novoDia,
          valor: novoValor
        };
        atualizarTabelaAtendimentos();
        atualizarComissaoEComplementacao();
      } else {
        alert('Por favor, insira um dia e valor válidos.');
      }
    } else {
      alert('Senha incorreta. Edição não permitida.');
    }
  }

  function atualizarComissaoEComplementacao() {
    let totalServicos = atendimentos.reduce((acc, atendimento) => acc + atendimento.valor, 0);
    let comissao = totalServicos * 0.4;
    let complementacao = 0;

    if (comissao >= 900 && comissao < 1500) {
      complementacao = Math.min(1500 - comissao, 600);
    }

    comissaoSpan.textContent = 'R$ ' + comissao.toFixed(2);
    comissaoValorSpan.textContent = 'R$ ' + comissao.toFixed(2);
    complementacaoValorSpan.textContent = 'R$ ' + complementacao.toFixed(2);
  }

  function resetarDados() {
    const password = prompt('Por favor, insira a senha para resetar os dados:');
    if (password === '0110kn@m') {
      totalDiasTrabalhados = 0;
      atendimentos = [];
      selectedDay = null;
      selectedTime = null;
      diasTrabalhados = {};

      const buttons = document.querySelectorAll('#calendario button');
      buttons.forEach(button => {
        button.classList.remove('trabalhado');
        button.classList.remove('verde');
        button.classList.remove('vermelho');
      });

      atualizarTotalDiasTrabalhados();
      atualizarTabelaAtendimentos();
      atualizarComissaoEComplementacao();
      diaHoraSelecionadoDiv.textContent = '';

      calendarioDiv.innerHTML = '';
      gerarCalendario();

      alert('Dados resetados com sucesso!');
    } else {
      alert('Senha incorreta. Reset não permitido.');
    }
  }

  gerarCalendario();

  const addServiceButton = document.createElement('button');
  addServiceButton.textContent = 'Adicionar Atendimento';
  addServiceButton.addEventListener('click', adicionarAtendimento);
  document.getElementById('registro-atendimentos').appendChild(addServiceButton);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Resetar Dados';
  resetButton.addEventListener('click', resetarDados);
  document.getElementById('calculo-complementacao').appendChild(resetButton);

  atualizarComissaoEComplementacao();

  timeConfirmButton.addEventListener('click', function () {
    const timeValue = timeInput.value;
    if (timeValue) {
      selectedTime = timeValue;
      diasTrabalhados[selectedDay] = selectedTime; 
      mostrarRegistrosDeDias(); 

      timePopup.classList.remove('show');

      const dayButton = document.querySelector(`#calendario button[data-dia="${selectedDay}"]`);
      if (dayButton) {
        dayButton.classList.add('trabalhado');
        if (timeValue < '08:51') {
          dayButton.classList.add('verde');
        } else {
          dayButton.classList.add('vermelho');
        }
        atualizarTotalDiasTrabalhados();
      }
    } else {
      alert('Por favor, insira um horário.');
    }
  });

  timeCancelButton.addEventListener('click', function () {
    timePopup.classList.remove('show'); 
  });

  for (const day in diasTrabalhados) {
    if (diasTrabalhados.hasOwnProperty(day)) {
      const dayButton = document.querySelector(`#calendario button[data-dia="${day}"]`);
      if (dayButton) {
        dayButton.classList.add('trabalhado');
        if (diasTrabalhados[day] < '08:51') {
          dayButton.classList.add('verde');
        } else {
          dayButton.classList.add('vermelho');
        }
      }
    }
  }
  atualizarTotalDiasTrabalhados();

  function mostrarRegistrosDeDias() {
    let registrosHTML = '';
    for (const dia in diasTrabalhados) {
      if (diasTrabalhados.hasOwnProperty(dia)) {
        registrosHTML += `<p>Dia ${dia}: ${diasTrabalhados[dia]}</p>`;
      }
    }
    diaHoraSelecionadoDiv.innerHTML = registrosHTML || 'Nenhum dia trabalhado registrado.';
  }

  mostrarRegistrosDeDias();
});
