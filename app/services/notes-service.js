class NotesService {
    constructor(courseId) {
      this.courseId = courseId;
      this.storageKey = `notes_${this.courseId}`;
    }
    // Method to insert notes
    insertNote(title, noteData) {
      const notes = this.getAllNotes();
      const date = this.formatDate(new Date());
      const noteID = Date.now().toString();
      const newNote = [noteID, title, noteData, date];
      notes.push(newNote);
      localStorage.setItem(this.storageKey, JSON.stringify(notes));
      return newNote;
    }

    deleteNote(noteID){
      const notesJson = localStorage.getItem(this.storageKey);
      if (!notesJson) {
        console.error("Error fetching notes");
        return;
      }
      const notes = JSON.parse(notesJson);
      const updatedNotes = notes.filter(note => note[0] !== noteID);
      console.log("noteID", noteID, "\nUpdated Notes:", updatedNotes);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedNotes));
    }
      
    // Method to retrieve all notes for the course
    getAllNotes() {
      const notes = localStorage.getItem(this.storageKey);
      return notes ? JSON.parse(notes) : [];
    }

    formatDate(date) {
      const padZero = (num) => (num < 10 ? "0" + num : num);
    
      let month = date.getMonth() + 1; 
      let day = date.getDate(); 
      let year = date.getFullYear();
    
      let hours = date.getHours();
      let minutes = padZero(date.getMinutes());
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
    
      return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  }
}
