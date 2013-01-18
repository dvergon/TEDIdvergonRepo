var kineticStage;

var stageWidth = 1366;

var stageHeight = 768;

var cardWidth = 134;

var cardHeight = 260;

var cardMarginX = 100;

var cardMarginY = 100;

var cardLayer;

var cardArray;

var cardImageDirectory = "../images/";

var cardImageFormat = ".png";

var cardPairsQ = 20; //Cantidad de pares de cartas disponibles

/*---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------*/

window.onload = function(){

  kineticStage = new Kinetic.Stage({
            container: 'contenedorTest',
            width: stageWidth,
            height: stageHeight
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

Card.prototype.toString = function(){

  var strImg = this.imgFront+" "+this.imgBack+" "+this.imgObjFront +" "+this.imgObjBack;

  return strImg;
}

/*---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------*/

function faceDownFill(){

  var pairsQuantityUser = document.getElementById("quantity").value;

  createRandomCardArray(pairsQuantityUser);

  var kineticImageAux;

  //rowQ = Cantidad de Filas --- colQ = Cantidad de Columnas
  var rowQ = 0;
  var colQ = 0;

  switch(parseInt(pairsQuantityUser)){
    case 1:
      rowQ = 1;
      colQ = 2;
      break;

    case 2:
      rowQ = 2;
      colQ = 2;
      break;

    case 3:
      rowQ = 2;
      colQ = 3;
      break;

    case 4:
      rowQ = 2;
      colQ = 4;
      break;

    case 5:
      rowQ = 2;
      colQ = 5;
      break;

    case 6:
      rowQ = 2;
      colQ = 6;
      break;

    case 8:
      rowQ = 2;
      colQ = 8;
      break;
  }


  for(var indexRow = 0; indexRow < rowQ; indexRow++){
    for(var indexCol = 0; indexCol < colQ; indexCol++){

      var cardAux = cardArray[indexRow+indexCol];

      //console.log(cardAux.getImgBack()+" "+cardAux.getImgFront()+" "+cardAux.getWidth()+" "+cardAux.getHeight()+" "+cardAux.getImgObjFront()+" "+cardAux.getImgObjBack());

      kineticImageAux = new Kinetic.Image({
        x: cardWidth * indexCol + cardMarginX,
        y: cardHeight * indexRow + cardMarginY,
        image: cardAux.getImgObjFront(),
        width: cardAux.getWidth(),
        height: cardAux.getHeight(),
        offset: [cardAux.getWidth()/2, cardAux.getHeight()/2]
      });

      cardLayer.add(kineticImageAux);
    }
  }

  kineticStage.add(cardLayer);
}

function createCardArray(pairsQuantityUser){

  var pairsQuantityUser = pairsQuantityUser;

  var auxCardArray = new Array();

  for(var index = 0; index < pairsQuantityUser; index++){

    var cardImageName = index+1;

    cardAux = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight);
  }
}

function createRandomCardArray(pairsQuantityUser){

  var pairsQuantityUser = pairsQuantityUser;

  var cardCreatedIndexes = new Array();

  for(var index = 0; index < pairsQuantityUser; index++){

    var randomNumber = Math.floor(Math.random()*cardPairsQ);
    
    if(cardCreatedIndexes.indexOf(randomNumber) == -1){

      cardCreatedIndexes[index] = randomNumber;

      var cardImageName = randomNumber+1;

      cardAux = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight);

      cardArray[index] = cardAux;

    }else{

      index--;
    }
  }


  for(var index = 1; index <= cardPairsQ; index++){

    if(cardCreatedIndexes.indexOf(index) != -1){

      var cardImageName = index + "-" + index;

      cardAux2 = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight);

      cardArray[index] = cardAux2;
    }

  }

}

function startAnimation(){


}