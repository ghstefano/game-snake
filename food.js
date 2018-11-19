function Food() {
    this.position_good = {
        x: generatePosition(),
        y: generatePosition()
    };

    this.position_poisoned = {
        x: generatePosition(),
        y: generatePosition()
    };

    this.draw = function(){
        context.fillStyle = "#55FF00";
        context.fillRect(this.position_good.x, this.position_good.y, settings.scale, settings.scale);
        if(settings.poisoned_food){
            context.fillStyle = "#FF5500";
            context.fillRect(this.position_poisoned.x, this.position_poisoned.y, settings.scale, settings.scale);
        }
    };

    this.move_good = function () {
        this.position_good.x = generatePosition();
        this.position_good.y = generatePosition();
    }
    this.move_poisoned = function () {
        this.position_poisoned.x = generatePosition();
        this.position_poisoned.y = generatePosition();
    }


}