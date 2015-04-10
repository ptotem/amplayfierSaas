var storyConfig = {
  name: "The Amplayfier Blueprints",
  imgsrc: "assets/images/editor/",
  background: "story-background.jpg",
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
};