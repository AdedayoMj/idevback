import express from 'express';
import controller from '../controllers/htmlStats';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:statID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:statID', controller.update);
router.delete('/:statID', controller.deleteStats);

export = router;