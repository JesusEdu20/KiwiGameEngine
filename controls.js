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


export class control{

    constructor(character){
        this.character=character
        
    }

    hookCharacter(){
        
        let isDisplayed=false
        this.character.spriteSheet.getAttribute("isDisplayed")==="false"

        for(const control in this.character.controls){

            const config=this.character.controls[control];
            const startAnimation=config.startAnimation;
            const startEvent=config.startEvent;
            const isLoopStartAnimation=config.startLoop;
            const endAnimation=config.endAnimation;
            const endEvent=config.endEvent;
            const isLoopEndAnimation=config.endLoop;
            const displacementPhysics=config.displacementPhysics
            
            window.addEventListener(startEvent, (e)=>{
                
               /* this.character.acceleration=1.0000002  */
            
                isDisplayed=this.character.spriteSheet.getAttribute("isDisplayed")==="true"? true : false;
                console.log(e.key)

                if(!isDisplayed){
                    if(e.key===control){

                        this.character.animate(5, startAnimation, isLoopStartAnimation, endEvent, true)
                        this.character.spriteSheet.setAttribute("isDisplayed", "true")
                        this.character.speed=2
                        
                        
                        this.character.speedX = displacementPhysics.speedX 
                        this.character.speedY = displacementPhysics.speedY
                        this.character.acceleration=1.0000002
                    }
                    
                   
                }
            })

            window.addEventListener(endEvent, (e)=>{
                
                //colocar switch
                isDisplayed=this.character.spriteSheet.getAttribute("isDisplayed")==="true"? true : false;

                if(isDisplayed){
                    if(e.key===control){

                        this.character.animate(5, endAnimation, isLoopEndAnimation, startEvent, true)
                        this.character.spriteSheet.setAttribute("isDisplayed", "false")

                        this.character.speedX = 0
                        this.character.speedY = 0
                        
                    }

                }    
            })
        }
    }
} 



export class universe{

    constructor(name, canvas, ctx){

        this.name=name
        this.canvasDimensions={x:0, y:0}
        this.maps={}
        this.sprites = [];
        this.canvas=canvas;
        this.ctx=ctx;
        this.renders=[];
    }

    /* setCharacterCoordinatesInUniverse(name, x, y, width, height){

        this.characterCoordinates[name]={x,y,width,height}
    } */

    cleanCanvas=()=>{

        console.log("universe")
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        requestAnimationFrame(this.cleanCanvas)
    }

     detectCollisions(){

        for(let i=0; i<this.sprites.length-1; i++ ){

            const sprite=this.sprites[i];

            for(let j=i+1; j<this.sprites.length; j++){

                const nextSprite=this.sprites[j];

                if( sprite.x > nextSprite.x + nextSprite.width||
                    sprite.x + sprite.width < nextSprite.x ||
                    sprite.y > nextSprite.y + nextSprite.height ||
                    sprite.y + sprite.height < nextSprite.y ){

                    //no collision
                    } else {
                        alert("game over")
                    //collision detected
                    }  
                }
        }

    } 

   /*  saveCoordinatesInUniverse(){
        
        this.
        
    } */

  /*   generateMap(position, name){
      
        const gridWidth=Math.floor(this.canvasDimensions.x/position);
        const grid=[]

        for(let i=0; i < gridWidth.length; i++){
            grid.push(new Array(6))
        }

        this.maps[name]=grid

    } */

        setCanvasSize(decimalPercentage, isResponsive) {
        
            const setSize=()=>{
                
                let elementSize;
            
                if (window.innerWidth > window.innerHeight) {
                    elementSize = window.innerHeight; // Establece el tamaño del elemento como la altura de la ventana
                } else {
                    elementSize = window.innerWidth; // Establece el tamaño del elemento como el ancho de la ventana
                }
            
                // Ajusta el ancho y el alto del elemento en función del porcentaje decimal
                this.canvasDimensions.x= `${elementSize * (decimalPercentage / 100)}px`
                this.canvasDimensions.y= `${elementSize * (decimalPercentage / 100)}px`

                this.canvas.style.width = this.canvasDimensions.x;
                this.canvas.style.height = this.canvasDimensions.y;
            }
        
            setSize()

            if(isResponsive){

                window.addEventListener("resize", () => {
                    
                    setSize();
                });

                window.addEventListener("load", () => {
                
                    setSize();
                });

            }
    
        /* console.log(`Ancho ${(elementSize * (decimalPercentage / 100))}px, Alto ${(elementSize * (decimalPercentage / 100))}px `) */

    }
    
}



/* export class physics extends generateUniverse {
    
    constructor(gravity){
        this.gravity=gravity;
    }

    addPhysicsToCharacter(name){

    }
} */




