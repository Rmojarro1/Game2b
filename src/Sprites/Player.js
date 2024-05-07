//class Player extends Phaser.GameObjects.Sprite
class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, upKey, downKey, playerSpeed) {
        super(scene, x, y, texture, frame);

        this.up = upKey;
        this.down = downKey;
        this.playerSpeed = playerSpeed;
        this.trailer = null; 
        this.playerHealth = 2; 
        this.playerLives = 5; 
        this.respawnLocation = y; 


        scene.physics.world.enable(this); 
        scene.add.existing(this);

        this.scene = scene;

        return this;
    }

    preload(){
        this.load.audio("playerEx", "assets/explosionCrunch_002.ogg");
        this.load.audio("playerHurt", "assets/explosionCrunch_000.ogg"); 
    }


    update() {
        if(this.playerLives >= 0){
            if (this.up.isDown) {
                if (this.y > (this.displayHeight/2)) {
                    this.y -= this.playerSpeed;
                }
            }
        }
        if(this.playerLives >= 0){
            if (this.down.isDown) {
                if (this.y < (game.config.height - (this.displayHeight/2) - 10)) {
                    this.y += this.playerSpeed;
                }
            }
        }
        if (this.trailer) {
            this.trailer.x = this.x - 55; 
            this.trailer.y = this.y - 3; 
          }
    }

    returnHealth(){
        console.log("Player health: " + this.playerHealth); 
        return this.playerHealth;  
    }

    returnLives(){
        return this.playerLives; 
    }

    takeDamage(){
        this.playerHealth -= 1; 
        if(this.playerHealth == 1){
            this.scene.sound.play('playerHurt'); 
            this.trailer.visible = false; 
        }
        else if(this.playerHealth <= 0){
            this.scene.sound.play('playerEx'); 
            this.playerRespawn(); 
        }
    }

    playerDead(){
        return this.active;
    }

    playerRespawn(){
        if(this.playerLives > 0){
            this.playerLives -= 1; 
            console.log("Lives: " + this.playerLives); 
            this.y = this.respawnLocation; 
            this.playerHealth = 2; 
            this.trailer.visible = true; 
        }
        else{
            this.visible = false; 
            this.active = false; 
        }
        
    }

    playerReset(){
        this.playerLives = 5; 
        this.playerHealth = 2; 
    }

}