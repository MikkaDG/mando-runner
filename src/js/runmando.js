import '../css/style.css';
import {Actor, Color, Engine, Events, Font, FontUnit, Input, Label, Physics, Scene, TextAlign, Vector} from 'excalibur';
import {Resources, ResourceLoader} from './resources.js';
import {Mando} from './mando.js';
import {Ground} from './ground.js';
import {Background} from './background.js';
import {Stormtrooper} from './stormtrooper.js';
import {Ground2} from './ground2.js';
import {Ceiling} from './ceiling.js';
import {DarthVader} from './darthvader.js';
import {Bullet} from './bullet.js';

export class RunMando extends Scene {
    scoreLabel;
    livesLabel;
    lives;
    darthvaderLives = 3;
    scores = [];


    onInitialize(engine) {

        Physics.gravity = new Vector(0, 600);
        this.game = this.engine;

        const background = new Background();
        this.add(background);

        this.score = 0;
        this.scoreLabel = new Label({
            text: 'SCORE: ' + this.score,
            pos: new Vector(50, 80),
            color: Color.Yellow,
            font: new Font({
                family: 'impact',
                size: 50,
                unit: FontUnit.Px
            })
        });
        this.add(this.scoreLabel);

        const ground = new Ground();
        this.add(ground);

        const ground2 = new Ground2();
        this.add(ground2);

        const ceiling = new Ceiling();
        this.add(ceiling);

        const player = new Mando(250, 600);
        this.add(player);

        this.lives = 3;
        this.livesLabel = new Label({
            text: 'LIVES: ' + this.lives,
            pos: new Vector(1300, 80),
            color: Color.Yellow,
            font: new Font({
                family: 'impact',
                size: 50,
                unit: FontUnit.Px
            })
        });
        this.add(this.livesLabel);

        player.on('collisionstart', (event) => {
            if (event.other instanceof Stormtrooper) {
                player.pos = new Vector(250, 400);
                this.lives--;
                this.updateLivesLabel();
                if (this.lives <= 0) {
                    player.kill();
                    engine.goToScene('gameover');
                    this.scores.push(this.score);
                    this.scores.sort((a, b) => b - a);
                    localStorage.setItem('scores', JSON.stringify(this.scores));
                }
            }
            if (event.other instanceof DarthVader) {
                player.kill();
                this.lives = 0;
                this.updateLivesLabel();
                engine.goToScene('gameover');
                this.scores.push(this.score);
                this.scores.sort((a, b) => b - a);
                localStorage.setItem('scores', JSON.stringify(this.scores));
            }
        });
        if (player.pos.y > 900) {
            player.kill();
        }

        if (player.isKilled()) {
            console.log(this.scores)
            this.scores.push(this.score);
            this.scores.sort((a, b) => b - a);
            localStorage.setItem('scores', JSON.stringify(this.scores));
            engine.goToScene('gameover');

        }


        // this.game.input.gamepads.on('connect', function (event) {
        //     console.log('Gamepad connected');
        // });
        //
        // this.game.input.gamepads.on('disconnect', function (event) {
        //     console.log('Gamepad disconnected');
        // });
        //
        // this.game.input.gamepads.on('button.press', function (event) {
        //     if (this.game.button === ex.Input.Buttons.DpadLeft) {
        //         player.vel.x = -600;
        //     } else if (this.game.button === ex.Input.Buttons.DpadRight) {
        //         player.vel.x = 300;
        //     } else if (this.game.button === ex.Input.Buttons.Face1) {
        //         player.vel.y = -600;
        //     }
        // });


// Beweeg de speler naar links of rechts wanneer de linker- of rechterpijltoets wordt ingedrukt
        engine.input.keyboard.on('down', (evt) => {
            if (evt.key === 'ArrowLeft' || evt.key === 'a') {
                player.vel.x = -600; // verplaats de speler met een snelheid van -600 pixels per seconde naar links
            } else if (evt.key === 'ArrowRight' || evt.key === 'd') {
                player.vel.x = 300; // verplaats de speler met een snelheid van 300 pixels per seconde naar rechts
            }
        });

// Stop de beweging van de speler wanneer de linker- of rechterpijltoets wordt losgelaten
        engine.input.keyboard.on('up', (evt) => {
            if (evt.key === 'ArrowLeft' || evt.key === 'ArrowRight' || evt.key === 'a' || evt.key === 'd') {
                player.vel.x = 0; // stop de beweging van de speler
            }
        });
    }

    onPostUpdate(engine, delta) {
        const player = this.actors.find(actor => actor instanceof Mando);
        if (engine.input.keyboard.wasPressed(Input.Keys.KeyX)) {
            console.log('shoot');
            this.spawnBullet(player.pos.x, player.pos.y);
        }
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    spawnEnemy() {
        const randomNumberOfStormtroopers = this.generateRandomNumber(1, 5);

        for (let i = 0; i < randomNumberOfStormtroopers; i++) {
            const stormtrooper = new Stormtrooper(this.generateRandomNumber(1500, 2000), 500);
            this.add(stormtrooper);
        }

        const darthvader = new DarthVader(Math.floor(Math.random() * 5 + 1) * 2000, 500);
        this.add(darthvader);
    }

    spawnBullet(posX, posY) {
        // Maakt een nieuwe Bullet aan en voegt deze toe aan de scene
        const bullet = new Bullet(posX, posY);
        this.add(bullet);

        if (bullet.pos.x > 1500) {
            bullet.kill();
        }
        bullet.on('collisionstart', (event) => {
            if (event.other instanceof Stormtrooper) {
                bullet.kill();
                event.other.kill();
                this.score+=500;
                this.updateScoreLabel();
            }
            if (event.other instanceof DarthVader) {
                this.darthvaderLives--;
                if (this.darthvaderLives <= 0) {
                    event.other.kill();
                    this.score+=2000;
                    this.updateScoreLabel();
                    this.darthvaderLives = 3;
                }
            }
        });
    }


    updateScoreLabel() {
        this.score++;
        this.scoreLabel.text = 'SCORE: ' + this.score;
    }

    updateLivesLabel() {
        this.livesLabel.text = 'LIVES: ' + this.lives;
    }
}