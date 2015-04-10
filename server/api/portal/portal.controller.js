'use strict';

var _ = require('lodash');
var Portal = require('./portal.model');
var mongoose = require('mongoose');

// Get list of portals
exports.index = function(req, res) {
  Portal.find(function(err, portals) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, portals);
  });
};

// Get a single portal
exports.show = function(req, res) {
  Portal.findById(req.params.id, function(err, portal) {
    if (err) {
      return handleError(res, err);
    }
    if (!portal) {
      return res.send(404);
    }
    return res.json(portal);
  });
};

// Creates a new portal in the DB.
exports.create = function(req, res) {
  Portal.create(req.body, function(err, portal) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, portal);
  });
};

// Updates an existing portal in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Portal.findById(req.params.id, function(err, portal) {
    if (err) {
      return handleError(res, err);
    }
    if (!portal) {
      return res.send(404);
    }
    var updated = _.merge(portal, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, portal);
    });
  });
};

// Deletes a portal from the DB.
exports.destroy = function(req, res) {
  Portal.findById(req.params.id, function(err, portal) {
    if (err) {
      return handleError(res, err);
    }
    if (!portal) {
      return res.send(404);
    }
    portal.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

//get user portals
exports.getUserPortals = function(req, res) {
  Portal.find({
    userId: req.params.id
  }, function(err, portals) {
    if (err) {
      return handleError(res, err);
    }
    if (!portals) {
      return res.send(404);
    } else {
      res.json(200, portals);
    }
  });

}

function handleError(res, err) {
  return res.send(500, err);
}