'use strict';

var _ = require('lodash');
var Deck = require('./deck.model');
var fs = require('fs-extra');
var path = require('path');
var config = require('../../config/environment');
require('shelljs/global');

// Get list of decks
exports.index = function(req, res) {
  Deck.find(function(err, decks) {
    if (err) {
      return handleError(res, err);
    }
    var version = exec('node --version', function(status, output) {
      console.log("Status:" + status);
      console.log("Output:" + output);
    });

    return res.json(200, decks);
  });
};

// Get a single deck
exports.show = function(req, res) {
  Deck.findById(req.params.id, function(err, deck) {
    if (err) {
      return handleError(res, err);
    }
    if (!deck) {
      return res.send(404);
    }

    return res.json(deck);
  });
};

// Creates a new deck in the DB.
exports.create = function(req, res) {
  Deck.create(req.body, function(err, deck) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, deck);
  });
};

// Updates an existing deck in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Deck.findById(req.params.id, function(err, deck) {
    if (err) {
      return handleError(res, err);
    }
    if (!deck) {
      return res.send(404);
    }
    var updated = _.merge(deck, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, deck);
    });
  });
};

// Deletes a deck from the DB.
exports.destroy = function(req, res) {
  Deck.findById(req.params.id, function(err, deck) {
    if (err) {
      return handleError(res, err);
    }
    if (!deck) {
      return res.send(404);
    }
    deck.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.addPPTDeck = function(req, res) {
  fs.readFile(req.files.file.path, function(err, data) {
    var fileName = req.files.file.name;
    var dir = config.root + "/client/public/users/" + req.body.userId;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, 511);
      var portalDir = dir + "/portals/" + req.body.portalId;
      fs.mkdirSync(portalDir, 511);
      var newDeck = portalDir + "/" + fileName;
      fs.writeFile(newDeck, data, function(err) {
        res.json(200, {
          status: "ok"
        });
      });
    } else {
      var portalDir = dir + "/portals"
      if (!fs.existsSync(portalDir)) {
        fs.mkdirSync(portalDir, 511);
        fs.mkdirSync(portalDir + "/" + req.body.portalId, 511);
        var newDeck = portalDir + "/" + req.body.portalId + "/" + fileName;
        fs.writeFile(newDeck, data, function(err) {
          res.json(200, {
            status: "ok"
          });
        });
      } else {
        var thisPortalDir = portalDir + "/" + req.body.portalId;
        if (!fs.existsSync(thisPortalDir)) {
          fs.mkdirSync(thisPortalDir, 511);
          var newDeck = thisPortalDir + "/" + fileName;
          fs.writeFile(newDeck, data, function(err) {
            res.json(200, {
              status: "ok"
            });
          });
        } else {
          var newDeck = thisPortalDir + "/" + fileName;
          fs.writeFile(newDeck, data, function(err) {
            res.json(200, {
              status: "ok"
            });
          });
        }
      }
    }
  });
}

exports.addPPTDeck = function(req, res) {
  Deck.create({
    name: req.body.name
  }, function(err, deck) {
    if (err) {
      handleError(res, err);
    }
    fs.readFile(req.files.file.path, function(err, data) {
      var fileName = req.files.file.name;
      var dir = config.root + "/client/public/users/" + req.body.userId + "/portals/" + req.body.portalId + "/decks/" + deck._id;
      if (!fs.existsSync(dir)) {
        fs.mkdirsSync(dir, 511);
        var newDeck = dir + "/" + fileName;
        fs.writeFile(newDeck, data, function(err) {
          var slideDir = fs.mkdirsSync(dir + "/slides", 511);
          createPPTImg(slideDir, newDeck, fileName, res);

        });
      }
    });
  });

}

function handleError(res, err) {
  return res.send(500, err);
}

var createPPTImg = function(dir, file, fileName, res) {
  //soffice --headless --invisible --convert-to pdf --outdir /home/sunny/Downloads/ /home/sunny/Downloads/1.ppt
  var command = 'soffice --headless --invisible --convert-to pdf --outdir ' + dir + ' ' + file;
  console.log(command);
  var version = exec(command, function(status, output) {
    console.log("Status:" + status);
    console.log("Output:" + output);
    // res.json(200, {
    //   status: "ok"
    // });
    var child = exec('convert ' + dir + "/" + fileName.replace(/.pptx|.ppt/, '.pdf') + ' ' + dir + "/" + fileName.replace(/.pptx|.ppt/, '.jpg'), function(error, stdout, stderr) {
      if (error) {
        console.log("Error Im");
        console.log(error);
      }
      console.log("Output:" + stdout);
      res.json(200, {
        status: "ok"
      });
    });
  });
}