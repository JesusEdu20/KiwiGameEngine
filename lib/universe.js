    export class Universe{

        constructor(canvas){

            this.stackAnimations=[];
            this.canvas=canvas;
            this.ctx=this.canvas.getContext("2d");
            this.physics = {gravity:1.0000002};
            this.maps={};
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
                

                this.executeBehaviorStack(request)

                //Physics

                this.activePhysics(request)
                
            

                /* this.ctx.fillRect(request.position.x, request.position.y,  request.width, request.height) */

                /* this.ctx.fillRect(request.around.x, request.around.y, request.around.width, 1) */
                
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

                    request.readHitbox(position.x, position.y);

                    if(request.isVisibleHitbox){

                        const hitBox=request.hitBox
                        this.ctx.strokeStyle=hitBox.color;
                        this.ctx.lineWidth= hitBox.border;
                        this.ctx.strokeRect(hitBox.x, hitBox.y, hitBox.width, hitBox.height);
                    }
                }

                
                //Dibujar sprite
                this.ctx.drawImage(spriteSheet, frameCoordinates[animationName][frame].codX, frameCoordinates[animationName][frame].codY, frameWidth, frameHeight, position.x, position.y, request.width, request.height);

               
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
                if(sprite.hitBox===undefined) continue;
/*                 console.log(this.stackAnimations[i].type)
 */                /* const hitBox=sprite.readHitbox(sprite.position.x, sprite.position.y) */;
                
                
                for(let j=i+1; j<this.stackAnimations.length; j++){
/*                     console.log(this.stackAnimations[j].type)
 */
                    const nextSprite=this.stackAnimations[j];
                    if(nextSprite.hitBox===undefined) continue;

                    /* const nextHitBox=nextSprite.readHitbox(nextSprite.position.x, nextSprite.position.y); */

                    /* this.ctx.fillRect(nextHitBox.x, nextHitBox.y, nextHitBox.width, nextHitBox.height) */
                    const hitBox=sprite.hitBox;
                    const nextHitBox=nextSprite.hitBox;


                    if( hitBox.x > nextHitBox.x + nextHitBox.width|| //derecha
                        hitBox.x + hitBox.width < nextHitBox.x || //izquierda
                        hitBox.y > nextHitBox.y + nextHitBox.height || //abajo
                        hitBox.y + hitBox.height < nextHitBox.y ){ //arriba
                        
                        //no collision 

                            if(sprite.type=="map" || nextSprite.type=="map"){
                                
                                
                                const player= sprite.type=="player"? sprite : nextSprite;
                                const obstacle = sprite.type=="map"? sprite : nextSprite;

                               
                                
                                if(player.hitBox.y + player.hitBox.height <= obstacle.hitBox.y
                                    && player.hitBox.y + player.hitBox.height + player.speedY >= obstacle.hitBox.y
                                    
                                    && player.hitBox.x + player.hitBox.width > obstacle.hitBox.x
                                    && player.hitBox.x < obstacle.hitBox.x + obstacle.hitBox.width){

                                        console.log("aterrizaje perfecto")
                                        player.speedY=0;
                                       
                                }

                                
                                
                            }

                            

                        } else {

                        //collision detected
                           
                        if(sprite.type=="map" || nextSprite.type=="map"){

                            const player= sprite.type=="player"? sprite : nextSprite;
                            const obstacle = sprite.type=="map"? sprite : nextSprite;

                            if(player.hitBox.y + player.hitBox.height >= obstacle.hitBox.y
                                && player.hitBox.y + player.hitBox.height + player.speedY >= obstacle.hitBox.y
                                
                                && player.hitBox.x + player.hitBox.width > obstacle.hitBox.x
                                && player.hitBox.x < obstacle.hitBox.x + obstacle.hitBox.width){
                                 
                                player.speedX=0;
                                player.position.x= obstacle.hitBox.x - obstacle.width
                                
                              
                             }

                        }

                            sprite.collisionActionStack.forEach(action=>{
                                action(nextSprite)
                            })

                            nextSprite.collisionActionStack.forEach(action=>{
                                action(sprite)
                            })

                            console.log("colision")
                    
                        }  
                }
            }
        } 


        activePhysics (request){

            const acceleration = request.acceleration;
            const around = request.around;
            const position = request.position;
            let speedY = request.speedY;
            let speedX = request.speedX;

            request.speedY+=acceleration
            
            position.y+=speedY;
            position.x+=speedX;
            
        }

        setCanvasSize = (element, decimalPercentage) => {

             // Comprueba si el ancho de la ventana es mayor que su altura
            let elementSize= window.innerWidth> window.innerHeight? window.innerHeight : window.innerWidth;
           
            // Ajusta el ancho y el alto del elemento en función del porcentaje decimal
            element.style.width = `${elementSize * (decimalPercentage / 100)}px`;
            element.style.height = `${elementSize * (decimalPercentage / 100)}px`;

            
        }


        activeCanvasResponsive(decimalPercentage){

             //* / Agrega un evento de escucha al objeto window para detectar cambios en el tamaño de la ventana
             window.addEventListener("resize", () => {
                // Cuando ocurre el evento "resize", llama a la función setElementSize para ajustar el tamaño del canvas al 70% de la ventana
                this.setCanvasSize(this.canvas, decimalPercentage);
            });
            
            window.addEventListener("load", () => {
                // Cuando ocurre el evento "resize", llama a la función setElementSize para ajustar el tamaño del canvas al 70% de la ventana
                this.setCanvasSize(this.canvas, decimalPercentage);
            });
        }


        playMap(mapName){

            const map=this.maps[mapName]
           
            map.forEach(elements=>{

                this.requestSpriteAnimation(elements)
            })
           
        }

        executeBehaviorStack(request){
            
            request.behaviorStack.forEach(action=>{
                action(request)
            })
        }

        mapFrames(...actions) {

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
        

    }


 






    
    
    
    
    
 
     