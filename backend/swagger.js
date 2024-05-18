/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đã tồn tại hoặc dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập vào hệ thống
 *     tags: [Authentication]
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
 *         description: Đăng nhập thành công, trả về token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Kết quả đăng nhập
 *                 token:
 *                   type: string
 *                   description: JWT token để xác thực các yêu cầu tiếp theo
 *       400:
 *         description: Sai thông tin đăng nhập hoặc dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /get_user_data:
 *   get:
 *     summary: Lấy thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 userData:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     avatar_url:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     cartData:
 *                       type: object
 *                     date:
 *                       type: date
 *                 message:
 *                   type: string
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */

/**
 * @swagger
 * /update_user_data:
 *   post:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *             required:
 *               - phoneNumber
 *               - address
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc người dùng không tồn tại
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */

/**
 * @swagger
 * /update_user_data_full:
 *   post:
 *     summary: Cập nhật toàn bộ thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *             required:
 *               - username
 *               - avatar_url
 *               - email
 *               - password
 *               - phoneNumber
 *               - address
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc người dùng không tồn tại
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */

/**
 * @swagger
 * /add_to_cart:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng của người dùng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemID:
 *                 type: number
 *             required:
 *               - itemID
 *     responses:
 *       200:
 *         description: Sản phẩm đã được thêm vào giỏ hàng thành công
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */

/**
 * @swagger
 * /remove_from_cart:
 *   post:
 *     summary: Xóa sản phẩm khỏi giỏ hàng của người dùng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemID:
 *                 type: number
 *             required:
 *               - itemID
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa khỏi giỏ hàng thành công
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */

/**
 * @swagger
 * /get_cart:
 *   get:
 *     summary: Lấy thông tin giỏ hàng của người dùng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin giỏ hàng của người dùng đã được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itemID1:
 *                   type: number
 *                 itemID2:
 *                   type: number
 *                 itemIDn:
 *                   type: number
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */

/**
 * @swagger
 * /get_products:
 *   get:
 *     summary: Lấy danh sách tất cả các sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách tất cả các sản phẩm đã được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: string
 *                   new_price:
 *                     type: number
 *                   old_price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   date:
 *                     type: date
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /new_collection:
 *   get:
 *     summary: Lấy danh sách sản phẩm mới nhất
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm mới nhất
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: string
 *                   new_price:
 *                     type: number
 *                   old_price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   date:
 *                     type: date
 *                   available:
 *                     type: boolean
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /add_product:
 *   post:
 *     summary: Thêm một sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã được thêm thành công
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /delete_product:
 *   delete:
 *     summary: Xóa một sản phẩm
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa thành công
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /search_products:
 *   post:
 *     summary: Tìm kiếm sản phẩm theo tên
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm được tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   category:
 *                     type: string
 *                   new_price:
 *                     type: number
 *                   old_price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   date:
 *                     type: date
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /get_orders:
 *   get:
 *     summary: Lấy danh sách đơn hàng của người dùng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách các đơn hàng của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   user:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: number
 *                       username:
 *                         type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: number
 *                         name:
 *                           type: string
 *                         image:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         price:
 *                           type: number
 *                   total:
 *                     type: number
 *                   address:
 *                     type: string
 *                   phoneNumber:
 *                     type: number
 *                   status:
 *                     type: string
 *                   date:
 *                     type: date
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /update_order_status:
 *   post:
 *     summary: Cập nhật trạng thái đơn hàng
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trạng thái đơn hàng đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: true
 *                 message:
 *                   type: string
 *                   description: Order status updated successfully
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */


/**
 * @swagger
 * /delete_order:
 *   delete:
 *     summary: Xóa đơn hàng
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Đơn hàng đã được xóa thành công
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /product/{productId}/add_review:
 *   post:
 *     summary: Thêm nhận xét cho một sản phẩm
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nhận xét đã được thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: true
 *                 message:
 *                   type: string
 *                   description: Review added successfully
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /product/{productId}/reviews:
 *   get:
 *     summary: Lấy tất cả các nhận xét của một sản phẩm
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách các nhận xét của sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *                   date:
 *                     type: date
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /get_reviews:
 *   get:
 *     summary: Lấy tất cả các nhận xét
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Danh sách tất cả các nhận xét
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *                   date:
 *                     type: string
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
