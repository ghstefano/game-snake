const MODES = {
    POINTS: 0,
    TIME: 1
};
const KEY_CODES = {
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    A: 65,
    D: 68,
    S: 83,
    W: 87
};
var settings = {};
var context, snake, food, update_interval;
function generatePosition() {
    var box = Math.floor((Math.random() * (settings.canvas_size / settings.scale)));
    return box * settings.scale;
}
function keyPressed(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case(KEY_CODES.ARROW_UP):
        case(KEY_CODES.W):
            snake.changeDirection(snake.DIRECTION.UP);
            break;
        case(KEY_CODES.ARROW_DOWN):
        case(KEY_CODES.S):
            snake.changeDirection(snake.DIRECTION.DOWN);
            break;
        case(KEY_CODES.ARROW_LEFT):
        case(KEY_CODES.A):
            snake.changeDirection(snake.DIRECTION.LEFT);
            break;
        case(KEY_CODES.ARROW_RIGHT):
        case(KEY_CODES.D):
            snake.changeDirection(snake.DIRECTION.RIGHT);
            break;
        default:
            break;
    }
}
function setup() {
    settings.canvas_size = 300;
    settings.scale = 10;
    settings.speed = 1;
    settings.mode = MODES.POINTS;
    settings.walls = true;
    settings.poisoned_food = true;
    settings.poisoned_food_end = false;
    settings.self_eating_end = false;
    settings.nice_snake = false;
    var canvas = document.getElementById("game_canvas");
    canvas.setAttribute("width", settings.canvas_size.toString());
    canvas.setAttribute("height", settings.canvas_size.toString());
    context = canvas.getContext("2d");
}
function updateGame() {
    if (!snake.isDead) {
        context.clearRect(0, 0, settings.canvas_size, settings.canvas_size);
        if (snake.checkEatGood(food))
            food.move_good();
        else if (snake.checkEatPoisoned(food))
            food.move_poisoned();
        snake.updateBody(settings.scale, settings.walls, settings.canvas_size);
        snake.draw(context, settings.canvas_size, settings.scale, settings.nice_snake);
        food.draw();
        document.getElementById("score").innerHTML = "SCORE: " + (snake.bodyLength - 1).toString();
    }
    else {
        window.clearInterval(update_interval);
    }
}
function play() {
    document.onkeydown = keyPressed;
    snake = new Snake();
    food = new Food();
    window.clearInterval(update_interval);
    update_interval = setInterval(updateGame, 150 / settings.speed);
}
function pause() {
    window.clearInterval(update_interval);
}
function resume() {
    update_interval = setInterval(updateGame, 150 / settings.speed);
}
