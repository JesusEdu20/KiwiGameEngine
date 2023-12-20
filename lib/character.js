export class Character{

    constructor({

            speedX, 
            speedY, 
            acceleration,
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
            positionX,
            width,
            height,
            type,
             }){

        this.spriteId=Date.now() + (Math.floor(Math.random() * 10));
        this.speedX= speedX || 0;
        this.speedY= speedY || 0;
        
        this.acceleration= 0;
        this.gameFrameCounter=0;
        this.spriteSheet= spriteSheet;
        this.frameWidth= frameWidth;
        this.frameHeight= frameHeight;
       
        this.staggerFrames= staggerFrames || 5;
        this.animationName=animationName;
        this.isLoopAnimation= false;
        this.cancelEvent=cancelEvent;
        this.isAutoOffAnimation=isAutoOffAnimation;
        this.frameCoordinates=frameCoordinates;
        this.controls=controls;
        this.universe=universe
        this.frame=0;
        /* this.around={x:0, y:this.universe.canvas.height-400, width:200, height: this.universe.canvas.height}; */
        this.hitBox=undefined;
        this.isDebugHitbox=false;
        this.isVisibleHitbox = false;
        this.width=width,
        this.height=height
        this.position={x:positionX, y:0};
        this.type=type;
        this.collisionActionStack=[];
        this.behaviorStack=[];

    }

    configHitbox({width, height, border, color, positionX, positionY}){

        this.hitBox={
                    x:0, 
                    y:0,
                    positionX,
                    positionY,
                    width, 
                    height,
                    border: border ?? 1,
                    color: color ?? "black",
                   
                }
                
    }

    readHitbox(spritePositionX, spritePositionY){
    
            this.hitBox.x=spritePositionX + this.hitBox.positionX;
            this.hitBox.y=spritePositionY + this.hitBox.positionY;
            
    }
   
}


