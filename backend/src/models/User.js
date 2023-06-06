import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from 'mongoose-findorcreate';

const { Schema } = mongoose;

// Create new schema for user model
const UserSchema = new Schema({
	displayName: {
		type: String,
		required: true,
	},
	googleId: {
		type: String,
		default: null,
	},
});

UserSchema.plugin(findOrCreate);
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

export default User;
