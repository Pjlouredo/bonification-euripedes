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

    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-yFhZgDW07QK8_YAWT_gYwHxEIFICXaWK3tz_px0KbakEND-9CxWrpViT6GePNCYuzQ79H1Uc46jD/pub?output=csv'; // Substitua pelo seu link

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
                    diaHoraSelecionadoDiv.textContent = `Dia ${selectedDay}, Horário: <span class="math-inline">\{diasTrabalhados\[selectedDay\]\}\`;
\}
\}\);
calendarioDiv\.appendChild\(button\);
\}
\}
function atualizarCalendario\(\) \{
calendarioDiv\.innerHTML \= '';
gerarCalendario\(\);
\}
function atualizarTotalDiasTrabalhados\(\) \{
totalDiasTrabalhados \= document\.querySelectorAll\('\#calendario button\.trabalhado'\)\.length;
totalDiasTrabalhadosSpan\.textContent \= totalDiasTrabalhados;
\}
function adicionarAtendimento\(\) \{
const dia \= prompt\('Dia do Atendimento\:'\);
const valor \= parseFloat\(prompt\('Valor do Atendimento\:'\)\);
if \(dia && \!isNaN\(valor\)\) \{
atendimentos\.push\(\{
dia\: dia,
valor\: valor
\}\);
atualizarTabelaAtendimentos\(\);
atualizarComissaoEComplementacao\(\);
\} else \{
alert\('Por favor, insira um dia e valor válidos\.'\);
\}
\}
function atualizarTabelaAtendimentos\(\) \{
atendimentosCorpo\.innerHTML \= '';
atendimentos\.forEach\(\(atendimento, index\) \=\> \{
const row \= document\.createElement\('tr'\);
const diaCell \= document\.createElement\('td'\);
const valorCell \= document\.createElement\('td'\);
const editCell \= document\.createElement\('td'\);
const editButton \= document\.createElement\('button'\);
diaCell\.textContent \= atendimento\.dia;
valorCell\.textContent \= 'R</span> ' + atendimento.valor.toFixed(2);

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
