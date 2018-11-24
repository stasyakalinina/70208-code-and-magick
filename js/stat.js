'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var SHADOW_OFFSET = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var indentText = GAP + FONT_GAP;


var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000';
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderText = function (ctx, x, y, text, color, font) {
  ctx.fillStyle = color || '#000';
  ctx.font = font || '16px PT Mono';
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  ctx.fillStyle = '#000';
  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + indentText, 'Ура вы победили!');
  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + indentText * 2, 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var itemHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var indentItem = BAR_WIDTH + BAR_GAP;
    var startPointY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP;

    renderText(ctx, CLOUD_X + GAP + indentItem * i, startPointY, players[i], '#000');
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'blue';
    }
    ctx.fillRect(CLOUD_X + GAP + indentItem * i, startPointY - itemHeight - indentText, BAR_WIDTH, itemHeight);
  }
};
