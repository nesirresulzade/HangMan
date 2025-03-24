let cities = [
    "Aghdam", "Agdash", "Aghjabadi", "Agstafa", "Agsu", "Astara", "Aghdara", "Babek",
    "Baku", "Balakən", "Barda", "Beylagan", "Bilasuvar", "Dashkasan", "Shabran", "Fuzuli",
    "Gadabay", "Ganja", "Goranboy", "Goychay", "Goygol", "Hajigabul", "Imishli", "Ismayilli",
    "Jabrayil", "Julfa", "Kalbajar", "Khachmaz", "Khankendi", "Khojavend", "Khirdalan", 
    "Kurdamir", "Lankaran", "Lerik", "Masally", "Mingachevir", "Nakhchivan", "Naftalan", 
    "Neftchala", "Oghuz", "Ordubad", "Qabala", "Qakh", "Qazakh", "Quba", "Qubadli", "Qusar", 
    "Saatli", "Sabirabad", "Shahbuz", "Shaki", "Shamakhi", "Shamkir", "Sharur", "Shirvan", 
    "Siyazan", "Shusha", "Sumgait", "Tartar", "Tovuz", "Ujar", "Yardimli", "Yevlakh", 
    "Zaqatala", "Zardab", "Zangilan"
];

let selectedCity = "";
let maskedWord = [];
let lives = 5;

var starting = document.querySelector(".starting");
var gameContainer = document.getElementById("game-container");
var wordDisplay = document.getElementById("word-display");
var livesDisplay = document.getElementById("lives");
var guessInput = document.getElementById("guess");
var playAgainButton = document.getElementById("play-again");
var title = document.querySelector(".title");
var imgResim = document.querySelector(".imgResim");

starting.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
guessInput.addEventListener("input", checkLetter);

starting.style.cursor = "pointer";
playAgainButton.style.cursor = "pointer";

//! Bu funksiyanın işə düşməsi ilə oyun başlanır. Həyat sayı sıfırlanır, yeni şəhər seçilir və oyun sahəsi görünür, digər hissələr gizlədilir.
function startGame() {
    console.log("startGame() funksiya ise dusdu!");
    
    lives = 5;
    selectNewCity();

    gameContainer.style.display = "block";
    starting.style.display = "none";
    playAgainButton.style.display = "none"; 
    title.style.display = "block";
    imgResim.style.display = "none";
    guessInput.disabled = false; 
}

//! Bu funksiya təsadüfi olaraq bir şəhər seçir və onun maskalanmış versiyasını (_) maskedWord dəyişəninə əlavə edir.
function selectNewCity() {
    var index = Math.floor(Math.random() * cities.length);
    selectedCity = cities[index].toUpperCase(); 

    console.log("Yeni seher: " + selectedCity);
    maskedWord = [];
    for (let i = 0; i < selectedCity.length; i++) {
        maskedWord.push("_");
    }

    updateDisplay();
}

//! Bu funksiya maskedWord və lives dəyişənlərini ekranla yeniləyir. Əgər həyat sayı sıfır olarsa, oyun bitir.
function updateDisplay() {
    wordDisplay.textContent = maskedWord.join(" ");
    livesDisplay.textContent = lives;
}
//! Bu funksiya istifadəçinin daxil etdiyi hərfi yoxlayır. Əgər doğru hərfdirsə, onu maskedWord-ə əlavə edir, səhvdirsə həyat sayını bir azaldır. Həmçinin, bütün şəhər doğru tapıldıqda yeni şəhər seçir.
function checkLetter() {
    let letter = guessInput.value.toUpperCase();
    guessInput.value = "";
    if (!['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].includes(letter)) return;
    let correctGuess = false;
    for (let i = 0; i < selectedCity.length; i++) {
        if (selectedCity[i] === letter && maskedWord[i] === "_") {
            maskedWord[i] = letter;
            correctGuess = true;
        }
    }
    if (!correctGuess) {
        lives--;
    }
    updateDisplay(); //! İlk öncə ekran yenilənsin
    //! 100ms gecikmə əlavə edirik ki, əvvəlcə "lives: 0" görünsün, sonra alert gəlsin.
    if (lives === 0) {  
        setTimeout(() => {
            alert("Oyun bitdi!!");
            playAgainButton.style.display = "block";
            guessInput.disabled = true;
        }, 100);
        return;
    }
    if (maskedWord.join("") === selectedCity) {
        setTimeout(() => {
            alert("Dogrudur! Novbeti seher!");
            selectNewCity();
        }, 100);
    }
}





