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
