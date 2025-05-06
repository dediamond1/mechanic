import mongoose from 'mongoose';

const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

appointmentSchema.index({ appointmentDate: 1 });
appointmentSchema.index({ status: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
