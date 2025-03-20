import mongoose from 'mongoose';

// 检查模型是否已经存在
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default Item; 