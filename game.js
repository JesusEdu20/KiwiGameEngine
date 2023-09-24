import {animateCharacter, control, universe} from "./controls.js"
import { animate, mapFrames } from "./animations.js";

import { character } from "./objectAnimation.js";
import { Universe, Control, Character } from "./superObject.js"


 const frames=mapFrames({ name:"idle", frames: 20}, { name:"runReady", frames: 11}, 
{ name:"runStart", frames: 19}, { name:"runFinish", frames: 11}, { name:"jumpReady", frames: 11},
{ name:"jumpStart", frames: 11}, { name:"jumpFinish", frames: 11}, { name:"ok", frames: 19}, 
{ name:"punch", frames: 10},
{dimensions:{width:796, height:719}}) 
/*
const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
const world = new universe("RigobertoWorld", canvas, ctx);
world.setCanvasSize(90, true);
world.cleanCanvas(); */

/* world.setCharacterCoordinatesInUniverse("rect", 0,400, 100,100);
console.log(world.characterCoordinates) */


const controls = {
    ArrowUp: {
        startAnimation:"jumpStart",
        startEvent: "keydown",
        startLoop: false,
        endAnimation: "jumpFinish",
        endEvent: "keyup",
        endLoop: false,
        displacementPhysics:{speedX:1, speedY:-20}
    },
    ArrowRight: {
        startAnimation:"runStart",
        startEvent: "keydown",
        startLoop: true,
        endAnimation: "idle",
        endEvent: "keyup",
        endLoop: true,
        displacementPhysics:{speedX:2, speedY:0}
    },
    ArrowLeft: {
        startAnimation: "punch",
        startEvent: "keydown",
        startLoop: false,
        endAnimation:"ok",
        endEvent: "keyup",
        endLoop: false,
        displacementPhysics:{speedX:0, speedY:0}
    },
};

const controlsWS = {
    w: {
        startAnimation:"jumpStart",
        startEvent: "keydown",
        startLoop: false,
        endAnimation: "jumpFinish",
        endEvent: "keyup",
        endLoop: false,
        displacementPhysics:{speedX:1, speedY:-20}
    },
    d: {
        startAnimation:"runStart",
        startEvent: "keydown",
        startLoop: true,
        endAnimation: "idle",
        endEvent: "keyup",
        endLoop: true,
        displacementPhysics:{speedX:2, speedY:0}
    },
    a: {
        startAnimation: "punch",
        startEvent: "keydown",
        startLoop: false,
        endAnimation:"ok",
        endEvent: "keyup",
        endLoop: false,
        displacementPhysics:{speedX:0, speedY:0}
    },
};



/* 
const spriteSheet= new Image()
spriteSheet.src="./animations/1x/Artboard-1.png"

 */

/* const rigoberto = new character(796, 719, spriteSheet, frames, canvas, ctx, controls, world) */
/* const willSmith= new character(796, 719, spriteSheet, frames, canvas, ctx, controlsWS, world); */


/* const controlsOfRigoberto = new control(rigoberto); */
/* const controlsOfWillSmith = new control(willSmith); */

/* controlsOfRigoberto.hookCharacter() */
/* controlsOfWillSmith.hookCharacter() */

/* world.sprites.push({
    x: 400,
    y: 0,
    width:100,
    height:100,
})
 */

const spriteSheet= new Image();
spriteSheet.src="./animations/1x/Artboard-1.png";

const test = {

    speedX:0,
    speedY:0,
    acceleration:0,
    position:{x:100, y:100},
    around:{x:0, y:0},
    gameFrameCounter: 0,
    spriteSheet: spriteSheet,
    frameWidth: 796,
    frameHeight: 719,
    body: {},

    //params
    staggerFrames:5,
    animationName:"runStart",
    isLoopAnimation: true,
    cancelEvent: "", 
    isAutoOffAnimation:true,

    frameCoordinates:frames,

    spriteId:""
}



const test2 = {

    speedX:0,
    speedY:0,
    acceleration:0,
    position:{x:140, y:100},
    around:{x:0, y:0},
    gameFrameCounter: 0,
    spriteSheet: spriteSheet,
    frameWidth: 796,
    frameHeight: 719,
    body: {},

    //params
    staggerFrames:5,
    animationName:"jumpReady",
    isLoopAnimation: true,
    cancelEvent: "", 
    isAutoOffAnimation:true,

    frameCoordinates:frames,

    spriteId:""
}

const canvas=document.getElementById("canvas");
const world= new Universe(canvas)

const chue= new Character(

    {     
        speedX:0,
        speedY:0,
        acceleration:0,
       /*  position:{x:140, y:400}, */
        around:{x:0, y:0},
        /* gameFrameCounter: 0, */
        spriteSheet: spriteSheet,
        frameWidth: 796,
        frameHeight: 719,
       

        //params
        staggerFrames:5,
        animationName:"jumpReady",
        /* isLoopAnimation: false, */
        cancelEvent: "", 
        isAutoOffAnimation:true,

        frameCoordinates:frames,
        controls:controls,
        universe:world,
        positionX:200
    }
)

const rigoberto= new Character(

    {     
        speedX:0,
        speedY:0,
        acceleration:0,
       /*  position:{x:400, y:100}, */
        around:{x:0, y:0},
        /* gameFrameCounter: 0, */
        spriteSheet: spriteSheet,
        frameWidth: 796,
        frameHeight: 719,
       

        //params
        staggerFrames:5,
        animationName:"jumpReady",
        /* isLoopAnimation: false, */
        cancelEvent: "", 
        isAutoOffAnimation:true,

        frameCoordinates:frames,
        controls:controlsWS,
        universe:world,

        positionX:0
    }
)

const willSmith= new Character(

    {     
        speedX:0,
        speedY:0,
        acceleration:0,
       /*  position:{x:400, y:100}, */
        around:{x:0, y:0},
        /* gameFrameCounter: 0, */
        spriteSheet: spriteSheet,
        frameWidth: 796,
        frameHeight: 719,
       

        //params
        staggerFrames:5,
        animationName:"jumpReady",
        /* isLoopAnimation: false, */
        cancelEvent: "", 
        isAutoOffAnimation:true,

        frameCoordinates:frames,
        controls:controlsWS,
        universe:world,

        positionX:400
    }
)





/* world.requestSpriteAnimation(chue) */

world.drawSprites()



const controlOfChue= new Control(chue);
const controlsOfRigoberto= new Control(rigoberto);
const controlsOfWillSmith= new Control(willSmith);
controlsOfRigoberto.hookCharacter("idle", true)
controlOfChue.hookCharacter("idle", true)
controlsOfWillSmith.hookCharacter("idle", true)

rigoberto.configHitbox({x:38, y:22, width:60, height:126, border:3, color:"red"})

chue.configHitbox({x:38, y:22, width:60, height:126})

willSmith.configHitbox({x:38, y:22, width:60, height:126})


/* setInterval(()=>{
    
    console.log(world.stackAnimations)
}, 5000) */