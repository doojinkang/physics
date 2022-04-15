// http://ahrengot.com/tutorials/greensock-javascript-animation

$(document).ready(function() {

  var x_pos = 100;
  var y_pos = 20;

  var tube_x = x_pos;
  var tube_y = y_pos;
  var $tube = $('.tube');
  var line_x = 55 + x_pos;
  var line_max_y = y_pos + 400;
  var line_min_y = y_pos + 60;
  var $line = $('.line');

  var center_x = 600;
  var center_y = 200;
  var angle_radius = 100;

  var angle_x = center_x + angle_radius;
  var angle_y = center_y;
  var $circle = $('.circle')
  var $center = $('.center')
  var $hbar = $('.hbar')
  var $angle = $('.angle')
  var $a_bar = $('.angle_bar')

  $tube.css(  {'left': tube_x + 'px', 'top': tube_y + 'px'})
  $line.css(  {'left': line_x + 'px', 'top': line_max_y + 'px'})

  $circle.css({'width': angle_radius * 2 + 'px', 'height': angle_radius * 2 + 'px',
               'left': center_x + 'px', 'top': center_y + 'px',
               'margin': + (angle_radius * -1) + 'px 0 0 ' + (angle_radius * -1) + 'px'
              })
  $hbar.css(  {'width': angle_radius + 'px', 'left': center_x + 'px', 'top': center_y + 'px'})
  $center.css({'left': center_x + 'px', 'top': center_y + 'px'})
  $angle.css( {'left': angle_x + 'px', 'top': angle_y + 'px'})
  $a_bar.css( {'width': angle_radius + 'px', 'left': center_x + 'px', 'top': center_y + 'px'})

  $angle.click(function() {
    $angle.css( {'left': angle_x + 'px', 'top': angle_y + 'px'})
    theta = Math.PI
    $a_bar.css( { 'left': center_x - angle_radius / 2 * Math.cos(theta) - angle_radius / 2 + 'px',
                  'top': center_y - angle_radius / 2 * Math.sin(theta) + 'px',
                  'transform': 'rotate(' + theta * 180 / Math.PI + 'deg)'
  } )
})

function move(e) {
  console.log("index move");
  if (e.altKey) {
    x = e.pageX - center_x
    y = e.pageY - center_y
    theta = Math.atan2(y, x)
    // console.log(theta)
    x = Math.cos(theta) * (- angle_radius) + center_x
    y = Math.sin(theta) * (- angle_radius) + center_y
    $angle.css( {'left': x + 'px', 'top': y + 'px'})
    $hbar.css(  {'left': center_x + 'px', 'top': center_y + 'px'})
    $a_bar.css( { 'left': center_x - angle_radius / 2 * Math.cos(theta) - angle_radius / 2 + 'px',
                      'top': center_y - angle_radius / 2 * Math.sin(theta) + 'px',
                      'transform': 'rotate(' + theta * 180 / Math.PI + 'deg)'
                    } )
  }

  if (e.shiftKey) {
    y = e.pageY
    if ( y > line_max_y ) y = line_max_y
    if ( y < line_min_y ) y = line_min_y
    $line.css( {'top': y + 'px'})
  }
}

$(window).on('mousemove', move);
});
