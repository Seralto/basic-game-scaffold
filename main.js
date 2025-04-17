// Get the canvas element and its drawing context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// --- Game Constants ---
const CANVAS_SIZE = 400;        // Canvas width and height (square)
const PLAYER_SIZE = 40;         // Player size in pixels
const PLAYER_COLOR = '#4caf50'; // Player color
const PLAYER_RADIUS = 8;        // Corner radius for rounded player
const MOVE_STEP = 4;            // Pixels moved per frame when key is held

// --- Player State ---
let playerX = 180; // Initial X position
let playerY = 180; // Initial Y position

// --- Keyboard State ---
// Tracks which arrow keys are currently pressed
const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

// --- Update Player Position Based on Key State ---
function movePlayer() {
  let dx = 0;
  let dy = 0;

  if (keysPressed.ArrowUp)    dy -= MOVE_STEP;
  if (keysPressed.ArrowDown)  dy += MOVE_STEP;
  if (keysPressed.ArrowLeft)  dx -= MOVE_STEP;
  if (keysPressed.ArrowRight) dx += MOVE_STEP;

  // Clamp position so player stays inside canvas
  playerX = Math.max(0, Math.min(CANVAS_SIZE - PLAYER_SIZE, playerX + dx));
  playerY = Math.max(0, Math.min(CANVAS_SIZE - PLAYER_SIZE, playerY + dy));
}

// --- Draw the Player (Green Rounded Square) ---
function drawPlayer() {
  ctx.fillStyle = PLAYER_COLOR;
  ctx.beginPath();
  ctx.moveTo(playerX + PLAYER_RADIUS, playerY);
  ctx.lineTo(playerX + PLAYER_SIZE - PLAYER_RADIUS, playerY);
  ctx.quadraticCurveTo(playerX + PLAYER_SIZE, playerY, playerX + PLAYER_SIZE, playerY + PLAYER_RADIUS);
  ctx.lineTo(playerX + PLAYER_SIZE, playerY + PLAYER_SIZE - PLAYER_RADIUS);
  ctx.quadraticCurveTo(playerX + PLAYER_SIZE, playerY + PLAYER_SIZE, playerX + PLAYER_SIZE - PLAYER_RADIUS, playerY + PLAYER_SIZE);
  ctx.lineTo(playerX + PLAYER_RADIUS, playerY + PLAYER_SIZE);
  ctx.quadraticCurveTo(playerX, playerY + PLAYER_SIZE, playerX, playerY + PLAYER_SIZE - PLAYER_RADIUS);
  ctx.lineTo(playerX, playerY + PLAYER_RADIUS);
  ctx.quadraticCurveTo(playerX, playerY, playerX + PLAYER_RADIUS, playerY);
  ctx.closePath();
  ctx.fill();
}

// --- Main Game Loop ---
function gameLoop() {
  // Clear the canvas for the new frame
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Update player position based on input
  movePlayer();

  // Draw the player at the new position
  drawPlayer();

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// --- Keyboard Event Listeners ---
document.addEventListener('keydown', (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false;
  }
});

// --- Start the Game ---
gameLoop();
