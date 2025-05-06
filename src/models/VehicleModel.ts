import mongoose from 'mongoose';

const { Schema } = mongoose;

const vehicleSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1886 },
    vin: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      uppercase: true,
      match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Please enter a valid VIN'],
    },
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  },
  { timestamps: true }
);

vehicleSchema.index({ vin: 1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
