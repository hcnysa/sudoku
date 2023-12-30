


// 点击查看答案按钮，将最终结果补充到现有的页面中
function showResult() {
    // 1. 获取答案
    var result = getResult();
    // 2. 获取答案的容器
    var resultContainer = document.getElementById('result');
    // 3. 将答案添加到容器中
    resultContainer.innerHTML = result;
}

$("#result").click(function () {
    getResult();
});

// 获取数独最终结果
function getResult() {
    // 调用求解数独的方法
    solveSudoku(board, 9);
    console.log(board);
    showSudoku(board, 0);
}