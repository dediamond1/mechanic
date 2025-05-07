import mongoose from 'mongoose';
const { Schema } = mongoose;

const serviceRecordSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    servicesPerformed: [{ type: String }],
    partsUsed: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
    laborCost: { type: Number, required: true },
    notes: { type: String },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('ServiceRecord', serviceRecordSchema);
