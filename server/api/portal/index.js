'use strict';

var express = require('express');
var controller = require('./portal.controller');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/user/:id', controller.getUserPortals);
router.post('/picture/addBackground', multipartMiddleware, controller.addBackground);
router.post('/picture/changePresenter', multipartMiddleware, controller.changePresenter);
router.post('/picture/changeNamePlate', multipartMiddleware, controller.changeNamePlate);
router.put('/updatePosition/:id', controller.updatePosition);

module.exports = router;