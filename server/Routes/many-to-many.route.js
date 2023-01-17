const db = require("../config");
const { Student, Course, StudentCourse } = require("../Model/student_grade.model");

const router = require("express").Router();

const course_data = [
    {course_name : "Science"},
    {course_name : "Maths"},
    {course_name : "History"}
]

const student_data = [
    {name : "John Baker", courseId: 2},
    {name : "Max Butler", courseId: 1},
    {name : "Ryan Fisher", courseId: 3},
    {name : "Robert Gray", courseId: 2},
    {name : "Sam Lewis", courseId: 1}
]

const student_course_data = [
    {studentId : 1, courseId: 1},
    {studentId : 2, courseId: 1},
    {studentId : 2, courseId: 3},
    {studentId : 3, courseId: 2},
    {studentId : 1, courseId: 2},
]

router.get('/student-course', async (req, res) => {
    try {
        // add multiple rows into table
        await Course.bulkCreate(course_data, {validate: true});
        await Student.bulkCreate(student_data, {validate: true});
        await StudentCourse.bulkCreate(student_course_data, {validate: true});
        res.status(200).json({message: "created successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// many-to-many association
Course.belongsToMany(Student, { through: StudentCourse });
Student.belongsToMany(Course, { through: StudentCourse });

router.get('/course', async (req, res) => {
    try {
        // we will get course information
        // which nested students model array 
        // which nested studentCourse model object match (courseId=course.id) through studentCourse
        const course = await Course.findAll({
            include: [{
                model: Student
            }]
        })
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
