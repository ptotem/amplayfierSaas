var config = {};

//----------------------------------------------------
// Set Game Config
//----------------------------------------------------

config.maxTime=99;
config.trueImg='true.png';
config.falseImg='false.png';
config.timed=true;
config.replayable=true;
config.questionCount=4;

config.mainPage = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img src='assets/img/back.jpg'/>"
        }
    ],
    locations: [
        {name: "gameheader", states: [
            {name: "default", representation: "BlankMan"}
        ]
        },        
        {name: "answerbox", states: [
            {name: "default", representation: "<input type='text'/><img id='blankmanSubmit' src='assets/img/enter.png'/>"}
        ]
        },        
        {name: "result", states: [
            {name: "correct", representation: "<img src='assets/img/correct.png'/>"},
            {name: "incorrect", representation: "<img src='assets/img/incorrect.png'/>"},
            {name: "timeup", representation: "<img src='assets/img/timeup.png'/>"},
            {name: "default", representation: ""},
        ]
        },
        {name: "score", states: [
            {name: "final", representation: "You scored <br/><span id='scoreBlock'></span>%"},
            {name: "default", representation: ""}
        ]
        },
        {name: "timer", states: [
            {name: "default", representation: ""}
        ]
        },
        {name: "replay", states: [
            {name: "active", representation: "<a href='#' onclick='initGame()'><img src='assets/img/replay.png'/></a>"},
            {name: "default", representation: ""}
        ]
        }
    ]
};

config.progressBar = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: ""
        }
    ],
    locations: function(){
        var locArray=[];
        for(var i=0;i<config.questionCount;i++){
            locArray.push({name: "progressBarUnit"+i, states: [
                {name: "correct", representation: "<div class='correctProgress'></div>"},
                {name: "incorrect", representation: "<div class='incorrectProgress'></div>"},
                {name: "default", representation: ""},
        ]
        })
        }
        return locArray;
    }()
};




