import mongoose from 'mongoose';

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  flavors: {
    type: Array,
    required: true,
  },
});

export default mongoose.model('cakes', cakeSchema);
