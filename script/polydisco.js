var PlayersData;
var correctAns;
var usrCorrectAns = 0;
var usrIncorrectAns = 0;
var seed1;
var seed2;
var QuestionCounter = 0;

// Task 2
function Register(){
    //Validate Inputs ar
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var age = calculateAge();
    var email = document.getElementById("email").value;
    var gender =  document.getElementById('gender').value;
    var notice = document.getElementById("notice")

    if(fName !="" && lName != "" && age != "" && email != "" && gender != ""){
        document.getElementById("notice").innerHTML = "";
    }
    else{
        notice.innerHTML = "<span style= 'font-weight:bold; ;color: red;'>Please Complete all fields </span>";
        document.getElementById("nameForm").scrollIntoView();
        return false;
    }

    PlayersData = [fName,lName,age,gender,email,usrCorrectAns,usrIncorrectAns];
    // Apart Task 3
    disableInput();
}

function disableModal(){ //Disabling modal and activating form and percentage button
    var endBtn = document.getElementById('modalBg');
    endBtn.classList.remove('activateModal');

    var input =document.getElementsByClassName('ffrom');
    var startButton = document.getElementById("startBtn");
    var registrationForm = document.forms["registrationForm"];
    var percentage = document.getElementById("showpercentage");
    var percentagelb = document.getElementById("showpercentageLabel");
    var allplayertxt = document.getElementById("showallplayers");
    var allplayerlb = document.getElementById("showallplayerslb");

    registrationForm.reset();
    input.disabled = false;

    for(i=0;i<input.length;i++){
        input[i].disabled=false;
    }   
    startButton.disabled = true;
    percentage.removeAttribute("hidden");
    percentagelb.removeAttribute("hidden");
    allplayerlb.removeAttribute("hidden");
    allplayertxt.removeAttribute("hidden");
    allplayertxt.value += (PlayersData+"\n");
    document.getElementById("addBreak").innerHTML = "<br>";
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
function disableInput(){
    var input =document.getElementsByClassName('ffrom');
    var startButton = document.getElementById("startBtn");

    input.disabled = true;

    for(i=0;i<input.length;i++){
        input[i].disabled=true;
    }   
    startButton.disabled = false;
}

//Task 4
function PlayGame() {
    
    document.getElementById("answerResponse").innerHtml = "";
    document.getElementById('modalBg').className += ' activateModal';

    var seed1 = Math.floor(Math.random()*9)+1;
    var seed2 = Math.floor(Math.random()*5)+1;
    correctAns = seed1 * seed2;
    QuestionCounter++;
        
    document.getElementById("numvalue1").value = seed1;
    document.getElementById("numvalue2").value = seed2;
    document.getElementById("usrAns").value  = "";
}
//TASK 6	
function checkAnswer(){
    var usrAns = document.getElementById('usrAns').value;
    document.getElementById("answerResponse").innerHTML = "";
                //  0      1    2    3     4       5             6
    //PlayersData = [fName,lName,age,gender,email,usrCorrectAns,usrIncorrectAns];
    console.log("Correct: "+usrCorrectAns);
    console.log("Incorrect: " + usrIncorrectAns);
	
    if(usrAns == correctAns){
        document.getElementById("answerResponse").innerHTML = "<span style='color: green'>CORRECT!</span>";
        usrCorrectAns+=1;
        PlayersData.splice((PlayersData.length)-2,1,usrCorrectAns);

    }else{
        document.getElementById("answerResponse").innerHTML = "<span style='color: red'>Incorrect</span>";
        usrIncorrectAns+=1;
         PlayersData.splice((PlayersData.length)-1,1,usrIncorrectAns);
    }	
}
