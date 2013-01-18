var kineticStage;

var stageWidth = 1366;

var stageHeight = 768;

var cardWidth = 134;

var cardHeight = 260;

var cardMarginX = 100;

var cardMarginY = 125;

var cardLayer;

var cardArray;

var kineticImageArray;

var cardImageDirectory = "../images/";

var cardImageFormat = ".png";

var cardPairsQ = 20; //Cantidad de pares de cartas disponibles

var animFront;

var animBack;

var period = 1000; //Duracion de la animacion completa front+back

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

  kineticImageArray = new Array();

}

/*---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------*/

//Los parametros imgPathFront/imgPathBack deben ser entregados en string
function Card (imgPathBack, imgPathFront, width, height){

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

  var elementIndex = 0;

  for(var indexRow = 0; indexRow < rowQ; indexRow++){
    for(var indexCol = 0; indexCol < colQ; indexCol++){

      var cardAux = cardArray[elementIndex];
      console.log(elementIndex);

      //console.log(cardAux.getImgBack()+" "+cardAux.getImgFront()+" "+cardAux.getWidth()+" "+cardAux.getHeight()+" "+cardAux.getImgObjFront()+" "+cardAux.getImgObjBack());

      var kineticCardImage = new Kinetic.Image({
        x: cardWidth * indexCol + cardMarginX,
        y: cardHeight * indexRow + cardMarginY,
        image: cardAux.getImgObjBack(),
        width: cardAux.getWidth(),
        height: cardAux.getHeight(),
        offset: [cardAux.getWidth()/2, cardAux.getHeight()/2],
        id: elementIndex
      });

      kineticCardImage.on("click", function(evt){

        changeImageAnimation(this.getId());
      });

      kineticImageArray[elementIndex] = kineticCardImage;

      cardLayer.add(kineticImageArray[elementIndex]);

      elementIndex++;
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

    var randomNumber = (Math.floor(Math.random()*cardPairsQ)) + 1;
    
    if(cardCreatedIndexes.indexOf(randomNumber) == -1){

      cardCreatedIndexes[index] = randomNumber;

      var cardImageName = randomNumber;

      cardAux = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight);

      cardArray[index] = cardAux;

    }else{

      index--;
    }
  }


  for(var index = 1; index <= cardPairsQ; index++){

    if(cardCreatedIndexes.indexOf(index) != -1){

      var cardImageName = index + "-" + index;

      cardAux = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight);

      cardArray[cardArray.length] = cardAux;
    }

  }

}

/*function startAnimation(kineticImageId){

  var kineticId = kineticImageId;

  animFront = new Kinetic.Animation(function(frame) {
            var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
            kineticStage.get("#"+kineticId)[0].setScale(scale, 1);
  }, cardLayer);

  animFront.start();

  window.setTimeout(function(){changeAnimationImage(kineticId)}, (period/2));

}*/

function changeImageAnimation(kineticImageId){

  var kineticId = parseInt(kineticImageId);

  var imgObjAux;

  if(cardArray[kineticId].getImgObjFront().src == kineticStage.get("#"+kineticId)[0].getImage().src){

    imgObjAux = cardArray[kineticId].getImgObjBack();

  }else{

    imgObjAux = cardArray[kineticId].getImgObjFront();
  }

  kineticStage.get("#"+kineticId)[0].setImage(imgObjAux);

  animBack = new Kinetic.Animation(function(frame) {
            var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
            kineticStage.get("#"+kineticImageId)[0].setScale(scale, 1);
  }, cardLayer);

  animBack.start();

  window.setTimeout("animBack.stop()", (period/4));
}