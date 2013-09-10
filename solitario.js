/*
 * Juego de Solitario, hecho con javascript utilizando el framework jQuery
 * Version: 1.
 * Desarrollado por: Carlos Marcelo Caal Mendoza (cammend)
 * */

var baraja = new Array(52);
var divBajas = new Array(7);
var tipo = new Array(4);
var cartasFuera = new Array();
var numCartasFuera = 0;
var numCartaGlobal, tipoCartaGlobal;
var numColumnaGlobal, numCartaColumnaGlobal, numMaxColumnaGlobal;
var estoyJugando = false;
var cartasSeleccionadas = new Array();
var nCartasS = 0;
var mazo = new Array();
var cartas = new Array();
var p = new Array(4);
var c = new Array(7);
var np = new Array(4);
var nc = new Array(7);
var pTemp;
var cTemp;
var hayCartaSelect = false;
var iii, jjj;
var nMazo = 0, nCartas = 0;
var puntos = 0;

function initArrays(){
	for(var i=0; i<7; i++){
		c[i] = new Array();
	}
	for(var i=0; i<4; i++){
		np[i] = 0;
	}
}

function estaBocaArriba(cart){
	//alert("inicio boca arriba");
	var temp = jQuery(cart).attr("src");
	if( temp == "img/back.png" ){
		//alert("boca arriba false");
		return false;
	}else{
		//alert("boca arriba true");
		return true;
	}
}

function colocarBocaArriba(cart){
	var temp = jQuery(cart).attr("alt");
	jQuery(cart).attr("src", "img/"+temp+".png");
}

function buscarColumna(cart){ //se le pasa un parametro tipo ("img#i"+nombreCarta)
	var temp = jQuery(cart).attr("alt");
	var nombre;
	for(var i=0; i<7; i++){
		for(var j=0; j<nc[i]; j++){ //nc[i] numero de cartas en la col inferior i
			nombre = jQuery("img#i"+c[i][j]).attr("alt");
			if( nombre == temp ){
				numColumnaGlobal = i;
				numMaxColumnaGlobal = nc[i];
				numCartaColumnaGlobal = j;
				return;
			}else{
				numColumnaGlobal = -1;
				numMaxColumnaGlobal = -1;
				numCartaColumnaGlobal = -1;
			}
		}
	}
}
//por si la carta esta hasta arriba de las demas
function esCartaTop(cart){
	buscarColumna(cart);
	//alert("numCartaColumnaGlobal: "+numCartaColumnaGlobal+"\nnumMaxColumnaGlobal: "+numMaxColumnaGlobal+"\nnumColumnaGlobal: "+numColumnaGlobal);
	if( numCartaColumnaGlobal == numMaxColumnaGlobal-1 ){
		//alert("es carta top\nNCCG: "+numCartaColumnaGlobal+"\nNMCG: "+numMaxColumnaGlobal);
		return true;
	}else{
		//alert("no es carta topnNCCG: "+numCartaColumnaGlobal+"\nNMCG: "+numMaxColumnaGlobal);
		return false;
	}
}
//si la carta esta en el mazo principal
function estaEnMazoPrincipal(cart){
	//alert("mazo principal");
	var nombre;
	for(var i=0; i<nMazo; i++){
		nombre = jQuery(cart).attr("alt");
		if( mazo[i] == nombre){
			//alert("esta en mp");
			return true;
		}
	}
	//alert("NO esta en mp");
	return false;
}
//esta en mazo secundario
function estaEnMazoSecundario(cart){
	var nombre;
	for(var i=0; i<nCartas; i++){
		nombre = jQuery(cart).attr("alt");
		if( cartas[i] == nombre){
			//alert("esta en mp");
			return true;
		}
	}
	//alert("NO esta en mp");
	return false;
}
function recolocarColumna(num){
	var temp;
	//alert("cartas en col "+num+": "+nc[num]);
	for(var i=0; i<nc[num]; i++){
		temp = jQuery("div#"+c[num][i]);
		temp.css("top", i*30+"px");
		temp.css("left", "0px");
		temp.css("zIndex",100+i);
		//alert(c[num][i]);
	}
}
function colocarEnPilaPrincipal(cart){
	//alert(mazo.length);
	cartas[nCartas] = mazo[nMazo-1];
	nCartas++; nMazo--;
	var divi = jQuery(cart).parent(); //para obtener el padre
	divi.css("left","132px");
	divi.css("zIndex", nCartas+100);
	colocarBocaArriba(cart);
}
//esta funcion se llama si se le da clic a cualquier carta (boca arriba o boca abajo)
function clickCarta(cart){
	//alert( $(cart).attr("alt") );
	/*for(var i=0; i<numCartasFuera; i++){
		alert("carta fuera: "+cartasFuera[i]);
	}*/
	if( estaCartaFuera( jQuery(cart).attr("alt") ) & !hayCartaSelect ){
		
		cartasSeleccionadas[0] = jQuery(cart).attr("alt");
		return;
	}
	if( !estaBocaArriba(cart) ){
		if( estaEnMazoPrincipal(cart) & !hayCartaSelect ){
			colocarEnPilaPrincipal(cart);
		} else if( esCartaTop(cart) ){
			colocarBocaArriba(cart);
		}
	}else{
		if( hayCartaSelect ){
			if( estaCartaFuera( jQuery(cart).attr("alt") ) ){
				//alert("click a: "+jQuery(cart).attr("alt"));
				//cartasSeleccionadas[0] = jQuery(cart).attr("alt");
				return;
			}
			comprobarMovimiento(cart);
		}else{
			if( estaCartaFuera( jQuery(cart).attr("alt") ) ){
				cartasSeleccionadas[0] = jQuery(cart).attr("alt");
				return;
			}
			seleccionarCartas(cart);
			hayCartaSelect = true;
		}
	}
}

function comprobarMovimiento(cart){
	var cSelect = cartasSeleccionadas[0];
	var cClick  = jQuery(cart).attr("alt");
	//alert(cClick);
	var claseSelect = jQuery("div#"+cSelect).attr("class");
	var claseClick  = jQuery("div#"+cClick).attr("class");
	//alert("comprobando");
	var colorClick, colorSelect;
	//comprobando el color de claseSelect
	if( claseSelect == "espadas"){
		colorSelect = "negro";
	}else if( claseSelect == "treboles"){
		colorSelect = "negro";
	}else{
		colorSelect = "rojo";
	}
	//comprobando el color de claseClick
	if( claseClick == "espadas"){
		colorClick = "negro";
	}else if( claseClick == "treboles"){
		colorClick = "negro";
	}else{
		colorClick = "rojo";
	}
	//moviendo
	var nclick, nselect;
	valorCarta(cClick);
	nclick = numCartaGlobal;
	valorCarta(cSelect);
	nselect = numCartaGlobal;
	if( colorSelect != colorClick & nclick == (nselect+1) & esCartaTop("img#i"+cClick) ){
			//alert("buen movimiento.."+colorSelect+"..a.."+colorClick);
			moverColumna(cSelect, cClick);
	}else{
		//alert("mal movimiento.."+colorSelect+"..a.."+colorClick);
		nCartasS++;
		desSeleccionar();
	}
}

function bajarCarta(cSelect, cClick, num){
	var temp = jQuery("div#"+cSelect);
	c[num][nc[num]] = cSelect;
	//nCartasS = 1;
	desSeleccionar();
	//quitando del paquete cartas
	nCartas--;
	//alert("c[num][cn[num]]: "+c[num][nc[num]]);
	nc[num]++;
	jQuery("div#divBaja"+num).append(temp);
	recolocarColumna(num);
}

function moverColumna(cSelect, cClick){
	//alert("movCOl");
	buscarColumna("img#i"+cClick);
	var cnmax = numMaxColumnaGlobal-1;
	var cnCol = numColumnaGlobal;
	buscarColumna("img#i"+cSelect);
	var snmax = numMaxColumnaGlobal-1;
	var snCol = numColumnaGlobal;
	if( numColumnaGlobal == -1){
		bajarCarta(cSelect, cClick, cnCol);
		return;
	}
	var temp;
	//alert("nc[cnCol]: "+nc[cnCol]);
	for(var i=0; i<nCartasS; i++){
		temp = jQuery("div#"+cartasSeleccionadas[i]);
		c[cnCol][cnmax+1] = cartasSeleccionadas[i];
		nc[cnCol]++;
		jQuery("div#divBaja"+cnCol).append( temp );
		cnmax++;
	}
	//alert("snCol: "+snCol);
	
	//jQuery( "div#divBaja"+cnCol ).children().css("zIndex",0); 
	var t = nCartasS;
	desSeleccionar();
	//alert("numColumnaGlobal: "+numColumnaGlobal+"\nnumCartaColumnaGlobal: "+numCartaColumnaGlobal);
	nc[snCol] = nc[snCol] - t;
	//alert("ColumnaBaja"+snCol+":  "+nc[snCol]);
	recolocarColumna(cnCol);
}

function valorCarta(nombre){
	var temp;
	for(var t=0; t<4; t++){
		for(var i=1; i<14; i++){
			temp = i+"_"+tipo[t];
			//alert("nombre: "+nombre+"---temp: "+temp);
			if( temp == nombre ){
				tipoCartaGlobal = tipo[t];
				numCartaGlobal  = i;
				return;
			}
		}
	}
}
function seleccionarCartas(cart){
	buscarColumna(cart);
	var temp, j;
	j = numCartaColumnaGlobal;
	if( estaEnMazoSecundario(cart) ){
		opacarCarta(cart);
		nCartasS = 1;
		return;
	}
	while(true){
		//alert("j: "+j+"\nnumMaxColumnaGlobal: "+numMaxColumnaGlobal);
		if( j < numMaxColumnaGlobal){
			temp = jQuery("img#i"+c[numColumnaGlobal][j]);
			//alert("seleccionando varias cartas---\nj:"+j+"\nnumMaxColumnaGlobal: "+numMaxColumnaGlobal+"\nnumColumnaGlobal: "+numColumnaGlobal);
			opacarCarta(temp);
			j++;
		}else if( estaBocaArriba(cart) ){
			//opacarCarta(cart);
			break;
		}
	}
	//nCartasS--;
}
function desSeleccionar(){
	var temp;
	//alert("dess:\nCartasS: "+nCartasS);
	for(var i=0; i<nCartasS; i++){
		temp = jQuery("img#i"+cartasSeleccionadas[i]);
		temp.animate({opacity:1}, "fast");
	}
	hayCartaSelect = false;
	nCartasS = 0;
	//alert("desseleccionado");
}
function opacarCarta(carta){
	jQuery(carta).animate({opacity:0.5});
	cartasSeleccionadas[nCartasS] = jQuery(carta).attr("alt");
	nCartasS++;
	//alert("opacar no: "+nCartasS);
}

function crearCartas(){
	var i, j, n, pathCarta, nombreCarta;
	var t = 0;
	var divCarta;
	var imgCarta;
	var carta;
	//colocando eventos a las divisiones de arriba
	jQuery("div#pila1").click( function () {
		clickPilaAlta(this);
	});
	jQuery("div#pila2").click( function () {
		clickPilaAlta(this);
	});
	jQuery("div#pila3").click( function () {
		clickPilaAlta(this);
	});
	jQuery("div#pila4").click( function () {
		clickPilaAlta(this);
	});
	
	tipo[0] = "corazones";
	tipo[1] = "espadas";
	tipo[2] = "diamantes";
	tipo[3] = "treboles";
	//creacion de las 52 cartas
	n = 0;
	for(i=0; i<4; i++){ //primer for
		for(j=1; j<=13; j++){ //segundo for
			pathCarta   = "img/"+j+"_"+tipo[t]+".png";
			nombreCarta = j+"_"+tipo[t];
			
			imgCarta = jQuery("<img />")
			imgCarta.attr("src", pathCarta);
			imgCarta.attr("id", "i"+nombreCarta);
			imgCarta.attr("alt", nombreCarta);
			imgCarta.click(function () {  
				clickCarta(this, jQuery(this).parent());
			});
			
			divCarta = jQuery("<div />");
			divCarta.attr("id", nombreCarta);
			divCarta.attr("class", tipo[t]);
			divCarta.css("position", "absolute");
			divCarta.css("width", "97px");
			divCarta.css("height", "151px");
			divCarta.css("left", "17px");
			divCarta.css("top", "52px");
			divCarta.css("z", n+100);

			jQuery( divCarta ).append( imgCarta );
			baraja[n] = nombreCarta; n++;
			jQuery( "div#tablero" ).append( divCarta );
		} //cierre de segundo for
		t++; //para ingresar el siguiente tipo de carta
	} //cierre primer for
	var nombre, num = 17;
	//colocando divisiones para cada columna de la parte baja
	for (i = 0; i < 7; i++){
		nombre = "divBaja"+i;
		divBajas[i] = jQuery("<div />");
		divBajas[i].attr("id", nombre);
		divBajas[i].css("position", "absolute");
		divBajas[i].css("border", "2px solid red");
		divBajas[i].css("width", "97px");
		divBajas[i].css("height", "151px");
		divBajas[i].css("left", num);
		divBajas[i].css("top", "235px");
		divBajas[i].click( function() {
			clickDivBaja(this);
		});
		jQuery("div#tablero").append( divBajas[i] );
		num = num + 115;
	}
} //cierre de funcion

function barajar(){
	var aleat, temp;
	for(var i=0; i<52; i++){
		aleat = Math.floor(Math.random() * 51) + 0;
		temp = baraja[i];
		baraja[i] = baraja[aleat];
		baraja[aleat] = temp;
	}
	for(var i=51; i>=0; i--){
		jQuery("div#tablero").append( jQuery("div#"+baraja[i]) );
		jQuery("div#"+baraja[i]).css("zIndex", i+200); //colocando el z-index
		jQuery("div#"+baraja[i]).css("top", "52px");
		jQuery("div#"+baraja[i]).css("left", "17px");
		jQuery("div#"+baraja[i]).animate({opacity:1}, "fast");
		//jQuery("body").append( jQuery("<p />").text(i+":"+baraja[i]) );
	}
}


function nuevoJuego(){
	barajar();
	var n = 51, i, j;
	var cMazo;
	
	//colocando las cartas
	j=0, k = 1;	t = 0;
	var t;
	var temp;
	if( !estoyJugando ){
		//colocar las cartas en sus vectores
    ponerPrimerClic();
    IniciarCrono(); //para iniciar el tiempo
		initArrays(); //inicializa los arrays
		for (i = 0; i < 7; i++){
			for (j = 0; j < k; j++){
				c[i][j] = baraja[n];
				n--;
			}
			nc[i] = j; //el numero de cartas que hay en cada columna inferior
			//alert("en la Col "+i+" hay "+nc[i]+" cartas.");
			k++;
		}
		for(i=23; i>=0; i--){
			mazo[i] = baraja[n];
			n--;
		}
		nMazo = mazo.length;
		//colocamos las cartas en la parte inferior
		k=1;
		for (i = 0; i < 7; i++){
			for (j = 0; j < c[i].length; j++){
				jQuery("div#"+c[i][j]).css("left","0px");
				jQuery("div#"+c[i][j]).css("top",30*j+"px");
				jQuery("div#divBaja"+i).append( jQuery("div#"+c[i][j]) );
			}
		}
		//poner todas las cartas boca abajo
		for(i=0; i<52; i++){
			jQuery("img#i"+baraja[i]).attr("src", "img/back.png");
		}
		//ordenar en cada columna
		for(i=0; i<7; i++){
			jQuery( "div#divBaja"+i ).children().css("zIndex",0); 
		}
		//colocar la primera carta boca arriba
		var nombreImg;
		for(i=0; i<7; i++){
			nombreImg = c[i][c[i].length-1];
			jQuery("img#i"+nombreImg).attr("src","img/"+nombreImg+".png");
		}
		estoyJugando = true;
	}else{
		barajar();
		estoyJugando = false;
		nMazo = 0; nCartas = 0; nCartasS = 0; hayCartaSelect = false;
		nuevoJuego();
	}
}

function regresarCartasMazoPrincipal(){
	//alert("regresando");
	nMazo = nCartas;
	var j=100;
	for(var i=0; i<nCartas; i++){
		mazo[nMazo-1] = cartas[i];
		jQuery("img#i"+mazo[nMazo-1]).attr("src","img/back.png");
		jQuery("div#"+mazo[nMazo-1]).css("left", "17px");
		jQuery("div#"+mazo[nMazo-1]).css("zIndex", j);
		nMazo--;
		j--;
	}
	nMazo = nCartas;
	nCartas = 0;
	//alert("nMazo: "+nMazo+"\nnCartas"+nCartas);
}

function agregarPilaAlta(div, diviCarta, num){
	buscarColumna("img#i"+cartasSeleccionadas[0]);
	nc[numColumnaGlobal]--;
	diviCarta.css("left", "0px");
	diviCarta.css("top", "0px");
	diviCarta.css("zIndex", num);
	//alert(div+" : "+diviCarta);
	jQuery(div).append( diviCarta );
	p[num] = tipoCartaGlobal;
	np[num]++;
	//alert(cartasSeleccionadas[0]);
	//alert("numColumnaGlobal: "+numColumnaGlobal+"\nnc: "+nc[numColumnaGlobal]);
	colocarCartaFuera(cartasSeleccionadas[0]);
	//alert("numColumnaGlobal: "+numColumnaGlobal+"\nnc: "+nc[numColumnaGlobal]);
	desSeleccionar();
  puntos = puntos+5;
  $("#divPuntuacion").text("Puntos: "+puntos);
}

function clickPilaAlta(div){
	//alert(cartasSeleccionadas[0]);
	if( estaCartaFuera( cartasSeleccionadas[0] ) ){
		//nCartasS = 1;
		//alert("agregando en pila numero: xxxxx  "+cartasSeleccionadas[0]);
		desSeleccionar();
		return;
	}
	var divi = jQuery(div).attr("id");
	var diviCarta = jQuery("div#"+cartasSeleccionadas[0]);
	valorCarta(cartasSeleccionadas[0]);
	if( estaEnMazoSecundario( "img#i"+cartasSeleccionadas[0] ) ){
		nCartas--; //para quitar del mazo secundario
		//nCartasS = 1; //para que se seleccione y se mueva la carta
	}
	//alert("nCartasS: "+nCartasS+"\nnumCartaGlobal: "+numCartaGlobal);
	//alert("class: "+jQuery(div).attr("class")+"\nnp[0]: "+np[0]+"\ntipoCartaGlobal: "+tipoCartaGlobal);
	if( divi == "pila1" ){
		if( nCartasS == 1 & numCartaGlobal == 1 ){
			agregarPilaAlta(div, diviCarta, 0);
		}else if( nCartasS == 1 & p[0] == tipoCartaGlobal & (np[0]+1) == numCartaGlobal ){
			agregarPilaAlta(div, diviCarta, 0);
		}else{
			desSeleccionar();
		}
	}else if( divi == "pila2" ){
		if( nCartasS == 1 & numCartaGlobal == 1 ){
			agregarPilaAlta(div, diviCarta, 1);
		}else if( nCartasS == 1 & p[1] == tipoCartaGlobal & (np[1]+1) == numCartaGlobal ){
			agregarPilaAlta(div, diviCarta, 1);
		}else{
			desSeleccionar();
		}
	}else if( divi == "pila3" ){
		if( nCartasS == 1 & numCartaGlobal == 1 ){
			agregarPilaAlta(div, diviCarta, 2);
		}else if( nCartasS == 1 & p[2] == tipoCartaGlobal & (np[2]+1) == numCartaGlobal ){
			agregarPilaAlta(div, diviCarta, 2);
		}else{
			desSeleccionar();
		}
	}else{
		if( nCartasS == 1 & numCartaGlobal == 1 ){
			agregarPilaAlta(div, diviCarta, 3);
		}else if( nCartasS == 1 & p[3] == tipoCartaGlobal & (np[3]+1) == numCartaGlobal ){
			agregarPilaAlta(div, diviCarta, 3);
		}else{
			desSeleccionar();
		}
	}
	valorCarta(cartasSeleccionadas[0]);
	if( nCartasS == 1 & numCartaGlobal == 1 ){
		jQuery("div#pila"+num).append(temp);
	}else{
		//alert("Esta no es as");
	}
	if( numCartasFuera == 52 ){
		hasGanado();
	}
}

function numColumna(div){
	var temp = jQuery(div).attr("id");
	for(var i=0; i<7; i++){
		if( temp == "divBaja"+i ){
			return i;
		}
	}
}

function moverRey(col){
	buscarColumna("img#i"+cartasSeleccionadas[0]);
	if( estaEnMazoSecundario("img#i"+cartasSeleccionadas[0]) ){
		//alert("está en mazo secundario");
		nCartas--;
		nCartasS = 1;
	}
	//alert("num Cartas: "+nCartasS);
	//alert("numColumnaGlobal: "+numColumnaGlobal);
	for(var i=0; i<nCartasS; i++){
		//alert("cantidad de cartas: "+nc[col]);
		c[col][nc[col]] = cartasSeleccionadas[i];
		nc[col]++;
		nc[numColumnaGlobal]--;
		jQuery("div#divBaja"+col).append( jQuery("div#"+cartasSeleccionadas[i]) );
	}
	//alert("columna agregada: "+col);
	recolocarColumna(col);
}

function clickDivBaja(div){
	//alert("nc[numColumna(div)]: "+nc[numColumna(div)]);
	//alert("nCartasS: "+nCartasS);
	var num = nc[numColumna(div)];
	if( num == 0){
		//alert(nc[numColumna(div)]+": nCartas:"+nCartasS);
		valorCarta(cartasSeleccionadas[0]);
		if( numCartaGlobal == 13 ){
			//alert("Cartas Select: "+nCartasS);
			moverRey(numColumna(div));
			desSeleccionar();
		}
	}else{
		//desSeleccionar();
	}
}

function colocarCartaFuera(nombre){
	cartasFuera[numCartasFuera] = nombre;
	numCartasFuera++;
}

function estaCartaFuera(nombre){
	for(var i=0; i<cartasFuera.length; i++){
		if( cartasFuera[i] == nombre ){
			return true;
		}
	}
	return false;
}

function hasGanado(){
  DetenerCrono();
  var segundos = getSegundos();
  var minutos  = getMinutos();
  var m, s;
  if( minutos == 1 )
    m = "minuto";
  else
    m = "minutos";
  if( segundos == 1 )
    s = "segundo";
  else
    s = "segundos";
	alert("Has Ganado!\n"+
  "Su tiempo ha sido de: "+minutos+" "+m+" y "+segundos+" "+s+"\n"+
  "Puntuacion Total: "+(puntos-minutos));
  //$("#tablero").hide();
	enviar();
}

function mover(){
	var temp = "";
	var cartasP = "Cartas en Mazo Secundario:\n";
	buscarColumna("img#i"+cartasSeleccionadas[i])
	for(var i=0; i<nCartasS; i++){
		temp = temp + cartasSeleccionadas[i] + ", ";
	}
	for(var i=0; i<nCartas; i++){
		cartasP = cartasP+cartas[i]+"\n";
	}
	alert("Cartas Seleccionadas: "+nCartasS+"\n"+
	"Cartas S: "+temp+"\n"+
	"Columna de Cartas Seleccionadas: "+numColumnaGlobal+"\n"+
	"Num de Cartas en Columna "+numColumnaGlobal+": "+nc[numColumnaGlobal]+"\n"+
	"Hay Cartas Seleccionadas: "+hayCartaSelect+cartasP);
}

function debug(){
	
}

function enviar(){
	DetenerCrono();
	var nombre = prompt('Introduce tu nombre','user');
	var parametros = {
	"nombre" : nombre,
	"tiempo" : "0:"+minutos+":"+segundos,
	"puntos" : (puntos-minutos)
	};
  $.ajax({
	data: parametros,
	url: 'ingresar_bd.php',
	type: 'post',
	
	success: function (response) {
		alert(response);
	}
});
}
