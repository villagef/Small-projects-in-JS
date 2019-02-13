document.addEventListener('DOMContentLoaded', appStart)

let notes = []
// notes.toString = function() {
//     return JSON.stringify(this)
// }

let notesContainer
let btnNewNote

/**
 * Punkt startowy aplikacji, startuje po załadowaniu struktury DOM
 */
function appStart() {
    notesContainer = document.querySelector('#notes')
    btnNewNote = document.querySelector('#new-note-add')
    btnNewNote.addEventListener('click', newNote)
    getSavedNotes()
    showNotes()
}

/**
 * Pobiera notatki z localStorage i wpisuje do tablicy notes
 */
function getSavedNotes() {
    notes = JSON.parse(localStorage.getItem('notes')) || []
    sortNotes()
}

function sortNotes() {
    // let pinnedNotes = notes.filter((note) => note.pinned);
    // let unpinnedNotes = notes.filter((note) => !note.pinned);

    // pinnedNotes.sort((n1, n2) => {
        // return n2.id - n1.id
    // })

    // unpinnedNotes.sort((n1, n2) => {
        // return n2.id - n1.id
    // })

    // notes = [...pinnedNotes, ...unpinnedNotes];
    notes.sort( (n1, n2) => n2.id - n1.id)
    notes.sort( (n1, n2) => {
        if (n1.pinned == n2.pinned) {
            return 0
        }
        if (n1.pinned) {
            return -1
        }
        return 1
        
    })
}
/**
 * Wyświetla notatki z tablicy notes w html-u
 */
function showNotes() {
    notes.forEach(note => {
        addNoteToNotesContainer(note)
    })
}

function addNoteToNotesContainer(note, firstNote = false) {
    let active = ""

    // wrzuć notatkę na stronę
    const noteDiv = document.createElement('div')
    noteDiv.classList.add('note')
    noteDiv.classList.add(note.color)
    noteDiv.id = `note-${note.id}`

    const d = new Date(note.id)

    if (note.pinned) {
        active = "active"
    }

    noteDiv.innerHTML = `
         <div class='note-title'>${note.title}</div>
         <div class='note-content'>${note.content}</div>
         <div class='note-date'>${d.toLocaleDateString()} ${d.toLocaleTimeString()}</div>
         <div class='note-menu'>
            <div>
                <i class='far fa-trash-alt' id='n${note.id}'></i>
                <i class="fas fa-thumbtack ${active}" id='p${note.id}'></i>
            </div>
            <div class="colors">
                <span class="color red" data-color="red" data-id="${note.id}"></span>
                <span class="color green" data-color="green" data-id="${note.id}"></span>
                <span class="color blue" data-color="blue" data-id="${note.id}"></span>
            </div>
         </div>
     `
    if (!firstNote) {
        notesContainer.appendChild(noteDiv)
    } else {
        // const firstChildId = notes[0].id
        // const firstNote = document.querySelector(`#note-${firstChildId}`)
        // notesContainer.insertBefore(noteDiv, firstNote)
        let firstUnpinnedId = notes.find((note) => !note.pinned).id

        notesContainer.insertBefore(
            noteDiv,
            document.querySelector(`#note-${firstUnpinnedId}`))
        sortNotes();
    }

    // obsługa przycisków
    // obsługa usuwania notatki - kliknięcie w krzyżyk
    document.querySelector(`#n${note.id}`).addEventListener('click', () => {
        removeNote(note.id)
    })
    // obsługa przypinania notatki
    document.querySelector(`#p${note.id}`).addEventListener('click', (e) => {
        pinNote(note.id)
    })

    // obsługa kolorów
    document.querySelectorAll('.color').forEach( span => {
        span.addEventListener('click', (e) => {
            const color = e.target.dataset.color;
            const id    = e.target.dataset.id; 
            changeNoteColor(id, color)
            // document.querySelector(`#note-${id}`).classList.add(color)
        })
    })
}

function changeNoteColor(id, color) {    
    document.querySelector(`#note-${id}`).className = `note ${color}`;
    notes.find( note => id == note.id).color = color
    saveNotesToLocalStorage()
}

function pinNote(id) {
    // zmień klasę css ikonku pinned
    const notePin = document.querySelector(`#p${id}`)
    notePin.classList.toggle('active')

    // zmień .pinned w tablicy notatek
    const idx = notes.findIndex(note => note.id == id)
    notes[idx].pinned = !notes[idx].pinned

    // zapisz w localStorage
    saveNotesToLocalStorage()

    // // przenieś notatkę na początek listy
    // const noteDiv = document.querySelector(`#note-${id}`)
    // notesContainer.insertBefore(noteDiv, notesContainer.firstChild)

    // odśwież widok listy
    getSavedNotes()
    notesContainer.innerHTML = ''
    showNotes()

}
function removeNote(id) {
    const idx = notes.findIndex(note => {
        return id == note.id
    })
    notes.splice(idx, 1)
    const noteDivToDelete = document.querySelector(`#note-${id}`)
    notesContainer.removeChild(noteDivToDelete)

    saveNotesToLocalStorage()
}

function newNote() {
    // dodaj nową notatkę do tablicy notatek
    // pobierz tytuł
    const title = document.querySelector('#new-note-name').value
    // pobierz treść
    const content = document.querySelector('#new-note-content').value
    // utwórz notatkę
    const n = new Note(title, content)
    // zapisz w tablicy notatek
    notes.push(n)
    // zapisz w localStorage
    saveNotesToLocalStorage();

    // wyświetl notatkę
    addNoteToNotesContainer(n, true)
}

function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

/**
 * Konstruktor notatki
 * 
 * @param {string} title    Tytuł notatki
 * @param {string} content  Treść notatki
 */
function Note(title = '', content = '') {
    this.title      = title
    this.content    = content
    this.id         = Date.now()
    this.pinned     = false
    this.color      = undefined
}