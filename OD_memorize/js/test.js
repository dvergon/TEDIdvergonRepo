var kineticStage;

var cardWidth = 154;

var cardHeight = 280;

var cardLayer;

var cardArray;

var cardImageDirectory = "../images/";

var cardImageFormat = ".png";

/*---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------*/

window.onload = function(){

	kineticStage = new Kinetic.Stage({
            container: 'contenedorTest',
            width: 1366,
            height: 768
	});

	cardLayer = new Kinetic.Layer();

	cardArray = new Array();

}

/*---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------*/

//Los parametros imgPathFront/imgPathBack deben ser entregados en string
function Card (imgPathFront, imgPathBack, width, height){

	this.imgFront = imgPathFront;
	this.imgBack = imgPathBack;

	this.cardHeight = height;
	this.cardWidth = width;

	//El objeto Image(), debe quedar dentro de la clase, ya que luego, para hacer la animacion, se necesita de este objeto

  	this.imgObjFront = new Image();
  	this.imgObjBack = new Image();

  	this.imgObjFront.src = this.imgFront;
  	this.imgObjBack.src = this.imgBack;
}

Card.prototype.getImgFront = function(){

	return this.imgFront;
}

Card.prototype.getImgBack = function(){

	return this.imgBack;
}

Card.prototype.getImgObjFront = function(){

	return this.imgObjFront;
}

Card.prototype.getImgObjBack = function(){

	return this.imgObjBack;
}

Card.prototype.getHeight = function(){

	return this.cardHeight;
}

Card.prototype.getWidth = function(){

	return this.cardWidth;
}

/*---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------*/

function faceDownFill(){

	var cardQuantity = document.getElementById("quantity").value;

	createRandomCardArray(cardQuantity);

	var kineticImageAux;

	for(var index = 0; index < cardQuantity; index++){

		var cardAux = cardArray[index];

		//console.log(cardAux.getImgBack()+" "+cardAux.getImgFront()+" "+cardAux.getWidth()+" "+cardAux.getHeight()+" "+cardAux.getImgObjFront()+" "+cardAux.getImgObjBack());

		kineticImageAux = new Kinetic.Image({
			x: kineticStage.getWidth()/2,
			y: kineticStage.getHeight()/2,
			image: cardAux.getImgObjFront(),
			width: cardAux.getWidth(),
			height: cardAux.getHeight(),
			offset: [cardAux.getWidth()/2, cardAux.getHeight()/2],
			draggable: true
		});

		cardLayer.add(kineticImageAux);
	}

	kineticStage.add(cardLayer);
}

function createCardArray(cardQuantity){

	var cardQuantity = cardQuantity;

	for(var index = 0; index < cardQuantity; index++){

		var cardImageName = index+1;

		cardAux = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight);
	}
}

function createRandomCardArray(cardQuantity){

	var cardQuantity = cardQuantity;

	var cardCreatedIndexes = new Array();

	for(var index = 0; index < cardQuantity; index++){

		var randomNumber = Math.floor(Math.random()*cardQuantity);
		
		if(cardCreatedIndexes.indexOf(randomNumber) == -1){

			cardCreatedIndexes[index] = randomNumber;

			var cardImageName = randomNumber+1;

			cardAux = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight);

			cardArray[index] = cardAux;

		}else{

			index--;
		}
	}

	/*var arrayElements = "";

	for(var index = 0; index < cardQuantity; index++){

		arrayElements += cardCreatedIndexes[index] + " ";
	}

	console.log(arrayElements);*/
}

