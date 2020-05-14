const mongoose = require('mongoose');

const ReasonSchema = mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 3,
    },
    createduser: {
      type: String,
      trim: true,
    },
    updateduser: {
      type: String,
      trim: true,
    },
    symbol: {
      type: String,
      trim: true,
    },
    questions: [
      {
        question: {
          type: String,
          trim: true,
        },
        service: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reason', ReasonSchema);
