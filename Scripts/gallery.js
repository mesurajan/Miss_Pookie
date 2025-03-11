        // Define card images and messages
        const cardData = [
            { 
                frontImage: "images/pics01.jpg", 
                type: "image"
            },
            { 
                frontImage: "images/pics02.jpg", 
                type: "message",
                message: "You make my heart smile every day! ❤️"
            },
            { 
                frontImage: "images/pics03.jpg", 
                type: "image" 
            },
            { 
                frontImage: "images/pics04.jpg", 
                type: "gif",
                gifUrl: "/api/placeholder/400/320",
                caption: "You're my favorite person!"
            },
            { 
                frontImage: "images/pics05.jpg", 
                type: "image" 
            },
            { 
                frontImage: "images/pics06.jpg", 
                type: "message",
                message: "I love the way your eyes crinkle when you laugh! 😊"
            },
            { 
                frontImage: "images/pics07.jpg", 
                type: "image" 
            },
            { 
                frontImage: "images/pics08.jpg", 
                type: "gif",
                gifUrl: "/api/placeholder/400/320",
                caption: "You're the cutest!"
            },
            { 
                frontImage: "images/pics09.jpg", 
                type: "message",
                message: "Every moment with you is a gift I cherish! 💝"
            }
        ];

        // Track interaction for each card
        let cardInteractions = new Array(cardData.length).fill(false);
        let revealButtonThreshold = 0.7; // 70% of cards need to be interacted with

        document.addEventListener('DOMContentLoaded', () => {
            const cardContainer = document.getElementById('card-container');
            const parallaxBg = document.getElementById('parallax-bg');
            const musicToggle = document.getElementById('music-toggle');
            const backgroundMusic = document.getElementById('background-music');
            const finalButtonContainer = document.getElementById('final-button-container');
            const finalButton = document.getElementById('final-button');
            const loader = document.querySelector('.loader');

            // Add floating bubbles
            createBubbles();
            
            // Add sparkles
            createSparkles();

            // Hide loader after simulating loading
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 2000);

            // Create all cards
            createCards();

            // Setup parallax effect
            setupParallax();

            // Setup music toggle
            setupMusic();

            // Setup final button
            setupFinalButton();

            function createBubbles() {
                for (let i = 0; i < 15; i++) {
                    const bubble = document.createElement('div');
                    bubble.className = 'bubble';
                    
                    // Random size between 20px and 80px
                    const size = Math.random() * 60 + 20;
                    bubble.style.width = `${size}px`;
                    bubble.style.height = `${size}px`;
                    
                    // Random horizontal position
                    bubble.style.left = `${Math.random() * 100}%`;
                    
                    // Random starting position
                    bubble.style.bottom = `-${size}px`;
                    
                    // Random delay
                    bubble.style.animationDelay = `${Math.random() * 15}s`;
                    
                    // Random duration between 15s and 30s
                    bubble.style.animationDuration = `${Math.random() * 15 + 15}s`;
                    
                    document.body.appendChild(bubble);
                }
            }

            function createSparkles() {
                for (let i = 0; i < 30; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    
                    // Random position
                    sparkle.style.left = `${Math.random() * 100}%`;
                    sparkle.style.top = `${Math.random() * 100}%`;
                    
                    // Random animation delay
                    sparkle.style.animationDelay = `${Math.random() * 3}s`;
                    
                    document.body.appendChild(sparkle);
                }
            }

            function createCards() {
                // For each card data, create a card element
                cardData.forEach((data, index) => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.dataset.index = index;
                    
                    // Add surprise class for special cards
                    if (data.type !== 'image') {
                        card.classList.add('surprise');
                    }

                    // Create card front
                    const cardFront = document.createElement('div');
                    cardFront.className = 'card-front';
                    
                    const frontImg = document.createElement('img');
                    frontImg.src = data.frontImage;
                    frontImg.alt = 'Gallery Image';
                    cardFront.appendChild(frontImg);
                    
                    // Create card back
                    const cardBack = document.createElement('div');
                    cardBack.className = 'card-back';
                    
                    if (data.type === 'message') {
                        const message = document.createElement('p');
                        message.innerHTML = data.message;
                        message.style.fontSize = '1.8rem';
                        message.style.fontWeight = 'bold';
                        message.style.color = 'var(--text-color)';
                        message.style.fontFamily = "'Dancing Script', cursive";
                        cardBack.appendChild(message);
                    } else if (data.type === 'gif') {
                        const gifContainer = document.createElement('div');
                        gifContainer.className = 'gif-container';
                        
                        const gifImg = document.createElement('img');
                        gifImg.src = data.gifUrl;
                        gifImg.alt = 'Cute Animation';
                        
                        const caption = document.createElement('p');
                        caption.innerHTML = data.caption;
                        caption.style.marginTop = '20px';
                        caption.style.fontSize = '1.5rem';
                        
                        gifContainer.appendChild(gifImg);
                        gifContainer.appendChild(caption);
                        cardBack.appendChild(gifContainer);
                    }
                    
                    card.appendChild(cardFront);
                    card.appendChild(cardBack);
                    
                    // Position card within the container with more variation
                    card.style.left = `calc(50% - 150px + ${(Math.random() * 200 - 100)}px)`;
                    card.style.top = `calc(50% - 200px + ${(Math.random() * 200 - 100)}px)`;
                    card.style.zIndex = 10 + index;
                    
                    // Random initial rotation for more interesting layout
                    const initialRotateX = (Math.random() - 0.5) * 10;
                    const initialRotateY = (Math.random() - 0.5) * 10;
                    card.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg)`;
                    
                    // Add card to the container
                    cardContainer.appendChild(card);
                    
                    // Make card draggable
                    makeCardDraggable(card);
                });
            }

            function makeCardDraggable(card) {
                let isDragging = false;
                let isFlipped = false;
                let initialX, initialY;
                let initialCardX, initialCardY;
                let isFirstInteraction = true;
                
                card.addEventListener('mousedown', startDrag);
                card.addEventListener('touchstart', startDrag, { passive: false });
                
                function startDrag(e) {
                    e.preventDefault();
                    const index = parseInt(card.dataset.index);
                    
                    // Bring card to front
                    const allCards = document.querySelectorAll('.card');
                    let maxZIndex = 10;
                    allCards.forEach(c => {
                        const zIndex = parseInt(c.style.zIndex);
                        maxZIndex = Math.max(maxZIndex, zIndex);
                    });
                    card.style.zIndex = maxZIndex + 1;
                    
                    isDragging = true;
                    card.classList.add('active');
                    
                    // Get initial positions
                    if (e.type === 'mousedown') {
                        initialX = e.clientX;
                        initialY = e.clientY;
                    } else {
                        initialX = e.touches[0].clientX;
                        initialY = e.touches[0].clientY;
                    }
                    
                    // Get card's current position
                    const rect = card.getBoundingClientRect();
                    initialCardX = rect.left;
                    initialCardY = rect.top;
                    
                    // Add global events for drag and release
                    document.addEventListener('mousemove', dragMove);
                    document.addEventListener('touchmove', dragMove, { passive: false });
                    document.addEventListener('mouseup', dragEnd);
                    document.addEventListener('touchend', dragEnd);
                    
                    // Check if first interaction with this card
                    if (isFirstInteraction) {
                        isFirstInteraction = false;
                        createParticles(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, 'sparkle');
                        
                        // Mark card as interacted
                        cardInteractions[index] = true;
                        checkInteractionProgress();
                    }
                }
                
                function dragMove(e) {
                    if (!isDragging) return;
                    e.preventDefault();
                    
                    let currentX, currentY;
                    if (e.type === 'mousemove') {
                        currentX = e.clientX;
                        currentY = e.clientY;
                    } else {
                        currentX = e.touches[0].clientX;
                        currentY = e.touches[0].clientY;
                    }
                    
                    // Calculate new position
                    const deltaX = currentX - initialX;
                    const deltaY = currentY - initialY;
                    
                    // Update card position
                    card.style.left = `${initialCardX + deltaX}px`;
                    card.style.top = `${initialCardY + deltaY}px`;
                    
                    // Calculate rotation based on drag distance
                    const rotateX = deltaY * 0.15;
                    const rotateY = -deltaX * 0.15;
                    
                    // Apply 3D transform
                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    
                    // Check if card should flip
                    if (Math.abs(rotateY) > 90 && !isFlipped) {
                        isFlipped = true;
                        card.style.transform = `rotateY(180deg)`;
                    } else if (Math.abs(rotateY) <= 90 && isFlipped) {
                        isFlipped = false;
                        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    }
                    
                    // Create particles on drag with more frequency
                    if (Math.random() < 0.2) {
                        createParticles(currentX, currentY, Math.random() < 0.7 ? 'sparkle' : 'heart');
                    }
                }
                
                function dragEnd() {
                    if (!isDragging) return;
                    isDragging = false;
                    card.classList.remove('active');
                    
                    // Reset transform if not flipped with a nice bounce effect
                    if (!isFlipped) {
                        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        card.style.transform = '';
                        setTimeout(() => {
                            card.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
                        }, 500);
                    }
                    
                    // Remove event listeners
                    document.removeEventListener('mousemove', dragMove);
                    document.removeEventListener('touchmove', dragMove);
                    document.removeEventListener('mouseup', dragEnd);
                    document.removeEventListener('touchend', dragEnd);
                }
                
                // Double click to flip card with more dramatic effect
                card.addEventListener('dblclick', () => {
                    isFlipped = !isFlipped;
                    
                    if (isFlipped) {
                        card.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        card.style.transform = 'rotateY(180deg)';
                    } else {
                        card.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        card.style.transform = '';
                    }
                    
                    // Create particles on flip
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    createParticles(centerX, centerY, 'heart', 20);
                    
                    // Mark card as interacted
                    const index = parseInt(card.dataset.index);
                    cardInteractions[index] = true;
                    checkInteractionProgress();
                });
            }

            function setupParallax() {
                document.addEventListener('mousemove', (e) => {
                    // Calculate mouse position as a percentage of the viewport
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    // Calculate parallax offset (more subtle effect)
                    const offsetX = 10 - mouseX * 20;
                    const offsetY = 10 - mouseY * 20;
                    
                    // Apply transform to background with smooth transition
                    parallaxBg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                });
            }

            function setupMusic() {
                let isMusicPlaying = localStorage.getItem('musicState') === 'playing'; // Check if music is playing from localStorage
                
                const musicToggle = document.getElementById('music-toggle');
                const backgroundMusic = document.getElementById('background-music');
            
                // Update the button and play/pause music based on the saved state
                if (isMusicPlaying) {
                    backgroundMusic.play().catch(e => console.error("Music playback error:", e));
                    musicToggle.querySelector('svg').innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/><path d="M10 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-2.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z"/>';
                } else {
                    backgroundMusic.pause();
                    musicToggle.querySelector('svg').innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
                }
            
                // Toggle button event
                musicToggle.addEventListener('click', () => {
                    if (isMusicPlaying) {
                        backgroundMusic.pause();
                        localStorage.setItem('musicState', 'paused'); // Save state as 'paused'
                        musicToggle.querySelector('svg').innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
                    } else {
                        backgroundMusic.play().catch(e => console.error("Music playback error:", e));
                        localStorage.setItem('musicState', 'playing'); // Save state as 'playing'
                        musicToggle.querySelector('svg').innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/><path d="M10 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-2.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z"/>';
                    }
            
                    isMusicPlaying = !isMusicPlaying; // Toggle music state
                    
                    // Create particles around the button (visual effect)
                    const rect = musicToggle.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    createParticles(centerX, centerY, 'sparkle', 15);
                });
            
                // Hover effect on music toggle button
                musicToggle.addEventListener('mouseenter', () => {
                    musicToggle.style.transform = 'scale(1.15) rotate(5deg)';
                });
                
                musicToggle.addEventListener('mouseleave', () => {
                    musicToggle.style.transform = '';
                });
            }
            

            function setupFinalButton() {
                finalButton.addEventListener('click', () => {
                    // Create a lot of particles for a grand effect
                    for (let i = 0; i < 8; i++) {
                        setTimeout(() => {
                            const rect = finalButton.getBoundingClientRect();
                            const centerX = rect.left + rect.width / 2;
                            const centerY = rect.top + rect.height / 2;
                            createParticles(centerX, centerY, Math.random() < 0.7 ? 'heart' : 'sparkle', 30);
                        }, i * 100);
                    }
                    
                    // Create and show the final message with confetti
                    setTimeout(() => {
                        showFinalMessage();
                    }, 800);
                });
            }

            function showFinalMessage() {
                // Create modal overlay
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                overlay.style.display = 'flex';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';
                overlay.style.zIndex = '1000';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 1s ease';
                
                // Create the message container
                const container = document.createElement('div');
                container.style.maxWidth = '80%';
                container.style.width = '600px';
                container.style.backgroundColor = 'white';
                container.style.borderRadius = '20px';
                container.style.padding = '40px';
                container.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.3)';
                container.style.textAlign = 'center';
                container.style.position = 'relative';
                container.style.overflow = 'hidden';
                container.style.transform = 'scale(0.8)';
                container.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                // Add gradient background
                container.style.background = 'linear-gradient(135deg, #fff6f9, #f8e6ff)';
                
                // Add decorative elements
                const hearts = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝'];
                for (let i = 0; i < 20; i++) {
                    const heart = document.createElement('div');
                    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    heart.style.position = 'absolute';
                    heart.style.fontSize = `${Math.random() * 20 + 15}px`;
                    heart.style.left = `${Math.random() * 100}%`;
                    heart.style.top = `${Math.random() * 100}%`;
                    heart.style.opacity = '0.5';
                    heart.style.transform = 'rotate(' + (Math.random() * 40 - 20) + 'deg)';
                    heart.style.pointerEvents = 'none';
                    container.appendChild(heart);
                }
                
                // Add title
                const title = document.createElement('h2');
                title.textContent = 'To My Dearest Pookie';
                title.style.fontFamily = "'Dancing Script', cursive";
                title.style.fontSize = '3rem';
                title.style.color = 'var(--text-color)';
                title.style.marginBottom = '20px';
                title.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                container.appendChild(title);
                
                // Add final message
                const message = document.createElement('p');
                message.innerHTML = `Thank you for being the most incredible person in my world. Every moment with you is a treasure, and I'm so grateful to share this journey with you. I love you more than words can express, and I always will. Here's to creating countless more beautiful memories together!`;
                message.style.fontSize = '1.5rem';
                message.style.lineHeight = '1.8';
                message.style.color = 'var(--text-color)';
                message.style.marginBottom = '30px';
                container.appendChild(message);
                
                // Add close button
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close with Love';
                closeButton.style.padding = '12px 30px';
                closeButton.style.background = 'linear-gradient(to right, var(--primary-color), var(--secondary-color))';
                closeButton.style.color = 'white';
                closeButton.style.border = 'none';
                closeButton.style.borderRadius = '30px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.fontSize = '1.2rem';
                closeButton.style.fontWeight = 'bold';
                closeButton.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.25)';
                closeButton.style.transition = 'transform 0.3s ease';
                container.appendChild(closeButton);
                
                // Add hover effect
                closeButton.addEventListener('mouseenter', () => {
                    closeButton.style.transform = 'translateY(-5px)';
                });
                
                closeButton.addEventListener('mouseleave', () => {
                    closeButton.style.transform = '';
                });
                
                // Handle close button click
                closeButton.addEventListener('click', () => {
                    overlay.style.opacity = '0';
                    container.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 1000);
                });
                
                // Add container to overlay
                overlay.appendChild(container);
                
                // Add overlay to body
                document.body.appendChild(overlay);
                
                // Animate in
                setTimeout(() => {
                    overlay.style.opacity = '1';
                    container.style.transform = 'scale(1)';
                }, 100);
            }

            // Function to check the interaction progress
            function checkInteractionProgress() {
                const interactionCount = cardInteractions.filter(Boolean).length;
                const interactionPercentage = interactionCount / cardInteractions.length;
                
                if (interactionPercentage >= revealButtonThreshold) {
                    finalButtonContainer.classList.add('visible');
                }
            }

            // Function to create particles
            function createParticles(x, y, type, count = 10) {
                const colors = ['#f8c1d8', '#d5a6e6', '#9e7bb5', '#674a7a', '#ffb6de'];
                
                for (let i = 0; i < count; i++) {
                    if (type === 'sparkle') {
                        const particle = document.createElement('div');
                        particle.className = 'particle';
                        
                        // Random size between 5 and 15 pixels
                        const size = Math.random() * 10 + 5;
                        particle.style.width = `${size}px`;
                        particle.style.height = `${size}px`;
                        
                        // Random color from our palette
                        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                        
                        // Set initial position
                        particle.style.left = `${x}px`;
                        particle.style.top = `${y}px`;
                        
                        // Add to body
                        document.body.appendChild(particle);
                        
                        // Animate
                        setTimeout(() => {
                            particle.style.opacity = '1';
                            
                            // Random direction and distance
                            const angle = Math.random() * Math.PI * 2;
                            const distance = Math.random() * 100 + 50;
                            const duration = Math.random() * 1.5 + 1;
                            
                            particle.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
                            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`;
                            particle.style.opacity = '0';
                            
                            // Remove after animation
                            setTimeout(() => {
                                document.body.removeChild(particle);
                            }, duration * 1000);
                        }, 10);
                    } else if (type === 'heart') {
                        const heartParticle = document.createElement('div');
                        heartParticle.className = 'heart-particle';
                        heartParticle.textContent = '❤️';
                        
                        // Random size
                        const size = Math.random() * 20 + 15;
                        heartParticle.style.fontSize = `${size}px`;
                        
                        // Set initial position
                        heartParticle.style.left = `${x}px`;
                        heartParticle.style.top = `${y}px`;
                        
                        // Add to body
                        document.body.appendChild(heartParticle);
                        
                        // Animate
                        setTimeout(() => {
                            heartParticle.style.opacity = '1';
                            
                            // Random direction and distance - hearts float up more
                            const angle = Math.random() * Math.PI - Math.PI/2; // -90 to 90 degrees
                            const distance = Math.random() * 100 + 80;
                            const duration = Math.random() * 2 + 1.5;
                            
                            heartParticle.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
                            heartParticle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.8) rotate(${Math.random() * 60 - 30}deg)`;
                            heartParticle.style.opacity = '0';
                            
                            // Remove after animation
                            setTimeout(() => {
                                document.body.removeChild(heartParticle);
                            }, duration * 1000);
                        }, 10);
                    }
                }
            }
        });