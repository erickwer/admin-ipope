import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js/dist/chart.js';
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
  description: any;
  mayor: any;
  city: any;
  search_id: any;
  dataForm: any;
  gender: any[];
  age: any[];
  scholarity: any[];
  occupation: any[];
  family_income: any[];
  housing_situation: any[];
  religion: any[];
  ava_sec_nome: any[];
  ava_sec_num: any[];
  ava_pref: any[];
  ava_pres: any[];
  ava_gov: any[];
  ava_cam: any[];
  ava_corona: any[];
  spont_nome_pref: any[];
  spont_num_pref: any[];
  spont_rej_nome: any[];
  spont_rej_num: any[];
  spont_nome_ver: any[];
  spont_num_ver: any[];
  spont_nome_ind: any[];
  spont_num_ind: any[];
  stim_nome_pref: any[];
  stim_num_pref: any[];
  stim_rej_nome: any[];
  stim_rej_num: any[];
  first_disp_nome: any[];
  first_disp_num: any[];
  second_disp_nome: any[];
  second_disp_num: any[];
  social_demands: any[];
  chart: Chart;




  constructor(private formService: FormService, private route: ActivatedRoute, private searchService: SearchService) {
    this.route.params.subscribe(params => this.search_id = params['id']);

  }
  async ngOnInit() {
    await this.getSearch()
    await this.getDataSearch();
    const reducer = (accumulator, courrentValue) => accumulator + courrentValue;

    await new Chart('myChartGender', {
      type: 'pie',
      data: {
        labels: ['Masculino', 'Feminino'],
        datasets: [{
          data: this.gender,
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

    //Gráfico de idade
    await new Chart('myChartAge', {
      type: 'bar',
      data: {
        labels: ['16-24 anos', '25-36 anos', '41-50 anos', '51-65 anos', '+65 anos', 'Não Informou'],
        datasets: [{
          data: this.age,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(210,180,140)',
            'rgb(75, 192, 192)',
            'rgb(255,165,0)',
            'rgb(54,54,54)'
          ],
          tamanhoArr: this.age.reduce(reducer)
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
              max: this.age.reduce(reducer),
              stepSize: Math.round(this.age.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Ocupação
    await new Chart('myChartOccupation', {
      type: 'bar',
      data: {
        labels: ['Empregado', 'Desempregado', 'Empreendedor', 'Trab. Rural', 'Prod. Rural', 'Não Informou'],
        datasets: [{
          data: this.occupation,
          backgroundColor: [
            'rgb(0, 150, 0)',
            'rgb(178, 34, 34)',
            'rgb(54, 162, 235)',
            'rgb(85,107,47)',
            'rgb(0,128,128)',
            'rgb(54, 54, 54)'
          ],
          tamanhoArr: this.occupation.reduce(reducer)

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
              max: this.occupation.reduce(reducer),
              stepSize: Math.round(this.occupation.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Ocupação
    await new Chart('myChartScholarity', {
      type: 'bar',
      data: {
        labels: ['Superior', 'Médio', 'Fundamental', 'Primario/Alfab', 'Não Alfabetizado', 'Não Informou'],
        datasets: [{
          data: this.scholarity,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(176,224,230)',
            'rgb(54, 54, 54)'
          ],
          tamanhoArr: this.scholarity.reduce(reducer)
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
              max: this.spont_num_ver.reduce(reducer),
              stepSize: Math.round(this.spont_num_ver.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Renda Familiar
    await new Chart('myChartIncome', {
      type: 'bar',
      data: {
        labels: ['Até 1 Salário', 'De 1-3', 'De 3-5', 'De 5-10', 'Mais de 10', 'Não Informou'],
        datasets: [{
          data: this.family_income,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(176,224,230)',
            'rgb(54, 54, 54)'
          ],
          tamanhoArr: this.family_income.reduce(reducer)
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
              max: this.family_income.reduce(reducer),
              stepSize: Math.round(this.family_income.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Situação de moradia
    await new Chart('myChartHousing', {
      type: 'bar',
      data: {
        labels: ['Própria', 'Cedida', 'Financiada', 'Alugada', 'Não Informou'],
        datasets: [{
          data: this.housing_situation,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 54, 54)'
          ],
          tamanhoArr: this.housing_situation.reduce(reducer)
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
              max: this.housing_situation.reduce(reducer),
              stepSize: Math.round(this.housing_situation.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Religião
    await new Chart('myChartReligion', {
      type: 'bar',
      data: {
        labels: ['Católica', 'Evangélica', 'Espírita', 'Sem religião', 'Ateu'],
        datasets: [{
          data: this.religion,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.religion.reduce(reducer)
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
              max: this.religion.reduce(reducer),
              stepSize: Math.round(this.religion.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Ava Prefeito
    await new Chart('myChartAvaPref', {
      type: 'bar',
      data: {
        labels: ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo', 'Não Opinou'],
        datasets: [{
          data: this.ava_pref,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 215, 0)',
            'rgb(255,165,0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.ava_pref.reduce(reducer)
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
              max: this.ava_pref.reduce(reducer),
              stepSize: Math.round(this.ava_pref.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico de Ava Camara
    await new Chart('myChartCam', {
      type: 'bar',
      data: {
        labels: ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo', 'Não Opinou'],
        datasets: [{
          data: this.ava_cam,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 215, 0)',
            'rgb(255,165,0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.ava_cam.reduce(reducer)
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
              max: this.ava_cam.reduce(reducer),
              stepSize: Math.round(this.ava_cam.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico de Ava Ações contra corona
    await new Chart('myChartCor', {
      type: 'bar',
      data: {
        labels: ['Sim','Não', 'Não Opinou'],
        datasets: [{
          data: this.ava_corona,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.ava_corona.reduce(reducer)
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
              max: this.ava_corona.reduce(reducer),
              stepSize: Math.round(this.ava_corona.reduce(reducer)/5)
            }
          }]
        }
      }
    });

    //Gráfico de Ava Secretario
    var canvas = document.getElementById("stakeholderChart") as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    var stakeholderChart = await new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.ava_sec_nome,
        datasets: [{
          data: this.ava_sec_num,
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
          tamanhoArr: this.ava_sec_num.reduce(reducer)
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
              max: this.ava_sec_num.reduce(reducer),
              stepSize: Math.round(this.ava_sec_num.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico de Ava Governador
    await new Chart('myChartAvaGov', {
      type: 'bar',
      data: {
        labels: ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo', 'Não Opinou'],
        datasets: [{
          data: this.ava_gov,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 215, 0)',
            'rgb(255,165,0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.ava_gov.reduce(reducer)
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
              max: this.ava_gov.reduce(reducer),
              stepSize: Math.round(this.ava_gov.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico de Ava Governador
    await new Chart('myChartAvaPres', {
      type: 'bar',
      data: {
        labels: ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo', 'Não Opinou'],
        datasets: [{
          data: this.ava_pres,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 215, 0)',
            'rgb(255,165,0)',
            'rgb(220, 0, 0)',
            'rgb(54, 54, 54)'

          ],
          tamanhoArr: this.ava_pres.reduce(reducer)
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
                max: this.ava_pres.reduce(reducer),
                stepSize: Math.round(this.ava_pres.reduce(reducer) / 5)
              }
            }]
          }
        }
      }
    });

    //Gráfico de Opinião Espontãnea para prefeito
    await new Chart('myChartEspPref', {
      type: 'bar',
      data: {
        labels: this.spont_nome_pref,
        datasets: [{
          data: this.spont_num_pref,
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
          tamanhoArr: this.spont_num_pref.reduce(reducer)
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
              max: this.spont_num_pref.reduce(reducer),
              stepSize: Math.round(this.spont_num_pref.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico de rejeição Espontãnea para prefeito
    await new Chart('myChartRejEspPref', {
      type: 'bar',
      data: {
        labels: this.spont_rej_nome,
        datasets: [{
          data: this.spont_rej_num,
          backgroundColor: [
            'rgb(220,0,0)',
            'rgb(178,34,34)',
            'rgb(255, 206, 86)',
            'rgb(240,230,140)',
            'rgb(135,206,235)',
            'rgb(72,209,204)',
            'rgb(154,205,50)',
            'rgb(50,205,50)',
          ],
          tamanhoArr: this.spont_rej_num.reduce(reducer)
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
              max: this.spont_rej_num.reduce(reducer),
              stepSize: Math.round(this.spont_rej_num.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de vereadores
    var canvas = document.getElementById("myChartCouncilors") as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    var myChartCouncilors = await new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.spont_nome_ver,
        datasets: [{
          data: this.spont_num_ver,
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
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',
            'rgb(0,0,139)',

          ],
          tamanhoArr: this.spont_num_ver.reduce(reducer)
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
              max: this.spont_num_ver.reduce(reducer),
              stepSize: Math.round(this.spont_num_ver.reduce(reducer))
            }
          }]
        }
      }
    });
    //Gráfico de Indicação do prefeito
    await new Chart('myChartEspIndPref', {
      type: 'bar',
      data: {
        labels: this.spont_nome_ind,
        datasets: [{
          data: this.spont_num_ind,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(255,0,0)',
            'rgb(54,54,54)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.spont_num_ind.reduce(reducer)
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
              max: this.spont_num_ind.reduce(reducer),
              stepSize: Math.round(this.spont_num_ind.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Intenção de Votos Estimulada para prefeito
    await new Chart('myChartEstimPref', {
      type: 'bar',
      data: {
        labels: this.stim_nome_pref,
        datasets: [{
          data: this.stim_num_pref,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.stim_num_pref.reduce(reducer)
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
              max: this.stim_num_pref.reduce(reducer),
              stepSize: Math.round(this.stim_num_pref.reduce(reducer) / 5)
            }
          }]
        }
      }
    });

    //Gráfico de Indicação do prefeito
    await new Chart('myChartRejEstimPref', {
      type: 'bar',
      data: {
        labels: this.stim_rej_nome,
        datasets: [{
          data: this.stim_rej_num,
          backgroundColor: [
            'rgb(220,0,0)',
            'rgb(178,34,34)',
            'rgb(255, 206, 86)',
            'rgb(240,230,140)',
            'rgb(154,205,50)',
            'rgb(50,205,50)'
          ],
          tamanhoArr: this.stim_rej_num.reduce(reducer)
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
              max: this.stim_rej_num.reduce(reducer),
              stepSize: Math.round(this.stim_rej_num.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico de Cenário de primeira disputa
    await new Chart('myChartFirstDisp', {
      type: 'bar',
      data: {
        labels: this.first_disp_nome,
        datasets: [{
          data: this.first_disp_num,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.first_disp_num.reduce(reducer)
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
              max: this.first_disp_num.reduce(reducer),
              stepSize: Math.round(this.first_disp_num.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico de Segunda Disputa
    await new Chart('myChartSecondDisp', {
      type: 'bar',
      data: {
        labels: this.second_disp_nome,
        datasets: [{
          data: this.second_disp_num,
          backgroundColor: [
            'rgb(0, 200, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',

          ],
          tamanhoArr: this.second_disp_num.reduce(reducer)
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
              max: this.second_disp_num.reduce(reducer),
              stepSize: Math.round(this.second_disp_num.reduce(reducer) / 5)
            }
          }]
        }
      }
    });
    //Gráfico Demandas sociais
    var canvas = document.getElementById("myChartSocialDemands") as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    var myChartSocialDemands = await new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Educação', 'Saúde', 'Moradia', 'Emprego', 'Pavimentação', 'Limpeza', 'Iluminação', 'Estradas', 'Infraestrutura', 'Assis. Social', 'Saneamento Básico', 'Outros', 'Não Opinou'],
        datasets: [{
          data: this.social_demands,
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
          tamanhoArr: this.social_demands.reduce(reducer)
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
              max: this.second_disp_num.reduce(reducer),
              stepSize: Math.round(this.second_disp_num.reduce(reducer) / 5)
            }
          }]
        }
      }
    });


  }

  async getDataSearch() {
    await this.formService.getForms(this.search_id).then((result: any) => {
      if (result) {
        this.gender = result.gender;
        this.age = result.age;
        this.scholarity = result.scholarity;
        this.occupation = result.occupation;
        this.family_income = result.family_income;
        this.housing_situation = result.housing_situation;
        this.religion = result.religion;
        this.ava_sec_nome = result.ava_sec_nome;
        this.ava_sec_num = result.ava_sec_num;
        this.ava_pref = result.ava_admin_pref;
        this.ava_gov = result.ava_admin_gov;
        this.ava_cam = result.ava_leg_power;
        this.ava_corona = result.ava_corona;
        this.ava_pres = result.ava_admin_president;
        this.spont_nome_pref = result.spont_cand_pref;
        this.spont_num_pref = result.spont_vote_pref;
        this.spont_rej_nome = result.spont_rej_pref;
        this.spont_rej_num = result.spont_rej_num_pref;
        this.spont_nome_ver = result.spont_cand_ver;
        this.spont_num_ver = result.spont_cand_ver_num;
        this.spont_nome_ind = result.spont_nome_ind;
        this.spont_num_ind = result.spont_num_ind;
        this.stim_nome_pref = result.stim_nome_pref;
        this.stim_num_pref = result.stim_num_pref;
        this.stim_rej_nome = result.stim_rej_pref;
        this.stim_rej_num = result.stim_rej_num_pref;
        this.first_disp_nome = result.first_disp_nome;
        this.first_disp_num = result.first_disp_num;
        this.second_disp_nome = result.second_disp_nome;
        this.second_disp_num = result.second_disp_num;
        this.social_demands = result.social_demands;

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
