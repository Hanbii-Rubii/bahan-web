// Menunggu seluruh halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // --- Fungsi Navigasi Mobile (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Ganti ikon hamburger menjadi 'X' saat menu aktif
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    // --- Efek Mengetik di Bagian Hero ---
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const roles = ['Web Developer', 'Designer', 'Content Creator', 'Freelancer'];
        let roleIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < roles[roleIndex].length) {
                typingText.textContent += roles[roleIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500);
            }
        }

        type(); // Mulai efek mengetik
    }
    

    // --- Animasi Saat Scroll ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Elemen akan muncul saat 10% terlihat
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // --- Penanda Navigasi Aktif Saat Scroll (Hanya untuk halaman utama) ---
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links a');
    
    // Hanya jalankan jika ada section di halaman (mencegah error di halaman 'tentang')
    if (sections.length > 0 && window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLi.forEach(a => {
                a.classList.remove('active');
                // Cek href tanpa hash
                const href = a.getAttribute('href').split('#')[1];
                if (href === current) {
                    a.classList.add('active');
                }
            });
        });
    }

});
