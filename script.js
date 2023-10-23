const actorsCanvas = document.getElementById('actorsChart');
const actressesCanvas = document.getElementById('actressesChart');

// Função para carregar dados do arquivo CSV e criar gráficos
function createDecadeChart(canvas, data, gender) {
    const decades = Array.from({ length: 10 }, (_, i) => (i * 10).toString());
    const decadeAges = decades.map(decade => {
        const filteredResults = data.filter(item => item.Gender === gender && item.Year >= (1900 + parseInt(decade)) && item.Year < (1910 + parseInt(decade)));
        const ages = filteredResults.map(item => item.Age);
        const averageAge = ages.length > 0 ? ages.reduce((acc, age) => acc + age, 0) / ages.length : 0;
        return averageAge;
    });

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: decades,
            datasets: [{
                label: gender,
                data: decadeAges,
                borderColor: gender === 'Male' ? 'rgba(255, 99, 132, 1)' : 'rgba(99, 132, 255, 1)',
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Década'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Idade Média'
                    }
                }
            }
        }
    });
}

// Função para ler dados CSV
function readCSV(file, canvas, gender) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            createDecadeChart(canvas, results.data, gender);
        }
    });
}

// Carregando e criando gráficos para atores e atrizes por década
fetch('./baseDados/oscar_age.csv') // Substitua pelo caminho correto para o arquivo CSV
    .then(response => response.text())
    .then(data => {
        readCSV(data, actorsCanvas, 'Male'); // Gráfico de atores (homens)
        readCSV(data, actressesCanvas, 'Female'); // Gráfico de atrizes (mulheres)
    });
