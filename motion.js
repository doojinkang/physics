(function() {

  var x_pos = 100;
  var y_pos = 20;

  var tube_x = x_pos;
  var tube_y = y_pos;
  var div_tube = document.getElementById('tube');
  var copter_x = 55 + x_pos;
  var copter_max_y = y_pos + 400;
  var copter_min_y = y_pos + 60;
  var div_copter = document.getElementById('copter');

  Object.assign(div_tube.style, {left: tube_x, top: tube_y});
  Object.assign(div_copter.style, {left: copter_x, top: copter_max_y});

  var center_x = 600;
  var center_y = 220;
  var angle_radius = 150;
  var ball_radius = 20;
  var angle_bar_height = 2;

  var div_circle = document.getElementById('circle')
  var div_hbar = document.getElementById('hbar')
  var div_rotate_target = document.getElementById('rotate-target')
  var div_angle = document.getElementById('angle')
  var div_angle_bar = document.getElementById('angle-bar')

  var copter_check = document.getElementById('copter-check')
  var gyro_check   = document.getElementById('gyro-check')
  var draw_check   = document.getElementById('draw-check')

  Object.assign(div_circle.style, {
    width: angle_radius * 2, height: angle_radius * 2,
    left: center_x, top: center_y,
    margin: (angle_radius * -1) + ' 0 0 ' + (angle_radius * -1),
  })
  Object.assign(div_hbar.style, {
    width: angle_radius,
    left: center_x, top: center_y,
  })
  Object.assign(div_rotate_target.style, {
    width: angle_radius * 2 + 2, height: angle_radius * 2 + 2,
    left: center_x, top: center_y,
    margin: (angle_radius * -1) + ' 0 0 ' + (angle_radius * -1),
  })
  Object.assign(div_angle.style, {
    width: ball_radius * 2, height: ball_radius * 2,
    left: angle_radius * 2 - ball_radius, top: angle_radius - ball_radius,
    // visibility: 'hidden'
  })
  Object.assign(div_angle_bar.style, {
    width: angle_radius, height: angle_bar_height,
    left: angle_radius, top: angle_radius,
    margin: (angle_bar_height / -2) + ' 0 ' + (angle_bar_height / 2) + ' 0 ',
  })

  var div_motion = document.getElementById('div-motion')
  var div_monocopter = document.getElementById('div-monocopter')
  var div_gyro = document.getElementById('div-gyro')

  copter_check.addEventListener('click', () => {
    // console.log('click', copter_check.checked)
    if (copter_check.checked) {
      gyro_check.checked = false;
      draw_check.checked = false;
      Object.assign(div_monocopter.style, {visibility: 'visible'});
      enableMotion && enableMotion();
      disableDraw && disableDraw();
    }
    else {
      Object.assign(div_monocopter.style, {visibility: 'hidden'});
    }
  }, false)
  gyro_check.addEventListener('click', () => {
    // console.log('click', gyro_check.checked)
    if (gyro_check.checked) {
      copter_check.checked = false;
      draw_check.checked = false;
      Object.assign(div_gyro.style, {visibility: 'visible'});
      enableMotion && enableMotion();
      disableDraw && disableDraw();
    }
    else {
      Object.assign(div_gyro.style, {visibility: 'hidden'});
    }
  }, false)
  draw_check.addEventListener('click', () => {
    // console.log('click', draw_check.checked)
    if (draw_check.checked) {
      copter_check.checked = false;
      gyro_check.checked = false;
      disableMotion && disableMotion();
      enableDraw && enableDraw();
    }

  }, false)

  var move_copter = false;
  div_tube.addEventListener('mousedown', ()=> {
    console.log('down');
    move_copter = true;
  }, false)
  div_tube.addEventListener('mouseup'  , ()=> {
    console.log('up');
    move_copter = false;
  }, false)
  div_tube.addEventListener('mousemove', (e)=> {
    if (!move_copter) return;
    y = e.pageY
    if ( y > copter_max_y ) y = copter_max_y
    if ( y < copter_min_y ) y = copter_min_y
    Object.assign(div_copter.style, {top: y})
  }, false)

  var move_gyro = false;
  div_rotate_target.addEventListener('mousedown', ()=> {
    console.log('down');
    move_gyro = true;
  }, false)
  div_rotate_target.addEventListener('mouseup'  , ()=> {
    console.log('up');
    move_gyro = false;
  }, false)
  div_rotate_target.addEventListener('mousemove', (e)=> {
    if (!move_gyro) return;
    x = e.pageX - center_x
    y = e.pageY - center_y
    theta = Math.atan2(y, x)
    Object.assign(div_rotate_target.style, { transform: 'rotate(' + theta * 180 / Math.PI + 'deg)' } )
  }, false)

  function eventTouchToMouse(_div) {
    function getTouchPos(div, touchEvent) {
      var rect = div.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }
    _div.addEventListener("touchstart", function (e) {
      mousePos = getTouchPos(_div, e);
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      _div.dispatchEvent(mouseEvent);
    }, false);
    _div.addEventListener("touchend", function (e) {
      var mouseEvent = new MouseEvent("mouseup", {});
      _div.dispatchEvent(mouseEvent);
    }, false);
    _div.addEventListener("touchmove", function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      _div.dispatchEvent(mouseEvent);
    }, false);
  }
  eventTouchToMouse(div_tube);
  eventTouchToMouse(div_rotate_target);

  window.enableMotion = () => {
    Object.assign(div_motion.style, {'z-index': 1});
  }
  window.disableMotion = () => {
    Object.assign(div_motion.style, {'z-index': -1});
  }

})();
