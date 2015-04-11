var mainPage, progressBar, quizCount, totalScore;

// Set MetaData for reporting 

initMetaData([
    {
        dname: "recordType",
        dtype: "string",
        unique: "false"
    },
    {
        dname: "question",
        dtype: "string",
        unique: "false"
    },
    {
        dname: "result",
        dtype: "boolean",
        unique: "false"
    }
]);

//--------------------------------------------------------------------

$(function () {
    initTheme();
    initQuiz();
    initGame();
});

function initTheme() {
    mainPage = new Environment("mainPage");
    loadConfig(mainPage);
    progressBar = new Environment("progressBar");
    loadConfig(progressBar);
    $('#progressBar .location').css("width", (100 / config.questionCount) + "%");
}

function initGame() {
    quizCount = 1;
    totalScore = 0;
    $('#answerbox').fadeIn(function(){
        $(this).find('input').focus();
    });
    for (i in progressBar.locations) {
        progressBar.locations[i].setState('default');
    }
    mainPage.score.setState("default");
    initAttempt();
    askQuestionNum(quizCount);
}

function askQuestionNum(num) {

    $('#replay').fadeOut();
    $('#answerbox input').val("");
    $('#answerbox input').attr("placeholder",'');
    
    mainPage.result.setState('default');
    mainPage.replay.setState('default');
    paneldisplay(shuffle(Question.all)[0]);
}

function paneldisplay(question) {

    Question.showQuizPanel(quiz, question);

    $("#quiz").fadeIn(500);

    if (!config.timed) {
        $('#timer').hide();
    }
    $('#timer').animate({
        'opacity': 1
    }, 100);

    if (question.image == null || question.image == "") {
        $('#statement-area').css({
            paddingTop: "15%",
            height: "40%"
        });
        $('#question-image').hide();
    } else {
        $('#statement-area').css({
            paddingTop: "5%",
            height: "50%"
        });
        $('#question-image').show();
    }

    var thisAnswer = Question.getAnswer(question, false);

    setTimeout(function () {
        $('#answerbox input').attr('placeholder', thisAnswer.replace(/./gi, "*"));
    }, 2000);

    $("#answerbox input").unbind('keydown').on('keydown',function (e) {
        if (($("#answerbox input").val() != "") && (e.keyCode == 13)) {
            var thisResult = (($('#answerbox input').val().toLowerCase() == thisAnswer.toLowerCase()) ? "correct" : "incorrect");

            reportGameVal({
                "recordType": "Question",
                "question": question.name,
                "result": thisResult
            });
            showEnd(thisResult, 0, ((quizCount == config.questionCount) ? false : true));
        }
    });

    $('#blankmanSubmit').unbind('click').on('click', function () {
        var thisResult = (($('#answerbox input').val().toLowerCase() == thisAnswer.toLowerCase()) ? "correct" : "incorrect");

        reportGameVal({
            "recordType": "Question",
            "question": question.name,
            "result": thisResult
        });
        showEnd(thisResult, 0, ((quizCount == config.questionCount) ? false : true));
    })
}

function showTimer(time) {
    var maxTime = config.maxTime;
    if (time > maxTime) {
        if (config.timed) {
            showEnd("timeup", "", false);
        }
    } else {
        $('#timer').html(parseInt(maxTime - time));
    }
}

function showEnd(result, answer, continuing) {

    switch (result) {
    case "correct":
        mainPage.result.setState("correct");
        totalScore++;
        break;
    case "incorrect":
        mainPage.result.setState("incorrect");
        break;
    case "timeup":
        mainPage.result.setState("timeup");
        break;
    default:
    }

    $('#timer').animate({
        'opacity': 0.1
    }, 100);


    $('#result').fadeIn(function () {
        setTimeout(function () {
            $('#result').effect('puff', function () {
                if (continuing) {
                    progressBar.locations[quizCount - 1].setState(result);
                    askQuestionNum(quizCount++);
                } else {
                    progressBar.locations[quizCount - 1].setState(result);
                    clearInterval(gameTimer);
                    $('#timer').empty();
                    setTimeout(function () {
                        $('#quiz').effect('puff', function () {
                            $('#answerbox').fadeOut();    
                            $('#timer').css('opacity', 0);
                            var finalScore = Math.round(100 * totalScore / config.questionCount);
                            mainPage.score.setState('final');
                            $('#scoreBlock').html(finalScore);
                            reportScore(finalScore);
                            reportTime();
                            reportComplete();
                            if (config.replayable) {
                                mainPage.replay.setState('active');
                                $('#replay').fadeIn();
                            }
                        })
                    }, 500)
                }
            });
        }, 100);
    });

}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}