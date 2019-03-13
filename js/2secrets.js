var shapes;
window.onresize = function() {
    setup();
}

$(function() {
  setup();
});

function setup() {
  var height = $('body').height();
  var width = $('body').width();
  var size = 150;
  var padding = 20;

  var isMobile = window.matchMedia("only screen and (max-width: 850px)").matches ||
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var isOtherMediaQuery = window.matchMedia("only screen and (min-width:1080px)").matches;
  if(isMobile && !isOtherMediaQuery) {
    size = 250;
    padding = 40;
  }

  var rows = Math.floor(height / size);
  var cols = Math.floor(width / size);
  var radius = Math.floor(Math.max(width, height) / Math.max(rows, cols)) / 2;

  makeGrid(rows, cols);
  shapes = makeFlowers(radius);
  addSvgsToCells(size, padding);
  offsetEvenRows(size + padding);
  // fixCellPosiiton();
  // addOnClickToCells();
}

function addSvgsToCells(size, padding) {
  $(".cell").each(function (i, o) {
    var two = new Two({
      width: size + padding,
      height:size + padding
    }).appendTo(o);
    var shape = pickFlower(shapes);
    shape.translation.set(two.width / 2, two.height / 2);
    two.add(shape);
    two.update();
  });
  // get position of cell, set position to fixed  with left and right set

}

function fixCellPosiiton() {
  $(".cell").each(function (i, o) {
    $(this).parent().css({position: 'relative'});
    var top = $(this).offset().top, left = $(this).offset().left;
    console.log(top);
    console.log(left);
    // console.log($(this).offset());
    $(this).css({top: top, left: left, position:'absolute'});
    // console.log($(this).offset());
  });
  // console.log($("#cell20").offset());
}

function addOnClickToCells() {
  $('.cell').click(function () {
    $(this).css('transition', 'scale()');
    var kiddo = this.children[0];
    if (typeof kiddo !== 'undefined') {
      // Expand child SVG to 200px
      $(this).animate({width: "200px"}, 500);
      setTimeout(function() {
        // 500 ms later, expand height to 800px
        $(this).animate({height:"800px"}, 500);
      }, 500);
      setTimeout(function() {
        // 1s later show text
        // object.children.find
      });
    }

  });
}

function offsetEvenRows(size) {
  $(".row").each(function (index, object) {
    if (index % 2) {
      $(object).css("position", "relative");
      $(object).css("left", size / 2 * -1 + "px");
    }
  });
}

function makeGrid(rows, cols) {
  $('body').empty();
  for (var r = 0; r < rows; r++) {
    var rowId = "row" + r;
    var row = $("<div/>").addClass("row").attr("id", rowId).appendTo('body');
    for (var c = 0; c < cols; c++) {
      var cellId = "cell" + ((r * cols) + c);
      $(row).append('<div class="cell" id="' + cellId + '"></div>');
    }
  }
}

function roseMath(radius, v, k, t) {
  v.x = radius * Math.cos(k * t) * Math.cos(t);
  v.y = radius * Math.cos(k * t) * Math.sin(t);
  return v;
}

function makeFlowers(radius) {
  var flowers = [];
  var resolution = 240; // every flower has 240 points
  for (var k = 4; k < 24; k++) {
    var points = [];
    for (var j = 0; j < resolution; j++) {
      points[j] = new Two.Anchor();
      roseMath(radius, points[j], k, Math.PI * 2 * j / resolution);
    }
    // Create shape
    var flower = new Two.Path(points, true, true);
    flowers.push(flower);
  }
  return flowers;
}

function pickFlower(flowers) {
  var f = Math.floor(Math.random() * flowers.length);
  var flower = flowers[f].clone();
  var colors = ['tomato', 'orangered', 'floralwhite',
    'gold', 'red', 'darkorange'];
  colors = ['DARKMAGENTA', 'REBECCAPURPLE', 'SLATEBLUE', 'ROYALBLUE', '#9c27b0', '#9f9fff',
    'ALICEBLUE', 'PLUM', 'CORNFLOWERBLUE', 'DARKBLUE', 'MEDIUMBLUE', 'DARKSLATEBLUE'];
  var color = colors[Math.floor(Math.random() * colors.length)];
  flower.rotation = (Math.PI  / 2) * (Math.floor(Math.random() * 12) / 12);
  flower.stroke = color;
  flower.fill = color;
  flower.linewidth = 4;
  flower.cap = 'round';
  return flower;
}
