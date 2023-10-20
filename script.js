import Chart from 'chart.js/auto';




// Seleciona os elementos do canvas
const actorsCanvas = document.getElementById('actorsChart');
const actressesCanvas = document.getElementById('actressesChart');

// Função para carregar dados do arquivo CSV e criar gráficos
function createChartFromCSV(canvas, data) {
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.datasets[0].label,
                data: data.datasets[0].data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para ler dados CSV
function readCSV(file, canvas) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            const labels = results.data.map(item => item.Year);
            const data = results.data.map(item => item.Age);

            createChartFromCSV(canvas, {
                labels,
                datasets: [{
                    label: 'Idade dos Vencedores do Oscar',
                    data
                }]
            });
        }
    });
}

// Carregando e criando gráficos para atores e atrizes
fetch('./baseDados/oscar_age_male.csv') // Substitua pelo caminho correto para o arquivo CSV dos atores
    .then(response => response.text())
    .then(data => readCSV(data, actorsCanvas));

fetch('./baseDados/oscar_age_female.csv') // Substitua pelo caminho correto para o arquivo CSV das atrizes
    .then(response => response.text())
    .then(data => readCSV(data, actressesCanvas));
