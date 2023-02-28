const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// DOM element base
const audio = $('#audio');
const progress = $('#progress');
const listOfSongs = $('.header__list-songs');

// DOM element Content Left
const contentSongImg = $('.content__song-img');
const contentSongName = $('.content__song-name');
const contentArtistName = $('.content__artist-name');
const contentCoverImg = $('.content__cover-img');

// DOM element Controller Buttons
const playBtn = $('#play');
const preBtn = $('#pre');
const nextBtn = $('#next');
const repeatBtn = $('#repeat');
const shuffleBtn = $('#shuffle');

// State
let currentSong = 0;
let interval;
let isPlaying = false;
let isRepeat = false;
let isShuffle = false;

// Data
const songs = [
    {
        name: "We Don't Talk Anymore",
        singer: "Charlie Puth",
        path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
        image: "./image/g2.jpg"
    },
    {
        name: "Perfect",
        singer: "Ed Sheeran",
        path: "./music/Ed Sheeran - Perfect.mp3",
        image: "./image/g4.jpg"
    },
    {
        name: "Night Changes",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    },
    {
        name: "We Don't Talk Anymore",
        singer: "Charlie Puth",
        path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
        image: "./image/g2.jpg"
    },
    {
        name: "Perfect",
        singer: "Ed Sheeran",
        path: "./music/Ed Sheeran - Perfect.mp3",
        image: "./image/g4.jpg"
    },
    {
        name: "Night Changes",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    },
    {
        name: "We Don't Talk Anymore",
        singer: "Charlie Puth",
        path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
        image: "./image/g2.jpg"
    },
    {
        name: "Perfect",
        singer: "Ed Sheeran",
        path: "./music/Ed Sheeran - Perfect.mp3",
        image: "./image/g4.jpg"
    },
    {
        name: "Night Changes",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    }
];


// Render
function renderTitlePlayer() {
    contentSongImg.src = songs[currentSong].image;
    contentSongName.innerHTML = songs[currentSong].name;
    contentArtistName.innerHTML = songs[currentSong].singer;
    contentCoverImg.src = songs[currentSong].image;
}

function renderListSong() {
    const stringHtml = songs.map(function (song, index) {
        return `
        <li class="header__song" onclick="handleChooseSong(${index})">
            <img class="header__song-img" src="${song.image}" alt="song-img">
            <div class="header__song-content">
                <div class="header__song-heading ${(index == currentSong && "active")}">
                    <h3>${song.name}</h3>
                    <div class="header__listening">
                        <i class="fa-solid fa-headphones"></i>
                        <span class="header__listening-count">166</span>
                    </div>
                </div>
                <p><span>Singer:</span>${song.singer}</p>
            </div>
        </li>
        `;
    });

    listOfSongs.innerHTML = stringHtml.join('');
}

function renderButtons() {
    isRepeat ?
        repeatBtn.style.opacity = '1' :
        repeatBtn.style.opacity = '0.3';

    isShuffle ?
        shuffleBtn.style.opacity = '1' :
        shuffleBtn.style.opacity = '0.3';
}

// ============ App ======================

renderTitlePlayer();
renderListSong();
renderButtons();

// =============== Buttons ========================

// Click play/pause btn
playBtn.onclick = function () {
    if (isPlaying) {
        isPlaying = false;
        audio.pause();
        playBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
        clearInterval(interval);
    } else {
        isPlaying = true;
        audio.play();
        playBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    }
};

// Click next btn
nextBtn.onclick = function () {
    if (isShuffle) {
        currentSong = Math.floor(Math.random() * songs.length);
    } else {
        checkPosition('next') && currentSong++;
    }

    renderListSong();
    loadCurrentSong();
};

// Click pre btn
preBtn.onclick = function () {
    if (isShuffle) {
        currentSong = Math.floor(Math.random() * songs.length);
    } else {
        checkPosition('pre') && currentSong--;
    }

    renderListSong();
    loadCurrentSong();
};

// Click repeat btn 
repeatBtn.onclick = function () {
    isRepeat = !isRepeat;
    renderButtons();
};

// Click shuffle btn
shuffleBtn.onclick = function () {
    isShuffle = !isShuffle;
    renderButtons();
};

// =============== Progress ========================

// Change progress
progress.onchange = function () {
    audio.currentTime = progress.value * audio.duration / 100;
};

//  Progress changed when audio played
audio.onplay = function () {
    interval = setInterval(() => {
        console.log('interval', interval);
        progress.value = Math.floor(audio.currentTime / audio.duration * 100);
    }, 1000);
};

// ===================== List of songs =========================

function handleChooseSong(index) {
    currentSong = index;
    progress.value = 0;

    renderTitlePlayer();
    renderListSong();

    audio.src = songs[currentSong].path;

    if (isPlaying) {
        audio.play();
    }
}

// ============== Song ================

// Load current song
function loadCurrentSong() {
    progress.value = 0;

    renderTitlePlayer();
    audio.src = songs[currentSong].path;

    if (isPlaying) {
        audio.play();
    }
}

// Check song position
function checkPosition(direction) {
    switch (direction) {
        case 'next':
            if (currentSong == (songs.length - 1)) {
                currentSong = 0;
                return false;
            }
            return true;
        case 'pre':
            if (currentSong == 0) {
                currentSong = songs.length - 1;
                return false;
            }
            return true;
        default:
            console.error('checkPosition need argument');
    }
}

// When song end
audio.onended = function () {
    if (isRepeat) {
        loadCurrentSong();
    }

    if (isShuffle) {
        currentSong = Math.floor(Math.random() * songs.length);
    } else {
        checkPosition('next') && currentSong++;
    }

    renderListSong();
    loadCurrentSong();
};




// sua loi interval khong xoa duoc
// progress hien thi loi chay ra giua khi chuyen song