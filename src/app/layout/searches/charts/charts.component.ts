import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js/dist/Chart.js';
import { FormService } from 'src/app/service/form.service';
import { SearchService } from 'src/app/service/search.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'chartjs-plugin-labels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.register({ ChartDataLabels });

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  search: any;
  search_code: any;
  description: any;
  mayor: any;
  city: any;
  search_id: any;
  dataForm: any;
  gender_count: [any] ;
  gender_name: any[];
  age_name: any[];
  age_count: any[];
  religion_name: any[];
  religion_count: any[];
  occupation_name: any[];
  occupation_count: any[];
  home_name: any[];
  home_count: any[];
  mayor_management_name: any[];
  mayor_management_count: any[];
  governor_management_name: any[];
  governor_management_count: any[];
  president_management_name: any[];
  president_management_count: any[];
  vote_spontaneous_governor_name: any[];
  vote_spontaneous_governor_count: any[];
  reject_spontaneous_governor_name: any[];
  reject_spontaneous_governor_count: any[];
  vote_stimulated_governor_name: any[];
  vote_stimulated_governor_count: any[];
  reject_stimulated_governor_name: any[];
  reject_stimulated_governor_count: any[];
  vote_president_name: any[];
  vote_president_count: any[];
  reject_vote_president_name: any[];
  reject_vote_president_count: any[];
  vote_senator_name: any[];
  vote_senator_count: any[];
  reject_senator_name: any[];
  reject_senator_count: any[];
  vote_state_dep_name: any[];
  vote_state_dep_count: any[];
  vote_federal_dep_name: any[];
  vote_federal_dep_count: any[];
  social_demands_name: any[];
  social_demands_count: any[];
  accept_president_indicate_name: any[];
  accept_president_indicate_count: any[];
  accept_governor_indicate_name: [any];
  accept_governor_indicate_count: any[];
  accept_indicator_senator_name: any[];
  accept_indicator_senator_count: any[];
  accept_indicator_dep_federal_name: any[];
  accept_indicator_dep_federal_count: any[];
  accept_indicator_dep_state_name: any[];
  accept_indicator_dep_state_count: any[];
  vote_spontaneous_mayor_name: any[];
  vote_spontaneous_mayor_count: any[];
  chart: Chart;




  constructor(private formService: FormService, private route: ActivatedRoute, private searchService: SearchService) {
    this.route.params.subscribe(params => this.search_id = params['id']);
  }

  async ngOnInit() {
    await this.getSearch()
    await this.getDataSearch();
    const reducer = (accumulator, courrentValue) => accumulator + courrentValue;

    // Grafico de genero.
    await new Chart('myChartGender', {
      type: 'pie',
      data: {
        labels: this.gender_name,
        datasets: [{
          data: this.gender_count,
          backgroundColor: [
            'rgb(30,144,255)',
            'rgb(250,128,114)',
          ],

          borderWidth: 1
        }], label: 'Perfil dos eleitores por sexo:',
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom'
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue / total * 100).toFixed(2));
              return currentValue + ' (' + percentage + '%)';
            },
            title: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
      }
    });

    // Gráfico de idade
    await new Chart('myChartAge', {
      type: 'bar',
      data: {
        labels: this.age_name,
        datasets: [{
          data: this.age_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(210,180,140)',
            'rgb(75, 192, 192)',
            'rgb(255,165,0)',
            'rgb(54,54,54)'
          ],
          tamanhoArr: this.age_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 25
          }
        },
        legend: {
          display: false
        },

        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.age_count.reduce(reducer),
              stepSize: Math.round(this.age_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Ocupação
    await new Chart('myChartOccupation', {
      type: 'bar',
      data: {
        labels: this.occupation_name,
        datasets: [{
          data: this.occupation_count,
          backgroundColor: [
            'rgb(0, 150, 0)',
            'rgb(178, 34, 34)',
            'rgb(54, 162, 235)',
            'rgb(85,107,47)',
            'rgb(0,128,128)',
            'rgb(54, 54, 54)'
          ],
          tamanhoArr: this.occupation_count.reduce(reducer)

        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 25
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.occupation_count.reduce(reducer),
              stepSize: Math.round(this.occupation_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    // Gráfico de Situação de moradia
    await new Chart('myChartHousing', {
      type: 'bar',
      data: {
        labels: this.home_name,
        datasets: [{
          data: this.home_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 54, 54)'
          ],
          tamanhoArr: this.home_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.home_count.reduce(reducer),
              stepSize: Math.round(this.home_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Religião
    await new Chart('myChartReligion', {
      type: 'bar',
      data: {
        labels: this.religion_name,
        datasets: [{
          data: this.religion_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.religion_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.religion_count.reduce(reducer),
              stepSize: Math.round(this.religion_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Avaliação de Prefeito
    await new Chart('myChartAvaPref', {
      type: 'bar',
      data: {
        labels: this.mayor_management_name,
        datasets: [{
          data: this.mayor_management_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 215, 0)',
            'rgb(255,165,0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.mayor_management_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.mayor_management_count.reduce(reducer),
              stepSize: Math.round(this.mayor_management_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Avaliação Governador
    await new Chart('myChartAvaGov', {
      type: 'bar',
      data: {
        labels: this.governor_management_name,
        datasets: [{
          data: this.governor_management_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 215, 0)',
            'rgb(255,165,0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.governor_management_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.governor_management_count.reduce(reducer),
              stepSize: Math.round(this.governor_management_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    // Gráfico de Avaliação Presidente
    await new Chart('myChartAvaPres', {
      type: 'bar',
      data: {
        labels: this.president_management_name,
        datasets: [{
          data: this.president_management_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 215, 0)',
            'rgb(255,165,0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.president_management_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                display: true,
                min: 0,
                max: this.president_management_count.reduce(reducer),
                stepSize: Math.round(this.president_management_count.reduce(reducer) / 5)
              }
            }]
          }
        }
      }
    });


    // Gráfico de Votos espontâneos para governador
    var canvas = document.getElementById("spontGovChart") as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    var spontGovChart = await new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.vote_spontaneous_governor_name,
        datasets: [{
          data: this.vote_spontaneous_governor_count,
          backgroundColor: [
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',

          ],
          tamanhoArr: this.vote_spontaneous_governor_count.reduce(reducer)
        }],

      },
      options: {
        "hover": {
          "animationDuration": 0
        },
        "animation": {
          "duration": 1,
          "onComplete": function () {
            var chartInstance = this.chart
            ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = this.chart.config.options.defaultFontColor;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = ((dataset.data[index] / dataset.tamanhoArr) * 100).toFixed(1) + '%';
                ctx.fillText(data, bar._model.x + 4, bar._model.y + 7);
              });
            });
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.vote_spontaneous_governor_count.reduce(reducer),
              stepSize: Math.round(this.vote_spontaneous_governor_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Rejeição espontânea para governador
    var canvas = document.getElementById("spontRejGovChart") as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    var spontRejGovChart = await new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.reject_spontaneous_governor_name,
        datasets: [{
          data: this.reject_spontaneous_governor_count,
          backgroundColor: [
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
            'rgb(255,0,0)',
          ],
          tamanhoArr: this.reject_spontaneous_governor_count.reduce(reducer)
        }],

      },
      options: {
        "hover": {
          "animationDuration": 0
        },
        "animation": {
          "duration": 1,
          "onComplete": function () {
            var chartInstance = this.chart
            ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = this.chart.config.options.defaultFontColor;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = ((dataset.data[index] / dataset.tamanhoArr) * 100).toFixed(1) + '%';
                ctx.fillText(data, bar._model.x + 4, bar._model.y + 7);
              });
            });
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.reject_spontaneous_governor_count.reduce(reducer),
              stepSize: Math.round(this.reject_spontaneous_governor_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Intenção de Votos Estimulada para governador
    await new Chart('myChartEstimGov', {
      type: 'bar',
      data: {
        labels: this.vote_stimulated_governor_name,
        datasets: [{
          data: this.vote_stimulated_governor_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.vote_stimulated_governor_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.vote_stimulated_governor_count.reduce(reducer),
              stepSize: Math.round(this.vote_stimulated_governor_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Rejeição Estimulada para governador
    await new Chart('myChartRejEstimGov', {
      type: 'bar',
      data: {
        labels: this.reject_stimulated_governor_name,
        datasets: [{
          data: this.reject_stimulated_governor_count,
          backgroundColor: [
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
          ],
          tamanhoArr: this.reject_stimulated_governor_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.reject_stimulated_governor_count.reduce(reducer),
              stepSize: Math.round(this.reject_stimulated_governor_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Intenção de voto Estimulada para presidente
    await new Chart('myChartEstimPres', {
      type: 'bar',
      data: {
        labels: this.vote_president_name,
        datasets: [{
          data: this.vote_president_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.vote_president_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.vote_president_count.reduce(reducer),
              stepSize: Math.round(this.vote_president_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Rejeição Estimulada para presidente
    await new Chart('myChartRejEstimPres', {
      type: 'bar',
      data: {
        labels: this.reject_vote_president_name,
        datasets: [{
          data: this.reject_vote_president_count,
          backgroundColor: [
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
          ],
          tamanhoArr: this.reject_vote_president_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.reject_vote_president_count.reduce(reducer),
              stepSize: Math.round(this.reject_vote_president_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Intenção de voto Estimulada para Senador
    await new Chart('myChartEstimSenator', {
      type: 'bar',
      data: {
        labels: this.vote_senator_name,
        datasets: [{
          data: this.vote_senator_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.vote_senator_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.vote_senator_count.reduce(reducer),
              stepSize: Math.round(this.vote_senator_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Rejeição Estimulada para Senador
    await new Chart('myChartRejEstimSenator', {
      type: 'bar',
      data: {
        labels: this.reject_senator_name,
        datasets: [{
          data: this.reject_senator_count,
          backgroundColor: [
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',
            'rgb(255, 0, 0)',

          ],
          tamanhoArr: this.reject_senator_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.reject_senator_count.reduce(reducer),
              stepSize: Math.round(this.reject_senator_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Intenção de voto Espontânea para Deputado Federal
    await new Chart('myChartFederalDep', {
      type: 'bar',
      data: {
        labels: this.vote_federal_dep_name,
        datasets: [{
          data: this.vote_federal_dep_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.vote_federal_dep_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.vote_federal_dep_count.reduce(reducer),
              stepSize: Math.round(this.vote_federal_dep_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Intenção de voto Espontânea para Deputado Estadual
    await new Chart('myChartStateDep', {
      type: 'bar',
      data: {
        labels: this.vote_state_dep_name,
        datasets: [{
          data: this.vote_state_dep_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
          ],
          tamanhoArr: this.vote_state_dep_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.vote_state_dep_count.reduce(reducer),
              stepSize: Math.round(this.vote_state_dep_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Aceita indicação do prefeito para Presidente
    await new Chart('myChartIndPresident', {
      type: 'bar',
      data: {
        labels: this.accept_president_indicate_name,
        datasets: [{
          data: this.accept_president_indicate_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_president_indicate_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_president_indicate_count.reduce(reducer),
              stepSize: Math.round(this.accept_president_indicate_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Aceita indicação do prefeito para Governador
    await new Chart('myChartIndGovernor', {
      type: 'bar',
      data: {
        labels: this.accept_governor_indicate_name,
        datasets: [{
          data: this.accept_governor_indicate_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_governor_indicate_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_governor_indicate_count.reduce(reducer),
              stepSize: Math.round(this.accept_governor_indicate_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Aceita indicação do prefeito para Senador
    await new Chart('myChartIndSenator', {
      type: 'bar',
      data: {
        labels: this.accept_indicator_senator_name,
        datasets: [{
          data: this.accept_indicator_senator_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_indicator_senator_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_indicator_senator_count.reduce(reducer),
              stepSize: Math.round(this.accept_indicator_senator_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Aceita indicação do prefeito para Deputado Federal
    await new Chart('myChartIndDepFed', {
      type: 'bar',
      data: {
        labels: this.accept_indicator_dep_federal_name,
        datasets: [{
          data: this.accept_indicator_dep_federal_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_indicator_dep_federal_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_indicator_dep_federal_count.reduce(reducer),
              stepSize: Math.round(this.accept_indicator_dep_federal_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Aceita indicação do prefeito para Deputado Federal
    await new Chart('myChartIndDepState', {
      type: 'bar',
      data: {
        labels: this.accept_indicator_dep_state_name,
        datasets: [{
          data: this.accept_indicator_dep_state_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_indicator_dep_state_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_indicator_dep_state_count.reduce(reducer),
              stepSize: Math.round(this.accept_indicator_dep_state_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico Demandas sociais
    var canvas = document.getElementById("myChartSocialDemands") as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    var myChartSocialDemands = await new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.social_demands_name,
        datasets: [{
          data: this.social_demands_count,
          backgroundColor: [
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
            'rgb(75, 192, 192)',
          ],
          tamanhoArr: this.social_demands_count.reduce(reducer)
        }],

      },
      options: {
        "hover": {
          "animationDuration": 0
        },
        "animation": {
          "duration": 1,
          "onComplete": function () {
            var chartInstance = this.chart;
            ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = this.chart.config.options.defaultFontColor;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = ((dataset.data[index] / dataset.tamanhoArr) * 100).toFixed(1) + '%';
                ctx.fillText(data, bar._model.x + 4, bar._model.y + 7);
              });
            });
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.social_demands_count.reduce(reducer),
              stepSize: Math.round(this.social_demands_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Opinião Espontãnea para prefeito
    await new Chart('myChartEspPref', {
      type: 'bar',
      data: {
        labels: this.vote_spontaneous_mayor_name,
        datasets: [{
          data: this.vote_spontaneous_mayor_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(139, 69, 19)',
            'rgb(54, 54, 54)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.vote_spontaneous_mayor_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.vote_spontaneous_mayor_count.reduce(reducer),
              stepSize: Math.round(this.vote_spontaneous_mayor_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    
    // Gráfico de Indicação do prefeito para presidente
    await new Chart('myChartIndPresident', {
      type: 'bar',
      data: {
        labels: this.accept_president_indicate_name,
        datasets: [{
          data: this.accept_governor_indicate_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(255,0,0)',
            'rgb(54,54,54)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_governor_indicate_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_governor_indicate_count.reduce(reducer),
              stepSize: Math.round(this.accept_governor_indicate_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Indicação do prefeito para senador
    await new Chart('myChartIndSenator', {
      type: 'bar',
      data: {
        labels: this.accept_indicator_senator_name,
        datasets: [{
          data: this.accept_indicator_senator_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(255,0,0)',
            'rgb(54,54,54)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_indicator_senator_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_indicator_senator_count.reduce(reducer),
              stepSize: Math.round(this.accept_indicator_senator_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Indicação do prefeito para deputado federal
    await new Chart('myChartIndFederalDep', {
      type: 'bar',
      data: {
        labels: this.accept_indicator_dep_federal_name,
        datasets: [{
          data: this.accept_indicator_dep_federal_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(255,0,0)',
            'rgb(54,54,54)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_indicator_dep_federal_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_indicator_dep_federal_count.reduce(reducer),
              stepSize: Math.round(this.accept_indicator_dep_federal_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Indicação do prefeito para deputado estadual
    await new Chart('myChartIndStateDep', {
      type: 'bar',
      data: {
        labels: this.accept_indicator_dep_state_name,
        datasets: [{
          data: this.accept_indicator_dep_state_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(255,0,0)',
            'rgb(54,54,54)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_indicator_dep_state_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_indicator_dep_state_count.reduce(reducer),
              stepSize: Math.round(this.accept_indicator_dep_state_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    // Gráfico de Indicação do prefeito para governador
    await new Chart('myChartIndGovernor', {
      type: 'bar',
      data: {
        labels: this.accept_governor_indicate_name,
        datasets: [{
          data: this.accept_governor_indicate_count,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(255,0,0)',
            'rgb(54,54,54)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.accept_governor_indicate_count.reduce(reducer)
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        legend: {
          display: false
        },
        plugins: {
          labels: {
            render: function (args) {
              let max = args.dataset.tamanhoArr;
              let result = args.value * 100 / max
              return result.toFixed(1) + '%'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              min: 0,
              max: this.accept_governor_indicate_count.reduce(reducer),
              stepSize: Math.round(this.accept_governor_indicate_count.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

  }

  async getDataSearch() {
    await this.formService.getForms(this.search_id).then((result: any) => {
      if (result) {
        this.gender_name = result.gender_name;
        this.gender_count = result.gender_count;
        this.age_name = result.age_name;
        this.age_count = result.age_count;
        this.occupation_name = result.occupation_name;
        this.occupation_count = result.occupation_count;
        this.religion_name = result.religion_name;
        this.religion_count = result.religion_count;
        this.home_name = result.home_name;
        this.home_count = result.home_count;
        this.mayor_management_name = result.mayor_management_name;
        this.mayor_management_count = result.mayor_management_count;
        this.governor_management_name = result.governor_management_name;
        this.governor_management_count = result.governor_management_count;
        this.president_management_name = result.president_management_name;
        this.president_management_count = result.president_management_count;
        this.vote_spontaneous_governor_name = result.vote_spontaneous_governor_name;
        this.vote_spontaneous_governor_count = result.vote_spontaneous_governor_count;
        this.reject_spontaneous_governor_name = result.reject_spontaneous_governor_name;
        this.reject_spontaneous_governor_count = result.reject_spontaneous_governor_count;
        this.vote_stimulated_governor_name = result.vote_stimulated_governor_name;
        this.vote_stimulated_governor_count = result.vote_stimulated_governor_count;
        this.reject_stimulated_governor_name = result.reject_stimulated_governor_name;
        this.reject_stimulated_governor_count = result.reject_stimulated_governor_count;
        this.vote_president_name = result.vote_president_name;
        this.vote_president_count = result.vote_president_count;
        this.reject_vote_president_name = result.reject_vote_president_name;
        this.reject_vote_president_count = result.reject_vote_president_count;
        this.vote_senator_name = result.vote_senator_name;
        this.vote_senator_count = result.vote_senator_count;
        this.reject_senator_name = result.reject_senator_name;
        this.reject_senator_count = result.reject_senator_count;
        this.vote_state_dep_name = result.vote_state_dep_name;
        this.vote_state_dep_count = result.vote_state_dep_count;
        this.vote_federal_dep_name = result.vote_federal_dep_name;
        this.vote_federal_dep_count = result.vote_federal_dep_count;
        this.social_demands_name = result.social_demands_name;
        this.social_demands_count = result.social_demands_count;
        this.accept_president_indicate_name = result.accept_president_indicate_name;
        this.accept_president_indicate_count = result.accept_president_indicate_count;
        this.accept_governor_indicate_name = result.accept_governor_indicate_name;
        this.accept_governor_indicate_count = result.accept_governor_indicate_count;
        this.accept_indicator_senator_name = result.accept_indicator_senator_name;
        this.accept_indicator_senator_count = result.accept_indicator_senator_count;
        this.accept_indicator_dep_federal_name = result.accept_indicator_dep_federal_name;
        this.accept_indicator_dep_federal_count = result.accept_indicator_dep_federal_count;
        this.accept_indicator_dep_state_name = result.accept_indicator_dep_state_name;
        this.accept_indicator_dep_state_count = result.accept_indicator_dep_state_count;
        this.vote_spontaneous_mayor_name  = result.vote_spontaneous_mayor_name;
        this.vote_spontaneous_mayor_count  = result.vote_spontaneous_mayor_count;

      }
    });
  }


  getSearch() {
    this.searchService.getSearch(this.search_id).then((result: any) => {
      if (result) {
        this.search = result;
        this.description = this.search.description;
        this.mayor = this.search.mayor;
        this.city = this.search.city;
      }
    });
  }

}
