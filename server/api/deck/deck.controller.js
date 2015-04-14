'use strict';

var _ = require('lodash');
var Deck = require('./deck.model');
var fs = require('fs-extra');
var path = require('path');
var config = require('../../config/environment');
var mongoose = require('mongoose');
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
    var deckId = deck._id;
    deck.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      var dir = config.root + "/client/public/users/" + req.params.userId + "/portals/" + deck.portalId + "/nodes/" + deck.nodeNo + "/decks/" + deckId;
      fs.emptyDirSync(dir);
      fs.removeSync(dir);
      return res.send(204);
    });
  });
};

exports.addPPTDeck = function(req, res) {
  Deck.create({
    name: req.body.name,
    portalId: req.body.portalId,
    deckType: req.body.deckType,
    sequence: req.body.sequence,
    nodeNo: req.body.nodeNo
  }, function(err, deck) {
    if (err) {
      handleError(res, err);
    }
    fs.readFile(req.files.file.path, function(err, data) {
      var fileName = req.files.file.name;
      var dir = config.root + "/client/public/users/" + req.body.userId + "/portals/" + req.body.portalId + "/nodes/" + req.body.nodeNo + "/decks/" + deck._id;
      if (!fs.existsSync(dir)) {
        fs.mkdirsSync(dir, 511);
        var newDeck = dir + "/" + fileName;
        fs.writeFile(newDeck, data, function(err) {
          var slideDir = fs.mkdirsSync(dir + "/slides", 511);
          createPPTImg(dir, newDeck, fileName, res, deck);
        });
      }
    });
  });
};

exports.updatePPTDeck = function(req, res) {
  Deck.findOne({
    _id: mongoose.Types.ObjectId(req.params.id)
  }, function(err, deck) {
    if (err) {
      handleError(res, err);
    }
    if (deck) {
      fs.readFile(req.files.file.path, function(err, data) {
        var fileName = req.files.file.name;
        var dir = config.root + "/client/public/users/" + req.body.userId + "/portals/" + req.body.portalId + "/nodes/" + req.body.nodeNo + "/decks/" + deck._id;
        if (!fs.existsSync(dir)) {
          fs.mkdirsSync(dir, 511);
          var newDeck = dir + "/" + fileName;
          fs.writeFile(newDeck, data, function(err) {
            var slideDir = fs.mkdirsSync(dir + "/slides", 511);
            createPPTImg(dir, newDeck, fileName, res, deck);
          });
        } else {
          fs.emptyDirSync(dir);
          var newDeck = dir + "/" + fileName;
          fs.writeFile(newDeck, data, function(err) {
            var slideDir = fs.mkdirsSync(dir + "/slides", 511);
            createPPTImg(dir, newDeck, fileName, res, deck);
          });
        }
      });

    }
  })
}

exports.showDeckByPortal = function(req, res) {
  Deck.find({
    portalId: mongoose.Types.ObjectId(req.params.id)
  }, function(err, decks) {
    if (err) {
      handleError(res, err);
    }
    if (!decks) {
      res.send(404);
    }
    var newDecks = _.map(_.groupBy(decks, 'nodeNo'), function(val, key) {
      return {
        nodeNo: key,
        decks: val
      }
    });
    res.json(200, newDecks);
  });
}

// Function to handle move to diffrent node functionality
exports.moveToNode = function(req, res) {
  Deck.findById(req.params.deckId, function(err, deck) {
    if (err) {
      handleError(res, err);
    }
    if (!deck) {
      res.send(404);
    }
    // dir = config.root+
    var dir = config.root + "/client/public/users/" + req.params.userId + "/portals/" + deck.portalId + "/nodes/" + deck.nodeNo + "/decks/" + deck._id;
    var newDir = config.root + "/client/public/users/" + req.params.userId + "/portals/" + deck.portalId + "/nodes/" + req.params.nodeNo + "/decks/" + deck._id;
    console.log(newDir);
    fs.copy(dir, newDir, function(ferr) {
      if (ferr) return console.error(ferr)
      console.log("success!")
      fs.emptyDirSync(dir);
      fs.removeSync(dir);

      var newSlides = _.map(deck.slides, function(val, key) {
        var d = "/public/users/" + req.params.userId + "/portals/" + deck.portalId + "/nodes/" + deck.nodeNo + "/decks/" + deck._id;
        var nd = "/public/users/" + req.params.userId + "/portals/" + deck.portalId + "/nodes/" + req.params.nodeNo + "/decks/" + deck._id;
        // console.log(d);
        // console.log(nd);
        return {
          name: val.name,
          sequence: val.sequence,
          imagePath: val.imagePath.replace(d, nd)
        }
      });
      console.log(newSlides);
      deck.nodeNo = parseInt(req.params.nodeNo);
      deck.slides = newSlides;
      deck.save(function(serr) {
          if (serr) {
            handleError(res, err);
          }
          res.json(200, deck);
        })
        // console.log(newSlides);
    })
  })
}

function handleError(res, err) {
  return res.send(500, err);
}

var createPPTImg = function(dir, file, fileName, res, deck) {
  var command = 'soffice --headless --invisible --convert-to pdf --outdir ' + dir + ' ' + file.replace(/ /g, "\\ ").replace("(", "\\(").replace(")", "\\)");
  console.log(command);
  var version = exec(command, function(status, output) {
    var child = exec('convert ' + dir + "/" + fileName.replace(/ /g, "\\ ").replace("(", "\\(").replace(")", "\\)").replace(/.pptx|.ppt/, '.pdf') + ' ' + dir + "/slides/" + fileName.replace(/ /g, "\\ ").replace("(", "\\(").replace(")", "\\)").replace(/.pptx|.ppt/, '.jpg'), function(error, stdout, stderr) {
      if (error) {
        console.log("Error Im");
        console.log(error);
      }
      // console.log("Output:" + stdout);
      var list = exec('ls ' + dir + "/slides", function(lsErr, op) {
        if (error) {
          console.log("Error In LS");
          console.log(lsErr);
        }
        var k = op;
        k = k.toString().replace(/\n/g, ",");
        var arr = k.split(",");
        var slides = [];
        arr.forEach(function(val, ind) {
          if (val !== '') {
            var slide = {};
            slide.name = "slide" + val.substring(val.lastIndexOf('-') + 1, val.lastIndexOf("."));
            slide.sequence = parseInt(val.substring(val.lastIndexOf('-') + 1, val.lastIndexOf(".")));
            slide.imagePath = dir.toString().replace(config.root + "/client", "") + "/slides/" + val;
            slides.push(slide);
          }
        })
        console.log(slides);
        deck.slides = slides;
        deck.save(function(derr) {
          if (derr) {
            handleError(res, derr);
          }
          res.json(200, deck)
        })
      });

    });
  });
}