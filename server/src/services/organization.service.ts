import mongoose from 'mongoose';
import { Organization, OrganizationModel } from '../models/organization.model';
import { User, UserModel } from '../models/user.model';
import logger from '../utils/logger';

export class OrganizationService {

    constructor() { }

    async createOrganization(organizationDetails: Organization): Promise<[null | any, Organization | null]> {
        try {
            const organization = new OrganizationModel(organizationDetails);
            const savedOrganization = await organization.save();
            return [null, savedOrganization];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }

    async updateOrganization(organizationId: string, organizationDetails: Organization): Promise<[null | any, Organization | null]> {
        try {
            const updatedOrganization = await OrganizationModel.findByIdAndUpdate(organizationId, organizationDetails, { new: true });
            return [null, updatedOrganization]
        } catch (error) {
            logger.error('Error', error);
            return [error, null]
        }
    }

    async deleteOrganization(organizationId: string): Promise<[null | any, Organization | null]> {
        try {
            const deletedOrganization = await OrganizationModel.findByIdAndDelete(organizationId);
            return [null, deletedOrganization];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }

    async getOrganizations(): Promise<[null | any, Array<Organization> | null]> {
        try {
            const organizations = await OrganizationModel.find().maxTimeMS(5000);
            if (!organizations || organizations.length === 0) {
                return [null, []];
            }
            await Promise.all(organizations.map(async (org) => {
                org.users = await UserModel.find({ organizationId: org._id });
            }));
            return [null, organizations];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }

    async getOrganizationById(organizationId: string): Promise<[null | any, Organization | null]> {
        try {
            const organization = await OrganizationModel.findById(organizationId);
            return [null, organization];
        } catch (error) {
            logger.error('Error', error);
            return [error, null];
        }
    }
}
