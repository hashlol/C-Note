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

    updateNote(title, noteData, noteID){
      const notes = this.getAllNotes();
      const date = this.formatDate(new Date());
      const noteIndex = notes.findIndex(note => String(note[0]) === String(noteID));

      if (noteIndex === -1) {
          return null;
      }

      notes[noteIndex][1] = title;
      notes[noteIndex][2] = noteData;
      notes[noteIndex][3] = date;

      localStorage.setItem(this.storageKey, JSON.stringify(notes));
      return notes[noteIndex];
    }

    deleteNote(noteID){
      const notesJson = localStorage.getItem(this.storageKey);
      if (!notesJson) {
        console.error("Error fetching notes");
        return;
      }
      const notes = JSON.parse(notesJson);
      const updatedNotes = notes.filter(note => note[0] !== noteID);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedNotes));
    }

    getNoteContent(noteID) {
      const notes = this.getAllNotes(); 
      const note = notes.find(note => {
          return String(note[0]) === String(noteID); 
      });
  
      if (!note) {
          return null;
      }
  
      return {
          title: note[1],
          content: note[2],
          lastEdited: note[3]
      };
  }
      
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
