var PlayersData;
var correctAns;
var usrCorrectAns = 0;
var usrIncorrectAns = 0;
var usrQuestionCount = 0;
var seed1;
var seed2;
var QuestionCounter = 0;
var Questions = [];
var playerDataBuffer = [" "];
var femalegenderpercent = 0;
var malegenderpercent = 0;
var gendertotal = 0;
var femalecount = 0;
var malecount = 0;
var totalPlayerCount = 0;
var usrPercentage = 0;
var statuss;
var num1;
var num2;
var checkRepeatedQuestion = false;
var cnt1 = 0;
var cnt2 = 0;
var cnt3 = 0;
var cnt4 = 0;
var cnt5 = 0;
var cnt6 = 0;
var cnt7 = 0;


// Task 2
function Register() {
    //Validate Inputs ar
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var age = calculateAge();
    var email = document.getElementById("email").value;
    var gender = document.getElementById('gender').value;
    var notice = document.getElementById("notice");
    totalPlayerCount++;

    gendertotal = gendertotal + 1;
    if (gender == 'female') {
        femalecount = femalecount + 1;
    } else if (gender == 'male') {
        malecount = malecount + 1;
    }
    femalegenderpercent = (femalecount / gendertotal) * 100;
    malegenderpercent = (malecount / gendertotal) * 100;


    if (fName != "" && lName != "" && age != "" && email != "" && gender != "") {
        document.getElementById("notice").innerHTML = "";
    } else {
        notice.innerHTML = "<span style= 'font-weight:bold; ;color: red;'>Please Complete all fields </span><hr>";
        document.getElementById("nameForm").scrollIntoView();
        return false;
    }

    var returnValue = true;

    if (fName.trim() == "") {
        notice.innerHTML = "<span style= 'font-weight:bold; ;color: red;'>Please Complete all fields </span><hr>";
        returnValue = false;
    } else if (lName.trim() == "") {
        notice.innerHTML = "<span style= 'font-weight:bold; ;color: red;'>Please Complete all fields </span><hr>";
        returnValue = false;
    } else if (email.trim() == "") {
        notice.innerHTML = "<span style= 'font-weight:bold; ;color: red;'>Please Complete all fields </span><hr>";
        returnValue = false;
    }

    PlayersData = [fName, lName, age];
    console.log(PlayersData + "firstname last name age");

    //Apart of task 15
    PlayersData = [fName, lName, age, gender, email, usrCorrectAns, usrIncorrectAns];
    // Apart Task 3

    enableButton();
}


function disableModal() {
    document.getElementById('modalBg').classList.remove('activateModal');
}

function disableModalChart() {
    document.getElementById('modalBgChart').classList.remove('activateModalChart');
}


function resetForm() {
    var input = document.getElementsByClassName('ffrom');
    var startButton = document.getElementById("startBtn");
    var registrationForm = document.forms["registrationForm"];
    var percentage = document.getElementById("showPercentage");
    var percentagelb = document.getElementById("showPercentageLb");

    registrationForm.reset();
    input.disabled = false;

    for (i = 0; i < input.length; i++) {
        input[i].disabled = false;
    }
    startButton.disabled = true;
    percentage.removeAttribute("hidden");
    percentagelb.removeAttribute("hidden");
}

function showall() {
    var hideTextarea = document.getElementById("hideTextarea");
    var allplayertxt = document.getElementById("showAllPlayers");
    hideTextarea.classList.remove('hideTextarea');

    playerDataBuffer.push("\n" + PlayersData);
    console.log(playerDataBuffer);

    allplayertxt.innerHTML = (playerDataBuffer + "\n");
    document.getElementsByClassName("addBreak").innerHTML = "<br>";
}

// Apart of Task 2
function calculateAge() {
    var dob = document.getElementById('dob').value;
    var birthDate = new Date(dob);
    var currentDate = new Date();
    var age = (currentDate.getFullYear() - birthDate.getFullYear());
    return age;
}

// Apart Task 3
function enableButton() {
    var input = document.getElementsByClassName('ffrom');
    var startButton = document.getElementById('startBtn');
    var percentScoreBtn = document.getElementById('percentScoreBtn');
    input.disabled = true;

    for (i = 0; i < input.length; i++) {
        input[i].disabled = true;
    }
    startButton.disabled = false;
    percentScoreBtn.disabled = false;

}

//Task 4
function PlayGame() {
    document.getElementById("answerResponse").innerHtml = '';

    if (!(document.getElementById('modalBg').classList.contains('activateModal'))) {
        document.getElementById('modalBg').className += ' activateModal';
    }

    var seed1 = Math.floor(Math.random() * 9) + 1;
    var seed2 = Math.floor(Math.random() * 5) + 1;
    num1 = seed1;
    num2 = seed2;
    correctAns = seed1 * seed2;
    Questions.push(seed1);
    Questions.push(seed2);
    Questions.push(correctAns);
    console.log(Questions);
    QuestionCounter++;

    document.getElementById("numvalue1").value = seed1;
    document.getElementById("numvalue2").value = seed2;
    document.getElementById("usrAns").value = " ";
    checkRepeatedQuestion = false;
}

function checkUserInput() {
    var usrAnsFormDirect = document.forms["modalForm"]["usrAns"].value;
    console.log("In check user input");

    //checks if the user input is not a number
    if (isNaN(usrAnsFormDirect)) {
        document.getElementById("answerResponse").innerHtml = '<span style="color: red;">Please Enter a Number Preferably ~The Correct Answer~</span>';
        return false;
    }
    return true;
}


//TASK 6	
function checkAnswer() {
    var usrAns = document.getElementById('usrAns').value;
    document.getElementById("answerResponse").value = " ";
    //  0      1    2    3     4       5             6
    //PlayersData = [fName,lName,age,gender,email,usrCorrectAns,usrIncorrectAns];
    if (usrAns == correctAns && checkRepeatedQuestion == false) {
        checkRepeatedQuestion == true;
        document.getElementById("answerResponse").innerHTML = "<span style='color: green'>CORRECT!</span>";
        usrCorrectAns += 1;
        PlayersData.splice((PlayersData.length) - 2, 1, usrCorrectAns);
        console.log("Correct: " + usrCorrectAns);
        //works
        //passing data to task 13
        sstatus = 'Correct';
        var useranswer = document.getElementById("usrAns").value;
        Questiondata = [num1 + "*" + num2 + "=" + useranswer];
        showall();
    } else {
        document.getElementById("answerResponse").innerHTML = "<span style='color: red'>Incorrect</span>";
        usrIncorrectAns += 1;
        PlayersData.splice((PlayersData.length) - 1, 1, usrIncorrectAns);
        console.log("Incorrect: " + usrIncorrectAns);
        sstatus = 'Incorrect';
    }
}


function findPercentageScore() {
    //this makes sure that the class only gets added once
    if (!(document.getElementById('modalBgChart').classList.contains('activateModalChart'))) {
        document.getElementById('modalBgChart').className += ' activateModalChart';
    }
    document.getElementById("showPercentage").innerHTML = "";
    usrQuestionCount = usrCorrectAns + usrIncorrectAns;
    console.log(usrQuestionCount);
    usrPercentage = ((usrCorrectAns) / usrQuestionCount) * 100;
    console.log(usrPercentage + " usrPercentage");
    var date = new Date();
    var showValue = `Total number of questions: ${usrQuestionCount}\nPercentage score: ${Math.floor(usrPercentage)}%\nCurrent date: ${date}`;
    console.log(showValue);

    document.getElementById("showPercentage").innerHTML = showValue;
    resetForm();
    showfreq();
}


function showfreq() {

    var fbar = femalegenderpercent;
    var mbar = malegenderpercent;
    var bar1 = document.getElementById("bar1");

    var bar2 = document.getElementById("bar2");

    var bar3 = document.getElementById("bar3");

    var bar4 = document.getElementById("bar4");

    var bar5 = document.getElementById("bar5");

    var bar6 = document.getElementById("bar6");

    var bar7 = document.getElementById("bar7");

    document.getElementById('malepercent').innerHTML = Math.floor(mbar) + '%';
    document.getElementById('femalepercent').innerHTML = Math.floor(fbar) + '%';
    document.getElementById("malebar").width = mbar;
    document.getElementById("femalebar").width = fbar;


    if (usrPercentage < 50) {

        cnt1++;
    } else if (usrPercentage <= 59) {

        cnt2++;
    } else if (usrPercentage <= 69) {

        cnt3++;
    } else if (usrPercentage <= 79) {
        cnt4++;
    } else if (usrPercentage <= 89) {
        cnt5++;
    } else if (usrPercentage <= 99) {
        cnt6++;
    } else if (usrPercentage == 100) {
        cnt7++;
    }
    let cntPlayerPercentage1 = Math.floor((cnt1 / 100) * 100);
    bar1.innerHTML = (cntPlayerPercentage1 + " %");
    document.getElementById('bar1img').width = cntPlayerPercentage1;
    console.log(bar1 + "chart bar 1");
    let cntPlayerPercentage2 = Math.floor((cnt2 / totalPlayerCount) * 100);
    bar2.innerHTML = (cntPlayerPercentage2 + " %");
    document.getElementById('bar2img').width = cntPlayerPercentage2;
    console.log(bar2 + "chart bar 2");
    let cntPlayerPercentage3 = Math.floor((cnt3 / totalPlayerCount) * 100);
    bar3.innerHTML = (cntPlayerPercentage3 + " %");
    document.getElementById('bar3img').width = cntPlayerPercentage3;
    console.log(bar3 + "chart bar 3");
    let cntPlayerPercentage4 = Math.floor((cnt4 / totalPlayerCount) * 100);
    bar4.innerHTML = (cntPlayerPercentage4 + " %");
    document.getElementById('bar4img').width = cntPlayerPercentage4;
    console.log(bar4 + "chart bar 4");
    let cntPlayerPercentage5 = Math.floor((cnt5 / totalPlayerCount) * 100);
    bar5.innerHTML = (cntPlayerPercentage5 + " %");
    document.getElementById('bar5img').width = cntPlayerPercentage5;
    console.log(bar5 + "chart bar 5");
    let cntPlayerPercentage6 = Math.floor((cnt6 / totalPlayerCount) * 100);
    bar6.innerHTML = (cntPlayerPercentage6 + " %");
    document.getElementById('bar6img').width = cntPlayerPercentage6;
    console.log(bar6 + "chart bar 6");
    let cntPlayerPercentage7 = Math.floor((cnt7 / totalPlayerCount) * 100);
    bar7.innerHTML = (cntPlayerPercentage7 + " %");
    document.getElementById('bar7img').width = cntPlayerPercentage7;
    console.log(bar7 + "chart bar 7");
}

/*if(usrPercentage<50){
    	var bar1 = document.getElementById("bar1");

    	cntPlayerScoreStat1++;
        bar1.innerHTML = (cntPlayerScoreStat1+" Player");
        document.getElementById('bar1img').style.width = `${((cntPlayerScoreStat1/totalPlayerCount)*100)}px`;
    	console.log(bar1+"chart bar 1");
	}
	else if(usrPercentage<=59){
    	var bar2 = document.getElementById("bar2");

    	cntPlayerScoreStat2++;
        bar2.innerHTML = (cntPlayerScoreStat2+" Player");
        document.getElementById('bar2img').style.width = `${((cntPlayerScoreStat2/totalPlayerCount)*100)}px`;
    	console.log(bar2+"chart bar 2");
	}
	else if(usrPercentage<=69){
		var bar3 = document.getElementById("bar3");

    	cntPlayerScoreStat3++;
        bar3.innerHTML = (cntPlayerScoreStat3+" Player");
        document.getElementById('bar3img').style.width = `${((cntPlayerScoreStat3/totalPlayerCount)*100)}px`;
    	console.log(bar3+"chart bar 3");
	}
	else if(usrPercentage<=79){
		var bar4 = document.getElementById("bar4");

    	cntPlayerScoreStat4++;
        bar4.innerHTML = (cntPlayerScoreStat4+" Player");
        document.getElementById('bar5img').style.width = `${((cntPlayerScoreStat5/totalPlayerCount)*100)}px`;
    	console.log(bar4+"chart bar 4");
	}
	else if(usrPercentage<=89){
		var bar5 = document.getElementById("bar5");

    	cntPlayerScoreStat5++;
        bar5.innerHTML = (cntPlayerScoreStat5+" Player");
        document.getElementById('bar5img').style.width = `${((cntPlayerScoreStat5/totalPlayerCount)*100)}px`;
    	console.log(bar5+"chart bar 5");
	}
	else if(usrPercentage<=99){
	var bar6 = document.getElementById("bar6");

    	cntPlayerScoreStat6++;
        bar6.innerHTML = (cntPlayerScoreStat6+" Player");
        document.getElementById('bar6img').style.width = `${((cntPlayerScoreStat6/totalPlayerCount)*100)}px`;
    	console.log(bar6+"chart bar 6");
	}
	else if(usrPercentage==100){
		var bar7 = document.getElementById("bar7");
    	cntPlayerScoreStat7++;
        bar7.innerHTML = (cntPlayerScoreStat7+" Player");
        document.getElementById('bar7img').style.width = `${((cntPlayerScoreStat7/totalPlayerCount)*100)}px`;
    	console.log(bar7+"chart bar 7");
	}*/