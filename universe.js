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


 






    
