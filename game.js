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

 





/* 

let frameX = 0;
let frameY = 0;


const staggerFrames = 5;
let isRunning = false; // Variable para controlar si la animación está en ejecución

// Función para manejar el evento de tecla presionada
function onKeyDown(event) {     
    if(isRunning==false){
        if (event.key === "ArrowRight") {
            isRunning = true; // Comienza la animación al presionar la tecla de la flecha derecha
            animate(); // Llama a la función animate
        }
    }    
}




// Función para manejar el evento de tecla soltada
function onKeyUp(event) {
    if (event.key === "ArrowRight" && isRunning) {
        isRunning = false; // Detiene la animación al soltar la tecla de la flecha derecha

        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(avatar, 0 * 796, frameY * 719, 796, 719, 0, 0, 200, 200);

        cancelAnimationFrame(idAnimation); // Cancela la animación en ejecución

    }
} */



// Agrega event listeners para los eventos de teclado
/* window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp); */


/** 
 * @param {HTMLImageElement} avatar - animation sprite sheet a renderizar
 * @param {object} avatarDimensions - dimensiones del fotograma en la animation sprite sheet
 * @param {number} staggerFrames - tiempo de ejecucion para cada fotograma
 * @param {string} action - nombre de la accion de la animacion (run, jump)
  */

function animate(avatar, avatarDimensions,  staggerFrames, animationsFrames, action, isLoop,  evento, controls, isTemplate) {

   
    let numberOfFrames=animationsFrames[action].length
    let frames=animationsFrames
    let idAnimation;
    let gameFrame = 0;


    if(isTemplate){
       
        

           for(const control in controls){
            window.addEventListener(evento, (e)=>{
                
                if(e.key==control){
                    cancelAnimationFrame(idAnimation)
                }
            })
           }
    }

      
    function startAnimation(){

        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                // Solo realiza la animación si isRunning es true

                let position = Math.floor(gameFrame / staggerFrames) % numberOfFrames;
                let frameX = position;

                ctx.drawImage(avatar, frames[action][frameX].codX, frames[action][frameX].codY, avatarDimensions.width, avatarDimensions.height, 0, 0, 200, 200);
                gameFrame++;

                if (isLoop || position < numberOfFrames - 1) {
                    idAnimation = requestAnimationFrame(startAnimation);
                }               
    }

            idAnimation= startAnimation()

}


const frames=mapFrames({ name:"idle", frames: 20}, { name:"runReady", frames: 11}, 
{ name:"runStart", frames: 19}, { name:"runFinish", frames: 11}, { name:"jumpReady", frames: 11},
{ name:"jumpStart", frames: 11}, { name:"jumpFinish", frames: 11}, { name:"ok", frames: 19}, 
{ name:"punch", frames: 10},
{dimensions:{width:796, height:719}})

let framesGroupJump=groupSetOfFrames("jumpReady", "jumpStart", "jumpFinish", {frames: frames, animationName:"jumpGroup"})


 /** 
  * Agrupa los distintos conjuntos de fotogramas,  correspondiendo cada uno de estos conjuntos a una accion determinada del personaje como (jumpReady) para formar acciones completas a partir de otras acciones;
  * @param {Array} actions - array con los  nombres de las acciones mapeadas en la funcion  (mapFrames) llevando en el ultimo indice un objeto con la propiedad frame para guardar la colleccion de frames resultantes de la funcion  (mapFrames)

 */
 function groupSetOfFrames(...actions){

    let animationFrames={}

    const config=actions.find(elem=> elem.hasOwnProperty("frames"))
    const name= config.animationName
    const frames = config.frames;
    const group= actions.filter(elem=> typeof elem==="string");
    
    let run=[]

    for (let i=0; i < group.length ; i++){

        run.push(frames[group[i]]);
        const flattenedArray = run.flatMap(innerArray => innerArray);
        animationFrames[name]=flattenedArray
    }

    console.log(animationFrames)
    return animationFrames
}




/** 
 * @param {string} url - ruta de la animation Sprite sheet
 * 
 * 
  */
    
    const controls= {
        ArrowUp: ["jumpStart","keydown", false, "jumpFinish", "keyup", false],
        ArrowRight: ["runStart","keydown", true, "idle", "keyup", true],
        ArrowLeft:["punch","keydown", false, "ok", "keyup", false]
        
    }

    function animateCharacter(url, widthFrame, heightFrame, stagger, frames, controls){
        const avatar= new Image();
        avatar.setAttribute("isDisplayed", false);
        avatar.src=url
       
        //controls
        const staggerFrames = stagger;
        
        // set controls
        for(const control in controls){
            
            const config=controls[control];
            const animacion=config[0];
            const animacionCierre=config[3];
            const evento=config[1];
            const eventoCierre=config[4];
            const isStartAnimationloop=config[2];
            const isEndAnimationloop=config[5];

           /*  let playAnimation; */
            let idAnimation;
            let isDisplayed=false
             
            window.addEventListener(evento, (e)=>{

                if(e.key===control){
                    
                isDisplayed=avatar.getAttribute("isDisplayed")==="true"? true : false;
                    

                if(isDisplayed===false){

                    console.log("play init animation")
                    idAnimation=animate(avatar, {width: widthFrame, height:heightFrame}, staggerFrames, frames, animacion, isStartAnimationloop, eventoCierre, controls, isTemplate);
                    

                    avatar.setAttribute("isDisplayed", "true");

                }

                }
            })

            window.addEventListener(eventoCierre,(e)=>{
                
                if(e.key===control){

                isDisplayed=avatar.getAttribute("isDisplayed")==="true"? true : false;
               
                if(isDisplayed){
                idAnimation=animate(avatar, {width: widthFrame, height:heightFrame}, staggerFrames, frames, animacionCierre, isEndAnimationloop, evento, controls, isTemplate); 

                console.log(evento)
                 avatar.setAttribute("isDisplayed", "false");
                }

                }

                
            })            
            
        }

    }
    

    animateCharacter("./animations/1x/Artboard-1.png", //sprite animation sheet
    796, //dimensions
    719, //
     5,  // stagger
     frames, // frames
     controls // controles
     );




/**
 * @param {object} actions - objetos con el nombre de la accion a animar y la cantidad de fotogramas
 * @returns {object} - objeto el cual guarda las distintas acciones (run/jump) en arreglos guardando las   cordenadas en X,Y 
 * @example - 
 * ejemplo de uso 
 * const result=mapFrames(
    { name:"Run", frames:18 },
    {name:"jump", frames:15} 
    { dimensions:{width:796, height:719}}
    );

 * console.log(mapFrames(result));
 * output: 
 * {
  Run: [
    { codX: 0, codY: 0 },
    { codX: 796, codY: 0 },
    { codX: 1592, codY: 0 },
    { codX: 2388, codY: 0 },
    { codX: 3184, codY: 0 },
  }
 */

function mapFrames(...actions){

    const dimensionsFrame=actions.find(elem=> elem.hasOwnProperty("dimensions"));
    const animationsState=actions.filter(frames=> frames.hasOwnProperty("frames"));

      
    const animationsFrames={}
   


    animationsState.forEach((state, index)=>{

        let animationName=state.name
        animationsFrames[animationName]=[]

        
        for(let i=0; i<state.frames; i++){

            let codX=i * dimensionsFrame.dimensions.width;
            let codY=index * dimensionsFrame.dimensions.height;  

            animationsFrames[animationName].push({codX, codY});   
        }  
    })

    return animationsFrames
}








const flechas={

    arrowUp: 38,
    arrowDown: 40,
    arrowRight:39,
    arrowLeft:37,
 
}




/* window.addEventListener("keydown", function(event){
   
    switch (event.keyCode) {

        case flechas.arrowUp:
            
        break;
        
        case flechas.arrowDown:
             
        break;

        case flechas.arrowLeft:
            
        break;

        case flechas.arrowRight:
            
        break;

    }
})

 */