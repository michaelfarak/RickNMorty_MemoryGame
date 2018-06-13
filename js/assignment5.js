var lvlmodal = document.getElementById("modal1");
var btnModal = document.getElementById("start-btn");
var audio = new Audio('./sounds/Rick-and-Morty-Theme-Song.mp3');


//display the choosing level menu and setting audio theme
function displayModal() {
    lvlmodal.style.display = "block";
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
}
//initializing numbers of guesses and matches
var guesses = 0;
var matches = 0;

//the function is launched when the user choose a level
function startGame() {

    var cardsArray = [{
        'name': 'pic1',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o1_400.png',
    },
    {
        'name': 'pic2',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o2_400.png',
    },
    {
        'name': 'pic3',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o3_400.png',
    },
    {
        'name': 'pic4',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o4_400.png',
    },
    {
        'name': 'pic5',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o5_400.png',

    },
    {
        'name': 'pic6',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o6_400.png',
    },
    {
        'name': 'pic7',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o7_400.png',
    },
    {
        'name': 'pic8',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o8_400.png',
    },
    {
        'name': 'pic9',
        'img': './images/tumblr_p7ywuiFYdT1x7nqo5o9_400.png',
    },
    {
        'name': 'pic10',
        'img': './images/a73454b65fc177dff62bfadde1f9925a.jpg',
    },
    {
        'name': 'pic11',
        'img': './images/lS5_U5_j_400x400.jpg',
    },
    {
        'name': 'pic12',
        'img': './images/images.jpg',
    }];

    var easyBtn = document.getElementById("easy");
    var mediumBtn = document.getElementById("medium");
    var hardBtn = document.getElementById("hard");
    var target = event.target;

    gameCards = [];

    // diplaying different numbers of cards according to the choosen level
    if (target.id == "easy") {
        gameCards = cardsArray.slice(0, 6);
    } else if (target.id == "medium") {
        gameCards = cardsArray.slice(0, 9);
    } else if (target.id == "hard") {
        gameCards = cardsArray;
    }

    //closing the modal and title
    document.getElementById("modal1").style.display = "none";
    document.getElementById("title").style.display = "none";

    //erase the board when the user wants to reset the game
    document.getElementById("game").innerHTML = "";

    var gameGrid = gameCards.concat(gameCards);
    gameGrid.sort(() => 0.5 - Math.random());

    var firstGuess = '';
    var secondGuess = '';
    var count = 0;
    var previousTarget = null;
    var delay = 1000;

    var game = document.getElementById('game');
    var grid = document.createElement('section');
    grid.setAttribute('class', 'grid');
    game.appendChild(grid);

    gameGrid.forEach(item => {
        // Create card element with the name dataset
        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        // Create front of card
        var front = document.createElement('div');
        front.classList.add('front');

        // Create back of card, which contains
        var back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${item.img})`;

        // Append card to grid, and front and back to each card
        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });
    // Add match CSS
    var match = () => {
        var selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.add('match');
        });
    }

    var resetGuesses = () => {
        firstGuess = '';
        secondGuess = '';
        count = 0;

        var selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.remove('selected');
        });
    };
    // Add event listener to grid// Add ev
    grid.addEventListener('click', function (event) {
        // The event target is our clicked item
        var clicked = event.target;
        if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
            return;
        }
        // Do not allow the grid section itself to be selected; only select divs inside the grid
        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            } else {
                secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            }
            // If both guesses are not empty...
            if (firstGuess && secondGuess) {
                guesses++;
                document.getElementById("guesses").innerHTML = "Guesses: " + guesses;
                //if guesses are a match
                if (firstGuess === secondGuess) {
                    var audio2 = new Audio('./sounds/my-man_1.mp3');
                    audio2.play();
                    setTimeout(match, delay);
                    matches++;
                    //when all the cards are matched
                    if (matches == gameCards.length) {
                        document.getElementById("modal2").style.display = "block";
                        document.getElementById("won").innerHTML = `Congratulations newbie !! You won the game in ${guesses} guesses.`
                        var audio3 = new Audio('./sounds/ukib-wubalubadubdub.mp3'); //victory sound
                        audio.pause(); //stopping the theme music
                        audio3.play();
                    }
                }
                setTimeout(resetGuesses, delay);
            }
            previousTarget = clicked;
        }
    });
}

function reset() {
    location.reload();
}


