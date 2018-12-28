Ext.define('User', {
	extend: 'Ext.data.Model',
	fields: [ 'maker','model','code','memory','freqgpu','freqmem','directx', 'monitor','interface','resolution','connection']
});
Ext.onReady(function () {
	var userStore = Ext.create('Ext.data.Store', {
		model: 'User',
		data: data_table
	});
		var table=Ext.create('Ext.grid.Panel', {
			renderTo: Ext.get('table'),
			store: userStore,
			title: 'Видеокарты',
			height:'100%',
			columns: [
				{
					text: 'Производитель',
					width: '6%',
					sortable: true,
					hideable: true,
					dataIndex: 'maker'
				},
				{
					text: 'Модель',
					width: '10%',
					dataIndex: 'model',
				},
				{
					text: 'Код производителя',
					width:'12%',
					dataIndex: 'code'
				},
				{
					text: 'Объем памяти',
					flex: 1,
					dataIndex: 'memory'
				},
				{
					text: 'Частота GPU',
					flex: 1,
					dataIndex: 'freqgpu'
				},
				{
					text: 'Частота памяти',
					flex: 1,
					dataIndex: 'freqmem'
				},
				{
					text: 'Версия directX',
					flex: 1,
					dataIndex: 'directx'
				},
				{
					text: 'Кол-во мониторов',
					flex: 1,
					dataIndex: 'monitor'
				},
				{
					text: 'Интерфейс',
					flex: 1,
					dataIndex: 'interface'
				},
				{
					text: 'Максимальное разрешение',
					flex: 1,
					dataIndex: 'resolution'
				},
				{
					text: 'Подключение',
					flex: 1,
					dataIndex: 'connection'
				},
			]
		});
		table.show();

})

Ext.onReady(function () {

	// MAKER
	Ext.create('Ext.Button', {
		text: 'Производитель',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 700,
				height: Ext.getBody().getViewSize().height - 300,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();
			// Круговая диаграмма объем памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45,
						beta: 0
					}
				},
				title: {
					text: 'Количсетво видеокарт в зависимости от производителя'
				},

				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						depth: 35,
						dataLabels: {
							enabled: true,
							format: '{point.name}'
						}
					}
				},
				series: [{
					type: 'pie',
					name: 'Кол-во видеокарт',
					data: data_maker
				}]
			});
		}
	});

	// кнопка объем памяти
	Ext.create('Ext.Button', {
		text: 'Объем',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 700,
				height: Ext.getBody().getViewSize().height - 300,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();
		// Круговая диаграмма объем памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				title: {
					text: 'Количество видеокарт в зависимости от объема памяти'
				},

				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},

				series: [{
					name: 'Кол-во видеокарт',
					colorByPoint: true,
					data: data_mem
				}]
			});
		}
	});


	//создание кнопки частота памяти
	Ext.create('Ext.Button', {
		text: 'Частота памяти',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 50,
				height: Ext.getBody().getViewSize().height - 270,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();

		// график частоты памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					type: 'column'
				},
				title: {
					text: 'Частоты памяти Видеокарт'
				},
				xAxis: {
					type: 'category',
					labels: {
						rotation: -90,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif'
						}
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Частота (Hz)'
					}
				},
				legend: {
					enabled: false
				},

				series: [{
					name: 'Частота',
					data: data_viewer,
					dataLabels: {
						enabled: true,
						rotation: -90,
						color: '#FFFFFF',
						align: 'right',
						format: '{point.y}', // one decimal
						y: 10, // 10 pixels down from the top
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif'
						}
					}
				}]
			});


		}
	});



	//создание кнопки частота GPU
	Ext.create('Ext.Button', {
		text: 'Частота GPU',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 50,
				height: Ext.getBody().getViewSize().height - 270,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();

			// график частоты памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					type: 'column'
				},
				title: {
					text: 'Частоты GPU Видеокарт'
				},
				xAxis: {
					type: 'category',
					labels: {
						rotation: -90,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif'
						}
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Частота (Hz)'
					}
				},
				legend: {
					enabled: false
				},

				series: [{
					name: 'Частота',
					color:'#b3ffcb',
					data: data_freqgpu,
					dataLabels: {
						enabled: true,
						rotation: -90,
						color: '#000000',
						align: 'right',
						format: '{point.y}', // one decimal
						y: 10, // 10 pixels down from the top
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif'
						}
					}
				}]
			});


		}
	});


	// direcX
	Ext.create('Ext.Button', {
		text: 'DirectX',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 700,
				height: Ext.getBody().getViewSize().height - 300,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();
			// Круговая диаграмма объем памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45,
						beta: 0
					}
				},
				title: {
					text: 'Количсетво видеокарт в зависимости от версии DirectX'
				},

				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						depth: 35,
						dataLabels: {
							enabled: true,
							format: '{point.name}'
						},
						showInLegend:true
					}
				},
				series: [{
					type: 'pie',
					name: 'Кол-во видеокарт',
					data: data_directx
				}]
			});
		}
	});


// кнопка monitor
	Ext.create('Ext.Button', {
		text: 'Мониторы',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 700,
				height: Ext.getBody().getViewSize().height - 300,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();
			// Круговая диаграмма объем памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				title: {
					text: 'Количество видеокарт в зависимости от максимального кол-ва подключания мониторов'
				},

				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},

				series: [{
					name: 'Кол-во видеокарт:',
					colorByPoint: true,
					data: data_monitor
				}]
			});
		}
	});

	// interface
	Ext.create('Ext.Button', {
		text: 'Интерфейс',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 700,
				height: Ext.getBody().getViewSize().height - 300,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();
			// Круговая диаграмма объем памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45
					}
				},
				title: {
					text: 'Количество видеокарт в зависимости от интерфейса'
				},

				plotOptions: {
					pie: {
						innerSize: 100,
						depth: 45,
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				series: [{
					name: 'Кол-во видеокарт',
					data: data_interface
				}]
			});
		}
	});



	// resolution
	Ext.create('Ext.Button', {
		text: 'Разрешение',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 700,
				height: Ext.getBody().getViewSize().height - 300,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();
			// Круговая диаграмма объем памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45
					}
				},
				title: {
					text: 'Количество видеокарт в зависимости от максимального разрешения'
				},

				plotOptions: {
					pie: {
						innerSize: 100,
						depth: 45,
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				series: [{
					name: 'Кол-во видеокарт',
					data: data_resolution
				}]
			});
		}
	});


	// connection
	Ext.create('Ext.Button', {
		text: 'Подключение',
		renderTo: Ext.get('table'),
		width:'11%',
		handler : function() {
			Ext.create('Ext.window.Window',{
				width: Ext.getBody().getViewSize().width - 700,
				height: Ext.getBody().getViewSize().height - 300,
				title: 'Title',
				html: '<div id="highcharts-container"></div>',
			}).show();
			// Круговая диаграмма объем памяти
			Highcharts.chart('highcharts-container', {
				chart: {
					type: 'pie',
					options3d: {
						enabled: true,
						alpha: 45
					}
				},
				title: {
					text: 'Количество видеокарт в зависимости от используемого подключания'
				},

				plotOptions: {
					pie: {
						innerSize: 100,
						depth: 45,
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				series: [{
					name: 'Кол-во видеокарт',
					data: data_connection
				}]
			});
		}
	});
});


