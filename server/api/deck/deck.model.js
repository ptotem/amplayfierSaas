'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DeckSchema = new Schema({
  name: String,
  deckType: String,
  slides: Array,
  portalId: {
    type: Schema.Types.ObjectId,
    rel: 'Portal'
  },
  nodeNo: Number,
  info: String,
  sequence: Number,
  active: Boolean
});

module.exports = mongoose.model('Deck', DeckSchema);