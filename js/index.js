const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// DOM element
const audio = $('#audio');
const titlePlayer = $('#title-player');
const progress = $('#progress');

const playBtn = $('#play');
const preBtn = $('#pre');
const nextBtn = $('#next');
const repeatBtn = $('#repeat');
const shuffleBtn = $('#shuffle');

const listSongs = $('#list-songs');

// State
let currentSong = 0;
let interval;
let isPlaying = false;
let isRepeat = false;
let isShuffle = false;

// Data
const songs = [
    {
        name: "1",
        singer: "Charlie Puth",
        path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
        image: "./image/g2.jpg"
    },
    {
        name: "2",
        singer: "Ed Sheeran",
        path: "./music/Ed Sheeran - Perfect.mp3",
        image: "./image/g4.jpg"
    },
    {
        name: "3",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    },
    {
        name: "4",
        singer: "Ed Sheeran",
        path: "./music/Ed Sheeran - Perfect.mp3",
        image: "./image/g4.jpg"
    },
    {
        name: "5",
        singer: "Charlie Puth",
        path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
        image: "./image/g2.jpg"
    },
    {
        name: "6",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    },
    {
        name: "7",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    },
    {
        name: "8",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    },
    {
        name: "9",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    },
    {
        name: "10",
        singer: "One Direction",
        path: "./music/One Direction - Night Changes.mp3",
        image: "./image/g6.jpg"
    }
];


// Render
function renderTitlePlayer() {
    const stringHtml = `
    <h1 class="card-title">${songs[currentSong].name}</h1>
    <h5 class="mb-3">${songs[currentSong].singer}</h5>
    <img class="image-song border" id="image-song" src="${songs[currentSong].image}" alt="${currentSong}">
    `;

    titlePlayer.innerHTML = stringHtml;
}

function renderListSong() {
    const stringHtml = songs.map(function (song, index) {
        return `
        <div class="alert ${index == currentSong ? 'alert-danger' : 'alert-primary'} d-flex align-item-start py-1 px-3" onclick="handleChooseSong(${index})">
            <div class="d-flex flex-column">
                <h3 class="m-0">${song.name}</h3>
                <h5 class="m-0">${song.singer}</h5>
            </div>
        </div>
        `;
    });
    listSongs.innerHTML = stringHtml.join('');
}

// ============ App ======================

renderTitlePlayer();
renderListSong();


// =============== Buttons ========================

// Click play/pause btn
playBtn.onclick = function () {
    if (isPlaying) {
        isPlaying = false;
        audio.pause();
        playBtn.innerHTML = 'Play';
        clearInterval(interval);
    } else {
        isPlaying = true;
        audio.play();
        playBtn.innerHTML = 'Pause';
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
    checkPosition('pre') && currentSong--;

    renderListSong();
    loadCurrentSong();
};

// Click repeat btn 
repeatBtn.onclick = function () {
    isRepeat = !isRepeat;
    isRepeat ?
        repeatBtn.className = 'btn btn-warning' :
        repeatBtn.className = 'btn btn-outline-warning';
};

// Click shuffle btn
shuffleBtn.onclick = function () {
    isShuffle = !isShuffle;
    isShuffle ?
        shuffleBtn.className = 'btn btn-info' :
        shuffleBtn.className = 'btn btn-outline-info';
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
// xoay image-song