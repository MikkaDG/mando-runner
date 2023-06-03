import {ImageSource, Sound, Resource, Loader} from 'excalibur'
import mandoImage from '../images/mando.png'
import groundImage from '../images/ground.png'
import rockImage from '../images/rock.png'
import backgroundImage from '../images/background.png'
import stormtrooperImage from '../images/stormtrooper.png'
import ceilingImage from '../images/ceiling.png'
import darthVaderImage from '../images/darthvader.png'
import playImage from '../images/play.png'
import homeImage from '../images/home.png'
import bulletImage from '../images/blasterbolt.png'

const Resources = {
    Mando: new ImageSource(mandoImage),
    Ground: new ImageSource(groundImage),
    Rock: new ImageSource(rockImage),
    Background: new ImageSource(backgroundImage),
    Stormtrooper: new ImageSource(stormtrooperImage),
    Ceiling: new ImageSource(ceilingImage),
    DarthVader: new ImageSource(darthVaderImage),
    Play: new ImageSource(playImage),
    Home: new ImageSource(homeImage),
    Bullet: new ImageSource(bulletImage),
}

// met deze for loop hoef je niet alles handmatig in de loader te zetten
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)
export { Resources, ResourceLoader }