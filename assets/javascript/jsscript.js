//this defines the global variable of allWords
//allWords will contain all of the possible values to be used in the word guess game
var allWords=[];

//calling the following function loads the multiple values into the allWords array
wordCollection();

//this chooses a single word from the array of allWords and will be used in the game
var wordSelection=wordChoice();

//this is the default number of "lives" the user gets
var guesses = 10;

//this variable holds the user's letter choices
var userChoice;

//this variable holds the values to show the user for wordSelection as well as guesses
var displayWord="";

var wins = 0;
var losses = 0;

//by defining all of the possible words for the game in a function allows sigle point of 
//modification if you want to change the number of and specific words
function wordCollection()
{
    allWords=["FAKE NEWS", 
    "SNOWFLAKE", 
    "LIBTARD", 
    "ALTERNATIVE FACTS", 
    "MAKE AMERICA GREAT AGAIN", 
    "SMALL HANDS", 
    "BIGLY", 
    "COVFEFE"];
};

//checks the length of the game dictionary and then randomnly chooses an element
function wordChoice()
{ 
    var elementLimit=allWords.length;
    var elementNumber;
    elementNumber = getRndInteger(0,elementLimit);
    return allWords[elementNumber];
};

//randomizer function that returns an integer between 0 and the length of the game dictionary
function getRndInteger(min, max) {
    return Math.floor((Math.random() * (max - min) ) + min);
};

//displays underscores for each letter in the word to be guessed
function showWord() 
{
    console.log(wordSelection);
    spacer=" ";
    positionOfSpace=[];
    //if spaces exist in wordSelection then displayWord will need to have spaces instead of underscores
    if (wordSelection.indexOf(" ") > -1)
    {
        for (p = 0; p < wordSelection.length; p++) 
        {
            //if spaces exists, log the position of the space
            if (spacer === wordSelection.charAt(p)) 
            {
                console.log(p);
                positionOfSpace.push(p);
                console.log(positionOfSpace);
                //console.log(match);
            }
        }
        
        //change displayWord to be all underscores
        for (b = 0; b<wordSelection.length; b++) 
        {
            displayWord += "_";
        }
        
        //loop through displayWord and update where there should be spaces, based on wordSelection
        for (q = 0; q < positionOfSpace.length; q++)
        {
            console.log("value of q");
            console.log(q);
            //first position of a space in wordSelection and therefore displayWord
            z=positionOfSpace[q];
            y=displayWord.length;
            //temp holding variable that returns all of the underscores before the position where a space should be
            //adds a space, and concatonates those values with the remaining underscores in displayWord
            spacerMatch=displayWord.substr(0,(z))+" "//+displayWord.substr((z+1),y);
            console.log(spacerMatch);
            //sets displayWord to the concatonated update that is spacerMatch
            displayWord=spacerMatch+displayWord.substr((z+1),displayWord.length);
            
            //NOTE: this for loop will continue to run until all of the positions which should contain a space are updated 
        }

        //push the updated displayWord (containing spaces where appropriate) to the wordReveal div
        document.getElementById("wordReveal").innerHTML = displayWord;
    }
    //if there are no spaces in wordSelection, and therefore no spaces needed in displayWord
    else
    { 
        for (b = 0; b<wordSelection.length; b++) 
        {
            displayWord += "_";
        }
    }

};

//displays the letters already guessed separated by a comma
function usedLetters() {
    var lettersUsed;
    lettersUsed = userChoice + ", ";
    document.getElementById("lettersGuessed").innerHTML += lettersUsed;
};


//displays the number of guesses left, or that the player has lost
function guessesRemaining() 
{
    document.getElementById("remainingGuesses").innerHTML = guesses+" guesses left.";
    
    if (guesses === 0) {
        document.write("You lost!  The word was: "+ wordSelection);
        //refreshes the page starting the game again
        losses++;
        document.getElementById("totalWins").innerHTML = "You have won " + wins + " games, and lost " + losses + " games.";
        showWord();
    }
    else{}
};

//case correction and guess evaluation
//much appreciation to Amir for telling me about and explaining charAt
//also, much thanks to Sam for helping me while at his python conference
function caseCorrection()
{   
    //if there is an underscore in the string displayWord this will run
    if (displayWord.indexOf("_") > -1)
    {
        var x = document.getElementById("userEntry");
        x.value = x.value.toUpperCase();
        userChoice = x.value;

        //here we search through the word to be guessed to determine if the user's guess matches
        //the -1 is used to determine if there is a match between the user's choice and the value of wordSelection
        if (wordSelection.indexOf(userChoice) > -1 ) 
        {     
            //loop required to search for multiple matches within a single word
            for (i = 0; i < wordSelection.length; i++) 
            {
                //evaluate whether or not the user's guess matches in both value and type at charachter spot
                if (userChoice === wordSelection.charAt(i)) 
                {
                    console.log("value of i");
                    console.log(i);
                    match=(displayWord.substr(0,i))+userChoice;
                    console.log(match);
                    displayWord=match+displayWord.substr((i+1),displayWord.length);
                    document.getElementById("wordReveal").innerHTML = "<p>Word to Solve</p>"+displayWord;
                }
                else {}
            }
        }  
    
        //if the user's guess does not match a character in the word
        else
        {
            //reduces the number of guesses left by 1
            guesses--;
            usedLetters();  
            //update the page to reflect the reduction of guesses left
            guessesRemaining();
            //notify the user that the letter selected was incorrect
            alert("The letter you selceted is incorrect");
        }
    }
    //if there are no more underscores in displayWord notify user they have solved the puzzle and reload page
    else 
    {
        alert("You have guessed the word correctly!"); 
        wins++;
        document.getElementById("totalWins").innerHTML = "You have won " + wins + " games, and lost " + losses + " games.";
        showWord();        
    }
};
