function Snake() {
    this.speed = {x: 0, y: 0};
    this.eat_good = false;
    this.eat_poisoned = false;
    this.isDead = false;
    var head_position = {x: generatePosition(), y: generatePosition()};
    this.bodyLength = 1;
    this.body = [head_position];
    this.DIRECTION = {
        UP: {x: 0, y: -1},
        DOWN: {x: 0, y: 1},
        LEFT: {x: -1, y: 0},
        RIGHT: {x: 1, y: 0}
    };
    this.drawNiceSnake = function (context, canvas_size, scale) {
        context.fillStyle = "#FFFFFF";
        context.beginPath();
        if (this.speed === this.DIRECTION.LEFT) {
            context.moveTo(this.body[0].x + scale, this.body[0].y + scale / 2);
            context.lineTo(this.body[0].x, this.body[0].y);
            context.lineTo(this.body[0].x, this.body[0].y + scale);
        } else if (this.speed === this.DIRECTION.RIGHT) {
            context.moveTo(this.body[0].x, this.body[0].y + scale / 2);
            context.lineTo(this.body[0].x + scale, this.body[0].y);
            context.lineTo(this.body[0].x + scale, this.body[0].y);
        } else if (this.speed === this.DIRECTION.UP) {
            context.moveTo(this.body[0].x + scale, this.body[0].y + scale / 2);
            context.lineTo(this.body[0].x, this.body[0].y);
            context.lineTo(this.body[0].x, this.body[0].y + scale);
        } else if (this.speed === this.DIRECTION.DOWN) {
            context.moveTo(this.body[0].x + scale, this.body[0].y + scale / 2);
            context.lineTo(this.body[0].x, this.body[0].y);
            context.lineTo(this.body[0].x, this.body[0].y + scale);
        }
        else {
            context.moveTo(this.body[0].x + scale, this.body[0].y + scale / 2);
            context.lineTo(this.body[0].x, this.body[0].y);
            context.lineTo(this.body[0].x, this.body[0].y + scale);
        }
        context.fill();

        //TODO: draw eyes
    };

    this.draw = function (context, canvas_size, scale, nice_snake) {
        context.fillStyle = "#FFFFFF";
        for (var i = 0; i < this.bodyLength; i++)
            context.fillRect(this.body[i].x, this.body[i].y, scale, scale);
        if (nice_snake) {
            this.drawNiceSnake(context, canvas_size, scale);
        }
    };

    this.checkEatGood = function (food) {
        if (this.body[0].x === food.position_good.x && this.body[0].y === food.position_good.y) {
            this.eat_good = true;
            return true;
        }
        return false;
    };

    this.checkEatPoisoned = function (food) {
        if (this.body[0].x === food.position_poisoned.x && this.body[0].y === food.position_poisoned.y) {
            this.eat_poisoned = true;
            return true;
        }
        return false;
    };

    this.updateBody = function (scale, walls, canvas_size) {

        if (this.eat_good) {
            for (var i = this.bodyLength; i > 0; i--) {
                var pos = {
                    x: this.body[i - 1].x,
                    y: this.body[i - 1].y
                };
                this.body[i] = pos;
            }
            this.body[0].x += this.speed.x * settings.scale;
            this.body[0].y += this.speed.y * settings.scale;
            this.bodyLength++;
            this.eat_good = false;
        } else if (this.eat_poisoned) {
            for (var i = this.bodyLength - 3; i > 0; i--) {
                var pos = {
                    x: this.body[i - 1].x,
                    y: this.body[i - 1].y
                };
                this.body[i] = pos;
            }
            this.body[0].x += this.speed.x * scale;
            this.body[0].y += this.speed.y * scale;
            if (this.bodyLength = 1)
                this.isDead = true;
            else if (this.bodyLength < 3)
                this.bodyLength = 1;
            else
                this.bodyLength -= 2;
            this.eat_poisoned = false;
        } else {
            for (var i = this.bodyLength - 1; i > 0; i--) {
                var pos = {
                    x: this.body[i - 1].x,
                    y: this.body[i - 1].y
                };
                this.body[i] = pos;
            }
            this.body[0].x += this.speed.x * scale;
            this.body[0].y += this.speed.y * scale;

        }

        if (!walls) {
            if (this.body[0].x === canvas_size)
                this.body[0].x = 0;
            else if (this.body[0].x < 0)
                this.body[0].x = canvas_size;
            if (this.body[0].y === canvas_size)
                this.body[0].y = 0;
            else if (this.body[0].y < 0)
                this.body[0].y = canvas_size;
        } else {
            if (this.body[0].x === canvas_size ||
                this.body[0].x < 0 ||
                this.body[0].y === canvas_size ||
                this.body[0].y < 0)
                this.isDead = true;
        }
    };

    this.changeDirection = function (direction) {
        if (this.speed.x === 0 && direction.x !== 0 || this.speed.y === 0 && direction.y !== 0) {
            this.speed.x = direction.x;
            this.speed.y = direction.y;
        }
    };
}