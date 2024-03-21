import mongoose, { Document,ObjectId, Schema } from "mongoose";

export interface Organization extends Document {
    _id?: ObjectId;
    name: string;
    address: string
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
    },
    {
        timestamps: true,
    }
)

export const OrganizationModel = mongoose.model<Organization>('organizations', OrganizationSchema);