const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API quản lý sách
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lấy danh sách tất cả sách
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */
router.get('/books', controller.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Lấy chi tiết sách theo ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID sách
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy sách
 */
router.get('/books/:id', controller.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Tạo sách mới
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/books', controller.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Cập nhật thông tin sách
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID sách cần cập nhật
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sách
 */
router.put('/books/:id', controller.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Xóa sách
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID sách cần xóa
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sách
 */
router.delete('/books/:id', controller.deleteBook);

module.exports = router;
