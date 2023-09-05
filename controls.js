/**  
 * Funcion para desplegar un personaje en un canvas utilizando una hoja de sprites, la cual permite indicar
 * eventos del DOM como controles o disparadores de cada animacion dispuesta en la hoja de sprites, implementando
 * la logica necesaria para controlar el personaje desplegado.
 * 
 * @param {string} url - Direccion URL de la hoja de sprites
 * @param {number} widthFrame - Ancho del fotograma en la hoja de sprites.
 * @param {number} heightFrame - Alto del fotograma en la hoja de sprites.
 * @param {number} stagger - Tiempo de ejecución para cada fotograma de la animación.
 * @param {object} frames - Objeto con listas de objetos que contienen las coordenadas (coX y coY) de todos los fotogramas que componen la animación.
 * @param {Object} controls - Configuración de los controles para la animación.
 * @param {function} animate - Funcion encargada de animar la hoja de sprites en el canvas
 * @param {HTMLCanvasElement} canvas - Objeto canvas donde se renderizará el personaje.
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas.
 * 
*/

export function animateCharacter(url, widthFrame, heightFrame, stagger, frames, controls, animate, canvas, ctx) {
    const avatar = new Image();
    avatar.setAttribute("isDisplayed", false);
    avatar.src = url;

    const staggerFrames = stagger;

    initAnimation(avatar, widthFrame, heightFrame, staggerFrames, frames, controls, animate, canvas, ctx);
}



function initAnimation(avatar, widthFrame, heightFrame, staggerFrames, frames, controls, animate, canvas, ctx) {
    //controls
  
    
    // set controls
    for(const control in controls){
        

        const config=controls[control];
        const startAnimation=config.startAnimation;
        const startEvent=config.startEvent;
        const startLoop=config.startLoop;
        const endAnimation=config.endAnimation;
        const endEvent=config.endEvent;
        const endLoop=config.endLoop;


   
        let isDisplayed=false
         
      
    window.addEventListener(startEvent, (e) => {
        if (e.key === control) {
            const isDisplayed = avatar.getAttribute("isDisplayed") === "true";
            if (!isDisplayed) {
                
                animate(avatar, { width: widthFrame, height: heightFrame }, staggerFrames, frames, startAnimation, startLoop, endEvent, controls, true, canvas, ctx);
                avatar.setAttribute("isDisplayed", "true");
            }
        }
    });

   
    
    window.addEventListener(endEvent, (e) => {
        if (e.key === control) {
            const isDisplayed = avatar.getAttribute("isDisplayed") === "true";
            if (isDisplayed) {
                 animate(avatar, { width: widthFrame, height: heightFrame }, staggerFrames, frames, endAnimation, endLoop, startEvent, controls, true, canvas, ctx);
              
                avatar.setAttribute("isDisplayed", "false");
            }
        }
    });
        
    }


}




/**  
 
@Example - controls

const control = {
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




 **/