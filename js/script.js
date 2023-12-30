


// var clickNumber = 0;
var clickIndex = 0;
function input(x) {
    if (x == undefined) {
        console.log("undefined");
    } else {
        // 获取id对应的值
        clickIndex = x;
        numberPicker();
    }
}


function numberPicker() {

    // 给数独表格的每个单元格添加点击事件
    $('#table td').click(function (event) {
        // 获取鼠标点击位置
        var x = event.pageX;
        var y = event.pageY;

        // 设置弹出窗口的位置并显示它
        $('#number-picker').css({
            left: x, // X 坐标
            top: y, // Y 坐标
            display: 'block' // 显示弹出窗口
        });
    });


    // 移除 #number-picker 上的所有 click 事件处理器
    $('.number-cell').off('click');

    // 点击数字关闭弹出窗口
    $('.number-cell').click(function (event) {
        event.stopPropagation();
        $('#number-picker').hide();
        // 如果需要使用点击的数字...
        clickNumber = $(this).text();
        console.log('Number picked:', $(this).text() + " " + clickIndex);

        // 将数字填入数独数组
        clickIndexNumber = parseInt(clickIndex);
        let row = parseInt(Math.floor(clickIndexNumber / 10));
        let col = parseInt(clickIndexNumber % 10);
        let num = parseInt(clickNumber);

        // 检查是否符合数独规则
        if (checkNumberWhenInput(row, col, num)) {
            console.log("符合数独规则");
            board[row][col] = num;
            // 将数字填入数独表格
            document.getElementById(clickIndex).innerHTML = clickNumber;
        } else {
            console.log("不符合数独规则");
        }
    });

    // 如果需要在点击弹出窗口以外的地方时关闭弹出窗口
    $(document).click(function (event) {
        if (!$(event.target).closest('#number-picker, #table td').length) {
            $('#number-picker').hide();
        }
    });

    // 阻止弹出窗口内部点击事件冒泡到 document
    $('#number-picker').click(function (event) {
        event.stopPropagation();
    });
}


let board = [];
let gridSize = 9;
let level = 0.5;
let gameStatus = false;


/**
 * 当输入数字时检查是否符合数独规则
 * @param {*} row 
 * @param {*} col 
 * @param {*} number 
 */
function checkNumberWhenInput(row, col, number) {
    row = parseInt(row);
    col = parseInt(col);

    // 检查除了 row 和 col 以外的其他行和列是否有重复数字
    for (let i = 0; i < gridSize; i++) {
        if (i !== row && board[i][col] === number) {
            alert("其他行有重复数字: " + number);
            return false;
        }
        if (i !== col && board[row][i] === number) {
            alert("其他列有重复数字: " + number);
            return false;
        }
    }

    // 检查 3x3 方格内是否有重复数字
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (i !== row && j !== col && board[i][j] === number) {
                alert("3x3 方格内有重复数字: " + number);
                return false;
            }
        }
    }

    return true;
}


function checkNumber(row, col, number) {
    // 检查同行同列是否有重复数字
    for (let i = 0; i < gridSize; i++) {
        if (board[row][i] === number || board[i][col] === number) {
            return false;
        }
    }

    // 检查 3x3 方格内是否有重复数字
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (board[i][j] === number) {
                return false;
            }
        }
    }

    return true;
}


function initializeBoard() {
    for (let i = 0; i < gridSize; i++) {
        board.push(Array(gridSize).fill(0));
    }
    // 初始化数字
    addInitialNumbers();
}



function revomeNumbersByDiddiculty(board, level) {
    let attempts = 0;
    while (attempts < 10) { // 尝试次数限制，防止无限循环
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);
        let number = Math.ceil(Math.random() * gridSize);

        if (board[row][col] !== 0 && Math.random() < level) {
            board[row][col] = 0;
            attempts = 0; // 重置尝试次数
        } else {
            attempts++;
        }
    }
}


function addInitialNumbers() {
    // 生成解决方案
    solveSudoku(board, gridSize);
    // 根据难度等级消减数字
    revomeNumbersByDiddiculty(board, level);
}



/**
 * 展示数独到HTML页面
 * @param {去除后的数独数组} sudoku 
 * @param {*} i 
 */
function showSudoku(board, i) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var index = i + '' + j;
            // 判断数组内元素是否为空
            if (board[i][j] != 0) {
                document.getElementById(index).innerHTML = board[i][j];
                document.getElementById(index).style.pointerEvents = "none";
                document.getElementById(index).style.color = "rgb(0, 75, 166)";
            }
        }
    }
}


/**
 * 递归生成数独
 * @param {} board 
 * @param {*} n 
 * @param {*} row 
 * @param {*} col 
 * @returns 
 */
function solveSudoku(board, n, row = 0, col = 0) {
    if (row === n) {
        return true;
    }
    if (col === n) {
        return solveSudoku(board, n, row + 1, 0);
    }
    if (board[row][col] !== 0) {
        return solveSudoku(board, n, row, col + 1);
    }
    for (let num = 1; num <= n; num++) {
        // 递归判断是否符合数独规则
        if (checkNumber(row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board, n, row, col + 1)) {
                return true;
            }
            board[row][col] = 0; // 回溯，撤销上一步的填充
        }
    }
    return false;
}

function start() {
    if (!gameStatus) {
        initializeBoard();
        showSudoku(board, 0);
        gameStatus = true;
    } else {
        alert("游戏已经开始");
    }
}


// 在页面加载完成后执行
document.onload = start();


