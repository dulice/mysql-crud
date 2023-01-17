const db = require("../config");
const { Grade, Student } = require("../Model/student_grade.model");

const router = require("express").Router();

const grade_data = [{ grade: 9 }, { grade: 10 }, { grade: 11 }];
const student_data = [
  { name: "John Baker", gradeId: 2 },
  { name: "Max Butler", gradeId: 1 },
  { name: "Ryan Fisher", gradeId: 3 },
  { name: "Robert Gray", gradeId: 2 },
  { name: "Sam Lewis", gradeId: 1 },
];

router.get('/student-grade', async (req, res) => {
    try {
        // add multiple rows into table
        await db.sync()
        await Grade.bulkCreate(grade_data, {validate: true});
        await Student.bulkCreate(student_data, {validate: true});
        res.status(200).json({message: "created successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// one-to-one association
Student.belongsTo(Grade);

//get student information student nested grade object including matching gradeId to grade.id
router.get('/student', async (req, res) => {
    try {
        const student = await Student.findAll({
            include: [{
                model: Grade
            }]
        })
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//one to many association
Grade.hasMany(Student);
//get student information grade nested student array including matching student in grade-9
router.get('/grade', async (req, res) => {
    try {
        const grade = await Grade.findAll({
            where: {
                grade: 9
            },
            include: [{
                model: Student
            }]
        })
        res.status(200).json(grade);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
