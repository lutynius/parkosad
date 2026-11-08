let score = 0;
let currentQuestion;
let currentQuestionOrdinal = 0;
const MAIN_MENU = document.getElementById("main-menu");
const MAIN_MENU_TITLE = document.getElementById("main-menu-title");
const MAIN_MENU_SUBTITLE = document.getElementById("main-menu-subtitle");
const START_BUTTON = document.getElementById("start-button");
const COLORSCHEME_BUTTON = document.getElementById("colorscheme-button");
const CHANGELOG_BUTTON = document.getElementById("changelog-button");
const COLORSCHEME_SETTINGS = document.getElementById("colorscheme-settings");
const SET_TRICOLOR_BUTTON = document.getElementById("set-tricolor-button");
const SET_TRIUMVIRATE_BUTTON = document.getElementById("set-triumvirate-button");
const SET_LIGHT_BUTTON = document.getElementById("set-light-button");
const SET_DARK_BUTTON = document.getElementById("set-dark-button");
const SET_BLUD_BUTTON = document.getElementById("set-blud-button");
const COLORSCHEME_TITLES = document.querySelectorAll(".colorscheme-titles");
const COLORSCHEME_TO_MAIN_MENU_BUTTON = document.getElementById("colorscheme-to-main-menu-button");
const TRICOLOR_TITLE = document.getElementById("tricolor-title");
const TRIUMVIRATE_TITLE = document.getElementById("triumvirate-title");
const LIGHT_TITLE = document.getElementById("light-title");
const DARK_TITLE = document.getElementById("dark-title");
const BLUD_TITLE = document.getElementById("blud-title");
const CHANGELOG = document.getElementById("changelog");
const UPDATELOG_TEXT = document.getElementById("updatelog-text");
const CHANGELOG_TO_MAIN_MENU_BUTTON = document.getElementById("changelog-to-main-menu-button");
const GAME_MENU = document.getElementById("game-menu");
const HEADER = document.getElementById("header");
const QUESTION_TEXT = document.getElementById("question-text");
const COPYRIGHT = document.getElementById("copyright");
const MAIN = document.getElementById("main");
const QUESTION_IMAGE = document.getElementById("question-image");
const FOOTER = document.getElementById("footer");
const FOOT_TITLE = document.getElementById("foot-title");
const QUESTION_INPUT = document.getElementById("question-input");
const SUBMIT_BUTTON = document.getElementById("submit-button");
const END_RESULTS = document.getElementById("end-results");
const END_TITLE = document.getElementById("end-title");
const END_SUBTITLE = document.getElementById("end-subtitle");
const END_LETITLE = document.getElementById("end-letitle");
const SCORE = document.getElementById("score");
const SCORE_ACQUIRED = document.getElementById("score-acquired");
const SCORE_MAXIMUM = document.getElementById("score-maximum");
const PERCENTAGE = document.getElementById("percentage");
const PERCENT = document.getElementById("percent");
//----------------------------------------------------------------//
START_BUTTON.addEventListener("click", startGame);
COLORSCHEME_BUTTON.addEventListener("click", displayColorSchemeSettings);
CHANGELOG_BUTTON.addEventListener("click", displayChangelog);
COLORSCHEME_TO_MAIN_MENU_BUTTON.addEventListener("click", backToMainMenu);
CHANGELOG_TO_MAIN_MENU_BUTTON.addEventListener("click", backToMainMenu);
SET_TRICOLOR_BUTTON.addEventListener("click", () => setColorScheme("tricolor"));
SET_TRIUMVIRATE_BUTTON.addEventListener("click", () => setColorScheme("triumvirate"));
SET_LIGHT_BUTTON.addEventListener("click", () => setColorScheme("light"));
SET_DARK_BUTTON.addEventListener("click", () => setColorScheme("dark"));
SET_BLUD_BUTTON.addEventListener("click", () => setColorScheme("blud"));
SUBMIT_BUTTON.addEventListener("click", submitAnswer);
function startGame() {
    MAIN_MENU.style.display = "none";
    GAME_MENU.style.display = "flex";
    displayQuestion(pickRandomSquareThatIsYetToBeIterated());
}
function displayColorSchemeSettings() {
    MAIN_MENU.style.display = "none";
    COLORSCHEME_SETTINGS.style.display = "flex";
}
function displayChangelog() {
    MAIN_MENU.style.display = "none";
    CHANGELOG.style.display = "flex";
}
function backToMainMenu() {
    CHANGELOG.style.display = "none";
    COLORSCHEME_SETTINGS.style.display = "none";
    MAIN_MENU.style.display = "flex";
}
function pickRandomSquareThatIsYetToBeIterated() {
    if (TO_BE_ITERATED.length <= 0) {
        finishQuiz();
    }
    let roll = Math.floor(Math.random() * TO_BE_ITERATED.length);
    currentQuestion = TO_BE_ITERATED[roll];
    currentQuestionOrdinal += 1;
    TO_BE_ITERATED.splice(roll, 1);
    return currentQuestion;
}
function displayQuestion(question) {
    if (question && QUESTION_TEXT && QUESTION_IMAGE && SUBMIT_BUTTON && FOOT_TITLE) {
        QUESTION_TEXT.textContent = currentQuestionOrdinal + ". " + question.text;
        FOOT_TITLE.textContent = currentQuestion.prename;
        if (!question.imagePath) {
            QUESTION_TEXT.textContent = "ERROR: Could not load the image. The current question's imagepath is probably null or undefined.";
        }
        else {
            QUESTION_IMAGE.src = question.imagePath;
        }
    }
}
function submitAnswer() {
    if (currentQuestion.answers.includes(QUESTION_INPUT.value.toLowerCase())) {
        SUBMIT_BUTTON.style.background = "green";
        score += 1;
        console.log("Good job! Correct answer! Score plus one! Current score: " + score);
        ITERATED.push(currentQuestion);
        displayQuestion(pickRandomSquareThatIsYetToBeIterated());
    }
    else {
        SUBMIT_BUTTON.style.background = "red";
        console.log("Wrong! Incorrect answer! No new score added! Current score: " + score);
        ITERATED.push(currentQuestion);
        displayQuestion(pickRandomSquareThatIsYetToBeIterated());
    }
}
function finishQuiz() {
    GAME_MENU.style.display = "none";
    END_RESULTS.style.display = "flex";
    SCORE_ACQUIRED.textContent = score.toString();
    SCORE_MAXIMUM.textContent = maxScore.toString();
    PERCENTAGE.textContent = ((score / maxScore) * 100).toString();
}
const PRELOADED_IMAGES = [];
function preloadImages() {
    let i = 0;
    TO_BE_ITERATED.forEach(q => {
        if (q.imagePath) {
            i++;
            const img = new Image();
            img.src = q.imagePath;
            PRELOADED_IMAGES.push(img);
            console.log(i + ". Loading image: " + img.src);
        }
    });
}
function setColorScheme(colorScheme) {
    if (colorScheme == "tricolor") {
        MAIN_MENU.style.backgroundColor = "white";
        MAIN_MENU_TITLE.style.color = "black";
        MAIN_MENU_SUBTITLE.style.color = "black";
        COLORSCHEME_SETTINGS.style.backgroundColor = "white";
        CHANGELOG.style.backgroundColor = "white";
        START_BUTTON.style.backgroundColor = "red";
        COLORSCHEME_BUTTON.style.backgroundColor = "limegreen";
        CHANGELOG_BUTTON.style.backgroundColor = "blue";
        TRICOLOR_TITLE.style.color = "black";
        TRIUMVIRATE_TITLE.style.color = "black";
        LIGHT_TITLE.style.color = "black";
        DARK_TITLE.style.color = "black";
        BLUD_TITLE.style.color = "black";
        HEADER.style.backgroundColor = "red";
        QUESTION_TEXT.style.color = "black";
        COPYRIGHT.style.color = "black";
        MAIN.style.backgroundColor = "limegreen";
        FOOTER.style.backgroundColor = "blue";
        FOOT_TITLE.style.color = "white";
        END_RESULTS.style.backgroundColor = "white";
        END_TITLE.style.color = "black";
        END_SUBTITLE.style.color = "black";
        END_LETITLE.style.color = "black";
        SCORE.style.color = "black";
        PERCENT.style.color = "black";
    }
    else if (colorScheme == "triumvirate") {
        MAIN_MENU.style.backgroundColor = "white";
        MAIN_MENU_TITLE.style.color = "black";
        MAIN_MENU_SUBTITLE.style.color = "black";
        COLORSCHEME_SETTINGS.style.backgroundColor = "antiquewhite";
        CHANGELOG.style.backgroundColor = "white";
        START_BUTTON.style.backgroundColor = "antiquewhite";
        COLORSCHEME_BUTTON.style.backgroundColor = "bisque";
        CHANGELOG_BUTTON.style.backgroundColor = "wheat";
        TRICOLOR_TITLE.style.color = "black";
        TRIUMVIRATE_TITLE.style.color = "black";
        LIGHT_TITLE.style.color = "black";
        DARK_TITLE.style.color = "black";
        BLUD_TITLE.style.color = "black";
        HEADER.style.backgroundColor = "antiquewhite";
        QUESTION_TEXT.style.color = "black";
        COPYRIGHT.style.color = "black";
        MAIN.style.backgroundColor = "bisque";
        FOOTER.style.backgroundColor = "wheat";
        FOOT_TITLE.style.color = "black";
        END_RESULTS.style.backgroundColor = "white";
        END_TITLE.style.color = "black";
        END_SUBTITLE.style.color = "black";
        END_LETITLE.style.color = "black";
        SCORE.style.color = "black";
        PERCENT.style.color = "black";
    }
    else if (colorScheme == "light") {
        MAIN_MENU.style.backgroundColor = "white";
        MAIN_MENU_TITLE.style.color = "black";
        MAIN_MENU_SUBTITLE.style.color = "black";
        COLORSCHEME_SETTINGS.style.backgroundColor = "white";
        CHANGELOG.style.backgroundColor = "white";
        START_BUTTON.style.backgroundColor = "whitesmoke";
        COLORSCHEME_BUTTON.style.backgroundColor = "whitesmoke";
        CHANGELOG_BUTTON.style.backgroundColor = "whitesmoke";
        TRICOLOR_TITLE.style.color = "black";
        TRIUMVIRATE_TITLE.style.color = "black";
        LIGHT_TITLE.style.color = "black";
        DARK_TITLE.style.color = "black";
        BLUD_TITLE.style.color = "black";
        HEADER.style.backgroundColor = "whitesmoke";
        QUESTION_TEXT.style.color = "black";
        COPYRIGHT.style.color = "black";
        MAIN.style.backgroundColor = "white";
        FOOTER.style.backgroundColor = "whitesmoke";
        FOOT_TITLE.style.color = "black";
        END_RESULTS.style.backgroundColor = "white";
        END_TITLE.style.color = "black";
        END_SUBTITLE.style.color = "black";
        END_LETITLE.style.color = "black";
        SCORE.style.color = "black";
        PERCENT.style.color = "black";
    }
    else if (colorScheme == "dark") {
        MAIN_MENU.style.backgroundColor = "black";
        MAIN_MENU_TITLE.style.color = "white";
        MAIN_MENU_SUBTITLE.style.color = "white";
        COLORSCHEME_SETTINGS.style.backgroundColor = "black";
        CHANGELOG.style.backgroundColor = "black";
        START_BUTTON.style.backgroundColor = "dimgray";
        COLORSCHEME_BUTTON.style.backgroundColor = "dimgray";
        CHANGELOG_BUTTON.style.backgroundColor = "dimgray";
        TRICOLOR_TITLE.style.color = "white";
        TRIUMVIRATE_TITLE.style.color = "white";
        LIGHT_TITLE.style.color = "white";
        DARK_TITLE.style.color = "white";
        BLUD_TITLE.style.color = "white";
        HEADER.style.backgroundColor = "black";
        QUESTION_TEXT.style.color = "white";
        COPYRIGHT.style.color = "white";
        MAIN.style.backgroundColor = "dimgray";
        FOOTER.style.backgroundColor = "gray";
        FOOT_TITLE.style.color = "white";
        END_RESULTS.style.backgroundColor = "black";
        END_TITLE.style.color = "white";
        END_SUBTITLE.style.color = "white";
        END_LETITLE.style.color = "white";
        SCORE.style.color = "white";
        PERCENT.style.color = "white";
    }
    else if (colorScheme == "blud") {
        MAIN_MENU.style.backgroundColor = "white";
        MAIN_MENU_TITLE.style.color = "black";
        MAIN_MENU_SUBTITLE.style.color = "black";
        COLORSCHEME_SETTINGS.style.backgroundColor = "cornflowerblue";
        CHANGELOG.style.backgroundColor = "white";
        START_BUTTON.style.backgroundColor = "cornflowerblue";
        COLORSCHEME_BUTTON.style.backgroundColor = "dodgerblue";
        CHANGELOG_BUTTON.style.backgroundColor = "royalblue";
        TRICOLOR_TITLE.style.color = "black";
        TRIUMVIRATE_TITLE.style.color = "black";
        LIGHT_TITLE.style.color = "black";
        DARK_TITLE.style.color = "black";
        BLUD_TITLE.style.color = "black";
        HEADER.style.backgroundColor = "cornflowerblue";
        QUESTION_TEXT.style.color = "black";
        COPYRIGHT.style.color = "black";
        MAIN.style.backgroundColor = "dodgerblue";
        FOOTER.style.backgroundColor = "royalblue";
        FOOT_TITLE.style.color = "black";
        END_RESULTS.style.backgroundColor = "white";
        END_TITLE.style.color = "black";
        END_SUBTITLE.style.color = "black";
        END_LETITLE.style.color = "black";
        SCORE.style.color = "black";
        PERCENT.style.color = "black";
    }
    else {
        console.log("ERROR: String argument in setColorScheme(string) method not valid.");
    }
}
//-----------------------------------------------------------------------------------
class Question {
    text;
    imagePath;
    answers;
    prename;
    result;
    constructor(text, imagePath, answers, prename) {
        this.text = text;
        this.imagePath = imagePath;
        this.answers = answers;
        this.prename = prename;
    }
    setResult(value) {
        if (value) {
            this.result = true;
        }
        else {
            this.result = false;
        }
    }
}
const TO_BE_ITERATED = [];
//here cum the questions!
const HUSUV = new Question("Co je tohle za sad v centru Ostravy?", "images/husuv.png", [
    "husuv", "husův"
], "sad");
TO_BE_ITERATED.push(HUSUV);
const KOMENSKEHO = new Question("Co je tohle za velký sad v Ostravě?", "images/komenskeho.png", [
    "komenského", "komenskeho"
], "sady");
TO_BE_ITERATED.push(KOMENSKEHO);
const DR_MILADY_HORAKOVE = new Question("Co je tohle za SAD v Ostravě?", "images/dr_milady_horakove.png", [
    "dmh", "dr.mh", "drm h", "dr m h", "dr.m h", "drm h.", "drm. h", "dr m h.", "dr m. h", "dr. m h", "dr.m h.", "dr.m. h", "drm. h.", "dr m. h.", "dr. m h.", "dr. m. h", "dr.m. h.", "dokt. m h", "dr. m. h.", "milady h.", "dokt. m h.", "dokt. m. h", "doktor m h", "drmilady h", "dokt. m. h.", "doktor m h.", "doktor m. h", "dr milady h", "dr.milady h", "drmilady h.", "m. horakove", "m. horákové", "doktor m. h.", "dr milady h.", "dr. milady h", "dr.milady h.", "drm horakove", "drm horákové", "dr m horakove", "dr m horákové", "dr. milady h.", "dr.m horakove", "dr.m horákové", "drm. horakove", "drm. horákové", "dokt. milady h", "dr m. horakove", "dr m. horákové", "dr. m horakove", "dr. m horákové", "dr.m. horakove", "dr.m. horákové", "dokt. milady h.", "doktor milady h", "dr. m. horakove", "dr. m. horákové", "dokt. m horakove", "dokt. m horákové", "doktor milady h.", "dokt. m. horakove", "dokt. m. horákové", "doktor m horakove", "doktor m horákové", "drmilady horakove", "drmilady horákové", "doktor m. horakove", "doktor m. horákové", "dr milady horakove", "dr milady horakové", "dr milady horákové", "dr.milady horakove", "dr.milady horákové", "dr. milady horakove", "dr. milady horakové", "dr. milady horákove", "dr. milady horákové", "dr. milady. horákové", "dokt. milady horakove", "dokt. milady horákové", "doktor milady horakove", "doktor milady horákové", "mh", "m h", "m.h", "mh.", "m h.", "m. h", "m.h.", "milh", "m. h.", "mhor.", "mil h", "mil.h", "milh.", "m hor.", "m.hor.", "mil h.", "mil. h", "mil.h.", "m. hor.", "mhorak.", "mhorák.", "mil. h.", "miladyh", "milhor.", "m horak.", "m horák.", "m.horak.", "m.horák.", "mil hor.", "mil.hor.", "milady h", "miladyh.", "m. horak.", "m. horák.", "mhorakove", "mhorakové", "mhorákove", "mhorákové", "mil. hor.", "milady h.", "milhorak.", "milhorák.", "m horakove", "m horakové", "m horákove", "m horákové", "m.horakove", "m.horakové", "m.horákove", "m.horákové", "mil horak.", "mil horák.", "mil.horak.", "mil.horák.", "miladyhor.", "m. horakove", "m. horakové", "m. horákove", "m. horákové", "mil. horak.", "mil. horák.", "milady hor.", "milhorakove", "milhorakové", "milhorákove", "milhorákové", "mil horakove", "mil horakové", "mil horákove", "mil horákové", "mil.horakove", "mil.horakové", "mil.horákove", "mil.horákové", "miladyhorak.", "miladyhorák.", "mil. horakove", "mil. horakové", "mil. horákove", "mil. horákové", "milady horak.", "milady horák.", "miladyhorakove", "miladyhorakové", "miladyhorákove", "miladyhorákové", "milady horakove", "milady horakové", "milady horákove", "milady horákové", "milady. horakove", "milady. horákové"
], "sad");
TO_BE_ITERATED.push(DR_MILADY_HORAKOVE);
const JOZKY_JABURKOVE = new Question("Co je tohle za sad ve Vítkovicích?", "images/jozky_jaburkove.png", [
    "jj", "j j", "j.j", "jj.", "j j.", "j. j", "j.j.", "jjab", "j jab", "j. j.", "j.jab", "jjab.", "joz.j", "jož.j", "j jab.", "j. jab", "j.jab.", "joz. j", "joz.j.", "jozkyj", "jož. j", "jož.j.", "jožkyj", "j. jab.", "joz. j.", "joz.jab", "jozky j", "jozkyj.", "jož. j.", "jož.jab", "jožky j", "jožkyj.", "joz. jab", "joz.jab.", "jozky j.", "jozkyjab", "jož. jab", "jož.jab.", "jožky j.", "jožkyjab", "joz. jab.", "jozky jab", "jozkyjab.", "jož. jab.", "jožky jab", "jožkyjab.", "jjaburkove", "jjabůrkové", "jozky jab.", "jožky jab.", "j jaburkove", "j jabůrkové", "j.jaburkove", "j.jabůrkové", "j. jaburkove", "j. jabůrkové", "joz.jaburkove", "joz.jabůrkové", "jož.jaburkove", "jož.jabůrkové", "joz. jaburkove", "joz. jabůrkové", "jozkyjaburkove", "jozkyjabůrkové", "jož. jaburkove", "jož. jabůrkové", "jožkyjaburkove", "jožkyjabůrkové", "jozky jaburkove", "jozky jabůrkové", "jožky jaburkove", "jožky jabůrkové", "jozky. jaburkove", "jožky. jabůrkové"
], "sad");
TO_BE_ITERATED.push(JOZKY_JABURKOVE);
const BEZRUCUV = new Question("Co je tohle za cute sad v Ostravě? (scrollni dolů)", "images/bezrucuv.png", [
    "bezručův", "bezrucuv", "bezručuv", "bezrucův"
], "sad");
TO_BE_ITERATED.push(BEZRUCUV);
const maxScore = TO_BE_ITERATED.length;
console.log(TO_BE_ITERATED);
console.log("Max score constant: " + maxScore);
const ITERATED = [];
//***********************************************************/
const BUNCH_OF_DASHES = "-------------------------------------------------------------------------------------------------------";
const VERSION_1_2 = BUNCH_OF_DASHES + `
Verze 1.2 "Micro" - neděle 7.11.2026
    - V předchozích verzích jste museli zmínit Dr. u Milady Horákové, nyní už nemusíte
`;
const VERSION_1_1 = BUNCH_OF_DASHES + `
Verze 1.1 "Modern Curves Update" - čtvrtek 5.11.2026
    - development jen tento čtvrtek
    - Udělal jsem tlačítka jemně ohnutá (radius 10%)
    - Přidal jsem copyright text, jelikož jsem na to v Releasu zapomněl
`;
const VERSION_1_0 = BUNCH_OF_DASHES + `
Verze 1.0 "Release" - středa 4.11.2026
    - development de facto začal 31.10.2026
    - 5 sadů:
        1. Dr Milady Horákové
        2. Husův
        3. Komenského
        4. Jožky Jabůrkové
    - 5 barevných schémat:
        1. Trikolóra
        2. Triumvirát
        3. Světelno
        4. Temno
        5. Blud
`;
const LOG = VERSION_1_2 +
    VERSION_1_1 +
    VERSION_1_0;
UPDATELOG_TEXT.textContent = LOG;
preloadImages();
export {};
