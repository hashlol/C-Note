class NotesService {
    constructor(courseId) {
      this.courseId = courseId;
      this.storageKey = `notes_${this.courseId}`;
    }
    // Method to insert notes
    insertNote(text) {
      const notes = this.getAllNotes();
      notes.push(text);
      localStorage.setItem(this.storageKey, JSON.stringify(notes));
    }
    // Method to retrieve all notes for the course
    getAllNotes() {
      const notes = localStorage.getItem(this.storageKey);
      return notes ? JSON.parse(notes) : [];
    }
}
