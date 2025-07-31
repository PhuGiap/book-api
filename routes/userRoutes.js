const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng
 */

// Đăng ký
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Tạo mới thành công
 *       400:
 *         description: Email đã tồn tại
 */
router.post('/register', userController.registerUser);

// Đăng nhập
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Thông tin không hợp lệ
 */
router.post('/login', userController.loginUser);

// Lấy tất cả người dùng
router.get('/', userController.getUsers);

// Lấy người dùng theo ID
router.get('/:id', userController.getUser);

// Cập nhật người dùng
router.put('/:id', userController.updateUser);

// Xóa người dùng
router.delete('/:id', userController.deleteUser);

module.exports = router;
