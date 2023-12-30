

// 重新开始按钮点击后重新开始游戏

// JS绑定点击按钮
$("#restart").click(function () {
   // 刷新页面
    window.location.reload();
});


// 提交按钮点击后检查答案是否正确
$("#submit").click(function () {
 // 检查数组中是否有空值
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) {
                alert("请填写完整的数独！");
                return;
            }
        }
    }
    // 检查整个数独是否正确
    if (checkBoard()) {
        alert("恭喜你，答案正确！");
    } else {
        alert("很遗憾，答案错误！");
    }
});


// 检查整个数独是否正确
function checkBoard() {
    // 检查每一行是否正确
    for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(board[i][j]);
        }
        if (!checkArray(row)) {
            return false;
        }
    }

    // 检查每一列是否正确
    for (let i = 0; i < gridSize; i++) {
        let col = [];
        for (let j = 0; j < gridSize; j++) {
            col.push(board[j][i]);
        }
        if (!checkArray(col)) {
            return false;
        }
    }

    // 检查每一个 3x3 方格是否正确
    for (let i = 0; i < gridSize; i += 3) {
        for (let j = 0; j < gridSize; j += 3) {
            let box = [];
            for (let k = i; k < i + 3; k++) {
                for (let l = j; l < j + 3; l++) {
                    box.push(board[k][l]);
                }
            }
            if (!checkArray(box)) {
                return false;
            }
        }
    }

    return true;
}

function checkArray(arr) {
    // 检查数组中是否有重复数字
    for (let i = 0; i < gridSize; i++) {
        if (arr.indexOf(i + 1) === -1) {
            return false;
        }
    }
    return true;
}