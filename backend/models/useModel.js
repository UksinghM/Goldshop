const {Schema, model} = require('../connection');

const userSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    city: {type: String, default: 'No City'},
    role: {type: String, default: 'user', enum: ['user', 'admin']},
    createdAt: {type: Date, default: Date.now},
});

module.exports = model('users', userSchema);