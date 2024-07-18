const NotesService =  require('./notes-service-mock');

const localStorageMock = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value;
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      },
    };
   })();
   global.localStorage = localStorageMock;
   //const NotesService = require('./notes-service.js');
   describe('NotesService', () => {
    let notesService;
    const courseId = 'testCourse';
    beforeEach(() => {
      localStorage.clear();
      notesService = new NotesService(courseId);
    });
    test('should insert a note', () => {
      const title = 'Test Note';
      const content = 'This is a test note.';
      const note = notesService.insertNote(title, content);
      expect(note).toHaveLength(4);
      expect(note[1]).toBe(title);
      expect(note[2]).toBe(content);
      const storedNotes = notesService.getAllNotes();
      expect(storedNotes).toHaveLength(1);
      expect(storedNotes[0]).toEqual(note);
    });
    test('should update a note', () => {
      const title = 'Test Note';
      const content = 'This is a test note.';
      const [noteID] = notesService.insertNote(title, content);
      const newTitle = 'Updated Note';
      const newContent = 'This is an updated test note.';
      const updatedNote = notesService.updateNote(newTitle, newContent, noteID);
      expect(updatedNote[1]).toBe(newTitle);
      expect(updatedNote[2]).toBe(newContent);
      const storedNotes = notesService.getAllNotes();
      expect(storedNotes).toHaveLength(1);
      expect(storedNotes[0]).toEqual(updatedNote);
    });
    test('should delete a note', () => {
      const title = 'Test Note';
      const content = 'This is a test note.';
      const [noteID] = notesService.insertNote(title, content);
      notesService.deleteNote(noteID);
      const storedNotes = notesService.getAllNotes();
      expect(storedNotes).toHaveLength(0);
    });
    test('should get note content', () => {
      const title = 'Test Note';
      const content = 'This is a test note.';
      const [noteID] = notesService.insertNote(title, content);
      const noteContent = notesService.getNoteContent(noteID);
      expect(noteContent).toEqual({
        title,
        content,
        lastEdited: expect.any(String),
      });
    });
    test('should return null for non-existent note', () => {
      const noteContent = notesService.getNoteContent('nonexistent');
      expect(noteContent).toBeNull();
    });
   });