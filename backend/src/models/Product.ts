import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    minlength: 5,
    max_length: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // default
  },
  InStock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: Array<String>,
    required: true,
    default: [],
    validate: [
      (v: string[]) => v.length <= 10,
      "Number of images should not exceed 10.",
    ],
  },
  sizes : {
    type : Array<String>,
    required : true,
    validate : [
      (v: string[]) => v.length > 0,
      "At least one weight should be provided.",
    ],
  }, 
  categories: {
    type: Array<String>,
    required: true,
    default: [],
    validate: [
      (v: string[]) => v.length > 0,
      "At least one category should be provided.",
    ],
  },
  rate : {
    type : Number,
    default : 1,
    min : 1,
    max : 5
  },
  features: {
    type : Array<String>,
    default : [],
  },
  availability : {
    type : String,
    default : "In Stock"
  },
  reviews: {
    type : Array,
    default : []    
  },
  relatedProducts: {
    type : Array,
    default : [],
    validate: [
      (v: string[]) => v.length <= 8,
      "Number of related products should not exceed 8.",
    ],    
  },
  totalSales: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const productModel = mongoose.model("products", productSchema, "products");

export default productModel;