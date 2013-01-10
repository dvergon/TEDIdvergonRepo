window.onload = function (){

	esconderElementosInicio();
}

//Esconde todos los elementos de la pagina, excepto por el encabezado del ejercicio y la seleccio de cruza
function esconderElementosInicio(){

	document.getElementById('contenedorOpciones').style.display = 'block';
	document.getElementById('monohibridoDiv').style.display = 'none';
	document.getElementById('dihibridoDiv').style.display = 'none';
	document.getElementById('verificarSeleccionButton').style.display = 'none';
	document.getElementById('contenedorSeleccionTablas').style.display = 'none';
	document.getElementById('tablaMonohibridoDiv').style.display = 'none';
	document.getElementById('tablaDihibridoDiv').style.display = 'none';
	document.getElementById('contenedorTablas').style.display = 'none';
	document.getElementById('validarTablaMono2').style.display = 'none';
}


function bloquearElementosEtapa1(){

	document.getElementById('tipoCruzaSeleccion').disabled = true;
	document.getElementById('verificarSeleccionButton').disabled = true;
	document.getElementById('caracteristicaDeEstudio1').disabled = true;
	document.getElementById('caracteristicaDeEstudio2').disabled = true;
	document.getElementById('aleloDominanteMono').disabled = true;
	document.getElementById('aleloDominanteDi').disabled = true;
	document.getElementById('aleloRecesivoMono').disabled = true;
	document.getElementById('aleloRecesivoDi').disabled = true;
}

/*Cambia la visibilidad de las divisiones que contienen las caract. de estudio y alelos. Ademas, valida que el
  tipo de cruza concuerde con el requerido para el ejercicio.
*/
function cambiarVisibilidadSeleccion(){ 

	document.getElementById('monohibridoDiv').style.display = 'none';
	document.getElementById('dihibridoDiv').style.display = 'none';
	document.getElementById('verificarSeleccionButton').style.display = 'none';
	document.getElementById('contenedorSeleccionTablas').style.display = 'none';
	document.getElementById('contenedorTablas').style.display = 'none';
	document.getElementById('tablaMonohibridoDiv').style.display = 'none';
	document.getElementById('tablaDihibridoDiv').style.display = 'none';

	var tipoCruzaEjercicio = "monohibrido";

	if(document.getElementById('tipoCruzaSeleccion').value == tipoCruzaEjercicio){
		if(document.getElementById('tipoCruzaSeleccion').value == 'dihibrido'){

			document.getElementById('monohibridoDiv').style.display = 'block';
			document.getElementById('dihibridoDiv').style.display = 'block';
			document.getElementById('verificarSeleccionButton').style.display = 'block';


		}else if(document.getElementById('tipoCruzaSeleccion').value == 'monohibrido'){

			document.getElementById('monohibridoDiv').style.display = 'block';
			document.getElementById('verificarSeleccionButton').style.display = 'block';
		}
	}else if(document.getElementById('tipoCruzaSeleccion').value != "default"){

		alert("Tipo de cruza seleccionado != Tipo de cruza necesario");
		var temp = document.getElementById('tipoCruzaSeleccion');
		temp.options[0].selected = true;
	}
	
}

function verificarEtapa1(){

	//Verifica si los alelos estan correctos en ambos escenarios: monohibrido/dihibrido
	switch(document.getElementById('tipoCruzaSeleccion').value){

		case "monohibrido":
			if(validarIdentificadoresCaracteristicaEstudio1()){

				cambiarVisibilidadSeleccionTablas('block');
				bloquearElementosEtapa1();
			}
		break;

		case "dihibrido":
			if(validarIdentificadoresCaracteristicaEstudio1() && validarIdentificadoresCaracteristicaEstudio2()){

				cambiarVisibilidadSeleccionTablas('block');
				bloquearElementosEtapa1();
			}
		break;
	}	
}


function validarIdentificadoresCaracteristicaEstudio1(){

	var recesivoMono = "" + document.getElementById('aleloRecesivoMono').value;
	var dominanteMono = "" + document.getElementById('aleloDominanteMono').value;

	var valido = true;

	//Caso 1: Identificador dominante minuscula
	if(dominanteMono != dominanteMono.toUpperCase()){

		alert("Caso 1 (Caracteristica de Estudio 1): Identificador dominante minuscula");
		valido = false;
	}
	//Caso 2: Identificador Recesivo != Dominante
	else if(recesivoMono.toUpperCase() != dominanteMono){

		alert("Caso 2 (Caracteristica de Estudio 1): Identificador Recesivo != Dominante");
		valido = false;
	}
	//Caso 3: Identificador recesivo mayuscula
	else if(recesivoMono == recesivoMono.toUpperCase()){

		alert("Caso 3 (Caracteristica de Estudio 1): Identificador recesivo mayuscula");
		valido = false;
	}

	return valido;

}

function validarIdentificadoresCaracteristicaEstudio2(){

	var recesivoDi = "" + document.getElementById('aleloRecesivoDi').value;
	var dominanteDi = "" + document.getElementById('aleloDominanteDi').value;

	var valido = true;

	//Caso 1: Identificador dominante minuscula
	if(dominanteDi != dominanteDi.toUpperCase()){

		alert("Caso 1 (Caracteristica de Estudio 2): Identificador dominante minuscula");
		valido = false;
	}
	//Caso 2: Identificador Recesivo != Dominante
	else if(recesivoDi.toUpperCase() != dominanteDi){

		alert("Caso 2 (Caracteristica de Estudio 2): Identificador Recesivo != Dominante");
		valido = false;
	}
	//Caso 3: Identificador recesivo mayuscula
	else if(recesivoDi == recesivoDi.toUpperCase()){

		alert("Caso 3 (Caracteristica de Estudio 2): Identificador recesivo mayuscula");
		valido = false;
	}

	return valido;

}

function validarSeleccionCaracteristicaEstudio1(){

	var caracteristicaDeEstudioEjercicio1 = "tamanoTallo";
	
	if(document.getElementById('caracteristicaDeEstudio1').value != caracteristicaDeEstudioEjercicio1){

		alert("Caracteristica de estudio seleccionada != Caracteristica de Estudio necesaria");
		var temp = document.getElementById('caracteristicaDeEstudio1');
		temp.options[0].selected = true;
	}
}

function validarSeleccionCaracteristicaEstudio2(){

	var caracteristicaDeEstudioEjercicio2 = "";
	
	if(document.getElementById('caracteristicaDeEstudio2').value != caracteristicaDeEstudioEjercicio2){

		alert("Caracteristica de estudio seleccionada != Caracteristica de Estudio necesaria");
		var temp = document.getElementById('caracteristicaDeEstudio2');
		temp.options[0].selected = true;
	}
}

function validarTablaMonohibrido(){

	if(validarTablaMonohibridoParte1()){
		validarTablaMonohibridoParte2();
	}
} 

function validarTablaMonohibridoParte1(){


	/*cM = Celda Monohibrido
	0 - 1 - 2
	3 - 4 - 5
	6 - 7 - 8 

	cM1 debe ser Mayus
	cM3 debe ser Mayus
	cM2 debe ser Minus
	cM6 debe ser Minus

	cM1 debe ser igual a cM3
	cM2 debe ser igual a cM6
	*/

	var aleloDominanteMono = document.getElementById('aleloDominanteMono');
	var aleloRecesivoMono = document.getElementById('aleloRecesivoMono');

	var cM1 = document.getElementById('celdaMonohibrido1');
	var cM2 = document.getElementById('celdaMonohibrido2');
	var cM3 = document.getElementById('celdaMonohibrido3');
	var cM6 = document.getElementById('celdaMonohibrido6');

	var valido = true;
	var errores = "--- Log ---";

	//---- Revisar Mayusculas (cM1 - cM3)----
	if(cM1.value != cM1.value.toUpperCase()){

		valido = false;
		errores+="\ncM1 Minus";
		cM1.style.backgroundColor = 'red';
		cM1.style.color = 'white';
	}else{

		cM1.style.backgroundColor = 'green';
		cM1.style.color = 'white';
	}

	if(cM3.value != cM3.value.toUpperCase()){

		valido = false;
		errores+="\ncM3 Minus";
		cM3.style.backgroundColor = 'red';
		cM3.style.color = 'white';
	}else{

		cM3.style.backgroundColor = 'green';
		cM3.style.color = 'white';
	}
	//-----------------<FIN>-----------------


	//---- Revisar Minusculas (cM2 - cM6)----
	if(cM2.value != cM2.value.toLowerCase()){

		valido = false;
		errores+="\ncM2 Mayus";
		cM2.style.backgroundColor = 'red';
		cM2.style.color = 'white';
	}else{

		cM2.style.backgroundColor = 'green';
		cM2.style.color = 'white';
	}

	if(cM6.value != cM6.value.toLowerCase()){

		valido = false;
		errores+="\ncM6 Mayus";
		cM6.style.backgroundColor = 'red';
		cM6.style.color = 'white';
	}else{

		cM6.style.backgroundColor = 'green';
		cM6.style.color = 'white';
	}
	//--------------<FIN>--------------------

	//---- Revisar Igualdad Dominante/Recesivo (cM1 - cM2 - cM3 - cM6)----
	if(cM1.value != aleloDominanteMono.value){

		valido = false;
		errores+="\ncM1 != Alelo Dominante";
		cM1.style.backgroundColor = 'red';
		cM1.style.color = 'white';
	}else{

		cM1.style.backgroundColor = 'green';
		cM1.style.color = 'white';
	}

	if(cM2.value != aleloRecesivoMono.value){

		valido = false;
		errores+="\ncM2 != Alelo Recesivo";
		cM2.style.backgroundColor = 'red';
		cM2.style.color = 'white';
	}else{

		cM2.style.backgroundColor = 'green';
		cM2.style.color = 'white';
	}

	if(cM3.value != aleloDominanteMono.value){

		valido = false;
		errores+="\ncM3 != Alelo Dominante";
		cM3.style.backgroundColor = 'red';
		cM3.style.color = 'white';
	}else{

		cM3.style.backgroundColor = 'green';
		cM3.style.color = 'white';
	}

	if(cM6.value != aleloRecesivoMono.value){

		valido = false;
		errores+="\ncM6 != Alelo Recesivo";
		cM6.style.backgroundColor = 'red';
		cM3.style.color = 'white';
	}else{

		cM6.style.backgroundColor = 'green';
		cM3.style.color = 'white';
	}
	//-----------------<FIN>-----------------


	//---- Revisar igualdad (cM1 == cM3 / cM2 == cM6) ----
	if((cM1.value != cM3.value) && (cM1.value != "") && (cM3.value != "")){

		valido = false;
		errores+="\ncM1 != cM3";
	}

	if((cM2.value != cM6.value) && (cM2.value != "") && (cM6.value != "")){

		valido = false;
		errores+="\ncM2 != cM6";
	}
	//----------------------<FIN>-------------------------



	if(!valido){

		alert(errores);
	}else{

		document.getElementById('celdaMonohibrido4').disabled = false;
		document.getElementById('celdaMonohibrido5').disabled = false;
		document.getElementById('celdaMonohibrido7').disabled = false;
		document.getElementById('celdaMonohibrido8').disabled = false;

		document.getElementById('celdaMonohibrido1').disabled = true;
		document.getElementById('celdaMonohibrido2').disabled = true;
		document.getElementById('celdaMonohibrido3').disabled = true;
		document.getElementById('celdaMonohibrido6').disabled = true;
	}
	
	return valido;
}

function validarTablaMonohibridoParte2(){

	/*cM = Celda Monohibrido
	0 - 1 - 2
	3 - 4 - 5
	6 - 7 - 8 

	cM4 es la concatenacion ordenada Mayus/Minus de cM3 y cM1
	cM5 es la concatenacion ordenada Mayus/Minus de cM3 y cM2
	cM7 es la concatenacion ordenada Mayus/Minus de cM6 y cM1
	cM8 es la concatenacion ordenada Mayus/Minus de cM6 y cM2
	*/

	var cM4 = document.getElementById('celdaMonohibrido4');
	var cM5 = document.getElementById('celdaMonohibrido5');
	var cM7 = document.getElementById('celdaMonohibrido7');
	var cM8 = document.getElementById('celdaMonohibrido8');

	var valido = true;
	var errores = "--- Log ---";

	//---- Revision cM4 ----
	var cM4Correcta = document.getElementById('celdaMonohibrido1').value + document.getElementById('celdaMonohibrido3').value;

	if(cM4.value != cM4Correcta || cM4.value == ""){

		valido = false;
		errores += "\ncM4 != (cM1+cM3)";
		cM4.style.backgroundColor = 'red';
		cM4.style.color = 'white';
	}else{

		cM4.style.backgroundColor = 'green';
		cM4.style.color = 'white';
	}
	//--------<FIN>----------

	//---- Revision cM5 ----
	var cM5Correcta = document.getElementById('celdaMonohibrido3').value + document.getElementById('celdaMonohibrido2').value;

	if(cM5.value != cM5Correcta || cM5.value == ""){

		valido = false;
		errores += "\ncM5 != (cM3+cM2)";
		cM5.style.backgroundColor = 'red';
		cM5.style.color = 'white';
	}else{

		cM5.style.backgroundColor = 'green';
		cM5.style.color = 'white';
	}
	//--------<FIN>----------

	//---- Revision cM7 ----
	var cM7Correcta = document.getElementById('celdaMonohibrido1').value + document.getElementById('celdaMonohibrido6').value;

	if(cM7.value != cM7Correcta || cM7.value == ""){

		valido = false;
		errores += "\ncM7 != (cM1+cM6)"; 
		cM7.style.backgroundColor = 'red';
		cM7.style.color = 'white';
	}else{

		cM7.style.backgroundColor = 'green';
		cM7.style.color = 'white';
	}
	//--------<FIN>----------

	//---- Revision cM8 ----
	var cM8Correcta = document.getElementById('celdaMonohibrido2').value + document.getElementById('celdaMonohibrido6').value;

	if(cM8.value != cM8Correcta || cM8.value == ""){

		valido = false;
		errores += "\ncM8 != (cM6+cM2)";
		cM8.style.backgroundColor = 'red';
		cM8.style.color = 'white';
	}else{

		cM8.style.backgroundColor = 'green';
		cM8.style.color = 'white';
	}
	//--------<FIN>----------


	if(!valido){

		alert(errores);
	}

	return valido;
}

function cambiarVisibilidadSeleccionTablas(estado){

	document.getElementById('contenedorSeleccionTablas').style.display = estado;
}

function seleccionTablaMonohibrido(){

	if(document.getElementById('tipoCruzaSeleccion').value == "monohibrido"){

		cambiarVisibilidadSeleccionTablas('none');
		document.getElementById('contenedorTablas').style.display = 'block';
		document.getElementById('tablaMonohibridoDiv').style.display = 'block';
		document.getElementById('celdaMonohibrido4').disabled = true;
		document.getElementById('celdaMonohibrido5').disabled = true;
		document.getElementById('celdaMonohibrido7').disabled = true;
		document.getElementById('celdaMonohibrido8').disabled = true;

	}else{
		alert("Tipo de tabla seleccionada != Tipo de tabla necesaria");
	}

}

function seleccionTablaDihibrido(){

	if(document.getElementById('tipoCruzaSeleccion').value == "dihibrido"){

		cambiarVisibilidadSeleccionTablas('none');
		document.getElementById('contenedorTablas').style.display = 'block';
		document.getElementById('tablaDihibridoDiv').style.display = 'block';

	}else{
		alert("Tipo de tabla seleccionada != Tipo de tabla necesaria");
	}
	
}