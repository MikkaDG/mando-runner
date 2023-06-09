import '../css/style.css';
import {Actor, Engine, Label, Physics, Vector} from 'excalibur';
import {Resources, ResourceLoader} from './resources.js';
import {RunMando} from './runmando.js';
import {Start} from './start.js';
import {GameOver} from './gameover.js';
import {Pause} from './pause.js';

export class Game extends Engine {

    constructor() {
        super({
            width: 1500,
            height: 820
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        localStorage.setItem('scores', '[]');
        this.addScene('start', new Start());
        this.addScene('runmando', new RunMando());
        this.addScene('gameover', new GameOver());
        this.addScene('pause', new Pause());

        this.goToScene('start');


    }

    onPreUpdate(_engine, _delta) {
        console.log(this.currentScene.actors.length);
    }
}

new Game();