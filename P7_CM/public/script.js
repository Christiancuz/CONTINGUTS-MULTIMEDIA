//Felipe Christian Cuzcano_PingPong

$(document).ready(function() {

    var Pala = function(x_start, y_end){
        this.color_pala = "#FF5274";
        this.position = {x:x_start, y:55};
        this.size = {w:3, h:40};
        this.y_end = y_end;	
    };

    Pala.prototype.render = function(ctx){
	ctx.fillStyle = this.color_pala;
	ctx.fillRect(	this.position.x,
			this.position.y,
			this.size.w,
			this.size.h);
    };


    Pala.prototype.goUp = function(){
        if(this.position.y >= 20) this.position.y -= 10;
    };

    Pala.prototype.goDown = function(){
        if(this.position.y+this.size.h <= this.y_end) this.position.y += 10;
    };

    Pala.prototype.setKeys = function(keyUp, keyDown){
        var _this = this;
        $(window).keydown(function(event) {
            if ( event.which == keyUp ) {
                _this.goUp()
            }else if( event.which == keyDown ){
                _this.goDown();
            }
        });
    }

    var Bola = function(start_pos_x, start_pos_y){
	this.color_bola = "#ff0000";
        this.PosBall = {x:start_pos_x, y:start_pos_y};
	this.radiusBola = 3;
	this.DirBall = {x:-1, y:-1};
	this.SpeedBall = {x:7, y:7}; 
    }

    Bola.prototype.render = function(ctx){
	ctx.beginPath();
	ctx.fillStyle = this.color_bola;
	ctx.arc(this.PosBall.x, this.PosBall.y, this.radiusBola, 0, (Math.PI / 180)*360, false);
	ctx.fill();
	ctx.closePath;    
    }

    //variables marcador
    var EquipoA=0;
    var EquipoB=0;


    //Socket
    var socket = io();

    socket.on('redibujar-marcador', function(newScore){
      EquipoA = newScore.equipoA;
      EquipoB = newScore.equipoB;
      CambiaMarcador(ctx);
    });


    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");


    var pala_L = new Pala(0, canvas.height);
    var pala_R = new Pala(297,canvas.height);


    pala_L.setKeys(81,65);
    pala_R.setKeys(87,83);


    var bola = new Bola(canvas.width/2, canvas.height/2);


    var image1 = new Image();
    image1.src = "http://vignette4.wikia.nocookie.net/gameofthrones/images/8/8a/House-Stark-Main-Shield.PNG/revision/latest/scale-to-width-down/250?cb=20160703180116";
	

    var image2 = new Image();
    image2.src = "http://vignette1.wikia.nocookie.net/gameofthrones/images/d/dd/House-Bolton-Main-Shield.PNG/revision/latest/scale-to-width-down/250?cb=20160312000641";

    function renderCampo(ctx){

        //Camp
        ctx.fillStyle ="#F7FFB2";
        ctx.fillRect(0,15,500,400);
	
        //Nom
        ctx.fillStyle = "#000000";
        ctx.font = "10px";
        ctx.fillText("H.Stark", 85, 10);
	ctx.fillText("-", 148, 10);
        ctx.fillText("H.Bolton", 175, 10);

	//Logo
	ctx.drawImage(image1,20,0,50,50);
    	ctx.drawImage(image2,230,0,50,50);
			
        //Línea
        ctx.strokeStyle = "#FF5274";
        ctx.moveTo(150, 15);
        ctx.lineTo(150, 500);
        ctx.stroke();
    }

    //Marcador
    function CambiaMarcador(ctx){
        ctx.fillStyle = "#252525";
        ctx.fillText(EquipoA,134,10);
        ctx.fillText(EquipoB,160,10);
    }


    function updateBola(){
        bola.PosBall.x = bola.PosBall.x + bola.SpeedBall.x * bola.DirBall.x;
	bola.PosBall.y = bola.PosBall.y + bola.SpeedBall.y * bola.DirBall.y;

	//Punto equipoA
	if(bola.PosBall.x < 0){
	    socket.emit('puntoA');
	    bola.PosBall.x = canvas.width/2;
	    bola.PosBall.y = canvas.height/2;
	    pala_L.position.x = 0;
	    pala_L.position.y = 55;
	    pala_R.position.x = 297;
	    pala_R.position.y = 55;	
        }

	//punto equipoB
        if(bola.PosBall.x > canvas.width){
	    socket.emit('puntoB');
	    bola.PosBall.x = canvas.width/2;
	    bola.PosBall.y = canvas.height/2;
	    pala_L.position.x = 0;
	    pala_L.position.y = 55;
	    pala_R.position.x = 297;
	    pala_R.position.y = 55;
	}	

	// Rebote borde arriba
	if(bola.PosBall.y < 17 + bola.radiusBola){
	    bola.DirBall.y = 1;
	}

	// Rebote borde abajo
	if(bola.PosBall.y > canvas.height - bola.radiusBola){
	    bola.DirBall.y = -1;
	}

	// Rebote borde izquierda
	if(bola.PosBall.y >= pala_L.position.y && bola.PosBall.y <= pala_L.position.y + pala_L.size.h && bola.PosBall.x >= pala_L.position.x && bola.PosBall.x <= pala_L.position.x + pala_L.size.w){
	    bola.DirBall.x = 1;
	}

	// Rebote borde derecha
	if(bola.PosBall.y >= pala_R.position.y && bola.PosBall.y <= pala_R.position.y + pala_R.size.h && bola.PosBall.x >= pala_R.position.x && bola.PosBall.x <= pala_R.position.x + pala_R.size.w){
	    bola.DirBall.x = -1;
	}
    }



    function render(){
	updateBola();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	renderCampo(ctx);
	CambiaMarcador(ctx);
	pala_L.render(ctx);
	pala_R.render(ctx);
	bola.render(ctx);
    };
    setInterval(render, 100);
});



// Reloj: Cuenta atrás

var segundos = 0;
var minutos = 1;
var llamada;
var ceromin='';
var ceroseg='';
   
function cuentaAtras(){
  devolvercero(minutos,segundos);
  segundos = segundos % 60;
  document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
  
  if (minutos ===0 && segundos ===0){
   alert ("Refrescar Página para empezar");
    clearTimeOut(llamada);
  }

  if (segundos ==0){
    minutos --;
    segundos+=60;   
  }   
  segundos --;
  var llamada = setTimeout(cuentaAtras,1000);
}
   
function devolvercero(minutos,segundos){
  if (minutos<10){
    ceromin='0';
  }

  if (segundos<10){
    ceroseg='0';
  }else {
    ceroseg='';
  }

  return ceroseg;
}

