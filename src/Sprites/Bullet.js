//class Bullet extends Phaser.GameObjects.Sprite
class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);

        scene.physics.world.enable(this); 
        this.visible = false;
        this.active = false;
        return this;
    }

    update() {
        if (this.active) {
            this.x += this.speedX;
            this.y += this.speedY; 
            if (this.x > (800) || this.x < 0) {
                this.makeInactive();
            }
        }
    }

    makeActive() {
        this.visible = true;
        this.active = true;
    }

    makeInactive() {
        this.visible = false;
        this.active = false;
    }

}