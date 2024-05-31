(function ($) {
 
    $.fn.notesEditor = function(course) {
        const settings = {
            textareaSelector: '#txtNotes',
            saveButtonSelector: '.btn-primary',
            notesContainerSelector: '.card-body'
        };
        const notesService = new NotesService(course);
        
        const loadNotesList = () => {
            const dataSet = notesService.getAllNotes();
             
            dataSet.forEach(r => {
                var div1 = document.createElement('div');
                div1.innerHTML = r[1];
                r[1] = div1;
             
                var div3 = document.createElement('div');
                div3.innerHTML = r[3];
                r[3] = div3;
            })
             
            this.dataTable = new DataTable(`#dt-${course}`, {
                columns: [
                    { title: 'Text' },
                    { title: 'Date' }
                ],
                data: dataSet
            });
        }
        
        const notesEditorContainer = $('<div></div>').load(chrome.runtime.getURL("app/notes-editor/notes-editor.html"), () => {
            let $table = `<table id="dt-${course}" class="display table table-striped" width="100%"></table>`;
            $(settings.notesContainerSelector, this).append($table);

            $(settings.saveButtonSelector, this).on('click', () => {
                const noteText = $(settings.textareaSelector, this).val();
                if (noteText) {
                  const note = notesService.insertNote(noteText);
                  $(settings.textareaSelector, this).val('');  // Clear the textarea
                  this.dataTable.row.add(note).draw();
                }
              });
            
            loadNotesList();
        });

        this.html(notesEditorContainer);
        
        return this;
    };
 
}( jQuery ));

   