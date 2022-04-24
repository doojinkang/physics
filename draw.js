(function() {

  // Get a regular interval for drawing to the screen
  window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimaitonFrame ||
          function (callback) {
             window.setTimeout(callback, 1000/60);
          };
  })();

  // Set up the canvas
  var div_draw = document.getElementById("div-draw")
  var canvas = document.getElementById("canvas-area");
  var pens = document.getElementsByName("pen");
  var current_pen;
  pens.forEach( (pen) => {
    pen.addEventListener('change', (e) => {
      current_pen = e.target.value;
      console.log("pen:", current_pen);
    })
  })

  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222";
  ctx.lineWith = 2;

  // Set up the UI
  var clearBtn = document.getElementById("clear-button");
  clearBtn.addEventListener("click", function (e) {
    clearCanvas();
  }, false);

  // Set up mouse events for drawing
  var drawing = false;
  var mousePos = { x:0, y:0 };
  var lastPos = mousePos;
  canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    drawing = false;
  }, false);
  canvas.addEventListener("mousemove", function (e) {
    if (current_pen == 'eraser') {
      // console.log("checked", e);
      var rect = canvas.getBoundingClientRect();
      ctx.fillStyle = "#000000";
      // ctx.fillStyle = "transparent";
      ctx.globalCompositeOperation="destination-out";
      ctx.beginPath();        // This prevents miss draw circle when erase_check turns to falsed
      ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 10, 0, 2 * Math.PI, false);
    }
    else {
      // console.log("not checked");
      ctx.strokeStyle = "#EEEEEE";
      ctx.globalCompositeOperation="source-over";
      ctx.beginPath();
      ctx.lineWith = 2;
    }
    mousePos = getMousePos(canvas, e);
  }, false);

  // Set up touch events for mobile, etc
  canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);
  canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
  }, false);
  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);


  // Get the position of the mouse relative to the canvas
  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  // Get the position of a touch relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  // Draw to the canvas
  function renderCanvas() {
    // console.log("renderCanvas", drawing, current_pen);
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      if (current_pen == 'eraser') {
        ctx.fill();      // draw circle : actually erase
      }
      else {
        ctx.stroke();    // draw lines
      }
    }
    lastPos = mousePos;
  }

  function clearCanvas() {
    canvas.width = canvas.width;
  }

  // Allow for animation
  (function drawLoop () {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  window.enableDraw = () => {
    Object.assign(div_draw.style, {'z-index': 1})
  }
  window.disableDraw = () => {
    Object.assign(div_draw.style, {'z-index': -1});
  }

})();