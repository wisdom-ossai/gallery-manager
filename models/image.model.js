const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const path = require('path');

const ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now() }
});

ImageSchema.virtual('uniqueId').get(function() {
  console.log('file name', this);
  return this.filename.replace(path.extname(this.filename), '');
});

module.exports = mongoose.model('Image', ImageSchema);
