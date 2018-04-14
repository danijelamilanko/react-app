import  mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}, {timestamp: true});

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash)
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email,
        username: this.username,
    }, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        username: this.username,
        token: this.generateJWT()
    }
};

export default mongoose.model('User', schema);