import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
    },
    address: { type: String, trim: true },
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
  },
  { timestamps: true }
);

customerSchema.index({ email: 1 });
customerSchema.index({ phone: 1 });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
