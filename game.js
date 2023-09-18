import {animateCharacter, control, universe} from "./controls.js"
import { animate, mapFrames } from "./animations.js";

import { character } from "./objectAnimation.js";


const frames=mapFrames({ name:"idle", frames: 20}, { name:"runReady", frames: 11}, 
{ name:"runStart", frames: 19}, { name:"runFinish", frames: 11}, { name:"jumpReady", frames: 11},
{ name:"jumpStart", frames: 11}, { name:"jumpFinish", frames: 11}, { name:"ok", frames: 19}, 
{ name:"punch", frames: 10},
{dimensions:{width:796, height:719}}) 

const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
const world = new universe("RigobertoWorld", canvas, ctx);
world.setCanvasSize(90, true);

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




const spriteSheet= new Image()
spriteSheet.src="./animations/1x/Artboard-1.png"



const rigoberto = new character(796, 719, spriteSheet, frames, canvas, ctx, controls, world)
/* const willSmith= new character(796, 719, spriteSheet, frames, canvas, ctx, controlsWS, world); */


const controlsOfRigoberto = new control(rigoberto);
/* const controlsOfWillSmith = new control(willSmith); */

controlsOfRigoberto.hookCharacter()
/* controlsOfWillSmith.hookCharacter() */

world.sprites.push({
    x: 400,
    y: 0,
    width:100,
    height:100,
})







