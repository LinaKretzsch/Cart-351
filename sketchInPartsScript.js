window.onload = function(){
  console.log("Script loaded");



  // let clientSocket = io.connect('http://localhost:4200');

  // let socketId =-1;//-1 is not valid id, good way to check if id is valid

  //Load canvas 1 if user id 1 joins


  let gallery = new modalGal('myModal1', 'myGal');



  //Connect to Node Socket

  // clientSocket.on('connect', function(data) {
  //      console.log("connected");
  //      // put code here that should only execute once the client is connected
  //      clientSocket.emit('join', 'msg:: client joined');
  //      // handler for receiving client id
  //
  //      clientSocket.on("joinedClientId", function(data){
  //        socketId = data;
  //        console.log("myId "+socketId);
  //
  //        // //Show canvas 1, 2 or 3 to user 1, 2 or 3
  //         isVisible(socketId);
  //
  //
  //
  //      });
  //  });//clientSocket END





   // //Load all three canvases

   let t = new CustomCanvas('canvas1', 'brush1', 'eraser1', 'myColor1', 'myRadius1', 'submitButton1');
   let s = new CustomCanvas('canvas2', 'brush2', 'eraser2','myColor2', 'myRadius2', 'submitButton2');
   let q = new CustomCanvas('canvas3', 'brush3', 'eraser3','myColor3', 'myRadius3', 'submitButton3');

     let cvs1 = document.getElementById("flex-container1");
     let cvs2 = document.getElementById("flex-container2");
     let cvs3 = document.getElementById("flex-container3");


     document.getElementById("flex-container1").hidden = true;
     document.getElementById("flex-container2").hidden = true;
     document.getElementById("flex-container3").hidden = true;

     document.getElementById("flex-container1").hidden = false;
       document.getElementById("flex-container2").hidden = true;
       document.getElementById("flex-container3").hidden = true;

}//WINDOW ONLOAD END

//Show 1 canvas to user 1, 2 or 3
// function isVisible(userId){

// function isVisible(){
//
//   let cvs1 = document.getElementById("flex-container1");
//   let cvs2 = document.getElementById("flex-container2");
//   let cvs3 = document.getElementById("flex-container3");



  // document.getElementById("flex-container1").hidden = true;
  // document.getElementById("flex-container2").hidden = true;
  // document.getElementById("flex-container3").hidden = true;
  //
  // if (userId===1){
  //   let t = new CustomCanvas('canvas1');
  //   document.getElementById("flex-container1").hidden = false;
  //   document.getElementById("flex-container2").hidden = true;
  //   document.getElementById("flex-container3").hidden = true;
  //
  // }
  // else if (userId===2){
  //   let s = new CustomCanvas('canvas2');
  //   document.getElementById("flex-container1").hidden = true;
  //   document.getElementById("flex-container2").hidden = false;
  //   document.getElementById("flex-container3").hidden = true;
  // }
  //
  // else if (userId===3){
  //   let q = new CustomCanvas('canvas3');
  //   document.getElementById("flex-container1").hidden = true;
  //   document.getElementById("flex-container2").hidden = true;
  //   document.getElementById("flex-container3").hidden = false;
  // }



  // if (userId===1){
    // let t = new CustomCanvas('canvas1', 'brush1', 'eraser1', 'myColor1', 'myRadius1', 'submitButton1');
    // let s = new CustomCanvas('canvas2', 'brush2', 'eraser2','myColor2', 'myRadius2', 'submitButton2');
    // let q = new CustomCanvas('canvas3', 'brush3', 'eraser3','myColor3', 'myRadius3', 'submitButton3');
    // cvs1.style.visibility = 'visible';
    // cvs2.style.visibility = 'visible';
    // cvs3.style.visibility = 'visible';

    // cvs1.style.visibility = 'visible';
    // cvs2.style.visibility = 'hidden';
    // cvs3.style.visibility = 'hidden';
  // }
//   else if (userId===2){
//     let s = new CustomCanvas('canvas2', 'brush2', 'eraser2','myColor2', 'myRadius2', 'submitButton2');
//     cvs1.style.visibility = 'hidden';
//     cvs2.style.visibility = 'visible';
//     cvs3.style.visibility = 'hidden';
//   }
//
//   else if (userId===3){
//     let q = new CustomCanvas('canvas3', 'brush3', 'eraser3','myColor3', 'myRadius3', 'submitButton3');
//     cvs1.style.visibility = 'hidden';
//     cvs2.style.visibility = 'hidden';
//     cvs3.style.visibility = 'visible';
//   }
//
//   else{
//     cvs1.style.visibility = 'hidden';
//     cvs2.style.visibility = 'hidden';
//     cvs3.style.visibility = 'hidden';
//   }
// }

//CANVAS CODE FROM KONVA LIBRARY https://konvajs.org/docs/sandbox/Free_Drawing.html
function CustomCanvas(theCanvas, brushId, eraserId, colorId, radiusId, submitId){

  var width = 530;//resize here for format
  var height = 310 - 25; //dont touch minus 25

// first we need Konva core things: stage and layer
var stage = new Konva.Stage({
  container: theCanvas,
  width: width,
  height: height
});


var layer = new Konva.Layer();
stage.add(layer);

// then we are going to draw into special canvas element
var canvas = document.createElement('canvas');
canvas.width = stage.width();
canvas.height = stage.height();

// created canvas we can add to layer as "Konva.Image" element
var image = new Konva.Image({
  image: canvas,
  x: 0,
  y: 0
});
layer.add(image);
stage.draw();

// Good. Now we need to get access to context element

var color = '#575251';
var isPaint = false;
var lastPointerPosition;
var mode = 'brush';
var radius = 1.5;


var context = canvas.getContext('2d');
// context.strokeStyle = '#3F4650';
context.strokeStyle = color;
context.lineJoin = 'round';
context.lineWidth = radius;



// now we need to bind some events
// we need to start drawing on mousedown
// and stop drawing on mouseup
image.on('mousedown touchstart', function() {
  isPaint = true;
  lastPointerPosition = stage.getPointerPosition();
});

// will it be better to listen move/end events on the window?

stage.on('mouseup touchend', function() {
  isPaint = false;
});

// and core function - drawing
stage.on('mousemove touchmove', function() {
  if (!isPaint) {
    return;
  }

  if (mode === 'brush') {
    context.globalCompositeOperation = 'source-over';
  }
  if (mode === 'eraser') {
    context.globalCompositeOperation = 'destination-out';
  }

  context.beginPath();

  var localPos = {
    x: lastPointerPosition.x - image.x(),
    y: lastPointerPosition.y - image.y()
  };
  context.moveTo(localPos.x, localPos.y);
  var pos = stage.getPointerPosition();
  localPos = {
    x: pos.x - image.x(),
    y: pos.y - image.y()
  };
  context.lineTo(localPos.x, localPos.y);
  context.closePath();
  context.stroke();

  lastPointerPosition = pos;
  layer.batchDraw();

});

//--------- TOOLS ----------//

brushSelect(brushId);
eraserSelect(eraserId);
colorSelect(colorId);
radiusSelect(radiusId);
buttonClicked(submitId, canvas)

function brushSelect(brushId){
var select = document.getElementById(brushId);
select.addEventListener("click", function() {
  mode = 'brush';
});
}

function eraserSelect(eraserId){
var select = document.getElementById(eraserId);
select.addEventListener("click", function() {
  mode = 'eraser';
});
}

function colorSelect(colorId){
var selectColor = document.getElementById(colorId);
selectColor.addEventListener("change",function(){
var newColor = document.getElementById(colorId).value;
  context.strokeStyle= newColor;
})
}

function radiusSelect(radiusId){
var selectRadius = document.getElementById(radiusId);
selectRadius.addEventListener("change", function(){
var newRadius = document.getElementById(radiusId).value;
context.lineWidth = newRadius;
})
}

function buttonClicked(submitId, theCanvas){
  console.log(theCanvas);
  var submitId = document.getElementById(submitId);
  submitId.addEventListener("click", function(){
    console.log("button clicked");

    theCanvas.toBlob(function(blob){

      let myForm = new FormData();
      myForm.append("image",blob,"image.png");
      $.ajax({
       type: 'POST',
       data: myForm,
       processData: false ,//prevents from converting into a query string
       cache: false,
       contentType:false,
       enctype: 'multipart/form-data',
       url: 'http://localhost:4200/insertEndPoint',
       success: function(resultFromServer){
                  console.log('success');
                //  let mObj = JSON.parse(resultFromServer);
                console.log(resultFromServer);
                }
           });//ajax
    })

    // if(submitId === "submitButton3"){
    //
    // }


    // //Trying to send data---------------------
    // // let myForm = new FormData();
    // let form = $('#insertGallery')[0];
    // let sArr = $( form ).serializeArray();
    // let dataToInsert ={};
    // sArr.forEach(function(element) {
    //   dataToInsert[`${element.name}`] = element.value;
    //
    // });
    //
    // $.ajax({
    //  type: 'POST',
    //  data: JSON.stringify(dataToInsert),
    //  processData: false ,//prevents from converting into a query string
    //  cache: false,
    //  contentType:'application/json',
    //  enctype: 'multipart/form-data',
    //  url: 'http://localhost:4200/insertEndPoint',
    //  success: function(resultFromServer){
    //             console.log('success');
    //           let mObj = JSON.parse(resultFromServer);
    //           console.log(resultFromServer);
    //           }
    //      });//ajax
    // //End try-------------------------------






    //  clientSocket.emit('sendImg', img, theCanvas, function(path){
        //Add image path + canvasId to database AJAX

    //  });


    // img = new Image();
    // img.src = "image/myImage.png";

    //console.log(img);

    //Convert URI to image and save in folder

    //Send image path to database along with userid











  })
}//END FUNCTION BUTTON



}//END OF CANVAS ONLOAD





//------- MODAL GAL from WW3 SCHOOL ---------//

function modalGal(modalId, id){
// Get the modal
var modal = document.getElementById(modalId);

// Get the button that opens the modal
var btn = document.getElementById(id);


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";

  //Show images here in---------------------------------

  // $.ajax({
  //  type: 'GET',
  //  data: '/images/image.png',
  //  processData: false ,//prevents from converting into a query string
  //  cache: false,
  //  contentType:false,
  //  enctype: 'multipart/form-data',
  //  url: 'http://localhost:4200/displayGal',
  //  success: function(resultFromServer){
  //             console.log('success');
  //           //  let mObj = JSON.parse(resultFromServer);
  //           console.log(resultFromServer);
  //           }
  //      });//ajax
  //
  //      document.getElementById('modalBody')

  let form = $('#modalBody')[0];
  let sArr = $( form ).serializeArray();
 //prepare data to be a json obj
  let parsToRetrive ={};
  sArr.forEach(function(element) {
  parsToRetrive[`${element.name}`] = element.value;
 });

  $.ajax({
         type: "POST",
         url: "http://localhost:4200/displayEndPoint",
         contentType: 'application/json',
         data: JSON.stringify(parsToRetrive),
         processData: false,//prevents from converting into a query string
         cache: false,
         timeout: 600000,
         success: function (response) {
         console.log(response);
         //use the JSON .parse function to convert the JSON string into a Javascript object
         let parsedJSON = JSON.parse(response);
         console.log(parsedJSON);
         displayResponse(parsedJSON);
        },
        error:function(){
       console.log("error occurred");
     }
   });


}//----------------------------------------------------

function displayResponse(theResult, modalBody){
  $("#result").empty();
  // theResult is AN ARRAY of objects ...
  for(let i=0; i< theResult.length; i++)
  {
  // get the next object
  let currentObject = theResult[i];
  let container = modalBody;
  // let contentContainer = $('<div>').addClass("content");
  // go through each property in the current object ....
  for (let property in currentObject) {
      let para = $('<p>');
      $(para).text(property+"::" +currentObject[property]);
      $(para).appendTo(contentContainer);
    }
  $(contentContainer).appendTo(container);
  $(container).appendTo("#result");
 }
}









// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
