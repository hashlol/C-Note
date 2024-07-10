(function ($) {
    $.fn.notesEditor = function(course) {
        const settings = {
            titleSelector: '#noteTitle',
            textareaSelector: '#txtNotes',
            saveButtonSelector: '.btn-primary',
            notesContainerSelector: '.card-body',
            noteIDSelector: '#noteID'
        };
        const notesService = new NotesService(course);
        let dataTable; 
        
        const loadNotesList = () => {
            const dataSet = notesService.getAllNotes();

            dataSet.forEach(r => {
                r[0]
                r[1] = $('<div>').text(r[1]).html(); // Note Title
                r[2] = $('<div>').text(r[2]).html(); // Note Content
                r[3] = $('<div>').text(r[3]).html(); // Last Edited
                r.push(`
                    <button class="delete-note btn btn-primary" data-id="${r[0]}" style="background-color: #112D54; textColor: #FFFFF; ">
                            Delete
                    </button>
                `); 
                r.push(`
                    <button class="edit-note btn btn-primary" data-id="${r[0]}" style="background-color: #112D54; color: #FFFFFF;">
                        Edit
                    </button>
                `);
                r.push(`
                    <button class="view-note btn btn-secondary" data-id="${r[0]}" style="background-color: #112D54; color: #FFFFFF;">
                        View
                    </button>
                `);
            });

            dataTable = new DataTable(`#dt-${course}`, {
                columns: [
                    { title: 'Note ID' },  // isnt packed onto the page but still want the data in the table so we can delete it based off of the noteID
                    { title: 'Note Title',   className: 'shorten-border '}, // I did this so if content in the title or note is too long, it has a max pixel limit
                    { title: 'Note Preview', className: 'shorten-border'},
                    { title: 'Last Edited',},
                    { title: 'Delete Note' },
                    { title: 'Edit Note' },
                    { title: 'View Note' }

                ],
                data: dataSet,
                columnDefs: [
                    { targets: 0, visible: false, searchable: false },
                    { targets: 1, width: '20%', maxWidth: '2px' }, 
                    { targets: 2, width: '40%', maxWidth: '50px' }, 
                    { targets: 3, width: '15%', maxWidth: '50px' }, 
                    { targets: 4, width: '8%' },  
                    { targets: 5, width: '8%' },  
                    { targets: 6, width: '9%' }
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

            $(document).on('click', '.edit-note', function() {
                const noteId = $(this).data('id');
                if (!noteId) {
                    return;
                }
                const note = notesService.getNoteContent(noteId);
                try{
                    if(note.title && note.content){
                        $(settings.titleSelector).val(note.title);
                        $(settings.textareaSelector).val(note.content);
                        $(settings.noteIDSelector).val(noteId);  
                    }
                } catch(error){
                    return;
                }
            });

            $(document).on('click', '.view-note', function() {
                const noteId = $(this).data('id');
                if (!noteId) {
                    console.error('Note ID is undefined.');
                    return;
                }

                const note = notesService.getNoteContent(noteId);
                try{
                    if(note.title && note.content){
                        $(settings.titleSelector).val(note.title);
                        $(settings.textareaSelector).val(note.content);
                        $(settings.noteIDSelector).val(noteId);  
                    }
                } catch(error){
                    return;
                }
            });
        
            
            

        const notesEditorContainer = $('<div></div>').load(chrome.runtime.getURL("app/notes-editor/notes-editor.html"), () => {
            let $table = `<table id="dt-${course}" class="display table table-striped" width="100%"></table>`;
            $(settings.notesContainerSelector, this).append($table);

            $(settings.saveButtonSelector, this).on('click', () => {
                const noteTitle = $(settings.titleSelector, this).val();
                const noteContent = $(settings.textareaSelector, this).val();
                const noteID = $(settings.noteIDSelector, this).val(); 

                if (noteTitle && noteContent && !noteID) {
                    const note =  notesService.insertNote(noteTitle, noteContent);
                    $(settings.titleSelector, this).val('');  
                    $(settings.textareaSelector, this).val('');  
                    dataTable.row.add([note[0], note[1], note[2], note[3], `
                    <button class="delete-note btn btn-primary" data-id="${note[0]}">
                        Delete
                    </button>`, `
                    <button class="edit-note btn btn-primary" data-id="${note[0]}" style="background-color: #112D54; color: #FFFFFF;">
                        Edit
                    </button>
                    `,`
                    <button class="view-note btn btn-secondary" data-id="${note[0]}" style="background-color: #112D54; color: #FFFFFF;">
                        View
                    </button>
                `]).draw();
                }else if (noteTitle && noteContent && noteID){
                    notesService.deleteNote(String(noteID)); 
                    const note =  notesService.insertNote(noteTitle, noteContent);
                    const $row = $(`#dt-${course} .delete-note[data-id="${noteID}"]`).closest('tr');
                    dataTable.row($row).remove();
                    dataTable.row.add([note[0], note[1], note[2], note[3], `
                    <button class="delete-note btn btn-primary" data-id="${note[0]}">
                        Delete
                    </button>`, `
                    <button class="edit-note btn btn-primary" data-id="${note[0]}" style="background-color: #112D54; color: #FFFFFF;">
                        Edit
                    </button>
                    `,`
                    <button class="view-note btn btn-secondary" data-id="${note[0]}" style="background-color: #112D54; color: #FFFFFF;">
                        View
                    </button>
                    `]).draw();
                }
                    $(settings.titleSelector).val('');  
                    $(settings.textareaSelector).val('');  
                    $(settings.noteIDSelector).val('');  
            });
            loadNotesList();
        });

        this.html(notesEditorContainer);
        
        return this;
    };
}(jQuery));