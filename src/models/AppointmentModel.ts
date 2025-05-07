import mongoose, { Document, Schema } from 'mongoose';

interface Appointment extends Document {
  vehicle: mongoose.Types.ObjectId;
  mechanic: mongoose.Types.ObjectId;
  appointmentDate: Date;
  appointmentType: 'issue' | 'service';
  issue?: mongoose.Types.ObjectId;
  service?: mongoose.Types.ObjectId;
  partsUsed: Array<{
    part: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }>;
  laborCost: number;
  totalCost: number;
}

const appointmentSchema = new Schema<Appointment>(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    mechanic: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentType: {
      type: String,
      enum: ['issue', 'service'],
      required: true,
    },
    issue: {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
      required: function (this: Appointment) {
        return this.appointmentType === 'issue';
      },
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: function (this: Appointment) {
        return this.appointmentType === 'service';
      },
    },
    partsUsed: [
      {
        part: { type: Schema.Types.ObjectId, ref: 'Part' },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    laborCost: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model<Appointment>('Appointment', appointmentSchema);

export default AppointmentModel;
