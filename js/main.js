'use strict';

var gQuests = [];
var gCurrQuestIdx;
var elAnswersDiv = document.querySelector('.answers');

function initGame() {
    gCurrQuestIdx = 0
    elAnswersDiv.innerText = `0/5`;
    elAnswersDiv.style.backgroundColor = 'white';
    gQuests = createQuests();
    renderQuest();
}

function createQuests() {
    var quests = [
        {id: 1, opts: ['The pizza is eating a Cat!', 'The cat is eating a Pizza!'], correctOptIdx: 1},
        {id: 2, opts: ['The dog is in the Bread!', 'the bread is in the dog!'], correctOptIdx: 0},
        {id: 3, opts: ['The chicken is lazy!', 'The chicken is crazy!'], correctOptIdx: 1},
        {id: 4, opts: ['The frog is on the bear!', 'The bear is on the frog!'], correctOptIdx: 0},
        {id: 5, opts: ['the right giraffe is taller!', 'the left giraffe is longer!'], correctOptIdx: 0}
    ];
    return quests;
}

function renderQuest() {
    var currQuest = gQuests[gCurrQuestIdx];
    var elImg = document.querySelector('#pic');
    elImg.src = `imgs/${currQuest.id}.jpg`
    var elOpts = document.querySelectorAll('.opt');
    for (var i = 0; i < currQuest.opts.length; i++) {
        elOpts[i].innerText = currQuest.opts[i];
        elOpts[i].style.backgroundColor = '#bebaf1'
    }
}

function checkAnswer(elOpt) {
    var optIdx = +(elOpt.id);
    if (gQuests[gCurrQuestIdx].correctOptIdx === optIdx) {
        playCorrectAudio();
        elOpt.style.backgroundColor = 'rgb(99, 236, 99)';
        gCurrQuestIdx++;
        elAnswersDiv.innerText = `${gCurrQuestIdx}/5`;
        if (gCurrQuestIdx === gQuests.length - 1) {
            elAnswersDiv.style.backgroundColor = 'green';
            setTimeout(function() {if (confirm('Victorius! Play again?')) initGame();}, 500);
        } else setTimeout(renderQuest, 1000);
    } else {
        playWrongAudio();
        elOpt.style.backgroundColor = 'red'
    }
}


function playCorrectAudio() {
    var correctAudio = new Audio("audio/right.mp3");
    correctAudio.play();
}

function playWrongAudio() {
    var wrongAudio = new Audio("audio/wrong.mp3");
    wrongAudio.play();
}