class Title extends Phaser.Scene{
    constructor(){
        super("titleScreen"); 
        this.titleText; 
    }

    preload(){

    }

    create(){
        this.nextScene = this.input.keyboard.addKey("ENTER");

        this.titleText = this.add.text(200, 300, 'Transformers: A Game', {fontSize:'30px', fill: '#000' });  
        this.titleText.setColor('#FFFFFF');
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("moveScene");
        }
    }
}