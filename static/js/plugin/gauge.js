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

var target = document.getElementById('bateria'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 13; // set max gauge value
gauge.minValue = 7.1;
gauge.setMinValue(7.1);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 50; // set animation speed (32 is default value)
gauge.set(7); // set actual value
const source = new EventSource("/data_bateria");

source.onmessage = function (event) {
  const data = JSON.parse(event.data);
  gauge.set(7 + data.value);
}

//<!--<img style="width:100%;height: 100%;" id="bg" src="{{ url_for('video_feeder') }}">-->