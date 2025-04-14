document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("play");
    const playIcon = document.getElementById("play-icon");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const progress = document.getElementById("progress");
    const songTitle = document.getElementById("song-title");
    const artistName = document.getElementById("artist-name");
    const albumCover = document.getElementById("album-cover");
    const favoriteBtn = document.getElementById("favorite");
    const shuffleBtn = document.getElementById("shuffle");
    const repeatBtn = document.getElementById("repeat");

    const songs = [
        { title: "Humari Adhuri Kahani", artist: "Arijit Singh", src: "Songs/humari_adhuri_kahani.mp3", cover: "Album cover/humari_adhuri_kahani.jpg" },
        { title: "Over You", artist: "Rajab Butt", src: "Songs/over_you.mp3", cover: "Album cover/overyou.jpg" },
        { title: "Dil Diyan Gallan", artist: "Atif Aslam", src: "Songs/dil_diya_gallan.mp3", cover: "Album cover/dil_diya_gallan.jpg" }
    ];

    let currentSongIndex = 0;
    let isFavorite = false;
    let isShuffle = false;
    let isRepeat = false;

    function loadSong(song) {
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        audio.src = song.src;
        albumCover.src = song.cover;
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playIcon.classList.replace("fa-play", "fa-pause");
        } else {
            audio.pause();
            playIcon.classList.replace("fa-pause", "fa-play");
        }
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        audio.play();
        playIcon.classList.replace("fa-play", "fa-pause");
    }

    function nextSong() {
        if (isShuffle) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * songs.length);
            } while (newIndex === currentSongIndex); // Prevent same song from playing again
            currentSongIndex = newIndex;
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadSong(songs[currentSongIndex]);
        audio.play();
        playIcon.classList.replace("fa-play", "fa-pause");
    }

    
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            progress.value = (audio.currentTime / audio.duration) * 100;
        }
    });

   
    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    favoriteBtn.addEventListener("click", () => {
        isFavorite = !isFavorite;
        favoriteBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        favoriteBtn.classList.toggle("active", isFavorite);
    });

   
    shuffleBtn.addEventListener("click", () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle("active", isShuffle);
    });


    repeatBtn.addEventListener("click", () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle("active", isRepeat);
    });


    audio.addEventListener("ended", () => {
        if (isRepeat) {
            audio.currentTime = 0;
            audio.play(); 
        } else {
            nextSong(); 
        }
    });

    playBtn.addEventListener("click", playPause);
    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", nextSong);

    loadSong(songs[currentSongIndex]);
});
