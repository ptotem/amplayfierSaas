'use strict';

var express = require('express');
var controller = require('./deck.controller');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id/:userId', controller.destroy);
router.post('/portal/addPPTDeck', multipartMiddleware, controller.addPPTDeck)
router.post('/portal/updatePPTDeck/:id', multipartMiddleware, controller.updatePPTDeck);
router.get('/portal/showDeckByPortal/:id', controller.showDeckByPortal);
router.post('/moveTo/node/:nodeNo/:deckId/:userId', controller.moveToNode);

module.exports = router;