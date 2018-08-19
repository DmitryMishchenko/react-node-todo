const express = require('express');

const controller = require('../controllers/todo');
const router = express.Router();

router.get('/:id', controller.get);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;