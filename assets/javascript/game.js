//Global Variables

//set variables for character names
var charName = ['Nord Warrior', 'Khajit Thief', 'Wood Elf Archer', 'Orc Berserker'];
console.log(charName);
//defining Character HP amounts (250 Nord, 175 Khajit, 150 Wood Elf, 275 Orc)
var charHP = [250, 175, 150, 275];
console.log(charHP); 
//setting vars for the images files. these will be called by an .attr later.
var charImage = ['nord.jpg', 'khajit.jpg', 'woodelf.jpg', 'orc.jpg'];
console.log(charImage);
//setting vars for the character attack rating ( 20 nord, 17 khajit, 16 wood elf, 21 orc)
var charHit = [20, 17, 16, 21]
console.log(charHit)
//setting variables for the user's HP...
var userHP;
console.log(userHP);
//..user Attack
var userAttack;
console.log(userAttack);
//..opponent HP
var opponentHP;
console.log(opponentHP);
//and, of course, the opponents attack..
var opponentAttack;
console.log(opponentAttack);

//setting the amount of opponents (the amount of characters minus one, because one will always be chosen as our user character)
var opponents = 5;
console.log(opponents);

//var for opponent attack option
opponentAttack = ['attack'];
console.log(opponentAttack);





//functions

//this function will perform the tasks of our "start" button...
$(".startButton").on("click", function() {
//the above line targets the "startButton" class we made for our New Game button on the HTML.. 
//Using the .on handler, we are telling it to target the starButton once it has been clicked on.	
	$(this).off("click");
	newGame();
	});
//select *this* which, in this case, is our .startButton, I'm still trying to wrap my head around what the .off function is, 
//..but I believe it is saying that once the click is done, start our new game function (to be created below)


//this function will perform the tasks of your "restart" button.
//it works in a similar fashion to our start button. Let's take a look.
$("restartButton").on("click", function() {
	if(startPressed = true){
		$('.messages').html(" ");
//my interpretation: calls the restart button, and when clicked, perform the following funtion:
//boolean statemtn: if the restart button is pressed, it will change the HTML to be blank, and thus resetting the game. 		
		//the following will remove the remaining characters off the board.
		for(var i = 0; i<charName.length; i++){
			//ask Instructor what this means
			$('#'+charName[i]).remove();	
			$('#'+charImage[i]).remove();	
		}
		
		//my interpretation: in this for loop, it will remove the character by selecting the charName 
		opponents = 3
		newGame();
	}
});
//


//and now, our new game function
function newGame(){
	//creating buttons. 
for(var i = 0; i < charName.length; i++){
//basic for loop setupd here. 
	var character = $('<button>');
	var characterPic = $('<img>');
//using .attr to source the pics to their folder. 
	characterPic.attr('src', './assets/images/' + charImage[i]);
	characterPic.addClass('picStyle');
	character.addClass('startStyle');
	character.attr('id', charName[i]);
	character.attr({'data-hp': charHP[i]});
	character.attr({'data-hit': charHit[i]});
	character.attr({'data-name': charName[i]});
//attributing data to the various variable
	var hpSpan = $('<span>').addClass('characterHP').html(character.data('hp'));
	character.append(charName[i], characterPic, hpSpan);
	$('.startBtn').append(character);
};
console.log(newGame);

$(document).on('click', '.startStyle',function() {
	userHP = $(this).data('hp');
	console.log(userHP);
	//moves button to "your character" field
	$(this).removeClass('charImage startStyle').addClass('userStyle');
	$('.userChar').append($(this));
	//moves our remaining characters to "characters to battle"
	for (var i = 0; i < charName.length; i++){
		if (charName[i] != $(this).data('name')){
			$('#'+charName[i]).removeClass('charImage startStyle').addClass('opponentStyle');
			$('#'+charName[i]+ 'span').removeClass('characterHP');
			$('.opponentChar').append($('#'+charName[i]));
			


		}
	}
			
});
chooseOpponent()

function chooseOpponent(){
	$('.messages').html(' ');
//clicking opponents sends them to our 'battleMode' function.
	$(document).on('click', '.opponentStyle', function(){
		opponentHP = $(this).data('hp');
		console.log(opponentHP);
		$(this).removeClass('opponentStyle opponentChar').addClass('currentOpponent');
		$(this).children('span').attr('class','enemigoHP');
		$('.chooseOpponent').append($(this));
		//the following turns pff click for other opponents so that only our chosen opponent appears.
		for(var i = 0; i < charName.length; i++){
			if(charName[i] != $(this).data('name')){
				$(document).off('click', '.opponentStyle');
			}
		}
		battleMode();
	});
}
console.log(chooseOpponent);


function generateOpponentAttack(){
	var randomAttack = opponentAttackArray[Math.floor(Math.random() * 2)];
		if(randomAttack == 'hit'){
			opponentAttack = $('.currentOpponent').data('hit');			
		}
	console.log(randomAttack);
	console.log(opponentAttack);	


}

function displayHP(){
	$(".currentOpponent").data('hp', opponentHP);
	$(".currentOpponent span").html(opponentHP);
	$(".userStyle").data('hp', userHP);
	$(".characterHP").html(userHP);
}
console.log(displayHP);

function battleMode(){
	$(".attack").on("click", function(){
		generateOpponentAttack();
		userAttack = $(".userStyle").data("hit");
		if(opponentAttack == "block"){
			userHP = userHP - userAttack;
			displayHP();
		}
	else{
		opponentHP = opponentHP - userAttack;
		userHP = userHP - opponentAttack;
		displayHP();
	}	
	console.log(userHP +" "+ opponentHP);
	winOrLose()
	});
}

function winOrLose(){
	if (opponentHP <= 0 && (opponents != 0)){
		$('.messages').html("You have defeated your enemy! Click another character to continue..");
		var enemy = $('.currentOpponent').data('name');
		$('#' + enemy).remove();
		chooseOpponent();
		opponents--;
		console.log(opponents);
	}
	if ((opponentHP <= 0) && (opponents == 0)){
		$('.messages').html("Congratulations! You have defeated all your opponents. You are a true champion of Tamriel! Press Restart to begin the journey again.")
	}
	if (userHP <= 0){
		$(".messages").html("You have lost. Press 'Restart' to begin a new game.")
	}

}

















}









//main process