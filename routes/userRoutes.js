const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/users', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Lấy chi tiết người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID người dùng
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/users/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo người dùng mới
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
 *         description: Dữ liệu không hợp lệ hoặc email đã tồn tại
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID người dùng cần cập nhật
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.put('/users/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID người dùng cần xóa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
