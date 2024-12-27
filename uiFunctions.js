// 启用购买地产按钮
function enablePurchaseButton() {
    document.getElementById("purchaseBtn").disabled = false;
}

// 清除棋子
function clearPiece(position) {
    document.getElementById(`cell-${position}`).innerHTML = position; // 恢复格子的编号
}

// 购买地产
function purchaseProperty() {
    if (currentPlayer === 'player' && playerCoins >= 200 && !purchasedProperties[playerPosition]) {
        playerCoins -= 200;
        updateGameStatus(`玩家购买了地产，花费 200 金币`);
        purchasedProperties[playerPosition] = true; // 标记地产为已购买
        updatePlayerInfo();
        changeCellColor(playerPosition, 'red'); // 改变格子的颜色为红色
        document.getElementById("purchaseBtn").disabled = true;
    } else if (currentPlayer === 'computer' && computerCoins >= 200 && !purchasedProperties[computerPosition]) {
        computerCoins -= 200;
        updateGameStatus(`电脑购买了地产，花费 200 金币`);
        purchasedProperties[computerPosition] = true; // 标记地产为已购买
        updatePlayerInfo();
        changeCellColor(computerPosition, 'blue'); // 改变格子的颜色为蓝色
    } else {
        alert('金币不足或该地产已被购买，无法购买地产！');
    }
}

// 改变格子的颜色（购买地产后）
function changeCellColor(position, color) {
    let cell = document.getElementById(`cell-${position}`);
    if (color === 'red') {
        cell.style.backgroundColor = '#FF6347'; // 红色（玩家购买）
    } else if (color === 'blue') {
        cell.style.backgroundColor = '#4682B4'; // 蓝色（电脑购买）
    }
}

// 更新游戏状态文本
function updateGameStatus(status) {
    document.getElementById("game-status").innerText = status;
}
