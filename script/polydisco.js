var PlayersData;
var correctAns;
var usrCorrectAns = 0;
var usrIncorrectAns = 0;
var usrQuestionCount=0;
var seed1;
var seed2;
var QuestionCounter = 0;
var Questions=[seed1,seed2,correctAns];
var playerDataBuffer = [" "];
var femalegenderpercent=0;
var malegenderpercent=0;


// Task 2
function Register(){
    //Validate Inputs ar
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var age = calculateAge();
    var email = document.getElementById("email").value;
    var gender =  document.getElementById('gender').value;
    var notice = document.getElementById("notice");

    if(gender == "Female"){
        femalegenderpercent++;
    }else{
        malegenderpercent++;
    }

    if(fName !="" && lName != "" && age != "" && email != "" && gender != ""){
        document.getElementById("notice").innerHTML = "";
    }
    else{
        notice.innerHTML = "<span style= 'font-weight:bold; ;color: red;'>Please Complete all fields </span><hr>";
        document.getElementById("nameForm").scrollIntoView();
        return false;
    }
    PlayersData = [fName,lName,age];
	console.log(PlayersData+"firstname last name age"); 
	
	//Apart of task 15


    PlayersData = [fName,lName,age,gender,email,usrCorrectAns,usrIncorrectAns];
    // Apart Task 3
    enableButton();
}
/*
var  formModal = document.getElementById('endBtn');
formModal.onclick = function (){ //Disabling modal and activating form and percentage button
    document.getElementById('modalBg').classList.remove('activateModal');

};

var chartModal = document.getElementById('exitChartModal');
chartModal.onclick = function (){ //Disabling modal and activating form and percentage button
    document.getElementById('modalBgChart').classList.remove('activateModalChart');

};*/

/*    var  formModal = document.getElementById('endBtn');
    formModal.addEventListener("click", function(){ //Disabling modal and activating form and percentage button
    document.getElementById('modalBg').className += ' closeModal';

});

var chartModal = document.getElementById('exitChartModal');
chartModal.addEventListener("click", function(){ //Disabling modal and activating form and percentage button
    document.getElementById('modalBgChart').className += ' closeModalChart';
});*/

function disableModal(){
    document.getElementById('modalBg').classList.remove('activateModal');
}

function disableModalChart(){
    document.getElementById('modalBgChart').classList.remove('activateModalChart');
}



function resetForm(){
    var input =document.getElementsByClassName('ffrom');
    var startButton = document.getElementById("startBtn");
    var registrationForm = document.forms["registrationForm"];
    var percentage = document.getElementById("showPercentage");
    var percentagelb = document.getElementById("showPercentageLb");

    registrationForm.reset();
    input.disabled = false;

    for(i=0;i<input.length;i++){
        input[i].disabled=false;
    }   
    startButton.disabled = true;
    percentage.removeAttribute("hidden");
    percentagelb.removeAttribute("hidden");
}

function showall(){
    var hideTextarea = document.getElementById("hideTextarea");
    var allplayertxt = document.getElementById("showAllPlayers");
    hideTextarea.classList.remove('hideTextarea');
    
    playerDataBuffer.push("\n"+PlayersData);
    console.log(playerDataBuffer);

    allplayertxt.innerHTML = (playerDataBuffer+"\n");
    document.getElementsByClassName("addBreak").innerHTML = "<br>";
}

// Apart of Task 2
function calculateAge(){
    var dob = document.getElementById('dob').value;
    var birthDate = new Date(dob);
    var currentDate = new Date();
    var age = (currentDate.getFullYear() - birthDate.getFullYear());
    return age;
}

// Apart Task 3
function enableButton(){
    var input =document.getElementsByClassName('ffrom');
    var startButton = document.getElementById('startBtn');
    var percentScoreBtn = document.getElementById('percentScoreBtn');
    input.disabled = true;

    for(i=0;i<input.length;i++){
        input[i].disabled=true;
    }   
    startButton.disabled = false;
    percentScoreBtn.disabled = false;

}

//Task 4
function PlayGame() {
    document.getElementById("answerResponse").innerHtml = '';

    if(!(document.getElementById('modalBg').classList.contains('activateModal'))){
        document.getElementById('modalBg').className += ' activateModal';
    }

    var seed1 = Math.floor(Math.random()*9)+1;
    var seed2 = Math.floor(Math.random()*5)+1;
    correctAns = seed1 * seed2;
    Questions.push(seed1);
    Questions.push(seed2);
    Questions.push(correctAns);
    console.log(Questions);
    QuestionCounter++;
        
    document.getElementById("numvalue1").value = seed1;
    document.getElementById("numvalue2").value = seed2;
    document.getElementById("usrAns").value  = " ";
}

function checkUserInput(){
    var usrAnsFormDirect = document.forms["modalForm"]["usrAns"].value;
    console.log("In check user input");

    //checks if the user input is not a number
    if(isNaN(usrAnsFormDirect)){
        document.getElementById("answerResponse").innerHtml = '<span style="color: red;">Please Enter a Number Preferably ~The Correct Answer~</span>';
        return false;
    }
    return true;
}

//TASK 6	
function checkAnswer(){
    var usrAns = document.getElementById('usrAns').value;
    document.getElementById("answerResponse").innerHTML = null;
                //  0      1    2    3     4       5             6
    //PlayersData = [fName,lName,age,gender,email,usrCorrectAns,usrIncorrectAns];

    if(usrAns == correctAns){
        document.getElementById("answerResponse").innerHTML = "<span style='color: green'>CORRECT &#3846;</span>";
        usrCorrectAns+=1;
        PlayersData.splice((PlayersData.length)-2,1,usrCorrectAns);
        console.log("Correct: "+usrCorrectAns);
    }else{
        document.getElementById("answerResponse").innerHTML = "<span style='color: red'>Incorrect</span>";
        usrIncorrectAns+=1;
        PlayersData.splice((PlayersData.length)-1,1,usrIncorrectAns);
         console.log("Incorrect: " + usrIncorrectAns);
    }
    showall();
}

function findPercentageScore(){
    //this makes sure that the class only gets added once
    if(!(document.getElementById('modalBgChart').classList.contains('activateModalChart'))){
        document.getElementById('modalBgChart').className += ' activateModalChart';
    }

    document.getElementById("showPercentage").innerHTML = "";
    usrQuestionCount = usrCorrectAns+usrIncorrectAns;
    console.log(usrQuestionCount);
    var usrPercentage=((usrCorrectAns)/usrQuestionCount)*100;
    console.log(usrPercentage);
    var date=new Date();
    var showValue = `Total number of questions: ${usrQuestionCount}\nPercentage score: ${Math.floor(usrPercentage)}%\nCurrent date: ${date}`;
    console.log(showValue);

    document.getElementById("showPercentage").innerHTML = showValue;
    resetForm();

//    disableModal();
}

function showfreq(){
	var fbar = `${femalegenderpercent}%`;
    console.log(mbar);
	var mbar = `${malegenderpercent}%`;

	document.getElementById("malebar").style.width = mbar;
	document.getElementById("femalebar").style.width = fbar;

	if(usrPercentage<50){
    	var bar1 = document.getElementById("bar1");

    	let cnt1=0;
    	cnt1++;
        bar1.innerHTML = (cnt1+" Player");
    	console.log(bar1+"chart bar 1");
	}
	else if(usrPercentage<=59){
    	var bar2 = document.getElementById("bar2")

    	let cnt2=0;
    	cnt2++;
        bar2.innerHTML = (cnt2+" Player");
    	console.log(bar2+"chart bar 2");
	}
	else if(usrPercentage<=69){
		var bar3 = document.getElementById("bar3");

    	let cnt3=0;
    	cnt3++;
        bar3.innerHTML = (cnt3+" Player");
    	console.log(bar3+"chart bar 3");
	}
	else if(usrPercentage<=79){
		var bar4 = document.getElementById("bar4");

    	let cnt4=0;
    	cnt4++;
        bar4.innerHTML = (cnt4+" Player");
    	console.log(bar4+"chart bar 4");
	}
	else if(usrPercentage<=89){
		var bar5 = document.getElementById("bar5");

    	let cnt5=0;
    	cnt5++;
        bar5.innerHTML = (cnt5+" Player");
    	console.log(bar5+"chart bar 5");
	}
	else if(usrPercentage<=99){
	var bar6 = document.getElementById("bar6");

    	let cnt6=0;
    	cnt6++;
        bar6.innerHTML = (cnt6+" Player");
    	console.log(bar6+"chart bar 6");
	}
	else if(usrPercentage==100){
		var bar7 = document.getElementById("bar7");
    	let cnt7=0;
    	cnt7++;
        bar7.innerHTML = (cnt7+" Player");
    	console.log(bar7+"chart bar 7");
	}
}
