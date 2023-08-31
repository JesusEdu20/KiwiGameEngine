const animationQueue = [];

function requestAnimationFrame(callback) {
  // Agregar la función a la cola de animación
  animationQueue.push(callback);
  
  // Devolver un identificador único para esta solicitud de animación
  const id = animationQueue.length - 1;
  return id;
}

function renderAnimationFrame() {
  // Simular el ciclo de renderización del navegador
  for (const callback of animationQueue) {
    callback();
  }
  
  // Vaciar la cola de animación después de ejecutar todas las funciones
  animationQueue.length = 0;
  
  // Repetir en el próximo ciclo de renderización
  setTimeout(renderAnimationFrame, 16); // Simulando 60 FPS
}

// Iniciar el ciclo de renderización
renderAnimationFrame();
