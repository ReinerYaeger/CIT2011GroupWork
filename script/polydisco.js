var PlayersData;
var correctAns;
var playerInfo;


// Task 2
function Register(){
    //Validate Inputs ar
    fName = document.getElementById("fName").value;
    lName = document.getElementById("lName").value;
    age = calculateAge();
    email = document.getElementById("email").value;
    gender =  document.getElementById('gender').value;

    PlayersData = [fName,lName,age,gender,email];
    // Apart Task 3
    disableInput();

}

function disableModal(){ //Disabling modal and activating form and percentage button
    var endBtn = document.getElementById('modalBg');
    endBtn.classList.remove('activateModal');

    var input =document.getElementsByClassName('ffrom');
    var startButton = document.getElementById("startBtn");
    var registrationForm = document.forms["registrationForm"];
    registrationForm.reset();

    input.disabled = false;

    for(i=0;i<input.length;i++){
        input[i].disabled=false;
    }   
    startButton.disabled = true;
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
        
    document.getElementById("numvalue1").value = seed1;
    document.getElementById("numvalue2").value = seed2;
    document.getElementById("usrAns").value  = "";
}
//Task 6
function checkAnswer(){
    var usrAns = document.getElementById('usrAns').value;
    console.log(usrAns);
    console.log(correctAns);

    if(usrAns == correctAns){
       document.getElementById("answerResponse").innerHtml = "Correct!";
       alert("Your answer is " +document.getElementById("answerResponse").innerHtml); 
	   return true;
    }else{
        document.getElementById("answerResponse").innerHtml = "Incorrect";
        alert("Your answer is "+ document.getElementById("answerResponse").innerHtml); 
		return false; 
    }
    document.getElementById("numvalue1").value = seed1;
    document.getElementById("numvalue2").value = seed2;
    document.getElementById("usrAns").value  = "";
    
    PlayersData= [seed1,seed2,usrAns, document.getElementById("answerResponse").innerHtml];
}
//Task 9
function playerInfo(){
   document.getElementById("showpercentage").value= fName + " "+ lName + " ";    
}

