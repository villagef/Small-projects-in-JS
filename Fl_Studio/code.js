document.addEventListener('DOMContentLoaded', drumKit)
//deklaracja zmiennych
let boom, clap, hihat, kick, openhat, ride, snare, tink, tom
let soundRecorder = []

let startBtn, stopBtn, playBtn
let startTime
let recording = false
//stwórz tablice z dźwiękiem
const sounds = [
    { id: 97, name: 'boom' },
    { id: 115, name: 'clap' },
    { id: 100, name: 'hihat' },
    { id: 102, name: 'kick' },
    { id: 103, name: 'openhat' },
    { id: 104, name: 'ride' },
    { id: 106, name: 'snare' },
    { id: 107, name: 'tink' },
    { id: 108, name: 'tom' },
]
//stwórz funcję obsługującą przyciski start, stop i play
function drumKit() {
    document.body.addEventListener('keypress', playSound)
    startBtn = document.querySelector('#startRecording')
    stopBtn = document.querySelector('#stopRecording')
    playBtn = document.querySelector('#playRecording')
//metoda która na 'click' zaczyna nagrywanie do pustej tablicy ---> true oraz mierzy czas
    startBtn.addEventListener('click', () => {
        startTime = Date.now()
        recording = true
        soundRecorder = []
    })
//metoda która na 'click' kończy nagrywanie ---> false
    stopBtn.addEventListener('click', () => {
        recording = false
    })
//metoda która na 'click' odtwarza nagrany dźwięk za pomocą pętli forEach z tablicy 
    playBtn.addEventListener('click', () => {
        soundRecorder.forEach(sound => {
            setTimeout(
                () => {
                    let soundElement = document.querySelector(`#${sound.name}`)
                    // odtwarzaj player
                    soundElement.currentTime = 0
                    soundElement.play()
                }
                , sound.time)
        })
    })

}
//funkcja odpowiedzialna za efekt podświetlenia przycisku w DOM 
function highlightBox(className) {
    // włącza wyróżnienie
    document.querySelector(`.${className}`).classList.add('playing')
    // wyłącza wyróżnienie
    setTimeout(() => {
        document.querySelector(`.${className}`).classList.remove('playing')
    }, 80)
}
//funkcja która imituje dźwięk po naciśnięciu odpowiedniego klawisza 
function playSound(e) {
    // znajdź dźwięk
    let sound = sounds.find(el => el.id == e.keyCode)
    let soundElement = document.querySelector(`#${sound.name}`)
    // odtwarzaj player
    soundElement.currentTime = 0
    soundElement.play()
    // podświetl klawisz 
    highlightBox(sound.name)

    // zapisz na scieżce
    if (recording) {
        soundRecorder.push({
            name: sound.name,
            time: Date.now() - startTime
        })
    }
}
