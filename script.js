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
        for (let i = 1; i <= 31; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.dataset.dia = i;

            if (diasTrabalhados[i]) {
                button.classList.add('trabalhado');
                if (diasTrabalhados[i] < '08:51') {
                    button.
