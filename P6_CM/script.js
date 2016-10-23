
$( document ).ready(function() {
    var pos = 0;
    function render(){
        var canvas = document.getElementById("mycanvas");
        var ctx = canvas.getContext("2d");
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#808080";
        ctx.fillRect(100+pos,10+pos,100,100);
        // pos = (pos + 5) % 50;
        //console.log(pos);

        var img = new Image();
        img.src ="http://es.calcuworld.com/wp-content/uploads/sites/2/2016/05/signo-conquistar-hombre.png";
        ctx.drawImage(img, 100, 10, 10, 10); 
        ctx.strokeText("HOMBRES",80,125,80,80); 

        var img2 = new Image();
        img.src ="http://es.calcuworld.com/wp-content/uploads/sites/2/2016/05/signo-conquistar-mujer.png";
        ctx.drawImage(img, 190, 10, 10, 10);
        ctx.strokeText("MUEJERES",190,125,80,80);

    };
    setInterval(render, 1000);
});






    // Cuenta atrás

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
       alert ("GAME OVER");
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
      return ceromin;
    }


