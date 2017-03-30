'use strict';

/**
 * @ngdoc function
 * @name ultraBI.controller:UltradashboardCtrl
 * @description
 * # UltradashboardCtrl
 * Controller of the stockDogApp
 */
angular.module('ultraBI')
  .controller('UltradashboardCtrl', function ($scope, $filter, ClientesService, FiliaisService, VendasService) {

    $scope.cssStyle = 'height:600px;';
    $scope.baseVendas = VendasService.query();
    $scope.vendas = $scope.baseVendas;
    $scope.filiais = [];
    $scope.clientes = [];

    $scope.periodosAnuais = [];


    $scope.periodosMensais = [
      {
        numero: 1,
        mes: 'Janeiro',
        abrev: 'Jan'
      },
      {
        numero: 2,
        mes: 'Fevereiro',
        abrev: 'Fev'
      },
      {
        numero: 3,
        mes: 'Março',
        abrev: 'Mar'
      },
      {
        numero: 4,
        mes: 'Abril',
        abrev: 'Abr'
      },
      {
        numero: 5,
        mes: 'Maio',
        abrev: 'Mai'
      },
      {
        numero: 6,
        mes: 'Junho',
        abrev: 'Jun'
      },
      {
        numero: 7,
        mes: 'Julho',
        abrev: 'Jul'
      },
      {
        numero: 8,
        mes: 'Agosto',
        abrev: 'Ago'
      },
      {
        numero: 9,
        mes: 'Setembro',
        abrev: 'Set'
      },
      {
        'numero': 10,
        'mes': 'Outubro',
        'abrev': 'Out'
      },
      {
        numero: 11,
        mes: 'Novembro',
        abrev: 'Nov'
      },
      {
        numero: 12,
        mes: 'Dezembro',
        abrev: 'Dez'
      }
    ];

    $scope.periodosAnuais = [];

    $scope.filiaisToFilter = [];
    $scope.filiaisFiltradas = [];
    $scope.clientesToFilter = [];
    $scope.vendasPeriodosAnuaisToFilter = [];
    $scope.mbPeriodosAnuaisToFilter = [];

    $scope.periodosMensaisToFilter = [];
    $scope.periodosAnuaisFiltrados = [];

    $scope.filterActivated = false;
    $scope.activeFilialToFilter = false;
    $scope.activeClientesToFilter = false;
    $scope.activeVendasPeriodoAnualToFilter = false;
    $scope.activeMBPeriodoAnualToFilter = false;
    $scope.activePeriodoMensalToFilter = false;


    $scope.numPerPage = 5;
    $scope.noOfPages = Math.ceil($scope.filiais.length / $scope.numPerPage);
    $scope.currentPage = 1;

    $scope.setPage = function () {
      $scope.data = $scope.filiais.slice(($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage);

    };

    $scope.$watch('currentPage', $scope.setPage);

    //$scope.viewby = 10;
    //$scope.totalItems = $scope.filiais.length;
    //$scope.currentPage = 1;
    //$scope.itemsPerPage = $scope.viewby;
    //$scope.maxSize = 5; //Number of pager buttons to show
    //
    //$scope.setPage = function (pageNo) {
    //  $scope.currentPage = pageNo;
    //};
    //
    //$scope.pageChanged = function () {
    //  console.log('Page changed to: ' + $scope.currentPage);
    //};
    //
    //$scope.setItemsPerPage = function (num) {
    //  $scope.itemsPerPage = num;
    //  $scope.currentPage = 1; //reset to first paghe
    //}

    $scope.filtrarFilial = function (filial, filtrar) {
      if (filtrar) {
        filial.filtered = true;
      } else {
        filial.filtered = false;
      }

    }

    $scope.aplicarFiltros = function () {
      var filiaisSelecionadas = $filter('filter')($scope.filiais, {filtered: true});

      if (filiaisSelecionadas.length > 0) {
        filiaisSelecionadas.forEach(function (filial) {
          var filter = _.filter($scope.filiaisFiltradas, function (f) {
            return f === filial.filial;
          });
          if (filter.length === 0) {
            $scope.filiaisFiltradas.push(filial.filial);
          }
        });
      }

      $scope.filtrarFiliais();
    }


    $scope.filiaisToFilter = [];
    $scope.clientesToFilter = [];
    $scope.vendasPeriodosAnuaisToFilter = [];
    $scope.mbPeriodosAnuaisToFilter = [];
    $scope.periodosMensaisToFilter = [];

    $scope.activeFilialToFilter = false;
    $scope.activeClientesToFilter = false;
    $scope.activeVendasPeriodoAnualToFilter = false;
    $scope.activeMBPeriodoAnualToFilter = false;
    $scope.activePeriodoMensalToFilter = false;



    $scope.addFilialToFilter = function (selectedItem) {
      if ($scope.activeFilialToFilter === false) {
        $scope.activeFilialToFilter = true;
      }
      var filialFiltered = parseInt($scope.pieChartVendasFiliais.data[selectedItem.row, selectedItem.row + 1][0].split(" ")[1]);
      if ($filter('filter')($scope.filiaisToFilter, 'filialFiltered').length === 0) {
        $scope.filiaisToFilter.push(filialFiltered);
      }

    };

    $scope.filtrarFiliais = function () {
      var vendasFilial = [];

      if ($scope.filiaisToFilter.length > 0) {
        $scope.filiaisFiltradas = $scope.filiaisToFilter;
      } else {
        $scope.filiaisToFilter = $scope.filiaisFiltradas;
      }

      if ($scope.periodosAnuaisFiltrados.length === 0)
        $scope.vendas = $scope.baseVendas;

      $scope.filiaisToFilter.forEach(function (filial) {
        var vendasAux = _.filter($scope.vendas, function (v) {
          return v.filial.id === filial;
        });

        vendasAux.forEach(function(venda){
          vendasFilial.push(venda);
        });
      });

      $scope.filiais.forEach(function (filial) {
        var filter = _.filter($scope.filiaisToFilter, function (f) {
          return f === filial.filial;
        });

        if (filter.length > 0) {
          filial.filtered = true;
        } else {
          filial.filtered = false;
        }
      });

      console.log(vendasFilial);

      $scope.vendas = vendasFilial;
      $scope.filiaisToFilter = [];
      $scope.activeFilialToFilter = false;

      if (!$scope.filterActivated) {
        $scope.filterActivated = true;
      }

      atualizarGraficos($scope.vendas);

    };


    $scope.cancelFiliaisFilter = function () {
      $scope.activeFilialToFilter = false;
      $scope.filiaisToFilter = [];
      limparFiltros();
    }

    $scope.addVendasAnoToFilter = function (selectedItem) {
      if ($scope.activeVendasPeriodoAnualToFilter === false) {
        $scope.activeVendasPeriodoAnualToFilter = true;
      }
      var anoFiltered = parseInt($scope.columnsVendasAno.data[selectedItem.column, selectedItem.row + 1][0]);
      if ($filter('filter')($scope.vendasPeriodosAnuaisToFilter, 'anoFiltered').length === 0) {
        $scope.vendasPeriodosAnuaisToFilter.push(anoFiltered);
      }

    };

    $scope.filtrarVendasPeriodoAnuais = function () {
      var vendasPeriodoAnuais = [];

      $scope.vendasPeriodosAnuaisToFilter.forEach(function (ano) {
        var vendasAux = $filter('filter')($scope.vendas, {'ANO': ano});
        vendasAux.forEach(function (venda) {
          vendasPeriodoAnuais.push(venda);
        })
      });
      //console.log(vendasFilial);

      $scope.vendas = vendasPeriodoAnuais;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      $scope.activeVendasPeriodoAnualToFilter = false;

      //updateChartVendasValor();
    };

    $scope.checkEmptyFilters = function () {
      //$scope.filiaisToFilter = [];
      //$scope.vendasPeriodosAnuaisToFilter = [];
      //$scope.mbPeriodosAnuaisToFilter = [];
      if ($scope.filiaisFiltradas.length === 0 && $scope.periodosAnuaisFiltrados.length === 0) {
        $scope.vendas = _.union($scope.vendas, $scope.baseVendas);
        atualizarGraficos($scope.vendas);
        $scope.filterActivated = false;
      } else {
        if ($scope.periodosAnuaisFiltrados.length > 0) {
          $scope.filtrarMBPeriodoAnuais();
        }

        if ($scope.filiaisFiltradas.length > 0) {
          $scope.filtrarFiliais();
        }
      }
    }

    $scope.limparFiltrosFiliais = function () {
      $scope.filiaisToFilter = [];
      $scope.filtrarFiliais();
    }

    $scope.cancelVendasPeriodosAnuaisFilter = function () {
      $scope.activeVendasPeriodoAnualToFilter = false;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      limparFiltros();
    };


    $scope.addMBAnoToFilter = function (selectedItem) {
      if ($scope.activeMBPeriodoAnualToFilter === false) {
        $scope.activeMBPeriodoAnualToFilter = true;
      }
      var anoFiltered = parseInt($scope.columnsMargemBrutaAnual.data[selectedItem.column, selectedItem.row + 1][0]);
      if ($filter('filter')($scope.mbPeriodosAnuaisToFilter, 'anoFiltered').length === 0) {
        $scope.mbPeriodosAnuaisToFilter.push(anoFiltered);
      }

    };

    $scope.filtrarMBPeriodoAnuais = function () {
      var mbPeriodoAnuais = [];

      if ($scope.mbPeriodosAnuaisToFilter.length > 0) {
        $scope.periodosAnuaisFiltrados = $scope.mbPeriodosAnuaisToFilter;
      } else {
        $scope.mbPeriodosAnuaisToFilter = $scope.periodosAnuaisFiltrados;
      }

      if ($scope.filiaisFiltradas.length === 0)
        $scope.vendas = $scope.baseVendas;


      $scope.mbPeriodosAnuaisToFilter.forEach(function (ano) {
        var mbAux = $filter('filter')($scope.vendas, {'ano': ano});
        mbPeriodoAnuais = _.union(mbPeriodoAnuais, mbAux);

      });
      //console.log(vendasFilial);

      $scope.vendas = [];
      $scope.vendas = _.union($scope.vendas, mbPeriodoAnuais);
      //$scope.filiaisToFilter = [];
      //$scope.vendasPeriodosAnuaisToFilter = [];

      $scope.vendas = mbPeriodoAnuais;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      $scope.mbPeriodosAnuaisToFilter = [];
      $scope.activeMBPeriodoAnualToFilter = false;

      if (!$scope.filterActivated) {
        $scope.filterActivated = true;
      }

      atualizarGraficos($scope.vendas);
    };

    $scope.cancelMbPeriodosAnuaisFilter = function () {
      $scope.activeMBPeriodoAnualToFilter = false;
      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      $scope.mbPeriodosAnuaisToFilter = [];
      limparFiltros();
    };

    $scope.limparFiltros = function () {
      $scope.vendas = [];
      $scope.vendas = _.union($scope.vendas, $scope.baseVendas);
      atualizarGraficos($scope.vendas);

      $scope.filiaisToFilter = [];
      $scope.vendasPeriodosAnuaisToFilter = [];
      $scope.mbPeriodosAnuaisToFilter = [];

      $scope.filiaisFiltradas = [];
      $scope.periodosAnuaisFiltrados = [];

      $scope.filterActivated = false;

    }

    $scope.removerFiltroAno = function (ano) {
      $scope.periodosAnuaisFiltrados.pop(ano);
      $scope.mbPeriodosAnuaisToFilter = $scope.periodosAnuaisFiltrados;

      if ($scope.mbPeriodosAnuaisToFilter.length > 0) {
        $scope.filtrarMBPeriodoAnuais();
      } else {
        $scope.checkEmptyFilters();
      }
    }

    $scope.removerFiltroFilial = function (filtro) {
      $scope.filiaisFiltradas.pop(filtro);
      $scope.filiaisToFilter = $scope.filiaisFiltradas;

      if ($scope.filiaisToFilter.length > 0) {
        $scope.filtrarFiliais();
      } else {
        $scope.checkEmptyFilters();
      }
    }

    function groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren) {
      var result = _.chain(dataToGroupOn)
        .groupBy(fieldNameToGroupOn)
        .toPairs()
        .map(function (currentItem) {
          return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
        })
        .value();
      return result;
    }

    $scope.periodosAnuais.meses = $scope.periodosMensais;

    var formatters = {
      number: [
        {
          columnNum: 1,
          prefix: 'R$'
        }
      ]
    };

    var updateChartFiliais = function (vendasFiltradas) {
      $scope.pieChartVendasFiliais = {
        type: 'PieChart',
        displayed: true,
        data: [['Filial', 'Total']],
        options: {

          title: 'Vendas por Filial',
          //isStacked: 'true',
          //legend: 'none',
          pieHole: 0.4,
          height: 300,
          width: 300
          //is3D: true
        },
        formatters: formatters
      };

      var vendasGroupByFiliais = groupBy(vendasFiltradas, 'filial.id', 'filial', 'vendas');

      if (vendasGroupByFiliais.length > 0) {
        vendasGroupByFiliais.forEach(function (vendaFilial) {
          $scope.pieChartVendasFiliais.data.push(['Filial ' + vendaFilial.filial, _.sumBy(vendaFilial.vendas, 'total')]);

        });
      }

    };

    var updateChartVendasMes = function(vendasFiltradas){
      $scope.columnsVendasMes = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Mês', 'Total Vendas']],
        options: {

          title: 'Total de Vendas Mensal',
          //isStacked: 'true',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          height: 300,
          //is3D: true
        },
        formatters: formatters
      };

      var vendasGroupByMonth = groupBy(vendasFiltradas, 'mes', 'mes', 'vendas');
      if (vendasGroupByMonth.length > 0) {
        vendasGroupByMonth.forEach(function (vendasPorMes) {
          $scope.columnsVendasMes.data.push([vendasPorMes.mes.toString(), _.sumBy(vendasPorMes.vendas, 'total')]);
        });
      }
    }


    var updateChartVendasAno = function (vendasFiltradas) {
      $scope.columnsVendasAno = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Ano', 'Total Vendas']],
        options: {

          title: 'Total de Vendas Anual',
          //isStacked: 'true',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          height: 300
          //is3D: true
        },
        formatters: formatters
      };

      $scope.columnsMargemBrutaAnual = {
        type: 'ColumnChart',
        displayed: true,
        data: [['Ano', 'Média de Margem Bruta']],
        options: {
          title: 'Média de Margem Bruta Anual',
          //isStacked: 'true',
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          height: 300
          //is3D: true
        },
        formatters: formatters
      };

      var vendasGroupByYear = groupBy(vendasFiltradas, 'ano', 'ano', 'vendas');

      if (vendasGroupByYear.length > 0) {
        vendasGroupByYear.forEach(function (vendasPorAno) {
          $scope.columnsVendasAno.data.push([vendasPorAno.ano.toString(), _.sumBy(vendasPorAno.vendas, 'total')]);
          $scope.columnsMargemBrutaAnual.data.push([vendasPorAno.ano.toString(), _.meanBy(vendasPorAno.vendas, 'valorMargemBruta')]);
        });
      }
    };



    var updateChartClientes = function (vendasFiltradas) {

      var barClienteChart = {
        type: 'BarChart',
        displayed: true,
        data: [['Cliente', 'Total Vendas']],
        options: {
          title: 'Clientes',
          isStacked: 'true',
          //width: data.getNumberOfRows() * 65,
          //bar: {groupWidth: 10},
          animation: {
            duration: 500,
            easing: 'linear'
          },
          legend: 'none',
          pieHole: 0.4,
          height: 800,
          width: 300
          //is3D: true
        },
        formatters: formatters
      };

      var vendasGroupByClientes = groupBy(vendasFiltradas, 'cliente.nome', 'cliente', 'vendas');

      vendasGroupByClientes.forEach(function (vendasCliente) {
        vendasCliente.total = _.sumBy(vendasCliente.vendas, 'total');
      });

      var topRating = _.orderBy(vendasGroupByClientes, ['total'], ['desc']);
      topRating = topRating.slice(0, 10);

      if (topRating.length > 0) {
        topRating.forEach(function (vendaCliente) {
          barClienteChart.data.push([vendaCliente.cliente, _.sumBy(vendaCliente.vendas, 'total')]);
        });
      }
      $scope.barClienteChart = barClienteChart;

    }

    var atualizarGraficos = function (vendas) {
      //var tempoInicial = new Date();
      updateChartClientes(vendas);
      updateChartFiliais(vendas);
      updateChartVendasAno(vendas);
      updateChartVendasMes(vendas);
      //var tempoFinal = new Date();
      //console.log('Tempo de atualização dos gráficos: ' + (tempoFinal - tempoInicial) + ' segundos');
    }

    $scope.$watch('baseVendas.length', function () {
      atualizarGraficos($scope.baseVendas);

      var vendasGroupByFiliais = groupBy($scope.baseVendas, 'filial.id', 'filial', 'vendas');

      vendasGroupByFiliais.forEach(function (vendasFilial) {
        vendasFilial.filial = parseInt(vendasFilial.filial);
        vendasFilial.filtered = false;
        vendasFilial.vendas = null;
        $scope.filiais.push(vendasFilial);
      });

      console.log('Filiais');
      console.log($scope.filiais);

      //$scope.filiaisToFilter.push(1);
      //updateChartClientes();
      //updateChartFiliais();
      //updateChartVendasValor();
    });



  });
