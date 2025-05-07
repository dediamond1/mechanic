import mongoose from 'mongoose';
const { Schema } = mongoose;

const vehicleSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1886,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Invalid VIN'],
    },
    mileage: {
      type: Number,
      required: false,
      min: 0,
    },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
      },
    ],
    serviceRecords: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ServiceRecord',
      },
    ],
  },
  { timestamps: true }
);

vehicleSchema.index({ vin: 1 });

export default mongoose.model('Vehicle', vehicleSchema);
