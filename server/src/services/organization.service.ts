import { Organization, OrganizationModel } from '../models/organization.model';
import logger from '../utils/logger';

export class OrganizationService {

    constructor() {}

    async createOrganization(userDetails: Organization): Promise<[null | any, Organization | null]> {
        try {
            const user = new OrganizationModel(userDetails);
            const savedOrganization = await user.save();
            return [null, savedOrganization];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }

    async updateOrganization(userId: string, userDetails: Organization): Promise<[null | any, Organization | null]> {
        try {
            const updatedOrganization = await OrganizationModel.findByIdAndUpdate(userId, userDetails, { new: true });
            return [null, updatedOrganization]
        } catch (error) {
            logger.error('Error', error);
            return [error, null]
        }
    }

    async deleteOrganization(userId: string): Promise<[null | any, Organization | null]> {
        try {
            const deletedOrganization = await OrganizationModel.findByIdAndDelete(userId);
            return [null, deletedOrganization];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }

    async getOrganizations(): Promise<[null | any, Array<Organization> | null]> {
        try {
            const users = await OrganizationModel.find().maxTimeMS(5000);
            if (!users || users.length === 0) {
                return [null, []];
            }
            return [null, users];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }

    async getOrganizationById(userId: string): Promise<[null | any, Organization | null]> {
        try {
            const user = await OrganizationModel.findById(userId);
            return [null, user];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }
}
