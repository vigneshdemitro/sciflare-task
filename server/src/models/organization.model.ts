import mongoose, { Document,ObjectId, Schema } from "mongoose";
import { User } from "./user.model";

export interface Organization extends Document {
    _id?: ObjectId;
    name: string;
    address: string;
    users?: User[];
}

const OrganizationSchema: Schema<Organization> = new Schema<Organization>(
    {
        name: {
            required: true,
            type: String,
        },
        address: {
            type: String,
        },
        users: {
            type: Array<User>,
        }
    },
    {
        timestamps: true,
    }
);

// OrganizationSchema.virtual('users', {
//     localField: '_id',
//     foreignField: 'organizationId',
//     ref: 'users',
//     justOne: false,
//     options: {
//         fields: 'name email gender role'
//     }
// });

export const OrganizationModel = mongoose.model<Organization>('organizations', OrganizationSchema);