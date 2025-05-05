const songs = [
    { id: 1, name: "HEAVEN CROWN", artist: "Kendrick Lamar & Kanye West", src: "../RECURSOS/music/1.mp3", img: "../RECURSOS/img/1.jpg" },
    { id: 2, name: "WONDERING", artist: "Kanye West", src: "../RECURSOS/music/2.mp3", img: "../RECURSOS/img/2.jpg" },
    { id: 3, name: "SAVE YOU WILL", artist: "Ty Dolla $ign & Juice WRLD", src: "../RECURSOS/music/3.mp3", img: "../RECURSOS/img/3.jpg" },
    { id: 4, name: "NO APOLOGIZE FT Drake", artist: "21 Savage & Kendrick Lamar & Drake", src: "../RECURSOS/music/4.mp3", img: "../RECURSOS/img/2.jpg" }
];

const audio = new Audio();
let currentSongIndex = 0;
let isLooping = false;

const elements = {
    playBtn: document.getElementById('masterPlay'),
    title: document.getElementById('title'),
    poster: document.getElementById('poster_master_play'),
    wave: document.getElementById('wave'),
    seek: document.getElementById('seek'),
    bar2: document.getElementById('bar2'),
    currentStart: document.getElementById('currentStart'),
    currentEnd: document.getElementById('currentEnd'),
    vol: document.getElementById('vol'),
    volIcon: document.getElementById('vol_icon'),
    volBar: document.querySelector('.vol_bar'),
    volDot: document.getElementById('vol_dot'),
    seekDot: document.querySelector('.bar .dot'),
    nextBtn: document.querySelector('.bi-skip-end-fill'),
    prevBtn: document.querySelector('.bi-skip-start-fill'),
    loopBtn: document.getElementById('loopBtn') // Nuevo botón para bucle
};

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    elements.title.innerHTML = `${song.name}<div class="subtitle">${song.artist}</div>`;
    elements.poster.src = song.img;
    audio.load();
    highlightPlaylistSong(song.id);
}

function highlightPlaylistSong(id) {
    document.querySelectorAll('.playlistPlay').forEach(el => {
        el.classList.remove('bi-pause-fill');
        el.classList.add('bi-play-fill');
    });
    const currentBtn = document.getElementById(id);
    if (currentBtn) {
        currentBtn.classList.remove('bi-play-fill');
        currentBtn.classList.add('bi-pause-fill');
    }
}

function playSong() {
    audio.play();
    elements.wave.classList.add('active1');
    elements.playBtn.classList.replace('bi-play-fill', 'bi-pause-fill');
}

function pauseSong() {
    audio.pause();
    elements.wave.classList.remove('active1');
    elements.playBtn.classList.replace('bi-pause-fill', 'bi-play-fill');
}

function togglePlayPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Loop toggle
elements.loopBtn?.addEventListener('click', () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    elements.loopBtn.classList.toggle('active');
});

audio.addEventListener('ended', () => {
    if (!isLooping) nextSong();
});

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    elements.seek.value = progress;
    elements.bar2.style.width = `${progress}%`;
    if (elements.seekDot) elements.seekDot.style.left = `${progress}%`;

    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    elements.currentStart.textContent = formatTime(audio.currentTime);
    elements.currentEnd.textContent = formatTime(audio.duration);
});

elements.seek.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (elements.seek.value / 100) * audio.duration;
});

elements.vol.addEventListener('input', () => {
    const volume = elements.vol.value / 100;
    audio.volume = volume;
    elements.volBar.style.width = `${volume * 100}%`;
    elements.volDot.style.left = `${volume * 100}%`;

    if (volume === 0) elements.volIcon.className = 'bi bi-volume-mute';
    else if (volume < 0.5) elements.volIcon.className = 'bi bi-volume-down';
    else elements.volIcon.className = 'bi bi-volume-up';
});

// Play/Pause general
elements.playBtn.addEventListener('click', togglePlayPause);

// Botones individuales en lista
document.querySelectorAll('.playlistPlay').forEach(btn => {
    btn.addEventListener('click', () => {
        const songIndex = songs.findIndex(song => song.id === parseInt(btn.id));
        if (songIndex !== -1) {
            if (currentSongIndex === songIndex && !audio.paused) {
                pauseSong();
            } else {
                currentSongIndex = songIndex;
                loadSong(currentSongIndex);
                playSong();
            }
        }
    });
});

elements.nextBtn?.addEventListener('click', nextSong);
elements.prevBtn?.addEventListener('click', prevSong);

window.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSongIndex);
});



function renderPlaylist(filteredSongs = songs) {
    playlistContainer.innerHTML = "";

    filteredSongs.forEach(song => {
        const btn = document.createElement('button');
        btn.classList.add('playlistPlay', 'bi', 'bi-play-fill');
        btn.id = song.id;
        btn.innerHTML = `
            <img src="${song.img}" alt="${song.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px; margin-right: 10px;">
            <span style="font-weight: bold;">${song.name}</span>
            <small style="display: block; font-size: 0.75em;">${song.artist}</small>
        `;
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.gap = "10px";
        btn.style.marginBottom = "10px";
        playlistContainer.appendChild(btn);

        // Asignar evento de reproducción
        btn.addEventListener('click', () => {
            const songIndex = songs.findIndex(s => s.id === song.id);
            if (songIndex !== -1) {
                if (currentSongIndex === songIndex && !audio.paused) {
                    pauseSong();
                } else {
                    currentSongIndex = songIndex;
                    loadSong(currentSongIndex);
                    playSong();
                }
            }
        });
    });
}
// Buscador
let searchInput = document.querySelector('.buscar input');
searchInput.addEventListener('keyup', () => {
    let filter = searchInput.value.toLowerCase();
    let items = document.querySelectorAll('.songItem');

    items.forEach(item => {
        let text = item.querySelector('h5').innerText.toLowerCase();
        item.style.display = text.includes(filter) ? 'flex' : 'none';
    });
});

// Filtro en tiempo real
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song =>
        song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    renderPlaylist(filteredSongs);
});

// Render inicial
window.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSongIndex);
    renderPlaylist();
});

localStorage.setItem('userVolume', audio.volume);
// Restaurar volumen guardado
const savedVolume = localStorage.getItem('userVolume');
if (savedVolume !== null) {
    audio.volume = parseFloat(savedVolume);
    elements.vol.value = savedVolume * 100;
    elements.volBar.style.width = `${savedVolume * 100}%`;
    elements.volDot.style.left = `${savedVolume * 100}%`;

    if (audio.volume === 0) elements.volIcon.className = 'bi bi-volume-mute';
    else if (audio.volume < 0.5) elements.volIcon.className = 'bi bi-volume-down';
    else elements.volIcon.className = 'bi bi-volume-up';
}
localStorage.setItem('currentSongIndex', currentSongIndex);
localStorage.setItem('currentTime', audio.currentTime);
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    elements.title.innerHTML = `${song.name}<div class="subtitle">${song.artist}</div>`;
    elements.poster.src = song.img;
    audio.load();

    highlightPlaylistSong(song.id);

    const savedIndex = parseInt(localStorage.getItem('currentSongIndex'));
    const savedTime = parseFloat(localStorage.getItem('currentTime'));
    if (savedIndex === index && !isNaN(savedTime)) {
        audio.currentTime = savedTime;
    } else {
        audio.currentTime = 0;
    }
}

function renderPlaylist(filteredSongs = songs) {
    playlistContainer.innerHTML = "";

    filteredSongs.forEach(song => {
        const item = document.createElement('div');
        item.classList.add('songItem');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'space-between';
        item.style.marginBottom = '10px';

        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.innerHTML = `
            <img src="${song.img}" alt="${song.name}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px; margin-right: 10px;">
            <div>
                <h5 style="margin: 0;">${song.name}</h5>
                <small>${song.artist}</small>
            </div>
        `;

        const playBtn = document.createElement('i');
        playBtn.className = 'bi bi-play-fill playlistPlay';
        playBtn.id = song.id;
        playBtn.style.cursor = 'pointer';
        playBtn.style.fontSize = '1.4rem';

        playBtn.addEventListener('click', () => {
            const songIndex = songs.findIndex(s => s.id === song.id);
            if (songIndex !== -1) {
                if (currentSongIndex === songIndex && !audio.paused) {
                    pauseSong();
                } else {
                    currentSongIndex = songIndex;
                    loadSong(currentSongIndex);
                    playSong();
                }
            }
        });

        item.appendChild(left);
        item.appendChild(playBtn);
        playlistContainer.appendChild(item);
    });
}

const playlist = new Set();

function renderSongs() {
  const list = document.getElementById('song-list');
  list.innerHTML = '';

  songs.forEach(song => {
    const songEl = document.createElement('div');
    songEl.className = 'song';

    const details = document.createElement('div');
    details.className = 'song-details';
    details.innerHTML = `<strong>${song.title}</strong><small>${song.artist}</small>`;

    const actions = document.createElement('div');
    actions.className = 'song-actions';

    const heart = document.createElement('span');
    heart.className = 'heart' + (playlist.has(song.id) ? ' active' : '');
    heart.innerHTML = playlist.has(song.id) ? '❤️' : '🤍';

    heart.onclick = () => {
      if (playlist.has(song.id)) {
        playlist.delete(song.id);
      } else {
        playlist.add(song.id);
      }
      renderSongs();
    };

    const more = document.createElement('span');
    more.className = 'options';
    more.innerHTML = '⋯';
    more.title = 'Más opciones (futura funcionalidad)';

    actions.appendChild(heart);
    actions.appendChild(more);

    songEl.appendChild(details);
    songEl.appendChild(actions);

    list.appendChild(songEl);
  });
}

renderSongs();
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.minHeight = `${window.innerHeight}px`;
  });
  // Simulación de usuario logeado
let userLoggedIn = false; // Cambia a `true` si el usuario está logeado

// Cargar la sección de usuario
function loadUserSection() {
  const userSection = document.getElementById("user-section");

  if (userLoggedIn) {
    // Mostrar foto de perfil predeterminada
    userSection.innerHTML = `
      <img src="default-profile.png" alt="Foto de perfil" id="profile-pic" style="height: 50px; cursor: pointer;">
    `;
    document.getElementById("profile-pic").addEventListener("click", redirectToProfile);
  } else {
    // Mostrar botón de login
    userSection.innerHTML = `
      <button onclick="redirectToLogin()">Login</button>
    `;
  }
}

// Redirigir al perfil del usuario
function redirectToProfile() {
  if (userLoggedIn) {
    window.location.href = "profile.html";
  }
}

// Redirigir al login
function redirectToLogin() {
  window.location.href = "login.html";
}

// Cargar la sección de usuario al iniciar
document.addEventListener("DOMContentLoaded", loadUserSection);