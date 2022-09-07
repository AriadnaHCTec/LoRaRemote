/*
Made by:Ariadna Huesca Coronado
	A01749161@tec.mx
	arihuescac@hotmail.com
Modified (DD/MM/YY): 
	Ariadna Huesca  06/09/2022 Creation
*/


var ros;
var robot_IP="localhost";

ros = new ROSLIB.Ros({
    url: "ws://" + robot_IP + ":9090"
});


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
    })
  });
  
  var listener_kilos = new ROSLIB.Topic({
    ros : ros,
    name : '/kilos',
    messageType : 'std_msgs/Int32'
  });
  
  listener_kilos.subscribe(function(message) {
    document.getElementById("kilograms_txt").innerHTML = message.data;
  });