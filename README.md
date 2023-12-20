# Kiwi Game Tools

A comprehensive toolkit for building interactive games on the client-side using JavaScript.

## Features

- **Character Module:** Provides a flexible class to create and manage game characters with various attributes such as speed, sprite sheets, animations, and controls.
  
- **Control Module:** Offers methods for handling character controls, initiating animations, and toggling display status based on user-defined events.

- **Universe Module:** Manages the game environment, including canvas rendering, sprite animations, collision detection, gravity simulation, and map generation.

## Installation
`npm install kiwi-game-tools`


## Usage

### Character Module

#### Constructor Options

- `speedX`: Horizontal speed of the character.
- `speedY`: Vertical speed of the character.
- `acceleration`: Acceleration of the character.
- `spriteSheet`: URL of the sprite sheet image.
- ... (additional options)

````javascript
import { Character } from 'kiwi-game-tools';

const player = new Character({
  speedX: 5,
  speedY: 5,
  spriteSheet: 'path/to/sprite.png',
  // Add more options as needed
});
````


### Control Module

````javascript
import { Control } from 'kiwi-game-tools';

const controls = new Control(player);

controls.hookCharacter('defaultAnimation', true);
````


### Universe Module
````javascript
import { Universe } from 'kiwi-game-tools';

const canvas = document.getElementById('game-canvas');
const game = new Universe(canvas);

game.drawSprites();
````

#### License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.


