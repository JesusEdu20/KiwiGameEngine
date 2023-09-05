import {animateCharacter} from "./controls.js"
import { animate, mapFrames } from "./animations.js";



// Obtiene el elemento canvas del DOM con el ID "canvas"
const canvas = document.getElementById("canvas");

// Obtiene el contexto 2D del canvas para realizar dibujos en él
const ctx = canvas.getContext("2d");


/**
 * Ajusta el tamaño de un elemento HTML en función de un porcentaje decimal.
 * @param {HTMLElement} element - El elemento HTML cuyo tamaño se ajustará.
 * @param {number} decimalPercentage - El porcentaje decimal para ajustar el tamaño.
 */
const setElementSize = (element, decimalPercentage) => {
    let elementSize;

    // Comprueba si el ancho de la ventana es mayor que su altura
    if (window.innerWidth > window.innerHeight) {
        elementSize = window.innerHeight; // Establece el tamaño del elemento como la altura de la ventana
    } else {
        elementSize = window.innerWidth; // Establece el tamaño del elemento como el ancho de la ventana
    }

    // Ajusta el ancho y el alto del elemento en función del porcentaje decimal
    element.style.width = `${elementSize * (decimalPercentage / 100)}px`;
    element.style.height = `${elementSize * (decimalPercentage / 100)}px`;
}



//* / Agrega un evento de escucha al objeto window para detectar cambios en el tamaño de la ventana
window.addEventListener("resize", () => {
    // Cuando ocurre el evento "resize", llama a la función setElementSize para ajustar el tamaño del canvas al 70% de la ventana
    setElementSize(canvas, 90);
});

window.addEventListener("load", () => {
    // Cuando ocurre el evento "resize", llama a la función setElementSize para ajustar el tamaño del canvas al 70% de la ventana
    setElementSize(canvas, 90);
});

 






const frames=mapFrames({ name:"idle", frames: 20}, { name:"runReady", frames: 11}, 
{ name:"runStart", frames: 19}, { name:"runFinish", frames: 11}, { name:"jumpReady", frames: 11},
{ name:"jumpStart", frames: 11}, { name:"jumpFinish", frames: 11}, { name:"ok", frames: 19}, 
{ name:"punch", frames: 10},
{dimensions:{width:796, height:719}})



const controls = {
    ArrowUp: {
        startAnimation:"jumpStart",
        startEvent: "keydown",
        startLoop: false,
        endAnimation: "jumpFinish",
        endEvent: "keyup",
        endLoop: false,
    },
    ArrowRight: {
        startAnimation:"runStart",
        startEvent: "keydown",
        startLoop: true,
        endAnimation: "idle",
        endEvent: "keyup",
        endLoop: true,
    },
    ArrowLeft: {
        startAnimation: "punch",
        startEvent: "keydown",
        startLoop: false,
        endAnimation:"ok",
        endEvent: "keyup",
        endLoop: false,
    },
};



    animateCharacter("./animations/1x/Artboard-1.png", //sprite animation sheet
    796, //dimensions
    719, //
     5,  // stagger
     frames, // frames
     controls,
     animate,
     canvas, 
     ctx
     );



















   