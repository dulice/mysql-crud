const { DataTypes } = require("sequelize");
const db = require("../config");

const Student = db.define('students', {
    name: { type: DataTypes.STRING },
});

const Grade = db.define('grades', {
    grade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const Course = db.define('courses', {
    course_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const StudentCourse = db.define('StudentCourse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

module.exports = {
    Student,
    Grade,
    Course,
    StudentCourse,
}