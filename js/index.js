const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// =====================  =======================

// DOM element base
const audio = $('#audio');
const progress = $('#progress');
const listOfSongs = $('.header__list-songs');

// DOM element Display Left
const displaySongImg = $('.display__song-img');
const displaySongName = $('.display__song-name');
const displayArtistName = $('.display__artist-name');
const displayCoverImg = $('.display__cover-img');

// DOM element Controller Buttons
const playBtn = $('#play');
const preBtn = $('#pre');
const nextBtn = $('#next');
const repeatBtn = $('#repeat');
const shuffleBtn = $('#shuffle');

const app = {

    // State
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    interval: null,

    // Data
    songs: [
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
    ],

    // Render
    renderTitlePlayer: function () {
        displaySongImg.src = this.currentSong.image;
        displaySongName.innerHTML = this.currentSong.name;
        displayArtistName.innerHTML = this.currentSong.singer;
        displayCoverImg.src = this.currentSong.image;
    },

    renderListSong: function () {

        const stringHtml = this.songs.map((song, index) => {
            return `
        <li class="header__song ${index == this.currentIndex ? "active" : ""}" data-index="${index}">
            <img class="header__song-img" src="${song.image}" alt="song-img">
            <div class="header__song-content">
                <div class="header__song-heading">
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
    },

    renderButtons: function () {
        this.isRepeat ?
            repeatBtn.style.opacity = '1' :
            repeatBtn.style.opacity = '0.3';

        this.isShuffle ?
            shuffleBtn.style.opacity = '1' :
            shuffleBtn.style.opacity = '0.3';
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents: function () {
        const _this = this;

        // ===================== Buttons =======================

        // Handle when click play/pause button
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Handle when song is playing
        audio.onplay = function () {
            _this.isPlaying = true;
            playBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
        };

        // Handle when song is paused
        audio.onpause = function () {
            _this.isPlaying = false;
            playBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
        };

        // Handle when click next button
        nextBtn.onclick = function () {
            if (_this.isShuffle) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }

            _this.loadCurrentSong();
            _this.checkPlaying();
        };

        // Handle when click pre button
        preBtn.onclick = function () {
            if (_this.isShuffle) {
                _this.randomSong();
            } else {
                _this.preSong();
            }

            _this.loadCurrentSong();
            _this.checkPlaying();
        };

        // Handle when click repeat button 
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.renderButtons();
        };

        // Handle when click shuffle button
        shuffleBtn.onclick = function () {
            _this.isShuffle = !_this.isShuffle;
            _this.renderButtons();
        };

        // ===================== Progress bar =======================

        // Handle when change progress
        progress.oninput = function () {
            audio.currentTime = progress.value * audio.duration / 100;
        };

        // Handle progress is changed when audio is playing
        audio.ontimeupdate = function () {
            if (audio.duration) {
                progress.value = audio.currentTime / audio.duration * 100;
            }
        };

        // Handle when song end
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // ===================== List of Songs =======================

        listOfSongs.onclick = function (e) {
            const songNode = e.target.closest('.header__song');

            if (songNode) {
                _this.currentIndex = songNode.getAttribute('data-index');

                _this.loadCurrentSong();
                _this.checkPlaying();
            }
        };
    },

    loadCurrentSong: function () {
        this.renderTitlePlayer();
        this.renderListSong();
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        if (this.currentIndex === (this.songs.length - 1)) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.loadCurrentSong();
    },

    preSong: function () {
        if (this.currentIndex === 0) {
            this.currentIndex = this.songs.length - 1;
        } else {
            this.currentIndex--;
        }
        this.loadCurrentSong();
    },

    randomSong: function () {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex === randomIndex);

        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },

    checkPlaying: function () {
        if (this.isPlaying) {
            audio.play();
        }
    },


    start: function () {

        // Define properties
        this.defineProperties();

        // Handle DOM events
        this.handleEvents();

        // Load song s information when first load app
        this.loadCurrentSong();

        // Render
        this.renderTitlePlayer();
        this.renderListSong();
        this.renderButtons();
    }
};

app.start();

// sua loi interval khong xoa duoc
// progress hien thi loi chay ra giua khi chuyen song