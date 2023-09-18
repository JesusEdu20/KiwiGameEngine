
/**
 * Función para animar un personaje en un canvas utilizando una hoja de sprites.
 *
 * @param {HTMLImageElement} avatar - Hoja de sprites de la animación a renderizar.
 * @param {object} avatarDimensions - Dimensiones de cada fotograma en la hoja de sprites.
 * @param {number} staggerFrames - Tiempo de ejecución para cada fotograma de la animación.
 * @param {object} frames - Lista de objetos que contienen las coordenadas (coX y coY) de todos los fotogramas que componen la animación.
 * @param {string} action - Nombre de la acción de la animación (por ejemplo, "run" o "jump").
 * @param {boolean} isLoop - Indica si la animación debe repetirse en bucle.
 * @param {string} evento - Evento que detendrá la animación.
 * @param {object} controls - Configuración de los controles para la animación.
 * @param {boolean} isTemplate - Indica si se deben establecer eventos para los controles anexados con el propósito de cancelar la animación en curso.
 * @param {HTMLCanvasElement} canvas - Objeto canvas donde se renderizará el personaje.
 * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas.
 */
export function animate(
    avatar,
    avatarDimensions,
    staggerFrames,
    frames,
    action,
    isLoop,
    evento,
    controls,
    isTemplate,
    canvas,
    ctx, 
    
  ) {
    
    let numberOfFrames=frames[action].length
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


 export class character{

    constructor(frameWidth, frameHeight, spriteSheet, frameCoordinates, canvas, ctx, controls, universe ){

        this.frameWidth=frameWidth;
        this.frameHeight=frameHeight;
        this.spriteSheet=spriteSheet;
        this.frameCoordinates=frameCoordinates;
        this.controls=controls;
        this.canvas=canvas;
        this.ctx=ctx;
        this.speedX=0;
        this.speedY=0;
        this.acceleration=0;
        this.around={x:0, y:this.canvas.height-800};
        this.position={x:0, y:this.around.y};
        this.body={width:this.position.x+36, height:150};
        this.universe=universe;
        this.spriteId=`${this.universe.sprites.length}${Date.now()}` 
        
    }

    updateCoordinatesInUniverse=(x, y, width, height)=>{

        const sprites=this.universe.sprites;
        const coordinatesObject = sprites.find(sprite=> sprite.id===this.spriteId)
        
        if(!coordinatesObject){

            sprites.push({id:this.spriteId, x, y, width, height})
        }
        else{

            coordinatesObject.x=x;
            coordinatesObject.y=y; 
        }

    }

    animate(
       
        staggerFrames,
        animationName,
        isLoopAnimation,
        cancelEvent,
        isAutoOffAnimation
       
      ) {
        
        let numberOfFrames=this.frameCoordinates[animationName].length
        let idAnimation;
        let gameFrame = 0;
        
        if(isAutoOffAnimation){
    
               for(const control in this.controls){
                
                    window.addEventListener(cancelEvent, (e)=>{
                        
                        if(e.key==control){
                            cancelAnimationFrame(idAnimation)
                        }
                    })
            }
        }

        
        const startAnimation=()=>{  

           /*  this.updateCoordinatesInUniverse(this.position.x, this.position.y, this.body.width, this.body.height) */
           console.log(this.universe.sprites)
           
           this.speedY+=this.acceleration
           
           if((this.position.y + this.speedY) > this.around.y){
               
               this.speedY=0
               this.position.y=this.around.y
               
            }
            
            this.position.y+=this.speedY;
            this.position.x+=this.speedX;

            //coordinates of hitbox
            this.updateCoordinatesInUniverse(this.position.x+36, this.position.y+26, 60, 126)
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.ctx.fillRect(400, 0, 100, 100)
                    this.ctx.fillRect(this.position.x+36, this.position.y+26, 60, 126);

                    let position = Math.floor(gameFrame / staggerFrames) % numberOfFrames;
                    let frameX = position;

                    this.ctx.drawImage(this.spriteSheet, this.frameCoordinates[animationName][frameX].codX, this.frameCoordinates[animationName][frameX].codY, this.frameWidth, this.frameHeight, this.position.x, this.position.y, 150, 150);
                    gameFrame++;
                    
    
                    if (isLoopAnimation || position < numberOfFrames - 1) {
                        idAnimation = requestAnimationFrame(startAnimation);
                    }     

        }
            this.universe.detectCollisions()
            idAnimation= startAnimation()
    
    }
    
  }

  // animationName, isLoopAnimation ,  staggerFrames,