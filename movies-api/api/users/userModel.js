
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// Compare password helper
UserSchema.methods.comparePassword = async function (passw) {
  return bcrypt.compare(passw, this.password);
};

// Find by username helper
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username });
};

// Pre-save hash (async style, no next)
UserSchema.pre('save', async function () {
  if (this.isModified('password') || this.isNew) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

export default mongoose.model('User', UserSchema);
