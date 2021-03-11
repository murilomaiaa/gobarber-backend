import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileControllers';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', ensureAuthenticated, profileController.update);
profileRouter.get('/', profileController.show)

export default profileRouter;
