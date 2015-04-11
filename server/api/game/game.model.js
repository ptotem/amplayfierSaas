'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  title: String,
  description: String,
  backgroundImage: String,
  approach: String,
  replayValue: String,
  setup: String,
  customizability: String,
  gamePath: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Game', GameSchema);