// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// LectureMovement
//
// A template for building a monster using a series of assets from
// a sprite atlas.
// 
// Art assets from Kenny Assets "Monster Builder Pack" set:
// https://kenney.nl/assets/monster-builder-pack

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    backgroundColor: '#7F7F7F',
    scene: [Title, Move, Win, GameOver],
    fps: { forceSetTimeOut: true, target: 60 }, 
    physics: {
        gravity: { y: 200 },
        default: 'arcade', 
        debug: true, 
        debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0xff00ff
    }
}

const game = new Phaser.Game(config);