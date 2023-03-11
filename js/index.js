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
    currentUser: null,
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    idInterval: undefined,

    // Data
    songs: [
        {
            name: "we dont talk anymore",
            artist: "charlie puth",
            info: "Lorem ipsum dolor sit amet",
            path: "./music/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3",
            image: "./image/charlieputh_singer.jpg",
            cover: "./image/wedonttalkanymore.jpg",
            listening: 155
        },
        {
            name: "perfect",
            artist: "ed sheeran",
            info: "Aenean ac ligula sit amet elit cursus venenatis",
            path: "./music/Ed Sheeran - Perfect.mp3",
            image: "./image/edsheeran_singer.jpg",
            cover: "./image/perfect.jpg",
            listening: 241
        },
        {
            name: "night changes",
            artist: "One Direction",
            info: "Vivamus elementum sapien",
            path: "./music/One Direction - Night Changes.mp3",
            image: "./image/onedirection_singer.jpg",
            cover: "./image/nightchanges.jpg",
            listening: 379
        },
        {
            name: "buoc qua mua co don",
            artist: "vu",
            info: "Nulla fringilla tortor non augue condimentum",
            path: "./music/BƯỚC QUA MÙA CÔ ĐƠN  Vũ Official MV.mp3",
            image: "./image/vu_singer.jpg",
            cover: "./image/buocquamuacodon.jpg",
            listening: 459
        },
        {
            name: "duong toi cho em ve",
            artist: "bui truong linh",
            info: "Aenean ac ligula sit amet elit cursus",
            path: "./music/Đường Tôi Chở Em Về  buitruonglinh  Lyrics Video.mp3",
            image: "./image/buitruonglinh_singer.jpg",
            cover: "./image/duongtoichoemve.jpg",
            listening: 649
        },
        {
            name: "lieu gio",
            artist: "c m 1 x",
            info: "Quisque bibendum eros id tellus euismod laoreet",
            path: "./music/LIỆU GIỜ CM1X REMIX  2T  VENN.mp3",
            image: "./image/cm1x_singer.jpg",
            cover: "./image/lieugio.jpg",
            listening: 354
        },
        {
            name: "mai khong phai la anh",
            artist: "thanh binh",
            info: "In molestie consectetur nunc ut scelerisque",
            path: "./music/Mãi Mãi Không Phải Anh  Thanh Bình  Official Audio.mp3",
            image: "./image/thanhbinh_singer.jpg",
            cover: "./image/maikhongphailaanh.jpg",
            listening: 571
        },
        {
            name: "muon noi voi em",
            artist: "c m 1 x",
            info: "Integer efficitur sodales sagittis",
            path: "./music/MUỐN NÓI VỚI EM CM1X Lofi Ver  TTeam.mp3",
            image: "./image/cm1x_singer.jpg",
            cover: "./image/muonnoivoiem.jpg",
            listening: 842
        },
        {
            name: "vi anh dau co biet",
            artist: "vu",
            info: "Aenean in tristique sapien, eget venenatis enim",
            path: "./music/Vì Anh Đâu Có Biết  Madihu Feat Vũ  Official MV.mp3",
            image: "./image/vu_singer.jpg",
            cover: "./image/vianhdaucobiet.jpg",
            listening: 625
        },
    ],

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

    // Render
    renderTitlePlayer: function () {
        displaySongImg.src = this.currentSong.image;
        displaySongName.innerHTML = this.stringCase(this.currentSong.name);
        displayArtistName.innerHTML = this.stringCase(this.currentSong.artist);
        displayCoverImg.src = this.currentSong.cover;
        displayListening.innerHTML = this.currentSong.listening;

        // Reset current time and time duration 
        currentTime.innerHTML = '00:00';
        if (audio.duration) {
            durationTime.innerHTML = this.showCurrentTime(audio.duration);
        }

    },

    renderListSong: function (list) {

        const stringHtml = list.map((song, index) => {
            return `
        <li class="header__song ${index == this.currentIndex ? "active" : ""}" data-index="${index}">
            <img class="header__song-img" src="${song.image}" alt="song-img">
            <div class="header__song-content">
                <div class="header__song-heading">
                    <h3>${this.stringCase(song.name)}</h3>
                    <div class="header__listening">
                        <i class="fa-solid fa-headphones"></i>
                        <span class="header__listening-count">${song.listening}</span>
                    </div>
                </div>
                <p><span>Artist:</span>${this.stringCase(song.artist)}</p>
            </div>
        </li>
        `;
        });

        listOfSongs.innerHTML = stringHtml.join('');
    },

    renderListSongByApi: function (list) {
        console.log(list);

        const stringHtml = list.map((song, index) => {
            return `
        <li class="header__song ${index == this.currentIndex ? "active" : ""}" data-index="${index}" data-id="${song.encodeId}">
            <img class="header__song-img" src="${song.thumbnailM}" alt="song-img">
            <div class="header__song-content">
                <div class="header__song-heading">
                    <h3>${this.stringCase(song.title)}</h3>
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

    // Define properties
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
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
                }, 2000);
            });

            promise
                .then(function (keyword) {
                    return _this.apiSearchByKeyword(keyword);
                })
                .then(function (listSong) {
                    _this.renderListSongByApi(listSong);
                });
        };

        // Handle event when choosing song from list
        listOfSongs.onclick = async function (e) {
            const songNode = e.target.closest('.header__song');

            if (songNode) {
                const songId = songNode.getAttribute('data-id');
                const song = await _this.apiGetSongById(songId);

                audio.src = song;
                audio.play();

                // _this.addToRecentSongs();
                // _this.currentIndex = songNode.getAttribute('data-index');
                // _this.loadCurrentSong();

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
        this.renderListSong(this.songs);
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

    // Uppercase string
    stringCase: function (str) {
        const convertToArray = str.toLowerCase().split(' ');
        const result = convertToArray.map(function (val) {
            return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
        });

        return result.join(' ');
    },

    toSlug: function (string) {
        //Đổi chữ hoa thành chữ thường
        slug = string.toLowerCase();

        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');

        return slug;
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
        this.renderListSong(this.songs);
        this.renderRecentTracks();
        this.renderButtons();
        this.renderUser();
    }
};

app.start();
