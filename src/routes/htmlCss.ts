import express from 'express';
import controller from '../controllers/htmlCss';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:htmlID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:htmlID', controller.update);
router.delete('/:htmlID', controller.deleteHtml);

export = router;