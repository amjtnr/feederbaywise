import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
    DIVISION_NAME: String,
    CIRCLE_UID: String,
    rapdrpCode: String,
    mPowerCode_up: String,
    DIVISION_UID: String,
    CIRCLE_NAME: String,
    ZONE_UID: String,
    ZONE_NAME: String,
    DISCOM_UID: String,
    DISCOM_NAME: String,
    ORGANIZATION_UID: String,
    ORGANIZATION_NAME: String,
    mPowerCode: String,
    password: {
        type: String,
        default: "123456"
    },
    isAdmin:{
        type:Number,
        default: 0
    }
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hash = await argon2.hash(user.password);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare a given password with the database hash
userSchema.methods.comparePassword = function(candidatePassword) {
  return argon2.verify(this.password, candidatePassword);
};


userSchema.plugin(mongoosePaginate);

export default mongoose.model('users', userSchema);
