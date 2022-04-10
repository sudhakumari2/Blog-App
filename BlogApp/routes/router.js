const express = require('express');
const router = express.Router();
const { authenticateToken}=require('../jwt/auth')
const userController = require('../controller/user');
const UserPostController = require('../controller/user_post')
const UserLikeController = require('../controller/like_dislike');
router.post('/user-post',userController.register)
router.get('/user-login', userController.user_login, authenticateToken)
router.post('/create-post',UserPostController.create_post)
router.put('/update-post/:userId',UserPostController.update_post)
router.get('/get-post',UserPostController.getdata)
router.delete('/delete-post/:userId', UserPostController.delete_post)
router.get('/getbyId/:userId', UserPostController.getData)
router.post('/like-post', authenticateToken, UserLikeController.like)
router.put('/like/:postId', UserLikeController.edit_like)
router.put('/dislike/:postId', UserLikeController.edit_dislike)
module.exports = router;