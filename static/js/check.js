/*
Made by:Ariadna Huesca Coronado
	A01749161@tec.mx
	arihuescac@hotmail.com
Modified (DD/MM/YY): 
	Ariadna Huesca  06/09/2022 Creation
*/

var ros;
var robot_IP=_config.ROSBridge_IP;

ros = new ROSLIB.Ros({
    url: "ws://" + robot_IP + ":9090"
});

var fuel = false;
var oil = false;
var wheel = false;
var ok = true;

var listener_fuel_level = new ROSLIB.Topic({
    ros : ros,
    name : '/fuel_level',
    messageType : 'std_msgs/Int32'
  });
  

  var displayed = false;
  listener_fuel_level.subscribe(function(message) {
    document.getElementById("fuel_level").innerHTML = message.data;
    if(message.data < 15){
        fuel = true;
        ok = false;
        document.getElementById("fuel_level_danger").style.display = "";
        document.getElementById("fuel_level_warning").style.display = "none";
        if(!displayed){
          $.notify({
            icon: 'la la-bell',
            title: 'System alert',
            message: 'Fuel level extremely low',
          },{
            type: 'danger',
            placement: {
              from: "bottom",
              align: "center"
            },
            time: 1000,
          });
          displayed = true;
        }
    }else if(message.data < 51){
        fuel = true;
        ok = false;
        document.getElementById("fuel_level_warning").style.display = "";
        document.getElementById("fuel_level_danger").style.display = "none";
    }    
    else{
        fuel = false;
        document.getElementById("fuel_level_danger").style.display= "none";
        document.getElementById("fuel_level_warning").style.display = "none";        
    }
    check();
  });
  
  var listener_mileage = new ROSLIB.Topic({
    ros : ros,
    name : '/mileage',
    messageType : 'std_msgs/Int32'
  });
  
  listener_mileage.subscribe(function(message) {
    document.getElementById("mileage").innerHTML = message.data;
  });   
  
  var listener_oil_level = new ROSLIB.Topic({
    ros : ros,
    name : '/oil_level',
    messageType : 'std_msgs/Int32'
  });
  
  listener_oil_level.subscribe(function(message) {
    document.getElementById("oil_level").innerHTML = message.data;
    if(message.data < 15){
        oil = true;
        ok = false;
        document.getElementById("oil_level_danger").style.display = "";        
        document.getElementById("oil_level_warning").style.display = "none";
        if(!displayed){
          $.notify({
            icon: 'la la-bell',
            title: 'System alert',
            message: 'Oil level extremely low',
          },{
            type: 'danger',
            placement: {
              from: "bottom",
              align: "center"
            },
            time: 1000,
          });
          displayed = true;
        }
    }else if(message.data < 51){
      oil = true;
      ok = false;
      document.getElementById("oil_level_danger").style.display = "none";        
      document.getElementById("oil_level_warning").style.display = "";
    }else{
        oil = false;
        document.getElementById("oil_level_danger").style.display = "none";
        document.getElementById("oil_level_warning").style.display = "none";
    }
    check();
  });
  
  var listener_wheel_pressure = new ROSLIB.Topic({
    ros : ros,
    name : '/wheel_pressure',
    messageType : 'std_msgs/Int32'
  });
  
  listener_wheel_pressure.subscribe(function(message) {
    document.getElementById("wheel_pressure").innerHTML = message.data;
    if(message.data < 15){
        fuel = true;
        ok = false;
        document.getElementById("wheel_pressure_danger").style.display = "";
        document.getElementById("wheel_pressure_warning").style.display = "none";
        if(!displayed){
          $.notify({
            icon: 'la la-bell',
            title: 'System alert',
            message: 'Wheel extremely low',
          },{
            type: 'danger',
            placement: {
              from: "bottom",
              align: "center"
            },
            time: 1000,
          });
          displayed = true;
        }
    }else if(message.data < 51){
      fuel = true;
      ok = false;
      document.getElementById("wheel_pressure_danger").style.display = "none";
      document.getElementById("wheel_pressure_warning").style.display = "";
    }
    else{
        fuel = false;
        document.getElementById("wheel_pressure_danger").style.display= "none";
        document.getElementById("wheel_pressure_warning").style.display = "none";
    }
    check();
  });

  function check() {    
    if(fuel || oil || wheel){
      document.getElementById("ok").style.display = "none";
    }else{
      document.getElementById("ok").style.display= "";        
    }
    
  }