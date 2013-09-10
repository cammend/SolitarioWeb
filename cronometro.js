/*
 * Cronómetro.
 * Desarrollado por Carlos Marcelo Caal Mendoza (cammend)
 * */


var CronoID = null;
var CronoEjecutandose = false;
var decimas = 0, segundos = 0, minutos = 0;
var primerClic = false;

function DetenerCrono (){
   	if(CronoEjecutandose){
   		clearTimeout(CronoID);
	}
   	CronoEjecutandose = false;
}

function getDecimas(){
  return decimas;
}
function getSegundos(){
  return segundos;
}
function getMinutos(){
  return minutos;
}

function InicializarCrono () {
	//inicializa contadores globales
	decimas = 0;
	segundos = 0;
	minutos = 0;
	
	//pone a cero los marcadores
	//document.crono.display.value = '00:00:0';
	//document.crono.parcial.value = '00:00:0';
  $("#divTiempo").text("Tiempo: 00:00:00");
}

function MostrarCrono () {
	       
   	//incrementa el crono
   	decimas++;
	if ( decimas > 9 ) {
		decimas = 0;
		segundos++;
		if ( segundos > 59 ) {
			segundos = 0;
			minutos++;
			if ( minutos > 99 ) {
				alert('Fin de la cuenta');
				DetenerCrono();
				return true;
			}
		}
	}

	//configura la salida
	var ValorCrono = "";
	ValorCrono = (minutos < 10) ? "0" + minutos : minutos;
	ValorCrono += (segundos < 10) ? ":0" + segundos : ":" + segundos;
	ValorCrono += ":" + decimas	;
			
  	//document.crono.display.value = ValorCrono;
    $("#divTiempo").text("Tiempo: "+ValorCrono);

  	CronoID = setTimeout("MostrarCrono()", 100);
	CronoEjecutandose = true;
	return true;
}

function IniciarCrono () {
	if( !primerClic ){
		DetenerCrono();
		InicializarCrono();
		MostrarCrono();
		primerClic = true;
		//document.getElementById('t').value = "algo";
	}
}

function ponerPrimerClic(){
	primerClic = false;
	CronoEjecutandose = false;
	clearTimeout(CronoID);
}

function ObtenerParcial() {
	//obtiene cuenta parcial
	//document.crono.parcial.value = document.crono.display.value;
}
