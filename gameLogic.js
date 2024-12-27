// 游戏状态变量
let playerCoins = 1500;
let computerCoins = 1500;
let playerPosition = 1;
let computerPosition = 1;
let currentPlayer = 'player'; // 当前玩家，'player' 或 'computer'
let purchasedProperties = {}; // 用于记录地产是否已被购买

// 更新玩家和电脑的信息
function updatePlayerInfo() {
    document.getElementById("player-coins").innerText = playerCoins;
    document.getElementById("player-position").innerText = playerPosition;
    document.getElementById("computer-coins").innerText = computerCoins;
    document.getElementById("computer-position").innerText = computerPosition;
}

// 移动棋子的通用函数
function movePiece(playerType) {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    let position, newPosition;

    // 更新掷骰子和移动信息
    if (playerType === 'player') {
        position = playerPosition;
        updateGameStatus(`玩家掷出了 ${diceRoll}，移动至格子 ${position + diceRoll}`);
    } else {
        position = computerPosition;
        updateGameStatus(`电脑掷出了 ${diceRoll}，移动至格子 ${position + diceRoll}`);
    }

    // 计算新位置，处理溢出超过40号格子时的情况
    newPosition = position + diceRoll;
    newPosition = newPosition > 40 ? newPosition - 40 : newPosition; // 溢出时返回1号格子

    // 清除上一个位置的棋子并更新位置
    clearPiece(position);
    if (playerType === 'player') {
        playerPosition = newPosition;
        document.getElementById(`cell-${playerPosition}`).innerHTML = `<span class="player-piece">🔴</span>`;
    } else {
        computerPosition = newPosition;
        document.getElementById(`cell-${computerPosition}`).innerHTML = `<span class="computer-piece">🔵</span>`;
    }

    // 更新玩家信息
    updatePlayerInfo();

    // 检查是否可以购买地产
    enablePurchaseButton();
}

// 掷骰子函数（玩家）
function rollDice() {
    if (currentPlayer !== 'player') return;

    // 禁用按钮，防止多次掷骰子
    document.getElementById("rollDiceBtn").disabled = true;

    movePiece('player');

    // 结束回合
    document.getElementById("endTurnBtn").disabled = false;
}

// 结束回合
function endTurn() {
    if (currentPlayer === 'player') {
        currentPlayer = 'computer';
        document.getElementById("game-status").innerText = '电脑回合，电脑正在行动。';
        rollDiceComputer(); // 电脑掷骰子
    } else {
        currentPlayer = 'player';
        document.getElementById("game-status").innerText = '玩家回合，请掷骰子。';
    }

    // 更新信息面板
    updatePlayerInfo();
    document.getElementById("endTurnBtn").disabled = true;
    document.getElementById("rollDiceBtn").disabled = false; // 恢复掷骰子按钮
}

// 电脑掷骰子并移动
function rollDiceComputer() {
    movePiece('computer');

    // 电脑购买地产（如果有条件）
    if (!purchasedProperties[computerPosition] && computerCoins >= 200) {
        computerCoins -= 200;
        updateGameStatus(`电脑购买了地产，花费 200 金币`);
        purchasedProperties[computerPosition] = true; // 标记地产为已购买
        updatePlayerInfo();
        changeCellColor(computerPosition, 'blue'); // 改变格子的颜色为蓝色
    }

    // 结束回合
    setTimeout(() => {
        endTurn(); // 回合结束后自动切换回合
    }, 500);
}
