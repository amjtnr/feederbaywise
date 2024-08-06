import JWT from 'jsonwebtoken';
import argon2 from 'argon2';

export const hashPassword = async (password) => {
    try{
        const hashPassword = await argon2.hash(password);
        // const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }catch(err){
        throw new Error(err);
    }
}

export const comparePassword = async (password, hashPassword) => {
    try{
        const result = await argon2.verify(password, hashPassword);
        // const result = await bcrypt.compare(password, hashPassword);
        return result;
    }catch(err){
        throw new Error(err);
    }
} 


export const generateToken = async (id,role,DIVISION_NAME,CIRCLE_NAME,ZONE_NAME,DISCOM_NAME) => {
    try{
        const token = JWT.sign({loginID:id,role,DIVISION_NAME,CIRCLE_NAME,ZONE_NAME,DISCOM_NAME}, process.env.JWT_SECRET, {
            expiresIn: 8640
        });
        return token;
    }catch(err){
        throw new Error(err);
    }
}

export const decodeToken = async (token) => {
    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        return decoded;
    }catch(err){
        throw new Error(err);
    }
}