import
{
    presetRandom,
    presetHunters,
    presetWorms,
    presetBlackHole,
    presetCells,
    presetChasing,
    presetSplitters,
    resetParticles,
    resetSliders
}
from './particle';


document.getElementById('hunters').onclick = presetHunters
document.getElementById('splitters').onclick = presetSplitters
document.getElementById('worms').onclick = presetWorms
document.getElementById('ball').onclick = presetBlackHole
document.getElementById('cells').onclick = presetCells
document.getElementById('tag').onclick = presetChasing
document.getElementById('random').onclick = presetRandom
document.getElementById('rPart').onclick = resetParticles
document.getElementById('rSlide').onclick = resetSliders