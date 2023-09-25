
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
    tesTPhysicsControl
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
  



/**
 * Esta función mapea una sprite animation sheet y devuelve un objeto que lista las coordenadas correspondientes a cada animación.
 * 
 * @param {...{name: string, frames: number}} actions - Un conjunto de objetos que describe cada animación. Cada objeto debe tener una propiedad `name` que le da nombre a la animación y una propiedad `frames` que indica el número de frames correspondientes a esa animación.
 * @param {object} dimensions - Las dimensiones de los frames en la hoja de animación, especificadas como un objeto con las propiedades `width` (ancho) y `height` (alto).
 * @example
 * // Ejemplo de uso:
 * const animationsFrames = mapFrames(
 *   { name: "idle", frames: 20 },
 *   { dimensions: { width: 796, height: 719 } }
 * );
 * @returns {object} Un objeto con las coordenadas de las distintas animaciones agregadas (run/jump).
 */


export function mapFrames(...actions) {

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






/**
 * Agrupa distintos conjuntos de fotogramas correspondientes a diferentes acciones del personaje.
 * 
 * @param {...(string|Object)} actions - Nombres de las animaciones o conjunto de fotogramas. Debe contener al menos un objeto de configuración con las propiedades `frames` y `animationName`.
 * @example
 * // Ejemplo de uso:
 * const framesGroupJump = groupSetOfFrames(
 *   "jumpReady",
 *   "jumpStart",
 *   "jumpFinish",
 *   { frames: frames, animationName: "jumpGroup" }
 * );
 * @returns {object} Nuevo conjunto de fotogramas o animación resultante con el formato adecuado para la animación.
 */


function groupSetOfFrames(...actions) {
  
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

