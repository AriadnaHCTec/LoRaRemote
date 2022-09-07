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


var opts = {
  angle: 0, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.54, // // Relative to gauge radius
    strokeWidth: 0.053, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  staticZones: [
      {strokeStyle: "#00FF00", min: 7.1, max: 8.3}, // Red from 100 to 60
      {strokeStyle: "#0000FF", min: 8.3, max: 9.5}, // Yellow
      {strokeStyle: "#00FFFF", min: 9.5, max: 10.7}, // Green
      {strokeStyle: "#FFDD00", min: 10.7, max: 11.9}, // Yellow
      {strokeStyle: "#FF0000", min: 11.9, max: 13}  // Red
   ],
   staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [7.1, 8.3, 9.5, 10.7, 11.9, 13],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
};

var target = document.getElementById('velocity'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 13; // set max gauge value
gauge.minValue = 7.1;
gauge.setMinValue(7.1);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 50; // set animation speed (32 is default value)
gauge.set(7); // set actual value


var target2 = document.getElementById('wheel_speed'); // your canvas element
var gauge2 = new Gauge(target2).setOptions(opts); // create sexy gauge!
gauge2.maxValue = 13; // set max gauge value
gauge2.minValue = 7.1;
gauge2.setMinValue(7.1);  // Prefer setter over gauge.minValue = 0
gauge2.animationSpeed = 50; // set animation speed (32 is default value)
gauge2.set(7); // set actual value


var listener_IMU = new ROSLIB.Topic({
  ros : ros,
  name : '/IMU',
  messageType : 'std_msgs/Float64'
});

listener_IMU.subscribe(function(message) {
  document.getElementById("Yaw").innerHTML = message.data;
});

var listener_GPS = new ROSLIB.Topic({
  ros : ros,
  name : '/GPS',
  messageType : 'sensor_msgs/NavSatFix'
});

listener_GPS.subscribe(function(message) {
  document.getElementById("Latitude").innerHTML = message.latitude;
  document.getElementById("Longitude").innerHTML = message.longitude;
});

var listener_wheel_speed = new ROSLIB.Topic({
  ros : ros,
  name : '/wheel_speed',
  messageType : 'std_msgs/Int32'
});

listener_wheel_speed.subscribe(function(message) {
  document.getElementById("wheel_speed_txt").innerHTML = message.data;
  gauge2.set(message.data); // set actual value
});

var listener_trilladora_speed = new ROSLIB.Topic({
  ros : ros,
  name : '/trilladora_speed',
  messageType : 'std_msgs/Int32'
});

listener_trilladora_speed.subscribe(function(message) {
  document.getElementById("velocity_txt").innerHTML = message.data;
  gauge.set(message.data);
});