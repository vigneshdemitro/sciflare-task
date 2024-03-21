import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import { createResponse } from "../utils/utils";
import { configDotenv } from "dotenv";
import { MongooseError } from "mongoose";
import { compare } from "bcrypt";
configDotenv();

const AuthRouter = Router();

AuthRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as Partial<User>;
    try {
        const user = await UserModel.findOne({ email }).populate('organizationDetails');
        if (!user) {
            return createResponse(res, { status: false, payload: { message: 'Invalid email or password' } });
        }
        const isValidPassword = await compare(password!, user.password);
        if (!isValidPassword) {
            return createResponse(res, { status: false, payload: { message: 'Incorrect password' } });
        }
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET || 'check')
        const userDetails = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            organizationDetails: user.organizationDetails,
            token,
        };
        return createResponse(res, { status: true, payload: userDetails });
    } catch (error) {
        let errors = error;
        if (error instanceof MongooseError) errors = error.message;
        return createResponse(res, { status: false, payload: errors });
    }

});

export default AuthRouter;
