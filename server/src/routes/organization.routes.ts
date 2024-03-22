import { Router } from "express";
import { OrganizationController } from "../controllers/organisation.controller";
import { ValidationChain, body } from "express-validator";
import passport from "passport";
import { isAuthorizedRole } from "../middlewares/passport.config";

const validateOrganizationDetails = [
    body('name').notEmpty().isString(),
    body('address').optional().notEmpty().isString(),
];

const validateUpdateOrganizationDetails: ValidationChain[] = [
    body('name').optional().notEmpty().isString(),
    body('address').optional().notEmpty().isString(),
];

const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.post('/', passport.authenticate('jwt', { session: false }), validateOrganizationDetails, organizationController.createOrganization.bind(organizationController));
organizationRouter.put('/:organizationId', passport.authenticate('jwt', { session: false }), isAuthorizedRole(['admin']), validateUpdateOrganizationDetails, organizationController.updateOrganization.bind(organizationController));
organizationRouter.delete('/:organizationId', passport.authenticate('jwt', { session: false }), isAuthorizedRole(['admin']), organizationController.deleteOrganization.bind(organizationController));
organizationRouter.get('/', organizationController.getOrganizations.bind(organizationController));
organizationRouter.get('/:organizationId', passport.authenticate('jwt', { session: false }), isAuthorizedRole(['admin']), organizationController.getOrganizationById.bind(organizationController));

export default organizationRouter;