/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Storyboard = require('./storyboard.model');

exports.register = function(socket) {
  Storyboard.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Storyboard.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('storyboard:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('storyboard:remove', doc);
}