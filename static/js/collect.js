/*
Made by:Ariadna Huesca Coronado
	A01749161@tec.mx
	arihuescac@hotmail.com
Modified (DD/MM/YY): 
	Ariadna Huesca  06/09/2022 Creation
*/


var ros;
var robot_IP="192.168.1.147";

ros = new ROSLIB.Ros({
    url: "ws://" + robot_IP + ":9090"
});



const configSensor1 = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Kilograms during the year",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false,
        }],
    },
    options: {
        responsive: true,
        title: {
            display: false,
            text: ''
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Kilograms'
                }
            }]
        }
    }
};


const configFilled = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Filled",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false,
        }],
    },
    options: {
        responsive: true,
        title: {
            display: false,
            text: ''
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Percentage'
                }
            }]
        }
    }
};
const contextS1 = document.getElementById('Sensor1').getContext('2d');
const lineChartS1 = new Chart(contextS1, configSensor1);

const contextS2 = document.getElementById('filled_graph').getContext('2d');
const lineChartS2 = new Chart(contextS2, configFilled);

const sourceS1 = new EventSource("/data_sensor1");
sourceS1.onmessage = function (event) {
    const data = JSON.parse(event.data);    
    if (configSensor1.data.labels.length < 6) {
        configSensor1.data.labels.push(data.time);
        configSensor1.data.datasets[0].data.push(data.value);
        lineChartS1.update();
    }
    
}

Circles.create({
    id:           'task-complete',
    radius:       75,
    value:        80,
    maxValue:     100,
    width:        8,
    text:         function(value){return value + '%';},
    colors:       ['#eee', '#1D62F0'],
    duration:     400,
    wrpClass:     'circles-wrp',
    textClass:    'circles-text',
    styleWrapper: true,
    styleText:    true
})

var listener_fill = new ROSLIB.Topic({
    ros : ros,
    name : '/fill',
    messageType : 'std_msgs/Int32'
  });
  
  listener_fill.subscribe(function(message) {
    document.getElementById("fill_txt").innerHTML = message.data;
    Circles.create({
        id:           'task-complete',
        radius:       75,
        value:        message.data,
        maxValue:     100,
        width:        8,
        text:         function(value){return value + '%';},
        colors:       ['#eee', '#1D62F0'],
        duration:     0,
        wrpClass:     'circles-wrp',
        textClass:    'circles-text',
        styleWrapper: true,
        styleText:    true
    });    
  });
  
  var listener_kilos = new ROSLIB.Topic({
    ros : ros,
    name : '/kilos',
    messageType : 'std_msgs/Int32'
  });
  
  listener_kilos.subscribe(function(message) {
    document.getElementById("kilograms_txt").innerHTML = message.data;
    if (configSensor2.data.labels.length === 30) {
        configSensor2.data.labels.shift();
        configSensor2.data.datasets[0].data.shift();
    }
    configSensor2.data.labels.push("23:00");
    configSensor2.data.datasets[0].data.push(message.data);
    lineChartS2.update();
  });