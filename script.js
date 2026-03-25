document.addEventListener("DOMContentLoaded", (event) => {

    // --- Countdown Timer Logic (Independent of GSAP) ---
    function initCountdown() {
        // User requested countdown to Marriage Date: Feb 25, 2026
        // Month is 0-indexed (0=Jan, 1=Feb). So 1 is February.
        const countdownDate = new Date(2026, 1, 27, 9, 0, 0).getTime();
        const countdownContainer = document.getElementById("countdown");
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!countdownContainer || !daysEl) {
            console.warn("Countdown elements not found");
            return;
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                countdownContainer.innerHTML = "<div class='time-box' style='width:100%'><span>The Wedding has Begun!</span></div>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // Run countdown immediately
    initCountdown();

    // --- Animations (GSAP) ---
    // Safe guard GSAP usage
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
    } else {
        console.warn("GSAP not loaded, skipping animations");
    }

    function initAnimations() {
        // Hero Animation (Initial Load)
        const tl = gsap.timeline();
        tl.from('.hero-img', {
            scale: 1.2,
            duration: 2,
            ease: "power2.out"
        })
            .to('.hero-content', {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2
            }, "-=1.5");

        // Story Section Parallax & Fade
        gsap.from('.story-content', {
            scrollTrigger: {
                trigger: '.story',
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1
        });

        gsap.from('.blend-image-right', {
            scrollTrigger: {
                trigger: '.story',
                start: "top 70%",
                scrub: 1
            },
            y: 100,
            opacity: 0.8,
        });

        // Quote Parallax Background
        gsap.to('.quote-bg img', {
            scrollTrigger: {
                trigger: '.quote-section',
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            },
            y: '30%',
            scale: 1.1,
            transformOrigin: "center center",
            ease: "none"
        });

        gsap.from('.quote-text blockquote', {
            scrollTrigger: {
                trigger: '.quote-section',
                start: "top 70%",
            },
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
        });

        // Invitation Section Animations
        // Background Zoom
        gsap.fromTo('.zoom-bg',
            { scale: 1 },
            {
                scale: 1.15,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

        // Invitation Content Fade
        gsap.from('.invitation-content', {
            scrollTrigger: {
                trigger: '.invitation-section',
                start: "top 75%"
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });

        // Details Cards Stagger
        gsap.from('.detail-card', {
            scrollTrigger: {
                trigger: '.details',
                start: "top 75%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });

        // Gallery Fade In
        gsap.from('.gallery-preview h2', {
            scrollTrigger: {
                trigger: '.gallery-preview',
                start: "top 80%"
            },
            y: 30,
            opacity: 0,
            duration: 1
        });

        gsap.from('.swiper', {
            scrollTrigger: {
                trigger: '.gallery-preview',
                start: "top 70%"
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });

        // Zoom Effect for Hero (Continuous)
        gsap.to('.hero-img', {
            scale: 1.15,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Smooth Fade for misc elements
        const fadeElements = document.querySelectorAll('.story p, .details-grid, .gallery-preview');
        fadeElements.forEach(element => {
            gsap.fromTo(element,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.out"
                }
            );
        });
    }

    // Swiper Initialization (Safe Check)
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            speed: 800,
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                // Mobile adjustments - simplified: use 'slide' to avoid distortion
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    effect: "slide",
                },
                480: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                    effect: "slide",
                    coverflowEffect: null
                },
                768: {
                    slidesPerView: "auto",
                    effect: "coverflow",
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }
                }
            }
        });
    }

    // GLightbox Initialization
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }

    // --- Particle System ---
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = 'rgba(166, 124, 82, ' + (Math.random() * 0.5 + 0.1) + ')';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.width * canvas.height) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }
});