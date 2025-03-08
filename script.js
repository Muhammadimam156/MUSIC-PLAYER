const songs = [
    { title: "MERI ZINDAGI", artist: "OWAIS", src: "Music/MERI ZINDAGI.mp3", cover: "https://tse1.mm.bing.net/th?id=OIP.fDinyrEpKIX_QqGMjwzkawHaHa&pid=Api&P=0&h=220" },
    { title: "MAIN BANDAYE ASI HU", artist: "DAWAT E ISLAMI", src: "Music/MAIN BANDA.mp3", cover: "https://tse3.mm.bing.net/th?id=OIP.qsK1pIXcRPJxWyPcKO1gHQHaHa&pid=Api&P=0&h=220" },
    { title: "YA ALLAH", artist: "SAYLANI ", src: "Music/YA ALLAH.mp3", cover: "https://static.vecteezy.com/system/resources/previews/007/810/697/original/colorful-ya-allah-arabic-calligraphy-image-free-vector.jpg" },
];

let currentIndex = 0;
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const cover = document.getElementById("cover");
const toggleMenuBtn = document.getElementById("toggle-menu");
const playlistContainer = document.getElementById("playlist");

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    cover.src = song.cover;
    playPauseBtn.textContent = "▶";
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.textContent = "⏸";
}

function updateProgress() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
}

function seek(event) {
    const percent = event.target.value / 100;
    audio.currentTime = percent * audio.duration;
}

function toggleMenu() {
if (playlistContainer.style.display === "block") {
playlistContainer.style.display = "none";
} else {
showPlaylist();
playlistContainer.style.display = "block";
}
}

function showPlaylist() {
playlistContainer.innerHTML = "";
songs.forEach((song, index) => {
const songElement = document.createElement("div");
songElement.textContent = song.title;
songElement.classList.add("playlist-item");
songElement.onclick = () => {
    currentIndex = index;
    loadSong(index);
    audio.play();
    playPauseBtn.textContent = "⏸";
    playlistContainer.style.display = "none"; // Playlist ko auto hide karna
};
playlistContainer.appendChild(songElement);
});
}

toggleMenuBtn.addEventListener("click", toggleMenu);


playPauseBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("input", seek);
toggleMenuBtn.addEventListener("click", toggleMenu);

loadSong(currentIndex);