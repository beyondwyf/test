import mongoose from 'mongoose';

// Define the Item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model or use the existing one
const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item; 