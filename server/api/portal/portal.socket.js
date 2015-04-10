/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Portal = require('./portal.model');

exports.register = function(socket) {
  Portal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Portal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('portal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('portal:remove', doc);
}