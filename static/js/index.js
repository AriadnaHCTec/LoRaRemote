/*
Made by:Ariadna Huesca Coronado
	A01749161@tec.mx
	arihuescac@hotmail.com
Modified (DD/MM/YY): 
	Ariadna Huesca  22/08/2022 Creation
*/


var ros;
var robot_IP="localhost";

ros = new ROSLIB.Ros({
    url: "ws://" + robot_IP + ":9090"
});


var listener_IMU = new ROSLIB.Topic({
  ros : ros,
  name : '/IMU',
  messageType : 'std_msgs/String'
});

listener_IMU.subscribe(function(message) {

});

var listener_GPS = new ROSLIB.Topic({
  ros : ros,
  name : '/GPS',
  messageType : 'std_msgs/String'
});

listener_GPS.subscribe(function(message) {

});

var listener_wheel_speed = new ROSLIB.Topic({
  ros : ros,
  name : '/wheel_speed',
  messageType : 'std_msgs/Int32'
});

listener_wheel_speed.subscribe(function(message) {
  document.getElementById("wheel_speed").innerHTML = message.data;
});

var listener_trilladora_speed = new ROSLIB.Topic({
  ros : ros,
  name : '/trilladora_speed',
  messageType : 'std_msgs/Int32'
});

listener_trilladora_speed.subscribe(function(message) {
  document.getElementById("trilladora_speed").innerHTML = message.data;
});

var listener_fill = new ROSLIB.Topic({
  ros : ros,
  name : '/fill',
  messageType : 'std_msgs/Int32'
});

listener__fill.subscribe(function(message) {

});

var listener_kilos = new ROSLIB.Topic({
  ros : ros,
  name : '/kilos',
  messageType : 'std_msgs/Int32'
});

listener_kilos.subscribe(function(message) {

});

var listener_fuel_level = new ROSLIB.Topic({
  ros : ros,
  name : '/fuel_level',
  messageType : 'std_msgs/Int32'
});

listener_fuel_level.subscribe(function(message) {

});

var listener_mileage = new ROSLIB.Topic({
  ros : ros,
  name : '/mileage',
  messageType : 'std_msgs/Int32'
});

listener_mileage.subscribe(function(message) {

});

var listener_oil_level = new ROSLIB.Topic({
  ros : ros,
  name : '/oil_level',
  messageType : 'std_msgs/Int32'
});

listener_oil_level.subscribe(function(message) {

});

var listener_wheel_pressure = new ROSLIB.Topic({
  ros : ros,
  name : '/wheel_pressure',
  messageType : 'std_msgs/Int32'
});

listener_wheel_pressure.subscribe(function(message) {

});

