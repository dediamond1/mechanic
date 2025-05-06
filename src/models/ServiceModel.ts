import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Engine', 'Tires', 'Brakes', 'Electrical', 'General'],
      default: 'General',
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
