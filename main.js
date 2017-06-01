//定义一个JavaScript数组
var board = [];
var hasConflicted = [];
//定义一个分数
var score = 0;

$(document).ready(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

function init() {
    for (var i = 0; i < 4; i++) {
        //定义一个二维数组
        board[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            //初始化小格子的值
            board[i][j] = 0;
            hasConflicted[i][j] = false;
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //通过getPosTop()方法设置每个小格子距顶端的距离；
            gridCell.css("top", getPosTop(i, j));
            //通过getPosTop()方法设置每个小格子距顶端的距离；
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    updateBoardView();
    score = 0;
    $("#score").text(0);
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0的话，设置数字格为高宽都为0
            if (board[i][j] == 0) {
                numberCell.css('width', '0px');
                numberCell.css('height', '0px');
                numberCell.css('top', getPosTop(i, j) + 50);
                numberCell.css('left', getPosLeft(i, j) + 50);
            }
            //如果棋盘格的值不为0，设置数字格为高宽75并设置背景色及数字值
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    var times = 0;
    if (times < 30) {
        do {
            var randx = parseInt(Math.floor(Math.random() * 4));
            var randy = parseInt(Math.floor(Math.random() * 4));
        }
        while (board[randx][randy] != 0);
        times++;
    }
    else {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (board[i][j] == 0)
                    randx = i;
        randy = j;
    }
    var randNumber = Math.random() < 0.8 ? 2 : 4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
}

