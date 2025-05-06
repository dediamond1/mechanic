import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ['employee', 'admin', 'manager'],
      default: 'employee',
    },
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
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  },
  { timestamps: true }
);

employeeSchema.index({ email: 1 });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
