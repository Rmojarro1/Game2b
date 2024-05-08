class Move extends Phaser.Scene{
    constructor(){
        super("moveScene"); 
        this.my = {sprite: {}};
        this.avatarX = 100; 
        this.avatarY = 430; 

        this.playerSpeed = 7; 
        this.enemySpeed = 3500; 
        this.seekerSpeed = 1500; 
        this.bulletSpeed = 10;

        this.enemyBulletSpeed = -7; 
        this.enemyCooldown = 60; 
        this.enemyCooldownCounter = 0; 
        this.seekerCooldown = 80; 
        this.seekerCooldownCounter = 0; 
        this.bossCooldown = 50; 
        this.bossCooldownCounter = 0; 

        this.bulletCooldown = 15;      
        this.bulletCooldownCounter = 0;

        this.score = 0; 
        this.scoreText; 
    }

    preload(){
        this.load.setPath("./assets/"); 
        this.load.image("prime", "truckcabin_vintage.png"); 
        this.load.image("trailer", "truck_trailer.png")
        this.load.image("laser", "laserBlue05.png"); 
        this.load.image("enemy", "formula.png"); 
        this.load.image("enemy2", "bus.png"); 
        this.load.image("enemy3", "hotdog.png"); 
        this.load.image("enemy4", "towtruck.png"); 
        this.load.audio("laserP", "laserLarge_004.ogg"); 
        this.load.image("laserE", "laserRed01.png"); 
        this.load.image("seeker", "star.png"); 
        this.load.image("seeker2", "thunder.png"); 
        this.load.image("seeker3", "seek.png"); 
        this.load.image("barrier", "barrier.png"); 
        this.load.audio("playerEx", "explosionCrunch_002.ogg");  
        this.load.audio("playerHurt", "explosionCrunch_000.ogg"); 
        this.load.audio("enemyDead", "explosionCrunch_003.ogg"); 
        this.load.image("megatron", "mega.png"); 
        
    }; 

    create(){
        let my = this.my; 
        
        this.up = this.input.keyboard.addKey("W"); 
        this.down = this.input.keyboard.addKey("S"); 

        this.barrierGroup = this.add.group(); 
        for(let i = 0; i < 8; i++){
            let barrier = this.add.sprite(15 + i * 100, 5, "barrier"); 
            barrier.setScale(1.5); 
            this.barrierGroup.add(barrier); 
            let barrier2 = this.add.sprite(15 + i * 100, 595, "barrier"); 
            barrier2.setScale(1.5); 
            this.barrierGroup.add(barrier2);
        }


        this.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize:'30px', fill: '#000' });  
        this.scoreText.setColor('#0EFFE5');
        this.playerLife = this.add.text(650, 16, 'Lives: 5', {fontSize:'30px', fill: '#000' });  
        this.playerLife.setColor('#0EFFE5');

        my.sprite.playerSprite = new Player(this, this.avatarX, this.avatarY, "prime", null, this.up, this.down, this.playerSpeed); 
        my.sprite.trailer = this.add.sprite(this.avatarX - 55, this.avatarY - 3, "trailer"); 
        my.sprite.playerSprite.trailer = my.sprite.trailer; 
        my.sprite.playerSprite.setScale(2); 
        my.sprite.playerSprite.trailer.setScale(2); 

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        my.sprite.bulletGroup = this.add.group({
            active: true,
            defaultKey: "laser",
            maxSize: 5,
            runChildUpdate: true
            }
        )
        my.sprite.bulletGroup.createMultiple({
            classType: Bullet,
            active: false,
            key: my.sprite.bulletGroup.defaultKey,
            repeat: my.sprite.bulletGroup.maxSize-1
        });
        my.sprite.bulletGroup.propertyValueSet("speedX", this.bulletSpeed);
        my.sprite.bulletGroup.propertyValueSet("speedY", 0);


        this.enemyLasers = this.add.group({
            active: true, 
            defaultKey: "laserE", 
            maxSize: 50, 
            runChildUpdate: true
        })
        this.enemyLasers.createMultiple({
            classType: Bullet, 
            active: false, 
            key: this.enemyLasers.defaultKey, 
            repeat: this.enemyLasers.maxSize-1
        }); 
        this.enemyLasers.propertyValueSet("speedX", this.enemyBulletSpeed); 
        this.enemyLasers.propertyValueSet("speedY", 0); 
        

        /*let e1Path = [{x:400, y: 300}, {x:400, y:550}]; 
        let enemy1 = new Enemy(this, e1Path, "enemy", null, this.enemySpeed, 10, 'Sine.easeIn'); 
        enemy1.setScale(2); 


        let e2Path = [{x:600, y:100}, {x:300, y:400}, {x:500, y:500}]; 
        let enemy2 = new Enemy(this, e2Path, "enemy", null, this.enemySpeed, 10, 'Sine.easeIn'); 
        enemy2.setScale(2); 

        let e3Path = [{x:400, y:290}, {x:400, y:20}]; 
        let enemy3 = new Enemy(this, e3Path, "enemy", null, this.enemySpeed, 10, 'Sine.easeOut'); 
        enemy3.setScale(2); 

        let sPath = [{x:750, y:50}, {x:200, y:300}, {x:750, y:550}, {x:200, y:300}]; 
        let seeker1 = new Enemy(this, sPath, "seeker", null, this.seekerSpeed, 50, 'Linear');  
        seeker1.setScale(0.75); 

        this.enemies = this.physics.add.group({
            classType: Enemy,
            active: true, 
            runChildUpdate: true 
        });
        this.enemies.add(enemy1); 
        this.enemies.add(enemy2); 
        this.enemies.add(enemy3); 

        this.seekers = this.physics.add.group({
            classType: Enemy, 
            active: true, 
            runChildUpdate: true
        })
        this.seekers.add(seeker1); */

        this.waves = [
            [
                {path: [{x:400, y: 300}, {x:300, y:550}], scale: 2, type: 'enemy', speed: 2000, value:10 ,  ease: 'Sine.easeIn'},
                {path: [{x:600, y:100}, {x:600, y:550}, {x:500, y:400}], scale: 2.5, type: 'enemy',speed: 2000,value:10 , ease: 'Quad.easeIn'},
                {path: [{x:200, y:290}, {x:400, y:20}, {x:300, y: 100}], scale: 3, type: 'enemy', speed: 2000,value:10 ,ease: 'Sine.easeOut'}
            ],
            [
                {path: [{x:750, y:50}, {x:200, y:300}, {x:750, y:550}, {x:200, y:300}], scale: 0.75, type: 'seeker', speed: 1200,value:50 ,ease: 'Linear'}, 
            ],
            [
                {path: [{x:300, y: 550}, {x:750, y:400}], scale: 2, type: 'enemy2', speed: 2000,value:20 ,ease: 'Sine.easeIn'},
                {path: [{x:600, y:100}, {x:300, y:200}, {x:500, y:300}], scale: 2, type: 'enemy4', speed: 2000,value:20 ,ease: 'Quint.easeOut'},
                {path: [{x:400, y:590}, {x:700, y:290}], scale: 2.5, type: 'enemy3', speed: 2000,value:20 ,ease: 'Sine.easeOut'},
                {path: [{x:150, y: 100}, {x:400, y:250}], scale: 2, type: 'enemy', speed: 2000,value:20 ,ease: 'Linear'},
            ],
            [
                {path: [{x:750, y:50}, {x:200, y:300}, {x:750, y:550}, {x:200, y:300}], scale: 0.75, type: 'seeker',speed: 1000,value:50 , ease: 'Linear'}, 
                {path: [{x:750, y:300}, {x: 650, y: 200}, {x:450, y:490}, {x:300, y:300}], scale: 0.75, type: 'seeker3', speed: 1000,value:50 , ease: 'Linear'}, 
                {path:[{x:200, y: 50}, {x: 600, y: 400},{x:200, y: 550}], scale: 0.75, type: "seeker2", speed: 1000, value:50 ,ease: 'Linear'}
            ],
            [
                {path: [{x: 750, y: 500}, {x: 250, y: 90}, {x: 250, y: 490}, {x:600, y: 500}], scale: 1, type: 'megatron', speed: 750, value: 100, ease: 'Linear'}
            ],
            // Add more waves as needed...
        ];

        this.enemies = this.physics.add.group({
            classType: Enemy,
            active: true, 
            runChildUpdate: true 
        });

        this.seekers = this.physics.add.group({
            classType: Enemy, 
            active: true, 
            runChildUpdate: true
        });
        this.boss = this.physics.add.group({
            classType: Enemy, 
            active: true, 
            runChildUpdate: true
        }); 
        
        this.physics.add.collider(my.sprite.bulletGroup,this.enemies, this.enemyHitCallback.bind(this), null, this);
        this.physics.add.collider(this.enemyLasers, my.sprite.playerSprite, this.playerHitCallback.bind(this), null, this); 
        this.physics.add.collider(my.sprite.bulletGroup, this.seekers, this.enemyHitCallback.bind(this), null, this); 
        this.physics.add.collider(my.sprite.bulletGroup, this.boss, this.enemyHitCallback.bind(this), null, this);

        this.pLaserSFX = this.sound.add("laserP"); 
        this.playerDeath = this.sound.add("playerEx"); 
        my.sprite.playerSprite.playerReset();
        this.score = 0;  
        
    }; 

    spawnWave(wave) {
        wave.forEach(enemyConfig => {
            let enemy = new Enemy(this, enemyConfig.path, enemyConfig.type, null, enemyConfig.speed, enemyConfig.value, enemyConfig.ease);
            enemy.setScale(enemyConfig.scale);
            if(enemyConfig.type == 'seeker' || enemyConfig.type == 'seeker2' || enemyConfig.type == 'seeker3'){
                this.seekers.add(enemy); 
            }
            else if(enemyConfig.type == 'megatron'){
                enemy.enemyHealth = 15; 
                this.boss.add(enemy); 
            }
            else{
                this.enemies.add(enemy);
            }
            
        });
    }

    update(){
        let my = this.my;
        my.sprite.playerSprite.update(); 

        if(!my.sprite.playerSprite.playerDead()){
            this.scene.start("gameOver"); 
        }
         

        this.bulletCooldownCounter--;
        this.enemyCooldownCounter--; 
        this.seekerCooldownCounter--; 
        this.bossCooldownCounter--; 

        if (this.spaceKey.isDown && my.sprite.playerSprite.active) {
            if (this.bulletCooldownCounter < 0) {
                let bullet = my.sprite.bulletGroup.getFirstDead();
                if (bullet != null) {
                    this.bulletCooldownCounter = this.bulletCooldown;
                    bullet.makeActive();
                    bullet.y = my.sprite.playerSprite.y;
                    bullet.x = my.sprite.playerSprite.x + (my.sprite.playerSprite.displayWidth/2);
                    this.pLaserSFX.play(); 
                }
            }
        }

        if(this.enemyCooldownCounter < 0){
            this.enemyCooldownCounter = this.enemyCooldown; 
            this.enemies.getChildren().forEach((enemy) => {
                if(enemy.active){
                    let enemyBullet = this.enemyLasers.getFirstDead(); 
                    if(enemyBullet != null){
                        enemyBullet.makeActive(); 
                        enemyBullet.y = enemy.y; 
                        enemyBullet.x = enemy.x; 
                        enemyBullet.speedY = 0; 
                    }
                }
            }); 
        }

        if(this.seekerCooldownCounter < 0){
            this.seekerCooldownCounter = this.seekerCooldown; 
            this.seekers.getChildren().forEach((seeker) => {
                if(seeker.active){
                    let seekerBulletA = this.enemyLasers.getFirstDead(); 
                    if(seekerBulletA != null){
                        seekerBulletA.makeActive(); 
                        seekerBulletA.x = seeker.x; 
                        seekerBulletA.y = seeker.y; 
                        seekerBulletA.speedY = -1; 
                    }
                    let seekerBulletB = this.enemyLasers.getFirstDead(); 
                    if(seekerBulletB != null){
                        seekerBulletB.makeActive(); 
                        seekerBulletB.x = seeker.x; 
                        seekerBulletB.y = seeker.y; 
                        seekerBulletB.speedY = 0; 
                    }
                    let seekerBulletC = this.enemyLasers.getFirstDead(); 
                    if(seekerBulletC != null){
                        seekerBulletC.makeActive(); 
                        seekerBulletC.x = seeker.x; 
                        seekerBulletC.y = seeker.y; 
                        seekerBulletC.speedY = 1; 
                    }
                }
            }); 
        }
        if(this.bossCooldownCounter < 0){
            this.bossCooldownCounter = this.bossCooldown; 
            this.boss.getChildren().forEach((boss) => {
                if(boss.active){
                    let bossBulletA = this.enemyLasers.getFirstDead(); 
                    if(bossBulletA != null){
                        bossBulletA.makeActive(); 
                        bossBulletA.x = boss.x; 
                        bossBulletA.y = boss.y; 
                        bossBulletA.speedX = -10;
                        bossBulletA.speedY = 0; 
                    }
                    let bossBulletB = this.enemyLasers.getFirstDead(); 
                    if(bossBulletB != null){
                        bossBulletB.makeActive(); 
                        bossBulletB.x = boss.x; 
                        bossBulletB.y = boss.y; 
                        bossBulletB.speedX = -10; 
                        bossBulletB.speedY = -2
                    }
                    let bossBulletC = this.enemyLasers.getFirstDead(); 
                    if(bossBulletC != null){
                        bossBulletC.makeActive(); 
                        bossBulletC.x = boss.x; 
                        bossBulletC.y = boss.y; 
                        bossBulletC.speedX = -10; 
                        bossBulletC.speedY = 2
                    }
                    let bossBulletD = this.enemyLasers.getFirstDead(); 
                    if(bossBulletD != null){
                        bossBulletD.makeActive(); 
                        bossBulletD.x = boss.x; 
                        bossBulletD.y = boss.y; 
                        bossBulletD.speedX = -10; 
                        bossBulletD.speedY = 1; 
                    }
                    let bossBulletE = this.enemyLasers.getFirstDead(); 
                    if(bossBulletE != null){
                        bossBulletE.makeActive(); 
                        bossBulletE.x = boss.x; 
                        bossBulletE.y = boss.y; 
                        bossBulletE.speedX = -10; 
                        bossBulletE.speedY = -1; 
                    }
                }
            })
        }

        this.barrierGroup.getChildren().forEach((barrier) => {
            barrier.x -= 5;
            if (barrier.x < -15) {
                barrier.x = 800;
            }
        });

        this.scoreText.setText('Score: ' + this.score); 
        this.playerLife.setText('Lives: ' + my.sprite.playerSprite.returnLives()); 

        if (this.checkIfInactive(this.enemies) && this.checkIfInactive(this.seekers) && this.checkIfInactive(this.boss)) {
            if (this.waves.length > 0) {
                let nextWave = this.waves.shift();
                this.spawnWave(nextWave);
            } else {
                console.log("You won!");
                this.scene.start("playerWin");
            }
        }
    }; 

    enemyHitCallback(bullet, enemy){
        if(!enemy.active){
            return;
        }
        
        console.log('Enemy hit by bullet!');
        bullet.x = 1000; 
        bullet.makeInactive();
        //enemy.setScale(enemy.scaleX * 0.8, enemy.scaleY * 0.8); 
        enemy.takeDamage();
        if(enemy.enemyHealth < 2){
            enemy.setScale(enemy.scaleX * 0.8, enemy.scaleY * 0.8); 
        }
        if(enemy.enemyHealth == 0){
                this.updateScore(enemy.returnValue()); 
        } 
    }

    playerHitCallback(bulletE, player){
        if(!player.active){
            return; 
        }
        bulletE.x = 1000; 
        player.takeDamage(); 
        if(player.returnHealth() == 0){
            this.playerDeath.play(); 
        }; 
        
    }

    updateScore(pointValue){
        this.score += pointValue; 
    }

    checkIfInactive(group){
        return group.getChildren().every(child => !child.active); 
    }

    
}