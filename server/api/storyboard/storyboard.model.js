'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StoryboardSchema = new Schema({
  name: String,
  title: String,
  type: String,
  noOfChapters: Number,
  backgroundImage: String,
  description: String,
  captionTitle: String,
  difficulty: String,
  active: Boolean,
  storyConfig: Object
});

module.exports = mongoose.model('Storyboard', StoryboardSchema);