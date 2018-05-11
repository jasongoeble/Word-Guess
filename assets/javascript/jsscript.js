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
    var displayWord;

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
    function showWord() {
        for (i = 0; i<wordSelection.length; i++) 
        {
            displayWord += "_";
        }
        
        //places the underscores in the div with id=wordReveal
        document.getElementById("wordReveal").innerHTML = displayWord;
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
       }
       else{};
    };

    //case correction and guess evaluation
    //much appreciation to Amir for telling me about and explaining charAt and replaceAt operators
    function caseCorrection()
    {
        var x = document.getElementById("userEntry");
        x.value = x.value.toUpperCase();
        userChoice = x.value;

        //here we search through the word to be guessed to determine if the user's guess matches
        //the -1 is required to find a position greater than the first letter in the word
        if (wordSelection.indexOf(userChoice) > -1 ) 
        {     
            //loop required to search for multiple matches within a single word
              for (i = 0; i < wordSelection.length; i++) 
              {
                //evaluate whether or not the user's guess matches in both value and type at charachter spot
                if (userChoice === wordSelection.charAt(i)) 
                    {
                        //replaces the underscore at position i with the user's guess
                        displayWord = displayWord.replaceAt(i, userChoice);
                        document.getElementById("wordReveal").innerHTML = displayWord;
                  }        
              }
        }  
        //if the user's guess does not match a character in the word
        else 
        {
            alert("The letter you selceted is incorrect");
            //reduces the number of guesses left by 1
            guesses--;
            //update the page to reflect the reduction of guesses left
            guessesRemaining();
            //updated the page to reflect the reduction of letters left to choose
            usedLetters();
        }
    };
