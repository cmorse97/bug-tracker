import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
	title: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
