const express = require('express');
const router = express.Router();
const courseController = require('../../../controllers/courseController');
const authController = require('../../../controllers/authController');

router.post('/addCourse', authController.verifyJWT, courseController.addCourse);
router.get('/getAllCourses', courseController.getAllCourses);
router.get('/getCourseById/:courseId', courseController.getCourseById);
router.delete('/deleteCourseById/:courseId', authController.verifyJWT, courseController.deleteCourseById);
router.post('/enrollInCourse', authController.verifyJWT, courseController.enrollInCourse);
router.get('/getStudentsInCourse', authController.verifyJWT, courseController.getStudentsInCourse);
router.get('/getTeacherCourses', authController.verifyJWT, courseController.getTeacherCourses);
router.get('/getStudentCourses', authController.verifyJWT, courseController.getStudentCourses);
router.put('/updateCourseById/:courseId', authController.verifyJWT, courseController.updateCourseById);
module.exports = router;
