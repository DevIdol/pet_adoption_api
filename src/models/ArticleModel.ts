import { Schema, model } from "mongoose";

const petArticleSchema = new Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required:true
  }
}, {
  timestamps: true
})

export default model("Article", petArticleSchema);