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

    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-yFhZgDW07QK8_YAWT_gYwHxEIFICXaWK3tz_px0KbakEND-9CxWrpViT6GePNCYuzQ79H1Uc46jD/pub?output=csv';

    let totalDiasTrabalhados = 0;
    let atendimentos = [];
    let selectedDay = null;
    let selectedTime = null;
    let diasTrabalhados = {};

    function gerarCalendario() {
        for (let i = 1; i <= 31; i++) {
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

    function atualizarCalendario() {
        calendarioDiv.innerHTML = '';
        gerarCalendario();
    }

    function atualizarTotalDiasTrabalhados() {
        totalDiasTrabalhados = document.querySelectorAll('#calendario button.trabalhado').length;
        totalDiasTrabalhadosSpan.textContent = totalDiasTrabalhados;
    }

    // ... (outras funções) ...

    function carregarDadosDaPlanilha() {
        fetch(SHEET_URL)
            .then(response => response.text())
            .then(csv => {
                const linhas = csv.split('\n');
                linhas.forEach(linha => {
                    const colunas = linha.split(',');
                    if (colunas.length === 4) {
                        const data = colunas[0];
                        const horario = colunas[1];
                        const atendimentoDia = colunas[2];
                        const atendimentoValor = parseFloat(colunas[3]);

                        if (data && horario) {
                            diasTrabalhados[data] = horario;
                        }

                        if (atendimentoDia && !isNaN(atendimentoValor)) {
                            atendimentos.push({
                                dia: atendimentoDia,
                                valor: atendimentoValor
                            });
                        }
                    }
                });
                atualizarCalendario(); // Chamada após processar os dados
                atualizarTabelaAtendimentos();
                atualizarComissaoEComplementacao();
                mostrarRegistrosDeDias();
            });
    }

    carregarDadosDaPlanilha(); // Carrega os dados da planilha ao carregar a página
});
