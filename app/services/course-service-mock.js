const fs = require('fs');

const code = fs.readFileSync('./app/services/course-service.js', 'utf-8');

const exports = {};
const context = `
    (function() {
        ${code}
        return CourseService;
    })();
`;

exports.CourseService = eval(context);

module.exports = exports.CourseService;