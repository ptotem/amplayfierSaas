'use strict';

var _ = require('lodash');
var Portal = require('./portal.model');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var config = require('../../config/environment');

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
    // console.log(req.body);
    var updated = _.merge(portal, req.body);
    // console.log(updated);
    updated.save(function(err, r) {
      if (err) {
        return handleError(res, err);
      } else {
        console.log(portal.storyConfig);
        return res.json(200, portal);
      }
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

exports.addBackground = function(req, res) {
  console.log("in side this add background")
  fs.readFile(req.files.file.path, function(err, data) {
    var imageName = req.files.file.name;
    console.log(data);
    if (!imageName) {
      res.end();

    } else {

      var dir = config.root + "/client/assets/images/wrappers";
      var newPath = dir + "/" + imageName;
      fs.writeFile(newPath, data, function(err) {
        if (err) {

          console.log(err);
          handleError(res, err);
        }
        console.log("Completed");
        Portal.update({
          _id: mongoose.Types.ObjectId(req.body.portalId)
        }, {
          $set: {
            "storyConfig.background": imageName
          }
        }, function(err, user) {
          if (err) {
            handleError(res, err);
            console.log(err);
          }
          if (user) {
            Portal.findById(req.body.portalId, function(err, portal) {
              if (err) {
                return handleError(res, err);
              }
              if (!portal) {
                return res.send(404);
              }
              return res.json(portal);
            });
          }
        });
      });
    }
  });
}

exports.changePresenter = function(req, res) {
  console.log("in side this add background")
  fs.readFile(req.files.file.path, function(err, data) {
    var imageName = req.files.file.name;
    console.log(data);
    if (!imageName) {
      res.end();

    } else {

      var dir = config.root + "/client/assets/images/wrappers";
      var newPath = dir + "/" + imageName;
      fs.writeFile(newPath, data, function(err) {
        if (err) {

          console.log(err);
          handleError(res, err);
        }
        console.log("Completed");
        Portal.update({
          _id: mongoose.Types.ObjectId(req.body.portalId)
        }, {
          $set: {
            "storyConfig.presenter.image": imageName
          }
        }, function(err, user) {
          if (err) {
            handleError(res, err);
            console.log(err);
          }
          if (user) {
            Portal.findById(req.body.portalId, function(err, portal) {
              if (err) {
                return handleError(res, err);
              }
              if (!portal) {
                return res.send(404);
              }
              return res.json(portal);
            });
          }
        });
      });
    }
  });
}

exports.changeNamePlate = function(req, res) {
  console.log("in side this add background")
  fs.readFile(req.files.file.path, function(err, data) {
    var imageName = req.files.file.name;
    console.log(data);
    if (!imageName) {
      res.end();

    } else {

      var dir = config.root + "/client/assets/images/wrappers";
      var newPath = dir + "/" + imageName;
      fs.writeFile(newPath, data, function(err) {
        if (err) {

          console.log(err);
          handleError(res, err);
        }
        console.log("Completed");
        Portal.update({
          _id: mongoose.Types.ObjectId(req.body.portalId)
        }, {
          $set: {
            "storyConfig.nameplate.image": imageName
          }
        }, function(err, user) {
          if (err) {
            handleError(res, err);
            console.log(err);
          }
          if (user) {
            Portal.findById(req.body.portalId, function(err, portal) {
              if (err) {
                return handleError(res, err);
              }
              if (!portal) {
                return res.send(404);
              }
              return res.json(portal);
            });
          }
        });
      });
    }
  });
}

exports.updatePosition = function(req, res) {
    Portal.update({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, {
      $set: {
        storyConfig: req.body.storyConfig
      }
    }, function(err, portal) {
      if (err) {
        handleError(res, err);
      }
      if (!portal) {
        res.send(404);
      } else {
        res.json(200, portal)
      }

    })

  }
  //
  // exports.showPortalsWithNode = function(req, res) {
  //   Portal.find({
  //     _id: mongoose.Types.ObjectId(req.params._id)
  //   }).populate({model:'Cycle',path:'cycleId'}).exec(function(err, portal) {
  //     if (err) {
  //       handleError(res, err);
  //     }
  //     if (!portal) {
  //       res.send(404);
  //     }
  //     res.json(200, portal)
  //   });
  // }

function handleError(res, err) {
  return res.send(500, err);
}