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
 *     summary: Lấy danh sách tất cả sách (có phân trang)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang muốn lấy (tùy chọn)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số sách mỗi trang (tùy chọn)
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
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
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
 *         required: true
 *         description: ID sách
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
 *         description: Tạo mới thành công
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
 *         required: true
 *         description: ID sách cần cập nhật
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
 *         required: true
 *         description: ID sách cần xóa
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
