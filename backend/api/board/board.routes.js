const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addBoard, getBoards, getBoard, updateBoard, deleteBoard } = require('./board.controller')

const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/boards/:type', getBoards)
router.get('/:type/:id', getBoard)
router.post('/', addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', deleteBoard)

module.exports = router