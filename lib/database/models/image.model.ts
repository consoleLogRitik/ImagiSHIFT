import { Document, Schema, model, models } from "mongoose";

export interface IImage extends Document {
    title: string;  // Title of the image
    transformationType: string; // Type of transformation applied
    publicId: string; // Cloudinary or other storage public ID
    secureURL: string; // Secure URL to access the image
    width?: number; // Optional width of the image
    height?: number; // Optional height of the image
    config?: object; // Additional transformation config (optional)
    transformationUrl?: string; // Final transformed image URL (optional)
    aspectRatio?: string; // Aspect ratio of the image (optional)
    color?: string; // Color information (optional)
    prompt?: string; // Text prompt used for generation (optional)
    author: { // Object containing author details
      _id: string;
      firstName: string;
      lastName: string;
    };
    createdAt?: Date; // Auto-generated timestamp (optional)
    updatedAt?: Date; // Auto-generated timestamp (optional)
  }
  

const ImageSchema = new Schema({
    title: { type: String, required: true }, // Required title
    transformationType: { type: String, required: true }, // Required transformation type
    publicId: { type: String, required: true }, // Unique ID from cloud storage
    secureURL: { type: String, required: true }, // Secure image URL
    width: { type: Number }, // Optional width
    height: { type: Number }, // Optional height
    config: { type: Object }, // Optional transformation config
    transformationUrl: { type: String }, // Optional transformed image URL
    aspectRatio: { type: String }, // Optional aspect ratio
    color: { type: String }, // Optional color details
    prompt: { type: String }, // Optional text prompt
    author: { type: Schema.Types.ObjectId, ref: 'User' }, // References the User model
    createdAt: { type: Date, default: Date.now }, // Default timestamp
    updatedAt: { type: Date, default: Date.now } // Default timestamp
  });
  

export const Image = models?.Image || model('Image', ImageSchema);
