import mongoose from 'mongoose';

const { Schema } = mongoose;

const partItemSchema = new Schema({
  name: { type: String, required: true },
  partNumber: { type: String, required: true },
  condition: {
    type: String,
    enum: ['new', 'used', 'refurbished'],
    default: 'new',
  },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const serviceRecordSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    description: { type: String },
    partsUsed: [partItemSchema],
    laborCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceRecordSchema);
