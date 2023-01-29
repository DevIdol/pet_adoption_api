import { Schema, model } from "mongoose";

const donateSchema = new Schema({
  itemName: {
    type: String,
    required:true
  },
  quantity: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  }
}, {
  timestamps:true
})

export default model("Donation", donateSchema);