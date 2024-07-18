const fs = require('fs');

const code = fs.readFileSync('./app/services/notes-service.js', 'utf-8');

const exports = {};
const context = `
    (function() {
        ${code}
        return NotesService;
    })();
`;

exports.NotesService = eval(context);

module.exports = exports.NotesService;