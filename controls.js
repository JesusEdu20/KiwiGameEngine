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

export class Control{
    
    constructor(character){

        this.character=character
        
    }

    hookCharacter(defaultAnimationName, isDebugHitbox){

        this.character.animationName=defaultAnimationName;
        this.character.isDebugHitbox=isDebugHitbox;
        
        this.character.universe.requestSpriteAnimation(this.character)

        console.log("initHook")
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
                
            
            
                isDisplayed=this.character.spriteSheet.getAttribute("isDisplayed")==="true"? true : false;
                

                if(!isDisplayed){

                    if(e.key===control){

                        /* incorporar solicitud de animacion a la lista */
                        
                        this.character.frame=0
                        this.character.animationName=startAnimation;
                        this.character.isLoopAnimation=isLoopEndAnimation;
                       

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

                       /* incorporar solicitud de animacion a la lista */
                       this.character.frame=0;
                       this.character.animationName=endAnimation;
                       this.character.isLoopAnimation=isLoopEndAnimation;

                    
                        this.character.spriteSheet.setAttribute("isDisplayed", "false")
                        this.character.speedX = 0;
                        this.character.speedY = 0;
                        
                    }

                }    
            })
        }
    }
} 


















