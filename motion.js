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

  Object.assign(div_tube.style, {'left': tube_x + 'px', 'top': tube_y + 'px'});
  Object.assign(div_copter.style, {'left': copter_x + 'px', 'top': copter_max_y + 'px'});

  var center_x = 600;
  var center_y = 200;
  var angle_radius = 100;

  var angle_x = center_x + angle_radius;
  var angle_y = center_y;
  var div_circle = document.getElementById('circle')
  var div_center = document.getElementById('center')
  var div_hbar = document.getElementById('hbar')
  var div_angle = document.getElementById('angle')
  var div_angle_bar = document.getElementById('angle-bar')

  var copter_check = document.getElementById("copter-check");
  var gyro_check   = document.getElementById("gyro-check");

  Object.assign(div_circle.style, {'width': angle_radius * 2 + 'px', 'height': angle_radius * 2 + 'px',
               'left': center_x + 'px', 'top': center_y + 'px',
               'margin': + (angle_radius * -1) + 'px 0 0 ' + (angle_radius * -1) + 'px'
              })
  Object.assign(div_hbar.style, {'width': angle_radius + 'px', 'left': center_x + 'px', 'top': center_y + 'px'})
  Object.assign(div_center.style, {'left': center_x + 'px', 'top': center_y + 'px'})
  Object.assign(div_angle.style, {'left': angle_x + 'px', 'top': angle_y + 'px'})
  Object.assign(div_angle_bar.style, {'width': angle_radius + 'px', 'left': center_x + 'px', 'top': center_y + 'px'})

  function move(e) {
    if (e.altKey || gyro_check.checked) {
      x = e.pageX - center_x
      y = e.pageY - center_y
      theta = Math.atan2(y, x)
      // console.log(theta)
      x = Math.cos(theta) * (- angle_radius) + center_x
      y = Math.sin(theta) * (- angle_radius) + center_y
      Object.assign(div_angle.style, {'left': x + 'px', 'top': y + 'px'})
      Object.assign(div_angle_bar.style, { 'left': center_x - angle_radius / 2 * Math.cos(theta) - angle_radius / 2 + 'px',
                        'top': center_y - angle_radius / 2 * Math.sin(theta) + 'px',
                        'transform': 'rotate(' + theta * 180 / Math.PI + 'deg)'
                      } )
    }

    if (e.shiftKey || copter_check.checked) {
      y = e.pageY
      if ( y > copter_max_y ) y = copter_max_y
      if ( y < copter_min_y ) y = copter_min_y
      Object.assign(div_copter.style, {'top': y + 'px'})
    }
  }

  window.addEventListener('mousemove', move);
})();
