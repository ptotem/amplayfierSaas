'use strict';

var _ = require('lodash');
var Storyboard = require('./storyboard.model');

// Get list of storyboards
exports.index = function(req, res) {
  Storyboard.find(function (err, storyboards) {
    if(err) { return handleError(res, err); }
    return res.json(200, storyboards);
  });
};

// Get a single storyboard
exports.show = function(req, res) {
  Storyboard.findById(req.params.id, function (err, storyboard) {
    if(err) { return handleError(res, err); }
    if(!storyboard) { return res.send(404); }
    return res.json(storyboard);
  });
};

// Creates a new storyboard in the DB.
exports.create = function(req, res) {
  Storyboard.create(req.body, function(err, storyboard) {
    if(err) { return handleError(res, err); }
    return res.json(201, storyboard);
  });
};

// Updates an existing storyboard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Storyboard.findById(req.params.id, function (err, storyboard) {
    if (err) { return handleError(res, err); }
    if(!storyboard) { return res.send(404); }
    var updated = _.merge(storyboard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, storyboard);
    });
  });
};

// Deletes a storyboard from the DB.
exports.destroy = function(req, res) {
  Storyboard.findById(req.params.id, function (err, storyboard) {
    if(err) { return handleError(res, err); }
    if(!storyboard) { return res.send(404); }
    storyboard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}