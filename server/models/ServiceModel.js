const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema(
  {
    organization: {
      type: String,
      required: true,
      index: { unique: true },
      trim: true,
      minlength: 3,
    },
    services: {
      type: Array,
      required: true,
    },
    website: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      subrub: {
        type: String,
      },
      postcode: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    mode: {
      type: Array,
      required: true,
    },
    body: {
      type: String,
    },
    note: {
      type: String,
    },
    image: {
      type: String,
    },
    createduser: {
      type: String,
      required: true,
      trim: true,
    },
    updateduser: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);
