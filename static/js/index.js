/*
Made by:Ariadna Huesca Coronado
	A01749161@tec.mx
	arihuescac@hotmail.com
Modified (DD/MM/YY): 
	Ariadna Huesca  22/08/2022 Creation
*/


var ros;
var robot_IP="192.168.1.147";

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
      {strokeStyle: "#00FF00", min: 0.0, max: 30.0}, // Red from 100 to 60
      {strokeStyle: "#FFFF00", min: 30.0, max: 40.0}, // Yellow
      {strokeStyle: "#FF0000", min: 40.0, max: 50.0}, // Green
   ],
   staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [0, 30, 40,50],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
};

var opts2 = {
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
      {strokeStyle: "#00FF00", min: 0.0, max: 80.0}, // Red from 100 to 60
      {strokeStyle: "#FFFF00", min: 80.0, max: 110.0}, // Yellow
      {strokeStyle: "#FF0000", min: 110.0, max: 150.0}, // Green
   ],
   staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [0, 80, 110,150],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
};

var target = document.getElementById('velocity'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 50; // set max gauge value
gauge.minValue = 0;
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 50; // set animation speed (32 is default value)
gauge.set(7); // set actual value


var target2 = document.getElementById('wheel_speed'); // your canvas element
var gauge2 = new Gauge(target2).setOptions(opts2); // create sexy gauge!
gauge2.maxValue = 150; // set max gauge value
gauge2.minValue = 0;
gauge2.setMinValue(0);  // Prefer setter over gauge.minValue = 0
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
  var coordinate = "https://maps.google.com/maps?q="+str(message.latitude)+","+str(message.longitude)+"&t=&z=150&ie=UTF8&iwloc=&output=embed";
  document.getElementById("Longitude").src=coordinate;
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