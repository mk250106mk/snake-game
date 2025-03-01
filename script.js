const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = "RIGHT";
let food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
let score = 0;

// Draw Snake
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x * boxSize, part.y * boxSize, boxSize, boxSize);
    });
}

// Draw Food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

// Move Snake
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    // Collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } else {
        snake.pop();
    }

    // Collision with walls
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        alert(`Game Over! Your Score: ${score}`);
        resetGame();
        return;
    }

    // Collision with self
    if (snake.some(part => part.x === head.x && part.y === head.y)) {
        alert(`Game Over! Your Score: ${score}`);
        resetGame();
        return;
    }

    snake.unshift(head);
}

// Reset Game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = "RIGHT";
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    score = 0;
}

// Control Snake
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
}

setInterval(gameLoop, 200);
