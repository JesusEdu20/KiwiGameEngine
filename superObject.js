    export class Universe{

        constructor(canvas, ctx){

            this.stackAnimations=[];
            this.canvas=canvas;
            this.ctx=this.canvas.getContext("2d");
        }

        drawSprites=()=>{

            //limpieza del canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            this.stackAnimations.forEach(request => {
                
                const animationName= request.animationName;
                const staggerFrames= request.staggerFrames;
              
                const spriteSheet= request.spriteSheet;
                const frameCoordinates= request.frameCoordinates;
                const frameWidth = request.frameWidth;
                const frameHeight = request.frameHeight;
                const position = request.position;
                const numberOfFrames=frameCoordinates[animationName].length;
                const isLoopAnimation= request.isLoopAnimation;
                let frame= request.frame;
                let speedY= request.speedY;
                const speedX=request.speedX
                const acceleration= request.acceleration;
                const around=request.around;

                //gravedad RECORDAR EXTRAER EN UNA METODO APARTE
                
                request.speedY+=acceleration
                
                
                if((position.y + speedY) > around.y){
                    
                    speedY=0
                    position.y=around.y
                    
                }
               
                //desplazamiento
                position.y+=speedY;
                position.x+=speedX;

                
                //seleccionar frame
                if( isLoopAnimation || frame != numberOfFrames-1){

                    //dibujar siguiente frame
                    frame = Math.floor(request.gameFrameCounter / staggerFrames) % numberOfFrames;
                    request.frame=frame;
                }
                else{

                    //dibujar ultimo frame de la lista de frames
                    request.frame=frame;

                }

                //debugHitbox
                if(request.isDebugHitbox){

                    const hitBox=request.readHitbox(position.x, position.y);
                    this.ctx.strokeStyle=hitBox.color;
                    this.ctx.lineWidth= hitBox.border;
                    this.ctx.strokeRect(hitBox.x, hitBox.y, hitBox.width, hitBox.height);
                }

               

                //Dibujar sprite
                this.ctx.drawImage(spriteSheet, frameCoordinates[animationName][frame].codX, frameCoordinates[animationName][frame].codY, frameWidth, frameHeight, position.x, position.y, 150, 150);

               
                request.gameFrameCounter++;
                
            }); 

            
            this.detectCollisions()
            requestAnimationFrame(this.drawSprites)
            
        }

        requestSpriteAnimation(request){

            this.stackAnimations.push(request)
        }

        removeSpriteAnimation(id){

            const index=this.stackAnimations.findIndex((request)=> id===request.spriteId)
            this.stackAnimations.splice(index,1)
            
        }

        detectCollisions(){

        
            for(let i=0; i<this.stackAnimations.length-1; i++ ){
    
                const sprite=this.stackAnimations[i];
                const hitBox=sprite.readHitbox(sprite.position.x, sprite.position.y);
                
                /* this.ctx.fillRect(hitBox.x, hitBox.y, hitBox.width, hitBox.height) */
                
                for(let j=i+1; j<this.stackAnimations.length; j++){
                   
                    const nextSprite=this.stackAnimations[j];
                    const nextHitBox=sprite.readHitbox(nextSprite.position.x, nextSprite.position.y);

                    /* this.ctx.fillRect(nextHitBox.x, nextHitBox.y, nextHitBox.width, nextHitBox.height) */
    
                    if( hitBox.x > nextHitBox.x + nextHitBox.width||
                        hitBox.x + hitBox.width < nextHitBox.x ||
                        hitBox.y > nextHitBox.y + nextHitBox.height ||
                        hitBox.y + hitBox.height < nextHitBox.y ){
                        
                           
                        //no collision 
                        } else {
                            
                            alert("gameover")
                        //collision detected
                           
                        }  

                       
                }
            }
    
        } 
    }


    /* 
                    sprite.x > nextSprite.x + nextSprite.width||
                    sprite.x + sprite.width < nextSprite.x ||
                    sprite.y > nextSprite.y + nextSprite.height ||
                    sprite.y + sprite.height < nextSprite.y 
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
                    
                   /* this.character.acceleration=1.0000002  */
                
                    isDisplayed=this.character.spriteSheet.getAttribute("isDisplayed")==="true"? true : false;
                    
    
                    if(!isDisplayed){

                        if(e.key===control){
    
                            /* incorporar solicitud de animacion a la lista */
                            console.log("salta")
                            
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

                            console.log("deja de saltar")
                            this.character.spriteSheet.setAttribute("isDisplayed", "false")
                            this.character.speedX = 0;
                            this.character.speedY = 0;
                            
                        }
    
                    }    
                })
            }
        }
    } 
    



    
export class Character{

    constructor({

            speedX, 
            speedY, 
            
            acceleration,
            
            /* gameFrameCounter,  */
            spriteSheet, 
            frameWidth, 
            frameHeight, 
            
            staggerFrames,
            animationName, 
            isLoopAnimation, 
            cancelEvent, 
            isAutoOffAnimation,
            frameCoordinates,
            controls,
            universe,
            positionX
             }){

        this.speedX=speedX;
        this.speedY=speedY;
        /* this.position=position; */
        this.acceleration=acceleration;
        this.gameFrameCounter=0;
        this.spriteSheet= spriteSheet;
        this.frameWidth= frameWidth;
        this.frameHeight= frameHeight;
       
        this.staggerFrames= staggerFrames;
        this.animationName=animationName;
        this.isLoopAnimation= false;
        this.cancelEvent=cancelEvent;
        this.isAutoOffAnimation=isAutoOffAnimation;
        this.frameCoordinates=frameCoordinates;
        this.controls=controls;
        this.spriteId=Date.now();
        this.universe=universe
        this.frame=0;
        this.around={x:0, y:this.universe.canvas.height-400};
        this.position={x:positionX, y:this.around.y};
        this.hitBox={x:0, y:0, width:0, height:0, color:undefined, border:undefined};
        this.isDebugHitbox=false;

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

    configHitbox({x, y, width, height, border, color}){

        this.hitBox={
                    x, 
                    y, 
                    width, 
                    height,
                    border: border ?? 1,
                    color: color ?? "black"
                }

    }

    readHitbox(positionX, positionY){
    
        return {x: positionX + this.hitBox.x,
                y: positionY + this.hitBox.y, 
                width: this.hitBox.width, 
                height: this.hitBox.height,
                border: this.hitBox.border,
                color: this.hitBox.color
            }
            
    }

   
}