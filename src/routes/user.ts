import express from 'express';
import controller from '../controllers/user';
import extractFirebaseInfo from '../middleware/extract_firebase_info';

const router = express.Router();

router.get('/validate', extractFirebaseInfo, controller.validate);
router.get('/:userID', controller.read);
router.post('/create', extractFirebaseInfo, controller.create);
router.post('/login', extractFirebaseInfo, controller.login);
router.post('/register', extractFirebaseInfo, controller.register);
router.get('/', controller.readAll);

export = router;
