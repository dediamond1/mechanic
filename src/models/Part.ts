import mongoose from 'mongoose';
const { Schema } = mongoose;

const partSchema = new Schema(
  {
    name: { type: String, required: true },
    condition: {
      type: String,
      enum: ['new', 'used', 'refurbished'],
      default: 'new',
    },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    supplier: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Part', partSchema);
