/*--------------------------------------INICIO BLOQUE------------------------------------
-------------------------------DECLARACION DE VARIABLES GLOBALES-----------------------*/

var kineticStage; //canvas

var stageWidth = 1080 //ancho canvas

var stageHeight = 540; //alto canvas


var cardLayer; //layer contenedor de las cartas (kinetic.image)

var overCardLayer; //layer que contendra todos los elementos ajenos a las cartas principales. (I.E: Cambios de color de borde)

var cardImageDirectory = "../images/"; //directorio relativo de las imagenes

var cardImageFormat = ".png"; //formato de las imagenes

var cardPairsQ = 20; //Cantidad de pares de cartas disponibles

var cardWidth = 150; //ancho de las cartas

var cardHeight = 237; //alto de las cartas

var cardMarginX = 100; //margen a la izquierda de las cartas

var cardMarginY = 125; //margen arriba de las cartas


var cardArray; //almacena objetos de tipo Card

var kineticImageArray; //almacena objetos de tipo Kinetic.Image


var period = 1000; //Influye en la duracion de la animacion

var animMaxTime = 250; //Determina el tiempo maximo de duracion de las animaciones

var animDelay = 200; //Agrega un delay al comienzo de las animaciones. Incrementar en caso de dispositivos lentos. 200ms = Tablet HP + Win8 + Chrome 

var allowAnim; //Permite o deniega animacion

var foundCorrect = false; //True = Existe un par correcto -- False = No existe un par correcto


var tries; //intentos

var correct; //correctas

var wrong; //incorrectas


var flippedCardIndex1; //indice de la primer carta animada

var flippedCardIndex2; //indice de la segunda carta animada

var flippedCardIndex3; //indice de la tercer carta animada

/*---------------------------------------------------------------------------------------
--------------------------------------FIN BLOQUE----------------------------------------*/






/*--------------------------------------INICIO BLOQUE------------------------------------
------------------------------------METODOS DE PRE-CARGA-------------------------------*/

onload = function(){

  onLoadPage();
}

function onLoadPage(){

  console.log("onLoadPage() = started");

  kineticStage = new Kinetic.Stage({
        container: 'stageContainer',
        width: stageWidth,
        height: stageHeight
  });

  /*console.log("kineticStage (Kinetic.Stage) = ready");

  cardLayer = new Kinetic.Layer();

  console.log("cardLayer (Kinetic.Layer) = ready");

  overCardLayer = new Kinetic.Layer();*/

  console.log("overCardLayer (Kinetic.Layer) = ready");

  cardArray = new Array();

  console.log("cardArray (Array) = ready");

  kineticImageArray = new Array();

  console.log("kineticImageArray (Array) = ready");

  allowAnim = true;

  console.log("allowAnim = " + allowAnim);

  tries = 0;
  correct = 0;
  wrong = 0;

  console.log("Tries = " + tries + " Correct = " + correct + " Wrong = " + wrong);

  document.getElementById("tries").value = "Intentos: " + tries;
  document.getElementById("correct").value = "Exitos: " + correct;
  document.getElementById("wrong").value = "Fallos: " + wrong;

  console.log("HTML Score elements = ready");

  flippedCardIndex1 = null;
  flippedCardIndex2 = null;
  flippedCardIndex3 = null;

  console.log("FPI1 = " + flippedCardIndex1 + " FPI2 = " + flippedCardIndex2 + " FPI3 = " + flippedCardIndex3);

  console.log("onLoadPage() = finished");

}

/*---------------------------------------------------------------------------------------
--------------------------------------FIN BLOQUE----------------------------------------*/






/*--------------------------------------INICIO BLOQUE------------------------------------
------------------------------------DEFINICION DE CLASES-------------------------------*/

/*----------------------------------INICIO CLASE QUEUE-----------------------------------

Implementacion simple de la clase Queue (Cola)

- push() = Inserta un elemento al final de la cola
- pop() = Remueve el primer elemento de la cola y lo entrega
- lastIndexOf() = Entrega el indice del ultimo elemento
- size() = Entrega la cantidad de elementos dentro de la cola
---------------------------------------------------------------------------------------*/

function Queue(){

  this.queue = new Array();
  this.lastIndex = -1;

}

Queue.prototype.push = function(element){

  this.lastIndex++;

  this.queue[this.lastIndex] = element;
}

Queue.prototype.pop = function(){

  var auxQueue = new Array();

  var topElement = this.queue[0];

  for(var index = 0; index < this.queue.length - 1; index++){

    auxQueue[index] = this.queue[index + 1];
  }

  for(var index = 0; index < auxQueue.length; index++){

    this.queue[index] = auxQueue[index];
  }

  this.lastIndex--;

  return topElement;
}

/*---------------------------------------------------------------------------------------
------------------------------------FIN CLASE QUEUE------------------------------------*/

/*---------------------------------INICIO CLASE CARD-------------------------------------

La clase Card incluye dentro de sus atributos:

- ruta relativa hacia las imagenes que componen una carta
- objeto de la clase Image
- ancho y alto (en pixeles)

Incluye tambien getters y setters para cada atributo, ademas del metodo toString()
---------------------------------------------------------------------------------------*/

//Los parametros imgPathFront/imgPathBack deben ser entregados en string
function Card (imgPathBack, imgPathFront, width, height){

  this.imgFront = imgPathFront;
  this.imgBack = imgPathBack;

  this.cardHeight = height;
  this.cardWidth = width;

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
---------------------------------FIN INICIO CLASE CARD----------------------------------*/

/*---------------------------------------------------------------------------------------
--------------------------------------FIN BLOQUE----------------------------------------*/






/*--------------------------------------INICIO BLOQUE------------------------------------
------------------------------------------METODOS---------------------------------------*/

//Crea cartas con imagenes seleccionadas aleatoriamente
function createRandomCardArray(pairsQuantityUser){

  var pairsQuantityUser = pairsQuantityUser;

  var cardCreatedIndexes = new Array();

  for(var index = 0; index < pairsQuantityUser; index++){

    var randomNumber = (Math.floor(Math.random()*cardPairsQ)) + 1;
    
    //si el indexOf de un elemento es -1, significa que no existe dentro del array
    if(cardCreatedIndexes.indexOf(randomNumber) == -1){

      cardCreatedIndexes[index] = randomNumber;

      var cardImageName = randomNumber;

      cardAux = new Card((cardImageDirectory+"0"+cardImageFormat),(cardImageDirectory+cardImageName+cardImageFormat), cardWidth, cardHeight, cardImageName);

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

//Rellena el layer con imagenes
function faceDownFill(){

  resetAttrb();

  var pairsQuantityUser = document.getElementById("quantity").value;

  createRandomCardArray(pairsQuantityUser);
  scrambleCards();

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

    /*case 7:
      rowQ = 2;
      colQ = 7;
      break;

    case 8:
      rowQ = 2;
      colQ = 8;
      break;

    case 9:
      rowQ = 3;
      colQ = 6;
      break;

    case 10:
      rowQ = 2;
      colQ = 10;
      break;*/
  }

  var elementIndex = 0;

  for(var indexRow = 0; indexRow < rowQ; indexRow++){
    for(var indexCol = 0; indexCol < colQ; indexCol++){

      var cardAux = cardArray[elementIndex];

      var kineticCardImage = new Kinetic.Image({
        x: cardWidth * indexCol + cardMarginX,
        y: cardHeight * indexRow + cardMarginY,
        image: cardAux.getImgObjBack(),
        width: cardAux.getWidth(),
        height: cardAux.getHeight(),
        offset: [cardAux.getWidth()/2, cardAux.getHeight()/2],
        id: elementIndex
      });

      kineticCardImage.on("touchstart click", function(evt){

        if(allowAnim && flippedCardIndex1 == null){

          //console.log("TRIGGER 1");

          document.getElementById("info").innerHTML = "";

          flippedCardIndex1 = this.getId();

          flipCard(flippedCardIndex1);

        }else if(allowAnim && flippedCardIndex2 == null && this.getId() != flippedCardIndex1){

          //console.log("TRIGGER 2");

          document.getElementById("info").innerHTML = "";

          flippedCardIndex2 = this.getId();

          flipCard(flippedCardIndex2);

          checkPair();

        }else if(allowAnim && flippedCardIndex3 == null && this.getId() != flippedCardIndex1 && this.getId() != flippedCardIndex2){

          //console.log("TRIGGER 3");

          document.getElementById("info").innerHTML = "";

          flippedCardIndex3 = this.getId();

          flipCard(flippedCardIndex3);

          checkPair();

        }

      });

      kineticImageArray[elementIndex] = kineticCardImage;

      cardLayer.add(kineticImageArray[elementIndex]);

      elementIndex++;
    }
  }

  kineticStage.draw();
}

//Anima la carta identificada con kineticImageId
function flipCard(kineticImageId){

  if(allowAnim && !foundCorrect){

    allowAnim = false;

    var kineticId = parseInt(kineticImageId);

    var imgObjAux;

    if(cardArray[kineticId].getImgObjFront().src == kineticStage.get("#"+kineticId)[0].getImage().src){

      imgObjAux = cardArray[kineticId].getImgObjBack();

    }else{

      imgObjAux = cardArray[kineticId].getImgObjFront();
    }

    kineticStage.get("#"+kineticId)[0].setImage(imgObjAux);

    animCount = 0;

    var initialDate = new Date();

    var initialTime = initialDate.getTime();

    var cardAnimation = new Kinetic.Animation(function(frame){

      var actualDate = new Date();

      var actualTime = actualDate.getTime();

      var scale = Math.sin(animCount * Math.PI / period) + 0.001;

      animCount += 100;

      //console.log("Scale: " + scale + " iTime: " + initialTime + " aTime: " + actualTime + " diff: " + (actualTime - initialTime));

      if(scale >= 0.95 || (actualTime - initialTime) >= animMaxTime){

        //console.log("FIN ANIMACION " + kineticImageId);

        cardAnimation.stop();

        allowAnim = true;

        kineticStage.get("#"+kineticImageId)[0].setScale(1, 1);

      }else{

        kineticStage.get("#"+kineticImageId)[0].setScale(scale, 1);

        allowAnim = false;
      }
      
    }, cardLayer);

    //console.log("INICIO ANIMACION " + kineticImageId);
    cardAnimation.start();

  }
}

function hideCard(kineticImageId){

  animCount = 0;

  var initialDate = new Date();

  var initialTime = initialDate.getTime();

  var cardAnimation = new Kinetic.Animation(function(frame){

    var actualDate = new Date();

    var actualTime = actualDate.getTime();

    var scale = 1 - (Math.sin(animCount * Math.PI / period) + 0.001);

    animCount += 20;

    //console.log("Scale: " + scale + " iTime: " + initialTime + " aTime: " + actualTime + " diff: " + (actualTime - initialTime));

    if(scale <= 0.05 || (actualTime - initialTime) >= animMaxTime){

      //console.log("FIN ANIMACION " + kineticImageId);

      cardAnimation.stop();

      kineticStage.get("#"+kineticImageId)[0].setScale(0);

    }else{

      kineticStage.get("#"+kineticImageId)[0].setScale(scale);

    }
    
  }, cardLayer);

  //console.log("INICIO ANIMACION " + kineticImageId);
  cardAnimation.start();
}

/*Verifica si la carta identificada con flippedCardIndex1 y flippedCardIndex2 son un par correcto.
Al momento de clickear la tercer carta, anima las otras dos cartas dadas vuelta*/
function checkPair(){

  allowAnim = false;

  var card1 = cardArray[flippedCardIndex1].getImgFront();
  var card2 = cardArray[flippedCardIndex2].getImgFront();

  card1 = card1.replace(cardImageFormat,"");
  card2 = card2.replace(cardImageFormat,"");

  card1 = card1.replace(cardImageDirectory,"");
  card2 = card2.replace(cardImageDirectory,"");

  if(flippedCardIndex1 != null && flippedCardIndex2 != null && flippedCardIndex3 == null){

    increaseCountTry();

    if(card1 == (card2+"-"+card2)){

      allowAnim = false;

      foundCorrect = true;

      increaseCountCorrect();

      addCardBorder(flippedCardIndex1);
      addCardBorder(flippedCardIndex2);

      //console.log("CORRECTO");

      setTimeout(function(){

        removeCardBorder(flippedCardIndex1);
        hideCard(flippedCardIndex1);

        setTimeout(function(){

          kineticStage.get("#"+flippedCardIndex1)[0].remove();

          removeCardBorder(flippedCardIndex2);
          hideCard(flippedCardIndex2);

          setTimeout(function(){

            kineticStage.get("#"+flippedCardIndex2)[0].remove();

            cardLayer.draw();

            flippedCardIndex1 = null;
            flippedCardIndex2 = null;
            flippedCardIndex3 = null;

            allowAnim = true;
            foundCorrect = false;

          }, animMaxTime + 200);

        }, animMaxTime + 200);

      }, 2000);

    }else if((card1+"-"+card1) == card2){

      allowAnim = false;

      foundCorrect = true;

      increaseCountCorrect();

      addCardBorder(flippedCardIndex1);
      addCardBorder(flippedCardIndex2);

      //console.log("CORRECTO");

      setTimeout(function(){

        removeCardBorder(flippedCardIndex1);
        hideCard(flippedCardIndex1);

        setTimeout(function(){

          kineticStage.get("#"+flippedCardIndex1)[0].remove();

          removeCardBorder(flippedCardIndex2);
          hideCard(flippedCardIndex2);

          setTimeout(function(){

            kineticStage.get("#"+flippedCardIndex2)[0].remove();

            cardLayer.draw();

            flippedCardIndex1 = null;
            flippedCardIndex2 = null;
            flippedCardIndex3 = null;

            allowAnim = true;
            foundCorrect = false;

          }, animMaxTime + 200);

        }, animMaxTime + 200);

      }, 2000);

    }else{

      //console.log("INCORRECTO");

      calculateCountWrong();

      allowAnim = true;

    }
  }else if(flippedCardIndex3 != null && !foundCorrect){

    //console.log("RESET");

    document.getElementById("info").innerHTML = "";

    setTimeout(function(){

      flipCard(flippedCardIndex1);

      setTimeout(function(){

        flipCard(flippedCardIndex2);

        flippedCardIndex1 = flippedCardIndex3;
        flippedCardIndex2 = null;
        flippedCardIndex3 = null;

      }, animMaxTime + 200);
    }, animMaxTime + 200);
  }

  if(correct == document.getElementById("quantity").value){

    document.getElementById("info").innerHTML = "GANASTE!";
  }
}

function addCardBorder(kineticImageId){

  var auxKineticImage = kineticStage.get("#"+kineticImageId)[0];

  var cardBorderImg = new Image();

  cardBorderImg.src = cardImageDirectory + "ok" + cardImageFormat;

  var cardBorder = new Kinetic.Image({
        x: auxKineticImage.getPosition().x,
        y: auxKineticImage.getPosition().y,
        image: cardBorderImg,
        width: cardWidth,
        height: cardHeight,
        offset: [cardWidth/2, cardHeight/2],
        id: "border" + kineticImageId
      });

  overCardLayer.add(cardBorder);

  kineticStage.draw();
}

function removeCardBorder(kineticImageId){

  kineticStage.get("#border" + kineticImageId)[0].remove();

  kineticStage.draw();
}

function resetAttrb(){

  kineticStage.reset();

  cardLayer = new Kinetic.Layer();

  overCardLayer = new Kinetic.Layer();

  kineticStage.add(cardLayer);

  kineticStage.add(overCardLayer);

  cardArray = new Array();

  kineticImageArray = new Array();

  tries = 0;
  correct = 0;
  wrong = 0;

  document.getElementById("tries").value = "Intentos: " + tries;
  document.getElementById("correct").value = "Exitos: " + correct;
  document.getElementById("wrong").value = "Fallos: " + wrong;

  flippedCardIndex1 = null;
  flippedCardIndex2 = null;
  flippedCardIndex3 = null;

}

function increaseCountTry(){

  tries++;

  document.getElementById("tries").value = "Intentos: " + tries;
}

function increaseCountCorrect(){

  correct++;

  document.getElementById("correct").value = "Exitos: " + correct;

  document.getElementById("info").innerHTML = "CORRECTO";
}

function calculateCountWrong(){

  wrong = tries - correct;

  document.getElementById("wrong").value = "Fallos: " + wrong;
  
  document.getElementById("info").innerHTML = "INCORRECTO";
}

//Fisher-Yates shuffle method
function scrambleCards(){

  var index = cardArray.length, index2, tempIndex, tempIndex2;
  if ( index != 0 ){
    while ( --index) {
     index2 = Math.floor( Math.random() * ( index + 1 ) );
     tempIndex = cardArray[index];
     tempIndex2 = cardArray[index2];
     cardArray[index] = tempIndex2;
     cardArray[index2] = tempIndex;
   }
  }
}

/*---------------------------------------------------------------------------------------
--------------------------------------FIN BLOQUE----------------------------------------*/



/*
- Bordes de las cartas para indicar correcto

- Animacion de borrado

- Voltear las dos cartas incorrectas al mismo tiempo
*/