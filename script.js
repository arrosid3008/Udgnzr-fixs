document.addEventListener("DOMContentLoaded", () => {
    // 1. Pastikan GSAP terdaftar dengan benar
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.error("GSAP tidak ditemukan. Pastikan koneksi internet stabil.");
    }

    // 2. Elemen Selector
    const coverScreen = document.getElementById('cover-screen');
    const btnOpen = document.getElementById('btn-open-invitation');
    const bgMusic = document.getElementById('bg-music');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');

    // Pastikan body terkunci di awal
    document.body.style.overflow = 'hidden';

    // 3. Logika Buka Undangan & Audio BGM
    let isPlaying = false;

    if (btnOpen && coverScreen) {
        btnOpen.addEventListener('click', () => {
            coverScreen.classList.add('cover-hidden');
            document.body.style.overflow = 'auto';
            
            // Play Audio
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    audioControl?.classList.remove('hidden');
                    audioControl?.classList.remove('audio-paused');
                }).catch(err => console.log("Autoplay dicegah browser:", err));
            }

            // Animasi Hero setelah dibuka
            gsap.fromTo('.gsap-hero-text', 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
            );
        });
    }

    // Toggle Play/Pause Musik saat tombol BGM diklik
    if(audioControl && bgMusic) {
        audioControl.addEventListener('click', () => {
            if(isPlaying) {
                bgMusic.pause();
                audioControl.classList.add('audio-paused');
            } else {
                bgMusic.play();
                audioControl.classList.remove('audio-paused');
            }
            isPlaying = !isPlaying;
        });
    }

    // 4. Countdown Timer
    const targetDate = new Date("April 5, 2026 08:00:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            if(document.getElementById("days")) document.getElementById("days").innerText = days.toString().padStart(2, '0');
            if(document.getElementById("hours")) document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            if(document.getElementById("mins")) document.getElementById("mins").innerText = mins.toString().padStart(2, '0');
            if(document.getElementById("secs")) document.getElementById("secs").innerText = secs.toString().padStart(2, '0');
        }
    };
    setInterval(updateCountdown, 1000);

    // 5. Animasi Scroll (GSAP)
    // Efek Parallax background hero
    if(document.querySelector(".hero-bg")) {
        gsap.to(".hero-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: "section",
                scrub: true
            }
        });
    }

    // Fade in untuk elemen dengan class .gsap-fade
    gsap.utils.toArray('.gsap-fade').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    // Animasi Stagger untuk Gallery
    gsap.from('.gsap-gallery', {
        scrollTrigger: {
            trigger: '.gsap-gallery',
            start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.2)"
    });

    // Animasi Stagger untuk Love Story
    gsap.from('.gsap-story', {
        scrollTrigger: {
            trigger: '.gsap-story',
            start: "top 85%"
        },
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // 6. Tombol Salin Rekening
    const btnCopyRek = document.getElementById('btn-copy-rek');
    const rekBca = document.getElementById('rek-bca');
    
    if (btnCopyRek && rekBca) {
        btnCopyRek.addEventListener('click', () => {
            navigator.clipboard.writeText(rekBca.innerText).then(() => {
                const originalText = btnCopyRek.innerText;
                btnCopyRek.innerText = 'Berhasil Disalin!';
                btnCopyRek.classList.add('bg-green-500', 'text-white');
                btnCopyRek.classList.remove('bg-white', 'text-black');
                
                setTimeout(() => {
                    btnCopyRek.innerText = originalText;
                    btnCopyRek.classList.add('bg-white', 'text-black');
                    btnCopyRek.classList.remove('bg-green-500', 'text-white');
                }, 2000);
            });
        });
    }
});