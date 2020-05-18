const mongoose = require('mongoose');

const ReasonSchema = mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
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
    },
    questions: [
      {
        question: {
          type: String,
        },
        service: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reason', ReasonSchema);
