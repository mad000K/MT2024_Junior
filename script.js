document.addEventListener('DOMContentLoaded', () => {
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const addNoteButton = document.getElementById('add-note');
    const notesList = document.getElementById('notes');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const renderNotes = () => {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('li');
            noteElement.classList.add('note');
            if (note.archived) noteElement.classList.add('archived');
            
            noteElement.innerHTML = `
                <div class="note-title">${note.title}</div>
                <div class="note-date">${note.date}</div>
                <div class="note-content">${note.content}</div>
                <div class="actions">
                    <button onclick="editNote(${index})">Редагувати</button>
                    <button onclick="archiveNote(${index})">Архівувати</button>
                    <button onclick="deleteNote(${index})">Видалити</button>
                </div>
            `;
            notesList.appendChild(noteElement);
        });
    };

    const addNote = () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();
        if (title && content) {
            const note = {
                title,
                content,
                date: new Date().toLocaleString(),
                archived: false
            };
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            noteTitleInput.value = '';
            noteContentInput.value = '';
        }
    };

    window.editNote = (index) => {
        const newTitle = prompt('Введіть новий заголовок', notes[index].title);
        const newContent = prompt('Введіть новий текст нотатки', notes[index].content);
        if (newTitle !== null && newContent !== null) {
            notes[index].title = newTitle.trim();
            notes[index].content = newContent.trim();
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    };

    window.archiveNote = (index) => {
        notes[index].archived = !notes[index].archived;
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    window.deleteNote = (index) => {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    addNoteButton.addEventListener('click', addNote);

    renderNotes();
});
