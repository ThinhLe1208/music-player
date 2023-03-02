const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// =====================  =======================

// DOM element base
const audio = $('#audio');
const progress = $('#progress');
const listOfSongs = $('.header__list-songs');
const recentTracks = $('.display__history');

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
            name: "we dont talk anymore",
            artist: "charlie puth",
            info: "Lorem ipsum dolor sit amet",
            path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
            image: "./image/charlieputh_singer.jpg",
            cover: "./image/wedonttalkanymore.jpg"
        },
        {
            name: "perfect",
            artist: "ed sheeran",
            info: "Aenean ac ligula sit amet elit cursus venenatis",
            path: "./music/Ed Sheeran - Perfect.mp3",
            image: "./image/edsheeran_singer.jpg",
            cover: "./image/perfect.jpg"
        },
        {
            name: "night changes",
            artist: "One Direction",
            info: "Vivamus elementum sapien",
            path: "./music/One Direction - Night Changes.mp3",
            image: "./image/onedirection_singer.jpg",
            cover: "./image/nightchanges.jpg"
        },
        {
            name: "buoc qua mua co don",
            artist: "vu",
            info: "Nulla fringilla tortor non augue condimentum",
            path: "./music/BƯỚC QUA MÙA CÔ ĐƠN  Vũ Official MV.mp3",
            image: "./image/vu_singer.jpg",
            cover: "./image/buocquamuacodon.jpg"
        },
        {
            name: "duong toi cho em ve",
            artist: "bui truong linh",
            info: "Aenean ac ligula sit amet elit cursus",
            path: "./music/Đường Tôi Chở Em Về  buitruonglinh  Lyrics Video.mp3",
            image: "./image/buitruonglinh_singer.jpg",
            cover: "./image/duongtoichoemve.jpg"
        },
        {
            name: "lieu gio",
            artist: "c m 1 x",
            info: "Quisque bibendum eros id tellus euismod laoreet",
            path: "./music/LIỆU GIỜ CM1X REMIX  2T  VENN.mp3",
            image: "./image/cm1x_singer.jpg",
            cover: "./image/lieugio.jpg"
        },
        {
            name: "mai khong phai la anh",
            artist: "thanh binh",
            info: "In molestie consectetur nunc ut scelerisque",
            path: "./music/Mãi Mãi Không Phải Anh  Thanh Bình  Official Audio.mp3",
            image: "./image/thanhbinh_singer.jpg",
            cover: "./image/maikhongphailaanh.jpg"
        },
        {
            name: "muon noi voi em",
            artist: "c m 1 x",
            info: "Integer efficitur sodales sagittis",
            path: "./music/MUỐN NÓI VỚI EM CM1X Lofi Ver  TTeam.mp3",
            image: "./image/cm1x_singer.jpg",
            cover: "./image/muonnoivoiem.jpg"
        },
        {
            name: "vi anh dau co biet",
            artist: "vu",
            info: "Aenean in tristique sapien, eget venenatis enim",
            path: "./music/Vì Anh Đâu Có Biết  Madihu Feat Vũ  Official MV.mp3",
            image: "./image/vu_singer.jpg",
            cover: "./image/vianhdaucobiet.jpg"
        },
    ],

    recentSongs: [],

    // Render
    renderTitlePlayer: function () {
        displaySongImg.src = this.currentSong.image;
        displaySongName.innerHTML = this.stringCase(this.currentSong.name);
        displayArtistName.innerHTML = this.stringCase(this.currentSong.artist);
        displayCoverImg.src = this.currentSong.cover;
    },

    renderListSong: function () {

        const stringHtml = this.songs.map((song, index) => {
            return `
        <li class="header__song ${index == this.currentIndex ? "active" : ""}" data-index="${index}">
            <img class="header__song-img" src="${song.image}" alt="song-img">
            <div class="header__song-content">
                <div class="header__song-heading">
                    <h3>${this.stringCase(song.name)}</h3>
                    <div class="header__listening">
                        <i class="fa-solid fa-headphones"></i>
                        <span class="header__listening-count">166</span>
                    </div>
                </div>
                <p><span>Artist:</span>${this.stringCase(song.artist)}</p>
            </div>
        </li>
        `;
        });

        listOfSongs.innerHTML = stringHtml.join('');
    },

    renderRecentTracks: function () {
        const stringHtml = this.recentSongs.map((song, index) => {
            return `
        <li class="display__item">
            <h3>${this.stringCase(song.name)}</h3>
            <p><span>Artist:</span>${this.stringCase(song.artist)}</p>
            <p><span>Info:</span>${song.info}</p>
        </li>
        `;
        });

        recentTracks.innerHTML = stringHtml.join('');
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
            _this.addToRecentSongs();

            if (_this.isShuffle) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }

            audio.play();
        };

        // Handle when click pre button
        preBtn.onclick = function () {
            _this.addToRecentSongs();

            if (_this.isShuffle) {
                _this.randomSong();
            } else {
                _this.preSong();
            }

            audio.play();
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

        // Handle choose song from list
        listOfSongs.onclick = function (e) {
            const songNode = e.target.closest('.header__song');

            if (songNode) {
                _this.addToRecentSongs();
                _this.currentIndex = songNode.getAttribute('data-index');
                _this.loadCurrentSong();

                audio.play();
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

    addToRecentSongs: function () {
        this.recentSongs.push(this.currentSong);
        if (this.recentSongs.length > 3) {
            this.recentSongs.shift();
        }
        this.renderRecentTracks();
    },

    stringCase: function (str) {
        const convertToArray = str.toLowerCase().split(' ');
        const result = convertToArray.map(function (val) {
            return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
        });

        return result.join(' ');
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
        this.renderRecentTracks();
        this.renderButtons();
    }
};

app.start();
