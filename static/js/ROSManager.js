/*
Made by:Ariadna Huesca Coronado
	A01749161@tec.mx
	arihuescac@hotmail.com
Modified (DD/MM/YY): 
	Ariadna Huesca  22/08/2022 Creation
*/
/*var ros;
var robot_IP;

window.onload = function () {
    robot_IP = "192.168.1.65";

    ros = new ROSLIB.Ros({
        url: "ws://" + robot_IP + ":9090"
    });    
        var listener = new ROSLIB.Topic({
            ros : ros,
            name : '/chatter',
            messageType : 'std_msgs/String'
          });
    
          listener.subscribe(function(message) {
                console.log('Received message on ' + listener.name + ': ' + message.data);
                document.getElementById("mensajeROS").innerHTML = message.data;
                listener.unsubscribe(); 
          });
}
*/