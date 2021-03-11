import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileControllers';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', ensureAuthenticated, profileController.update);


export default profileRouter;
