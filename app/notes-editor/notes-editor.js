(function ($) {
    $.fn.notesEditor = function(course) {
        const settings = {
            titleSelector: '#noteTitle',
            textareaSelector: '#txtNotes',
            saveButtonSelector: '.btn-primary',
            notesContainerSelector: '.card-body'
        };
        const notesService = new NotesService(course);
        const deleteIconUrl = chrome.runtime.getURL("../assets/dataTable-row-delete.svg");
        let dataTable; 
        
        const loadNotesList = () => {
            const dataSet = notesService.getAllNotes();

            dataSet.forEach(r => {
                r[1] = $('<div>').text(r[1]).html(); // Note Title
                r[2] = $('<div>').text(r[2]).html(); // Note Content
                r[3] = $('<div>').text(r[3]).html(); // Last Edited
                r.push(`
                    <button class="delete-note btn btn-primary" data-id="${r[0]}" style="background-color: #112D54; textColor: #FFFFF; ">
                            <img src="${deleteIconUrl}" alt="Delete" class="delete-icon" />
                    </button>
                `); 
            });

            dataTable = new DataTable(`#dt-${course}`, {
                columns: [
                    { title: 'Note ID' },  // isnt packed onto the page but still want the data in the table so we can delete it based off of the noteID
                    { title: 'Note Title' },
                    { title: 'Note Content' },
                    { title: 'Last Edited' },
                    { title: 'Delete Note' }
                ],
                data: dataSet,
                columnDefs: [
                    { targets: 0, visible: false, searchable: false } 
                ]
            });


            $(document).ready(function() {
                $(document).on('click', '.delete-note', function() {
                    const noteId = $(this).data('id');             
                    if (!noteId) {
                        console.error('Note ID is undefined.');
                    }
    
                    const $row = $(this).closest('tr');
            
                    if ($row.length === 0) {
                        console.error('Matching row not found');
                    }
            
                    if (noteId) {
                        notesService.deleteNote(String(noteId)); 
                        dataTable.row($row).remove();
                        $row.remove();
                    } else {
                        console.error('Note ID is undefined.');
                    }
                    
                });
            })};
            
            

        const notesEditorContainer = $('<div></div>').load(chrome.runtime.getURL("app/notes-editor/notes-editor.html"), () => {
            let $table = `<table id="dt-${course}" class="display table table-striped" width="100%"></table>`;
            $(settings.notesContainerSelector, this).append($table);
            const deleteIconUrl = chrome.runtime.getURL("../assets/dataTable-row-delete.svg");

            $(settings.saveButtonSelector, this).on('click', () => {
                const noteTitle = $(settings.titleSelector, this).val();
                const noteContent = $(settings.textareaSelector, this).val();
                if (noteTitle && noteContent) {
                    const note = notesService.insertNote(noteTitle, noteContent);
                    $(settings.titleSelector, this).val('');  // Clear the title input
                    $(settings.textareaSelector, this).val('');  // Clear the textarea
                    dataTable.row.add([note[0], note[1], note[2], note[3], `
                        <button class="delete-note btn btn-primary" data-id="${note[0]}">
                            <img src="${deleteIconUrl}" alt="Delete" class="delete-icon" />
                        </button>
                    `]).draw();
                }
            });
            
            loadNotesList();
        });

        this.html(notesEditorContainer);
        
        return this;
    };
}(jQuery));