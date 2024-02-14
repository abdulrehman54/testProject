const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      // array of movie genre
      type: [String],
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } }
);

module.exports = mongoose.model("Movie", MovieSchema);
