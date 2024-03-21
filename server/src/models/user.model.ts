import mongoose, { Document,ObjectId, Schema } from "mongoose";
import { Organization } from "./organization.model";

export interface User extends Document {
    _id?: ObjectId;
    name?: string;
    email: string;
    password: string;
    organizationId: ObjectId;
    role: 'user' | 'admin' | 'super_admin';
    gender?: 'Male' | 'Female' | 'Other';
    organizationDetails? : Organization;
}

const UserSchema: Schema<User> = new Schema<User>(
    {
        name: {
            type: String,
        },
        email: {
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
        organizationId: {
            required: true,
            type: Schema.Types.ObjectId,
        },
        role: {
            required: true,
            type: String,
            enum: ['user', 'admin'],
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.virtual('organizationDetails', {
    localField: 'organizationId',
    foreignField: '_id',
    ref: 'organizations',
    justOne: true,
})

export const UserModel = mongoose.model<User>('users', UserSchema);