const {Schema, model} = require('../connection');

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('categories', categorySchema);