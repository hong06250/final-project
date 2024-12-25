let i=0, imgArr=new Array();
imgArr[0] = "https://i.imgur.com/MXzlF2A.jpg";
imgArr[1] = "https://i.imgur.com/LN3YT6a.jpg";
imgArr[2] = "https://i.imgur.com/EGT0gPZ.jpg";

function showImg(){
  document.getElementById('ico').src = imgArr[i];
  i = (i+1) % 3;
}

function show(){
  setInterval(showImg, 2000);
}

document.getElementById("fortuneButton").addEventListener("click", function() {
  // 籤運及籤詩對應表
  const fortunes = [
    { type: "大吉", poem: "今日不宜報告，適合睡覺" },
    { type: "吉", poem: "今日不宜報告，適合請假" },
    { type: "中吉", poem: "今日不宜報告，適合翹課" },
    { type: "小吉", poem: "今日不宜報告，適合逃課" },
    { type: "兇", poem: "今日不宜報告，適合休學" },
    { type: "大兇", poem: "今日不宜報告，適合投胎" }
  ];

  // 隨機選擇一個籤運
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const selectedFortune = fortunes[randomIndex];

  // 使用 window.alert 彈出籤運與籤詩
  window.alert(`籤運: ${selectedFortune.type}\n解曰: ${selectedFortune.poem}`);
});

let content = document.getElementById("content");
let btn = document.getElementById("btn");
btn.addEventListener("click", news);
function news(){
  list.innerHTML = list.innerHTML + `
  <div class= "news">
    <p>${content.value}</p><hr>
  </div>
  `;
}

const cards = [
  '咕', '咕', '咩', '咩', '嘰', '嘰', '喳', '喳',
  '咻', '咻', '喵', '喵', '嘎', '嘎', '嘶', '嘶'
];

let flippedCards = [];
let matchedCards = 0;
let totalPairs = cards.length / 2;
const cardElements = [];
const gameBoard = document.querySelector('.game-board');
const status = document.querySelector('#status');
const resetButton = document.querySelector('#reset-btn');

// 隨機排列卡片
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

// 創建卡片元素
function createCards() {
  gameBoard.innerHTML = '';
  cards.forEach((cardValue, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValue;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
    cardElements.push(card);
  });
}

// 翻轉卡片
function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  
  card.classList.add('flipped');
  card.textContent = card.dataset.value;
  flippedCards.push(card);
  
  // 檢查卡片是否匹配
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// 檢查匹配
function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards++;
    flippedCards = [];
    updateStatus();
    
    if (matchedCards === totalPairs) {
      setTimeout(() => alert('Congratulations!，Game Over!！'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// 更新遊戲狀態
function updateStatus() {
  status.textContent = `還剩 ${totalPairs - matchedCards} 對卡片`;
}

// 重置遊戲
resetButton.addEventListener('click', () => {
  matchedCards = 0;
  flippedCards = [];
  shuffleCards();
  createCards();
  updateStatus();
});

// 初始化遊戲
shuffleCards();
createCards();
updateStatus();

const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const eraserBtn = document.getElementById('eraserBtn');

let painting = false;
let brushColor = '#000000';
let brushWidth = 5;
let isEraser = false; // 用來判斷當前選擇的是畫筆還是橡皮擦

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  
  // 如果是橡皮擦，改為清除畫布
  if (isEraser) {
    // 調整為相對於畫布的位置
    ctx.clearRect(e.clientX - canvas.offsetLeft - brushWidth / 2, 
                  e.clientY - canvas.offsetTop - brushWidth / 2, 
                  brushWidth, 
                  brushWidth);
  } else {
    // 畫筆邏輯
    ctx.lineWidth = brushWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;
    
    // 正確計算鼠標相對於畫布的位置
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  }
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', endPosition);

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorPicker.addEventListener('input', (e) => {
  brushColor = e.target.value;
});

brushSize.addEventListener('input', (e) => {
  brushWidth = e.target.value;
});

// 切換橡皮擦和畫筆
eraserBtn.addEventListener('click', () => {
  isEraser = !isEraser;
  eraserBtn.textContent = isEraser ? 'Brush' : 'Eraser'; // 按鈕文字切換
});

document.addEventListener('mousemove', (event) => {
  const corridor = document.querySelector('.corridor');
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  corridor.style.transform = `translate(-50%, -50%) rotateX(${y * 30}deg) rotateY(${x * 60}deg)`;
});