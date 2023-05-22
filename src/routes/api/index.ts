import express from 'express';
const router = express.Router();
import projectsRouter from './projects';
import securityRouter from './security';
import teamsRouter from './teams';

router.use('/projects', projectsRouter);
router.use('/security', securityRouter);
router.use('/teams', teamsRouter);


export default router;