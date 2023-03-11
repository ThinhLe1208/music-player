const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// =====================  =======================

// DOM element base
const player = $('.player');
const audio = $('#audio');
const recentTracks = $('.display__history');

// DOM element Display Left
const displaySongImg = $('.display__song-img');
const displaySongName = $('.display__song-name');
const displayArtistName = $('.display__artist-name');
const displayCoverImg = $('.display__cover-img');
const displayListening = $('.display__listening-count');

// DOM element Controller Buttons
const playBtn = $('#play');
const preBtn = $('#pre');
const nextBtn = $('#next');
const repeatBtn = $('#repeat');
const shuffleBtn = $('#shuffle');

// DOM element Footer
const progress = $('#progress');
const userIcon = $('.footer__user');
const userIconBtn = $('.footer__user-btn');
const footerModal = $('.footer__modal');
const volumeProgress = $('.footer__volume');
const volumeNum = $('.footer__volume-num');
const currentTime = $('.footer__current-time');
const durationTime = $('.footer__duration-time');

// DOM element Sidebar
const searchInput = $('.header_search-input');
const spinner = $('.header__spinner');
const listOfSongs = $('.header__list-songs');

// DOM element Modal User
const userSignUp = $('#user-sign-up');
const passSignUp = $('#pass-sign-up');
const checkSignUp = $('#check-sign-up');
const createAccBtn = $('#create-acc');
const userSignIn = $('#user-sign-in');
const passSignIn = $('#pass-sign-in');
const signInBtn = $('#sign-in');
const userName = $('#user-name');

// DOM element User Menu
const signOutBtn = $('.footer__sign-out-btn');

// DOM element Toasts
const successToast = $('#success-toast');
const failToast = $('#fail-toast');

const app = {

    // State
    currentIndex: 0,
    currentId: 1,
    currentUser: null,
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    idInterval: undefined,

    // Data
    songs: [
        {
            encodeId: '1',
            title: "We Dont Talk Anymore",
            artistsNames: "Charlie Puth",
            album: { title: "Lorem ipsum dolor sit amet" },
            path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
            thumbnailM: "./image/charlieputh_singer.jpg",
            thumbnail: "./image/wedonttalkanymore.jpg",
            duration: 155
        },
        {
            encodeId: '2',
            title: "Perfect",
            artistsNames: "Ed Sheeran",
            album: { title: "Aenean ac ligula sit amet elit cursus venenatis" },
            path: "./music/Ed Sheeran - Perfect.mp3",
            thumbnailM: "./image/edsheeran_singer.jpg",
            thumbnail: "./image/perfect.jpg",
            duration: 241
        },
        {
            encodeId: '3',
            title: "Night Changes",
            artistsNames: "One Direction",
            album: { title: "Vivamus elementum sapien" },
            path: "./music/One Direction - Night Changes.mp3",
            thumbnailM: "./image/onedirection_singer.jpg",
            thumbnail: "./image/nightchanges.jpg",
            duration: 379
        },
        {
            encodeId: '4',
            title: "Buoc Qua Mua Co Don",
            artistsNames: "Vu",
            album: { title: "Nulla fringilla tortor non augue condimentum" },
            path: "./music/BƯỚC QUA MÙA CÔ ĐƠN  Vũ Official MV.mp3",
            thumbnailM: "./image/vu_singer.jpg",
            thumbnail: "./image/buocquamuacodon.jpg",
            duration: 459
        },
        {
            encodeId: '5',
            title: "Duong Toi Cho Em Ve",
            artistsNames: "Bui Truong Linh",
            album: { title: "Aenean ac ligula sit amet elit cursus" },
            path: "./music/Đường Tôi Chở Em Về  buitruonglinh  Lyrics Video.mp3",
            thumbnailM: "./image/buitruonglinh_singer.jpg",
            thumbnail: "./image/duongtoichoemve.jpg",
            duration: 649
        },
        {
            encodeId: '6',
            title: "Lieu Gio",
            artistsNames: "C M 1 X",
            album: { title: "Quisque bibendum eros id tellus euismod laoreet" },
            path: "./music/LIỆU GIỜ CM1X REMIX  2T  VENN.mp3",
            thumbnailM: "./image/cm1x_singer.jpg",
            thumbnail: "./image/lieugio.jpg",
            duration: 354
        },
        {
            encodeId: '7',
            title: "Mai Khong Phai La Anh",
            artistsNames: "Thanh Binh",
            album: { title: "In molestie consectetur nunc ut scelerisque" },
            path: "./music/Mãi Mãi Không Phải Anh  Thanh Bình  Official Audio.mp3",
            thumbnailM: "./image/thanhbinh_singer.jpg",
            thumbnail: "./image/maikhongphailaanh.jpg",
            duration: 571
        },
        {
            encodeId: '8',
            title: "Muon Noi Voi Em",
            artistsNames: "C M 1 X",
            album: { title: "Integer efficitur sodales sagittis" },
            path: "./music/MUỐN NÓI VỚI EM CM1X Lofi Ver  TTeam.mp3",
            thumbnailM: "./image/cm1x_singer.jpg",
            thumbnail: "./image/muonnoivoiem.jpg",
            duration: 842
        },
        {
            encodeId: '9',
            title: "Vi Anh Dau Co Biet",
            artistsNames: "Vu",
            album: { title: "Aenean in tristique sapien, eget venenatis enim" },
            path: "./music/Vì Anh Đâu Có Biết  Madihu Feat Vũ  Official MV.mp3",
            thumbnailM: "./image/vu_singer.jpg",
            thumbnail: "./image/vianhdaucobiet.jpg",
            duration: 625
        },
    ],

    currentSong: {
        encodeId: '1',
        title: "We Dont Talk Anymore",
        artistsNames: "Charlie Puth",
        album: { title: "Lorem ipsum dolor sit amet" },
        path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
        thumbnailM: "./image/charlieputh_singer.jpg",
        thumbnail: "./image/wedonttalkanymore.jpg",
        duration: 155
    },
    searchSongs: [],
    recentSongs: [],
    listUsers: [],

    // Call API
    apiSearchByKeyword: async function (keyword) {
        const result = await axios({
            url: 'http://localhost:5000/api/search',
            method: 'GET',
            params: {
                keyword: keyword
            }
        });

        return result.data.data.songs;
    },

    apiGetSongById: async function (id) {
        const result = await axios({
            url: 'http://localhost:5000/api/song',
            method: 'GET',
            params: {
                id: id
            }
        });

        return result.data.data[128];
    },

    apiGetInfoSongById: async function (id) {
        const result = await axios({
            url: 'http://localhost:5000/api/infoSong',
            method: 'GET',
            params: {
                id: id
            }
        });

        return result.data.data;
    },

    // Render
    renderTitlePlayer: function () {
        displaySongImg.src = this.currentSong.thumbnailM;
        displaySongName.innerHTML = this.currentSong.title;
        displayArtistName.innerHTML = this.currentSong.artistsNames;
        displayCoverImg.src = this.currentSong.thumbnailM;
        displayListening.innerHTML = this.currentSong.duration;

        // Reset current time and time duration 
        currentTime.innerHTML = '00:00';
        if (audio.duration) {
            durationTime.innerHTML = this.showCurrentTime(audio.duration);
        }
    },

    renderListSong: function () {
        let list = [];

        if (this.searchSongs.length) {
            list = this.searchSongs;
        } else {
            list = this.songs;
        }
        console.log(list);

        const stringHtml = list.map((song, index) => {
            return `
        <li class="header__song ${song.encodeId == this.currentId ? "active" : ""}" data-index="${index}" data-id="${song.encodeId}">
            <img class="header__song-img" src="${song.thumbnailM}" alt="song-img">
            <div class="header__song-content">
                <div class="header__song-heading">
                    <h3>${song.title}</h3>
                    <div class="header__listening">
                        <i class="fa-solid fa-headphones"></i>
                        <span class="header__listening-count">${song.duration}</span>
                    </div>
                </div>
                <p><span>Artist:</span>${song.artistsNames}</p>
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
            <h3>${song.title}</h3>
            <p><span>Artist:</span>${song.artistsNames}</p>
            <p><span>Info:</span>${song.album.title}</p>
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

    renderUser: function () {
        if (this.currentUser) {
            userName.innerHTML = this.currentUser.user;
            userIcon.style.display = 'flex';
            userIconBtn.style.display = 'none';
        } else {
            userIcon.style.display = 'none';
            userIconBtn.style.display = 'block';
        }
    },

    // User Constructor
    User: function (user, pass) {
        this.user = user;
        this.pass = pass;
    },

    // Handle DOM events
    handleEvents: function () {
        const _this = this;

        // ===================== Audio =======================

        // Handle event when audio preload
        audio.onloadedmetadata = function () {
            _this.renderTitlePlayer();
        };

        // ===================== Buttons =======================

        // Handle event when clicking play/pause button
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Handle event when playing song
        audio.onplay = function () {
            _this.isPlaying = true;
            playBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
        };

        // Handle event when pausing song
        audio.onpause = function () {
            _this.isPlaying = false;
            playBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
        };

        // Handle event when clicking next button
        nextBtn.onclick = function () {
            _this.addToRecentSongs();

            if (_this.isShuffle) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }

            audio.play();
        };

        // Handle event when clicking pre button
        preBtn.onclick = function () {
            _this.addToRecentSongs();

            if (_this.isShuffle) {
                _this.randomSong();
            } else {
                _this.preSong();
            }

            audio.play();
        };

        // Handle event when clicking repeat button 
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.renderButtons();
        };

        // Handle event when clicking shuffle button
        shuffleBtn.onclick = function () {
            _this.isShuffle = !_this.isShuffle;
            _this.renderButtons();
        };

        // ===================== Progress bar =======================

        // Handle event when changing song progress
        progress.oninput = function () {
            audio.currentTime = progress.value * audio.duration / 100;
        };

        // Handle event when song is playing
        audio.ontimeupdate = function () {
            if (audio.duration) {
                // change song progress
                progress.value = audio.currentTime / audio.duration * 100;

                // change current time display
                currentTime.innerHTML = _this.showCurrentTime(audio.currentTime);
            }
        };

        // Handle event when song end
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Handle event when changing volume progress
        volumeProgress.oninput = function () {
            audio.volume = volumeProgress.value / 100;
            volumeNum.innerHTML = volumeProgress.value;
        };

        // ===================== Sidebar =======================

        // Handle event when searching song from list
        searchInput.oninput = async function () {


            const keyword = searchInput.value;
            const promise = new Promise(function (resolve) {
                _this.idInterval && clearTimeout(_this.idInterval);

                _this.idInterval = setTimeout(function () {
                    resolve(keyword);
                }, 1000);
            });

            promise
                .then(function (keyword) {
                    return new Promise(function (resolve) {
                        listOfSongs.innerHTML = '';
                        spinner.style.display = 'block';

                        setTimeout(function () {
                            resolve(keyword);
                        }, 1000);
                    });
                })
                .then(function (keyword) {
                    return _this.apiSearchByKeyword(keyword);
                })
                .then(function (listSong) {
                    spinner.style.display = 'none';
                    if (listSong) {
                        _this.searchSongs = [...listSong];
                    } else {
                        _this.searchSongs = [];
                    }
                    _this.renderListSong();
                });
        };

        // Handle event when choosing song from list
        listOfSongs.onclick = async function (e) {
            const songNode = e.target.closest('.header__song');

            if (songNode) {
                const songId = songNode.getAttribute('data-id');

                const existSong = _this.songs.find(function (song) {
                    return song.encodeId === songId;
                });

                if (existSong) {
                    _this.currentSong = existSong;
                } else {
                    _this.currentSong = await _this.apiGetInfoSongById(songId);
                    _this.currentSong.path = await _this.apiGetSongById(songId);
                }

                _this.currentId = _this.currentSong.encodeId;
                _this.loadCurrentSong();
                _this.addToRecentSongs();

                audio.play();
            }
        };

        // ===================== Modal User =======================

        // Handle event when clicking user icon button
        footerModal.onclick = function () {
            const dom = $('body > .modal-backdrop.fade.show');

            if (dom) {
                dom.style.position = 'absolute';
                player.appendChild(dom);
            }
        };

        // Handle event when clicking Create account button
        createAccBtn.onclick = function () {
            let isValid = checkSignUp.checked && userSignUp.value.trim() !== '' && passSignUp.value.trim() !== '';

            if (isValid) {
                const user = new _this.User(userSignUp.value, passSignUp.value);

                _this.listUsers.push(user);
                _this.showToast(true);
                _this.resetForm(footerModal);

                console.log(_this.listUsers);
            } else {
                _this.showToast(false);
            }
        };

        // Handle event when clicking Sign In button
        signInBtn.onclick = function () {
            const user = _this.listUsers.find(function (user) {
                return user.user === userSignIn.value && user.pass === passSignIn.value;
            });

            if (user) {
                _this.currentUser = user;
                _this.renderUser();
                _this.showToast(true);
                _this.resetForm(footerModal);
            } else {
                _this.showToast(false);
            }
        };

        // ===================== User Menu =======================

        // Handle event when clicking User profile
        userIcon.onclick = function () {

        };

        // Handle event when clicking Sign out button
        signOutBtn.onclick = function () {
            _this.currentUser = null;
            _this.renderUser();
        };
    },

    // ===================== Utilities =======================
    loadCurrentSong: function () {
        audio.src = this.currentSong.path;
        this.renderTitlePlayer();
        this.renderListSong();
    },

    nextSong: function () {
        if (this.currentIndex === (this.songs.length - 1)) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.currentSong = this.songs[this.currentIndex];
        this.currentId = this.currentSong.encodeId;
        this.loadCurrentSong();
    },

    preSong: function () {
        if (this.currentIndex === 0) {
            this.currentIndex = this.songs.length - 1;
        } else {
            this.currentIndex--;
        }
        this.currentSong = this.songs[this.currentIndex];
        this.currentId = this.currentSong.encodeId;
        this.loadCurrentSong();
    },

    randomSong: function () {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex === randomIndex);

        this.currentIndex = randomIndex;
        this.currentSong = this.songs[this.currentIndex];
        this.currentId = this.currentSong.encodeId;
        this.loadCurrentSong();
    },

    addToRecentSongs: function () {
        this.recentSongs.push(this.currentSong);
        if (this.recentSongs.length > 3) {
            this.recentSongs.shift();
        }
        this.renderRecentTracks();
    },

    showCurrentTime: function (time) {
        const sec = Math.floor(time % 60);
        const min = Math.floor(time / 60);

        const secNum = sec < 10 ? `0${sec}` : `${sec}`;
        const minNum = min < 10 ? `0${min}` : `${min}`;

        return `${minNum}:${secNum}`;
    },

    showToast: function (type) {
        let toast;

        switch (type) {
            case true:
                toast = new bootstrap.Toast(successToast);
                break;
            case false:
                toast = new bootstrap.Toast(failToast);
                break;
        }

        toast.show();
    },

    resetForm: function (form) {
        const inputList = form.querySelectorAll('input');
        const clostBtn = form.querySelector('.modal.show').querySelector('button');

        inputList.forEach(function (input) {
            if (input.matches('[type=checkbox]')) {
                input.checked = false;
            } else {
                input.value = '';
            };
        });

        clostBtn.click();
    },

    start: function () {

        // Handle DOM events
        this.handleEvents();

        // Load song s information when first load app
        this.loadCurrentSong();

        // Render
        this.renderTitlePlayer();
        this.renderListSong();
        this.renderRecentTracks();
        this.renderButtons();
        this.renderUser();
    }
};

app.start();