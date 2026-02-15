// Orontes Cafe - V4 Navigation & Interactions

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('mainHeader');

    // Silk Ribbon Scroll Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle-v4');
    const navLinks = document.querySelector('.nav-links-v4');
    const navItems = document.querySelectorAll('.nav-links-v4 a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Apply reveal classes to all key elements
    // Including the scattered signs
    document.querySelectorAll('.card-v2, .section-header-v2, .signpost, .floating-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(el);
    });

    // Custom CSS for revealed state
    if (!document.getElementById('reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'reveal-styles';
        style.textContent = `
            .is-visible {
                opacity: 1 !important;
                transform: translateY(0) rotate(inherit) !important;
            }
        `;
        document.head.appendChild(style);
    }
});
// Music Playlist Logic
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
const playIcon = musicBtn.querySelector('.play-icon');
const pauseIcon = musicBtn.querySelector('.pause-icon');

const tracks = [
    'audio/welcome 1.mp3',
    'audio/music 1.mp3'
];
let currentTrackIndex = 0;

function loadTrack(index) {
    music.src = tracks[index];
    music.load();
    if (!music.paused || musicBtn.classList.contains('playing')) {
        music.play();
    }
}

if (music && musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            updateIcons(true);
            musicBtn.classList.add('playing');
        } else {
            music.pause();
            updateIcons(false);
            musicBtn.classList.remove('playing');
        }
    });

    music.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    function updateIcons(isPlaying) {
        playIcon.style.display = isPlaying ? 'none' : 'block';
        pauseIcon.style.display = isPlaying ? 'block' : 'none';
    }
}
