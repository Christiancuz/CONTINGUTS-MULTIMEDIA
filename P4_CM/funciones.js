var tot = 0;
var nid = 1; 

function borrar(nid,pre){
	var borrar = document.getElementById(nid);
    borrar.parentNode.removeChild(borrar);
	var borrar1 = document.getElementById('b'+nid);
    borrar1.parentNode.removeChild(borrar1);
	tot -= pre;
	document.getElementById("suma").innerHTML = "Total " + tot.toFixed(2) + "€";
}


function comprar(descrip, precio){
   var espacio = document.getElementById("total");
   var parrafo = document.createElement("p");
   idp = nid;
   parrafo.setAttribute("id",nid);
   anclaN=document.createElement("a");
   anclaN.setAttribute("href","#");
   anclaN.setAttribute("title", "X");
   anclaN.setAttribute("onClick","borrar("+nid+","+precio+")");
   
   var ids = document.getElementById(idp);
   
   var contenido = document.createTextNode(descrip+" "+precio+"€");
   parrafo.appendChild(contenido); 
   //ids.appendChild(anclaN);
   espacio.appendChild(parrafo);
   var boton = document.createElement("input");
   boton.setAttribute("type", "button");
   boton.setAttribute("value", "x");
   boton.setAttribute("id", "b"+nid);
   boton.setAttribute("onClick", "borrar("+nid+","+precio+");");
   espacio.appendChild(boton);
   tot += parseFloat(precio);
   document.getElementById("suma").innerHTML = "Total " + tot.toFixed(2) + "€";
   nid++
}