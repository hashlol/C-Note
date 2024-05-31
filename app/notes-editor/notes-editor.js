(function ($) {
 
    $.fn.notesEditor = function(course) {
        const notesEditorContainer = $('<div></div>').load(chrome.runtime.getURL("app/notes-editor/notes-editor.html"), () => {
            let $table = `<table id="dt-${course}" class="display table table-striped" width="100%"></table>`;
            $('.card-body', this).append($table);

            //Mock data - to be replaced with service call to retrieve notes from local storage
            const dataSet = [
                ['This is a note. This is a sample note!!!!', '2012/05/25'],
                ['This is a note. Im another note!.', '2022/12/25'],
                ['This is awesome. Need to add more notes......', '2024/05/25'],
                ['Need to complete practice quiz by 12/05/2023', '2023/10/25'],
                ['Completed all of my assignments and discussions. Not sure what else to write.', '2011/04/25'],
            ];
             
            dataSet.forEach(r => {
                var div1 = document.createElement('div');
                div1.innerHTML = r[1];
                r[1] = div1;
             
                var div3 = document.createElement('div');
                div3.innerHTML = r[3];
                r[3] = div3;
            })
             
            new DataTable(`#dt-${course}`, {
                columns: [
                    { title: 'Text' },
                    { title: 'Date' }
                ],
                data: dataSet
            });
        });
        this.html(notesEditorContainer);
        return this;
    };
 
}( jQuery ));
