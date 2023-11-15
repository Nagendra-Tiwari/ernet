import asyncHandler from '../middleware/asyncHandler.js';
import Slider from '../models/sliderModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getSliders = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Slider.countDocuments({ ...keyword });
  const sliders = await Slider.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ sliders, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getSliderById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const slider = await Slider.findById(req.params.id);
  if (slider) {
    return res.json(slider);
  } else {
    // NOTE: this will run if a valid ObjectId but no slider was found
    // i.e. slider may be null
    res.status(404);
    throw new Error('slider not found');
  }
});

// @desc    Create a slider
// @route   POST /api/sliders
// @access  Private/Admin
const createSlider = asyncHandler(async (req, res) => {
  const slider = new Slider({
    name: 'Sample name',
    user: req.user._id,
    image: '/images/sample.jpg',
   
  });

  const createdSlider = await slider.save();
  res.status(201).json(createdSlider);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateSlider = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const slider = await Slider.findById(req.params.id);

  if (slider) {
    slider.name = name;
    slider.price = price;
    slider.description = description;
    slider.image = image;
    slider.brand = brand;
    slider.category = category;
    slider.countInStock = countInStock;

    const updatedSlider = await slider.save();
    res.json(updatedSlider);
  } else {
    res.status(404);
    throw new Error('Slider not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteSlider = asyncHandler(async (req, res) => {
  const slider = await Slider.findById(req.params.id);

  if (slider) {
    await Slider.deleteOne({ _id: slider._id });
    res.json({ message: 'slider removed' });
  } else {
    res.status(404);
    throw new Error('slider not found');
  }
});


export {
  getSliders,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider,
 
};
