document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll Effect for Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Simplified)
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('mobile-open');
        });
    }

    // Intersection Observer for Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.tour-card, .trust-item, .cta-card, .booking-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Custom Animation trigger
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.tour-card, .trust-item, .cta-card, .booking-card, .stat-item').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // Card Click -> Detail Page
    document.querySelectorAll('.tour-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = 'detail.html';
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Real-time Long-stay Estimator Logic
    const stayInput = document.getElementById('stay-nights');
    const dailyPriceDisplay = document.getElementById('daily-price-display');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const stayWarning = document.getElementById('stay-warning');
    const tierBenefit = document.getElementById('tier-benefit');

    if (stayInput) {
        const updatePrice = () => {
            const nights = parseInt(stayInput.value) || 0;
            let dailyRate = 175000; // Base rate for short stays
            let benefit = "7박 이상 시 혜택 제공";

            if (nights < 7) {
                stayWarning.innerText = "* 장박 특가는 7박 이상부터 적용됩니다.";
                stayWarning.style.display = 'block';
                dailyRate = 195000; // Penalty/Higher rate for short stays
                benefit = "7박 이상 시 제공";
            } else if (nights >= 30) {
                stayWarning.style.display = 'none';
                dailyRate = 125000;
                benefit = "한 달 살기 특전: 투어 1회 포함";
            } else if (nights >= 15) {
                stayWarning.style.display = 'none';
                dailyRate = 135000;
                benefit = "마사지 3회권 증정";
            } else {
                stayWarning.style.display = 'none';
                dailyRate = 145000;
                benefit = "장박 기초 혜택";
            }

            const total = nights * dailyRate;

            dailyPriceDisplay.innerText = `₩${dailyRate.toLocaleString()}`;
            totalPriceDisplay.innerText = `₩${total.toLocaleString()}`;
            if (tierBenefit) tierBenefit.innerText = benefit;
        };

        stayInput.addEventListener('input', updatePrice);
        updatePrice(); // Initial calculation
    }
});
