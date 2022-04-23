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

  var copter_check = document.getElementById("copter-check");
  var gyro_check   = document.getElementById("gyro-check");

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

  function move(e) {
    if (e.altKey || gyro_check.checked) {
      x = e.pageX - center_x
      y = e.pageY - center_y
      theta = Math.atan2(y, x)
      Object.assign(div_rotate_target.style, { transform: 'rotate(' + theta * 180 / Math.PI + 'deg)' } )
    }

    if (e.shiftKey || copter_check.checked) {
      y = e.pageY
      if ( y > copter_max_y ) y = copter_max_y
      if ( y < copter_min_y ) y = copter_min_y
      Object.assign(div_copter.style, {top: y})
    }
  }

  window.addEventListener('mousemove', move);
})();
