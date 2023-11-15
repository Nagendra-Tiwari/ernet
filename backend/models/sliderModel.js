import mongoose from 'mongoose';

const sliderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false, // Set the default value to false if not provided
    },
  },
  {
    timestamps: true,
  }
);

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;
