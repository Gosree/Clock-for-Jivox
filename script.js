var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);
var buffer = {hour: 0, minute:0};

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius,buffer);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}


/*
This is the function where the time is computed for a particular time zone. 
The time is converted into milliseconds and the buffer object contains the value to be added/subtracted to the UTC millisecond.
*/
function drawTime(ctx, radius,buffer){
	var now = new Date();
	now = now.getTime();
	if((buffer.hour==0&&buffer.minute==0)){
	}
	else{
		now = buffer.hour*3600000 + buffer.minute*60000 + now ;
	}
	second=parseInt((now/1000)%60);
	minute=parseInt((now/(1000*60))%60);
	hour= parseInt((now/(1000*60*60))%24);
	console.log("NOW",hour , minute, second);
   //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
	if(length!==radius*0.9){
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.rotate(pos);
		ctx.lineTo(0, -length);
		ctx.stroke();
		ctx.rotate(-pos);
	}
	else{
		ctx.beginPath();
		ctx.strokeStyle="red";
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.rotate(pos);
		ctx.lineTo(0, -length);
		ctx.stroke();
		ctx.rotate(-pos);
	}
    
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

document.getElementById('ist').onclick = function(){
	buffer.hour = 5;
	buffer.minute = 30;
	console.log(buffer);
	drawTime(ctx, radius,buffer);
}
document.getElementById('utc').onclick = function(){
	buffer.hour = 0;
	buffer.minute = 0;
	console.log(buffer);
	drawTime(ctx, radius,buffer);
}
document.getElementById('wst').onclick = function(){
	buffer.hour = 8;
	buffer.minute = 0;
	console.log(buffer);
	drawTime(ctx, radius,buffer);
}