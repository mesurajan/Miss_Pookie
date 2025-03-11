document.addEventListener('DOMContentLoaded', function () {
    // Hide overlay after the page loads
    const overlay = document.getElementById('transition-overlay');
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000);
    }, 500);

    // Fade in content
    const container = document.getElementById('main-container');
    setTimeout(() => {
        gsap.to(container, {
            opacity: 1,
            duration: 2,
            ease: "power2.inOut"
        });
    }, 1000);

    // Create falling hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        
        // Creating SVG heart with random size and color
        const size = Math.random() * 30 + 10;
        const hue = Math.floor(Math.random() * 30) + 330; // Pink to red hues
        const saturation = Math.floor(Math.random() * 30) + 70; // High saturation
        const lightness = Math.floor(Math.random() * 20) + 70; // Light colors
        const opacity = Math.random() * 0.5 + 0.3;
        
        heart.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" style="opacity: ${opacity}">
            <path fill="hsl(${hue}, ${saturation}%, ${lightness}%)" d="M50,88.9C29.9,73.2,16.2,59.1,9.3,47C2.5,35.1,3.5,26.6,12.4,20.8c8-5.2,15.2-4.4,21.6,2.4c3.5,3.7,6.3,8.7,8.4,15c0.6,1.9,1.1,3.2,1.5,3.9c0.4,0.6,0.9,0.9,1.4,0.9c0.5,0,1-0.3,1.3-0.9c0.4-0.6,0.9-1.9,1.5-3.9c2.1-6.3,4.9-11.3,8.4-15c6.4-6.8,13.6-7.6,21.6-2.4c8.9,5.8,10,14.3,3.2,26.3C74.4,59.1,60.7,73.2,50,88.9z"></path>
        </svg>`;
        
        document.body.appendChild(heart);
        
        // Remove hearts after animation completes
        setTimeout(() => {
            heart.remove();
        }, parseFloat(heart.style.animationDuration) * 1000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 300);

    // Cursor trail effect
    const cursor = document.getElementById('cursor');
    let cursorFollowers = [];
    const maxFollowers = 10;
    
    // Create follower elements
    for (let i = 0; i < maxFollowers; i++) {
        const follower = document.createElement('div');
        follower.classList.add('cursor-follower');
        
        // Create heart SVG for the follower
        const hue = Math.floor(Math.random() * 30) + 330;
        follower.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 100 100">
            <path fill="hsl(${hue}, 90%, 80%)" d="M50,88.9C29.9,73.2,16.2,59.1,9.3,47C2.5,35.1,3.5,26.6,12.4,20.8c8-5.2,15.2-4.4,21.6,2.4c3.5,3.7,6.3,8.7,8.4,15c0.6,1.9,1.1,3.2,1.5,3.9c0.4,0.6,0.9,0.9,1.4,0.9c0.5,0,1-0.3,1.3-0.9c0.4-0.6,0.9-1.9,1.5-3.9c2.1-6.3,4.9-11.3,8.4-15c6.4-6.8,13.6-7.6,21.6-2.4c8.9,5.8,10,14.3,3.2,26.3C74.4,59.1,60.7,73.2,50,88.9z"></path>
        </svg>`;
        
        document.body.appendChild(follower);
        cursorFollowers.push({
            element: follower,
            x: 0,
            y: 0,
            scale: 0.5 + (i / maxFollowers) * 0.5,
            delay: i * 3
        });
    }
    
    // Mouse move event for cursor trail
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        cursorFollowers.forEach((follower, index) => {
            gsap.to(follower.element, {
                x: e.clientX,
                y: e.clientY,
                opacity: 0.8 - (index / cursorFollowers.length) * 0.6,
                scale: follower.scale,
                duration: 0.5 + (index * 0.1),
                delay: index * 0.02
            });
        });
    });

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-item');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxElements.forEach((el, index) => {
            const speed = 30 + (index * 10);
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            
            gsap.to(el, {
                x: moveX,
                y: moveY,
                duration: 1
            });
        });
    });

    // Button click transition
    const continueBtn = document.getElementById('continue-btn');
continueBtn.addEventListener('click', () => {
overlay.style.display = 'block';
setTimeout(() => {
overlay.style.opacity = '1';
setTimeout(() => {
    window.location.href = 'gallery.html'; // Replace 'gallery.html' with the actual URL of the next page
}, 1000);
}, 10);
});
   
document.addEventListener("mousemove", function (e) {
    const cursor = document.querySelector(".cursor");
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

    // Music controls
    document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic= document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
   
    
      // Check if music state is saved in localStorage
    if (localStorage.getItem('musicState') === 'playing') {
        backgroundMusic.play();
        musicToggle.innerHTML = '<svg> <!-- Pause Icon --> </svg>';
    } else {
        backgroundMusic.pause();
        musicToggle.innerHTML = '<svg> <!-- Play Icon --> </svg>';
    }

    let isMusicPlaying = localStorage.getItem('musicState') === 'playing'

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            background-music.pause();
            localStorage.setItem('musicState', 'paused');
            musicToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        } else {
            backgroundMusic.play();
            localStorage.setItem('musicState', 'playing');
            musicToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
        }
        isMusicPlaying = !isMusicPlaying;
    });
});
});