'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PortalSchema = new Schema({
  name: String,
  info: String,
  role: String,
  active: Boolean,
  uname: {
    type: String,
    uniq: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    rel: 'User'
  },
  storyConfig: Object,
  storyBoardId: {
    type: Schema.Types.ObjectId,
    rel: 'Storyboard'
  }
});

module.exports = mongoose.model('Portal', PortalSchema);