class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, pathPoints, texture, frame, enemySpeed, value, easeType){
        super(scene, pathPoints[0].x, pathPoints[0].y, texture, frame);

        scene.physics.world.enable(true); 
        scene.add.existing(this); 
        this.enemySpeed = enemySpeed; 
        this.enemyHealth = 5; 

        //this.startingX = x; 
        //this.startingY = y; 
        //this.goUp = true; 

        this.pointValue = value; 
        this.easeType = easeType; 

        //generate random range from starting point?
        //this.minY = Math.random() * 300; 
        //this.maxY = 300 + (Math.random() * 300); 

        /*let path = new Phaser.Curves.Path(pathPoints[0].x, pathPoints[0].y); 
        for(let i = 1; i < pathPoints.length; i++){
            path.lineTo(pathPoints[i].x, pathPoints[i].y); 
        }

        scene.tweens.add({
            targets: this, 
            x: path.getPoints().map(p => p.x),
            y: path.getPoints().map(p => p.y), 
            ease: 'Sine.easeIn',  
            duration: 2000, 
            yoyo: true, 
            repeat: -1
        });  */

        this.pathPoints = pathPoints;
        this.currentPointIndex = 0;

        this.createTween(scene);
        this.scene = scene; 


        return this; 
    }

    preload(){
        this.load.audio("enemyDead", "assets/explosionCrunch_003.ogg");
    }

    update(){
        
        
        /*if(this.goUp){
            if(this.y > this.minY){
                this.y -= this.enemySpeed; 
            }
            else{
                this.goUp = false; 
            }
        }
        else{
            if(this.y < this.maxY){
                this.y += this.enemySpeed; 
            }
            else{
                this.goUp = true; 
            }
        }*/
    }

    takeDamage(){
        if(!this.active){
            return; 
        }
        this.enemyHealth -= 1;
        console.log("enemy health" + this.enemyHealth); 
        if(this.enemyHealth <= 0){
            this.scene.sound.play('enemyDead');
            this.setActive(false); 
            this.setVisible(false);
            //this.follower.stopFollow() 
        }
    }

    returnValue(){
        return this.pointValue; 
    }

    createTween(scene) {
        let nextPointIndex = (this.currentPointIndex + 1) % this.pathPoints.length;
        let tween = scene.tweens.add({
            targets: this,
            x: this.pathPoints[nextPointIndex].x,
            y: this.pathPoints[nextPointIndex].y,
            ease: this.easeType,
            duration: this.enemySpeed,
            onComplete: () => {
                this.currentPointIndex = nextPointIndex;
                this.createTween(scene);
            }
        });

        //'Sine.easeIn'
    }
}