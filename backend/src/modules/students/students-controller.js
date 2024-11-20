const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    try {
        const students = await getAllStudents(req.query);
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }

});

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    try {
        const result = await addNewStudent(req.body);
        res.status(201).json({ success: true, message: result.message });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    try {
        const payload = { ...req.body, id: req.params.id };
        const result = await updateStudent(payload);
        res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    try {
        const student = await getStudentDetail(req.params.id);
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    try {
        const payload = {
            userId: req.params.id,
            reviewerId: req.body.reviewerId, // Asegúrate de enviar este dato en el body
            status: req.body.status,       // Asegúrate de enviar el nuevo estado en el body
        };
        const result = await setStudentStatus(payload);
        res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
