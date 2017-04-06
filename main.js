//Global variables for inquirer, the basic cards, and cloze cards.
var inquirer = require("inquirer")

var basicDeck =[];
var clozeDeck = [];

var subs = ["..."];

//Variable for the score of either the basic or cloze game.
var score = 0;

//Varible for the action that call be called from the command line.
var action = process.argv[2];

//Constructor for the basic cards.
function BasicCard (front, back){
	if(this instanceof BasicCard){
		this.front = front;
		this.back = back;
	} else {
		return new BasicCard(front, back);
	};
};

//Constructor for the cloze cards.
function ClozeCard (full, answer){
	if(this instanceof ClozeCard){
		this.full = full;
		this.answer = answer;
		this.partial = this.full.replace(this.answer, subs);
	}else{
		return new ClozeCard(full, answer);
	};
};

//Adds basic flashcards to the basic game array.
function addBasic (front, back){
	basicDeck.push(new BasicCard(front, back));
};

//Adds Cloze flashcards to the cloze game array.
function addCloze (full, answer){
	if(full.indexOf(answer)> -1){
		clozeDeck.push(new ClozeCard(full, answer));
	}else{
		console.log("You forgot to put the answer in the sentance.");
	}
};

//Starter decks for both basic and cloze games.
addBasic("Robert E. ... was the main Confederate general during the Civil War.","Lee");
addCloze("Robert E. Lee was the main Confederate general during the Civil War.","Lee");
addBasic("William Tecumseh ... led the March to the Sea.","Sherman");
addCloze("William Tecumseh Sherman led the March to the Sea.","Sherman");
addBasic("Union General Ulysses S. ... was later elected President.","Grant");
addCloze("Union General Ulysses S. Grant was later elected President.","Grant");
addBasic("Pickett's Charge was the unsuccessful infantry charge at the end of the Battle of ....","Gettysburg");
addCloze("Pickett's Charge was the unsuccessful infantry charge at the end of the Battle of Gettysburg","Gettysburg");
addBasic("Stonewall ... led Confederate troops in both Battles of Bull Run/Manassas.","Jackson");
addCloze("Stonewall Jackson led Confederate troops in both Battles of Bull Run/Manassas.","Jackson");
addBasic("The capture of ... secured the Union's control of the Mississippi River.","Vicksburg");
addCloze("The capture of Vicksburg secured the Union's control of the Mississippi River.","Vicksburg");
addBasic("The Battle of Fort ... started the Civil War.","Sumter");
addCloze("The Battle of Fort Sumter started the Civil War.","Sumter");
addBasic("General Lee surrendered to General Grant at ... Court House.","Appomattox");
addCloze("General Lee surrendered to General Grant at Appomattox Court House.","Appomattox");
addBasic("The ... Proclamation freed all Confederate slaves.", "Emancipation");
addCloze("The Emancipation Proclamation freed all Confederate slaves.", "Emancipation");
addBasic("The Battle of ... was the bloodiest day of the Civil War.", "Antietam");
addCloze("The Battle of Antietam was the bloodiest day of the Civil War.", "Antietam");

//Calls the flashcards switch funtion. Mostly to run the games.
flashCards();

//Play the basic flashcard game.
function playBasic(count){

	if(count < basicDeck.length){
		inquirer.prompt([
    		{
    			name: "response",
    			message: basicDeck[count].front,
    		}
    	]).then(function(answer) {
    		//var reply = response.responce
    		if(answer.response == basicDeck[count].back){
    			score++;
    			console.log("-------------------------------\nThat's correct!\n-------------------------------------");
    		}else{
    			console.log("--------------------------------\nThat's wrong. The correct answer is "+
    				basicDeck[count].back + "\n----------------------------------------");
    		}
    		count++;
    		playBasic(count);
    	});
	} else{
		console.log("Thank you for playing! Your score is "+ score + " out of " + 
			basicDeck.length + ".");
	}
}

//Play the cloze flashcard game.
function playCloze(count){

	if(count < clozeDeck.length){
		inquirer.prompt([
    		{
    			name: "response",
    			message: clozeDeck[count].partial,
    		}
    	]).then(function(answer) {
    		//var reply = response.responce
    		if(answer.response == clozeDeck[count].answer){
    			score++;
    			console.log("-------------------------------\nThat's correct!\n-------------------------------------");
    		}else{
    			console.log("--------------------------------\nThat's wrong. The correct answer is "+
    				clozeDeck[count].answer + "\n----------------------------------------");
    		}
    		count++;
    		playCloze(count);
    	});
	} else{
		console.log("Thank you for playing! Your score is "+ score + " out of " + 
			clozeDeck.length + ".");
	}
}

//Commands that work. There was an "addBasicCard" command, but that caused memory
//leaks and isn't technically needed for the assignment. I took it out. The help
//command is, again, for my own benefit.
function flashCards(){
	switch(action){
		case "playBasic":
		playBasic(0);
		break;
	
		case "playCloze":
		playCloze(0);
		break;

		case "--h":
		case "-h":
		case "--help":
		case "-help":
		case "help":
		whatToDo();
		break;
	}
}

function whatToDo(){
	console.log("--------------------------------------------------------------------------------\n");
	console.log("Welcome to my Civil War flashcard game! \nFrom here you can play two different versions. All answers are proper nouns and must be capitalized.");
	console.log("To play the basic game, enter the command playBasic. \nTo play the fill-in the blank version, enter the command playCloze.");
	console.log("To see this list of comands again, just enter help. \n");
	console.log("--------------------------------------------------------------------------------");
}