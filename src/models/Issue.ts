import mongoose from 'mongoose';
const { Schema } = mongoose;

const issueSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'diagnosed', 'resolved'],
      default: 'pending',
    },
    reportedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('Issue', issueSchema);
