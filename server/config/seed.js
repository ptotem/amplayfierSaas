/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Portal = require('../api/portal/portal.model');
var StoryBoard = require('../api/storyboard/storyboard.model');
var Faker = require('faker');

Thing.find({}).remove(function() {
  Thing.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Portal.find({}).remove(function() {
  Portal.create({
    uname: "myfirstportal",
    name: "My First Portal",
    role: "Admin",
    userId: "5523b3ede6e496494b1260db"
  }, {
    uname: "sassportal",
    name: "Sass Portal",
    role: "Admin",
    userId: "5523b3ede6e496494b1260db"
  }, {
    uname: "dportal",
    name: "Deployment Portal",
    role: "Player",
    userId: "5523b3ede6e496494b1260db"
  }, {
    uname: "bportal",
    name: "Build Portal",
    role: "Player",
    userId: "5523b3ede6e496494b1260db"
  })
});


var generateStoryBoardData = function() {
  var data = [];
  var productCategory = ["Slide Template", "Game Template"];
  var difficulty = ["Basic", "Intermediate", "Advance"];
  var imageList = ["assets/images/wrappers/1.gif", "assets/images/wrappers/2.gif", "assets/images/wrappers/3.gif", "assets/images/wrappers/4.gif", "assets/images/wrappers/5.gif", "assets/images/wrappers/adventure.png", "assets/images/wrappers/batman.png", "assets/images/wrappers/Flash.png", "assets/images/wrappers/Hawkgirl.png", "assets/images/wrappers/John_Stewart_JLU.png", "assets/images/wrappers/SupermanJLU.png", "assets/images/wrappers/Wonder_Woman.png"];
  for (var i = 0; i < 10; i++) {
    var obj = {};
    obj.name = Faker.name.findName();
    obj.title = obj.name;
    obj.type = productCategory[Math.floor(Math.random() * productCategory.length)];
    obj.noOfChapters = Math.floor(Math.random() * 6) + 1;
    obj.backgroundImage = imageList[Math.floor(Math.random() * imageList.length)];
    obj.description = Faker.lorem.sentences();
    obj.captionTitle = "Chapter";
    obj.difficulty = difficulty[Math.floor(Math.random() * difficulty.length)];
    data.push(obj);
  }
  console.log(data);
  StoryBoard.find({}).remove(function() {
    StoryBoard.create(data, function() {
      console.log("Added");
    })
  });
}
generateStoryBoardData();

//User.find({}).remove(function() {
//  User.create({
//    provider: 'local',
//    name: 'Test User',
//    email: 'test@test.com',
//    password: 'test'
//  }, {
//    provider: 'local',
//    role: 'admin',
//    name: 'Admin',
//    email: 'admin@admin.com',
//    password: 'admin'
//  }, function() {
//      console.log('finished populating users');
//    }
//  );
//});