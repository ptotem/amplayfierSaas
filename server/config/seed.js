/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Portal = require('../api/portal/portal.model');
var StoryBoard = require('../api/storyboard/storyboard.model');
var Game = require('../api/game/game.model');
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

// Portal.find({}).remove(function() {
//   Portal.create({
//     uname: "myfirstportal",
//     name: "My First Portal",
//     role: "Admin",
//     userId: "5523b3ede6e496494b1260db"
//   }, {
//     uname: "sassportal",
//     name: "Sass Portal",
//     role: "Admin",
//     userId: "5523b3ede6e496494b1260db"
//   }, {
//     uname: "dportal",
//     name: "Deployment Portal",
//     role: "Player",
//     userId: "5523b3ede6e496494b1260db"
//   }, {
//     uname: "bportal",
//     name: "Build Portal",
//     role: "Player",
//     userId: "5523b3ede6e496494b1260db"
//   })
// });


var generateStoryBoardData = function() {
  var data = [];
  var productCategory = ["Slide Template", "Game Template"];
  var difficulty = ["Basic", "Intermediate", "Advance"];
  var imageList = ["assets/images/wrappers/1.gif", "assets/images/wrappers/2.gif", "assets/images/wrappers/3.gif", "assets/images/wrappers/4.gif", "assets/images/wrappers/5.gif", "assets/images/wrappers/adventure.png", "assets/images/wrappers/batman.png", "assets/images/wrappers/Flash.png", "assets/images/wrappers/Hawkgirl.png", "assets/images/wrappers/John_Stewart_JLU.png", "assets/images/wrappers/SupermanJLU.png", "assets/images/wrappers/Wonder_Woman.png"];
  // var storyConfig =
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
    // obj.storyConfig = storyConfig;
    obj.storyConfig = {
      name: obj.name,
      imgsrc: "assets/images/wrappers/",
      background: obj.backgroundImage.split('/')[obj.backgroundImage.split('/').length - 1],
      portraitBackground: "backgroundportrait.jpg",
      offline: true,
      formal: false,
      currency: {
        name: "Gold",
        image: "currency.gif",
        start: 347,
        px: 90,
        py: 5,
        width: 5,
        portraitpx: -20,
        portraitpy: 65,
        portraitwidth: 75
      },
      zone: {
        px: 12,
        py: 8,
        background: "",
        magnification: 1.2
      },
      presenter: {
        image: "gamepresenter.png",
        px: 70,
        py: 20,
        width: 40,
        portraitpx: -20,
        portraitpy: 65,
        portraitwidth: 75
      },
      nameplate: {
        image: "nameplate.png",
        px: 68,
        py: 65,
        width: 35,
        reduced: 35,
        portraitpx: 43,
        portraitpy: 82,
        portraitwidth: 60
      },
      nodestyle: {
        incomplete: "",
        complete: "complete.png",
        active: "click-here.gif",
        hover: "",
        popovers: true,
        align: "",
        titleSize: "",
        titleColor: "",
        descSize: "",
        descColor: ""
      },
      nodes: [{
        title: "Start the Mission ",
        incomplete: "",
        complete: "",
        active: "",
        photo: "beach.jpg",
        description: "Get an introduction to the game",
        deckable: true,
        sequence: 0,
        px: 49,
        py: 63,
        width: 5
      }, {
        title: "Meet the Insider",
        incomplete: "",
        complete: "",
        active: "",
        photo: "insider.jpg",
        description: "What is it",
        deckable: true,
        sequence: 1,
        px: 57,
        py: 28,
        width: 5
      }, {
        title: "Eavesdropping",
        incomplete: "",
        complete: "",
        active: "",
        photo: "eaves.jpg",
        description: "What is it for",
        deckable: true,
        sequence: 2,
        px: 27,
        py: 31,
        width: 5
      }, {
        title: "Research Laboratory",
        incomplete: "",
        complete: "",
        active: "",
        photo: "research.jpg",
        description: "Where can I use it",
        deckable: true,
        sequence: 3,
        px: 40,
        py: 25,
        width: 5
      }, {
        title: "Extraction Point",
        incomplete: "",
        complete: "",
        active: "",
        photo: "evacuation.jpg",
        description: "",
        deckable: false,
        sequence: 4,
        px: 21,
        py: 17,
        width: 5
      }]
    }

    data.push(obj);
    console.log(obj.storyConfig);
  }
  // console.log(data[5].storyConfig);
  StoryBoard.find({}).remove(function() {
    StoryBoard.create(data, function() {
      console.log("Added");
    })
  });
}

var loadGameData = function() {
  Game.find().remove(function() {
    Game.create({
      name: "Blank Man",
      title: "BlankMan",
      description: "A game where you fill in the blanks with a word. You can put in a bank of questions and customize them as per your requirements. </br> The game has a simple design aesthetic and can be used easily across use cases.",
      backgroundImage: "/public/games/BlankMan/image.png",
      approach: "Quiz Style",
      replayValue: "Low",
      setup: "Easy",
      customizability: "Easy",
      gamePath: "/public/games/BlankMan/index.html",
      info: "Game",
      active: true
    }, {
      name: "MindToss",
      title: "MindToss",
      description: "A game where you select a set of words which you need to categorize into one of two sets. </br> The game requires a complex design a esthetic and should be used only if you can create appropriate images for the two categories.",
      backgroundImage: "/public/games/ThisOrThat/image.png",
      approach: "Quiz Style",
      replayValue: "Low",
      setup: "Easy",
      customizability: "Complex",
      gamePath: "/public/games/ThisOrThat/index.html",
      info: "Game",
      active: true
    }, function() {
      console.log("Game loaded");
    })
  })
}

// generateStoryBoardData();
// loadGameData();


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