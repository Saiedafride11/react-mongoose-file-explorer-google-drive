import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["folder", "file"],
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      default: null,
    },
    fileType: {
      type: String,
      enum: ["text", "image"],
      required: function () {
        return this.type === "file"
      },
    },
    content: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
itemSchema.index({ parentId: 1 })
itemSchema.index({ type: 1 })


const Item = mongoose.model("Item", itemSchema)

export default Item
