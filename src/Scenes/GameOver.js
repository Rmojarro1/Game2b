class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOver"); 
        this.titleText; 
        this.returnText; 
    }

    preload(){

    }

    create(){
        this.nextScene = this.input.keyboard.addKey("ENTER");

        this.titleText = this.add.text(300, 250, 'GAME OVER', {fontSize:'30px', fill: '#000' });  
        this.titleText.setColor('#FFFFFF');

        this.returnText = this.add.text(150, 500, 'Press Enter to return to title screen', {fontSize: '24px', fill: '#000'});
        this.returnText.setColor('#FFFFFF'); 


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("titleScreen");
        }
    }
}