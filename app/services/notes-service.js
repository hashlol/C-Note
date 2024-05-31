class NotesService {
    constructor(courseId) {
      this.courseId = courseId;
      this.storageKey = `notes_${this.courseId}`;
    }
    // Method to insert notes
    insertNote(text) {
      const notes = this.getAllNotes();
      const date = new Date().toISOString();
      const newNote = [];
      newNote.push(text);
      newNote.push(date);
      notes.push(newNote);
      localStorage.setItem(this.storageKey, JSON.stringify(notes));
      return newNote;
    }
    // Method to retrieve all notes for the course
    getAllNotes() {
      const notes = localStorage.getItem(this.storageKey);
      return notes ? JSON.parse(notes) : [];
    }
}
