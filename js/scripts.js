// // --- LENIS SMOOTH SCROLL ---
// const lenis = new Lenis();
// lenis.on('scroll', ScrollTrigger.update);
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });
// gsap.ticker.lagSmoothing(0);
// --- END LENIS SMOOTH SCROLL ---


// --- ALL OTHER SCRIPTS RUN AFTER DOM CONTENT IS LOADED ---
window.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- HERO GSAP ANIMATION ---
    let tl = gsap.timeline();
    if (document.querySelector(".hero-title")) {
        tl.to(".hero-title", {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        })
        .to(".hero-subtitle", {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        }, "-=0.8")
        .to(".hero-description", {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        }, "-=0.8")
        // Animate the flip container, not the image inside it
        .to(".flip-profile-container", { 
            duration: 1.2,
            opacity: 1,
            scale: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to(".hero-usp-text", {
            duration: 1.2,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        }, "-=1.0") 
        .to(".hero-button", {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            stagger: 0.2 
        }, "-=0.9");
    }
    
    // --- PARALLAX BACKGROUND ANIMATION ---
    gsap.to("body", {
        backgroundPositionY: "20%",
        ease: "none", 
        scrollTrigger: {
            trigger: "body", 
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5 
        }
    });
// --- Auto Rotating Profile Image ---
const profileFlipInner = document.querySelector('.flip-profile-inner');

if (profileFlipInner) {
    gsap.set(profileFlipInner, { opacity: 0, scale: 0.8 });
    gsap.to(profileFlipInner, { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "power3.out", 
        delay: 0.5 
    });
    // Rotation handled purely by CSS
}


    // --- Animate all other sections on scroll ---
    
    // 1. Animate section titles
    gsap.utils.toArray('h2.mb-5').forEach(title => {
        gsap.from(title, {
            opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 90%', toggleActions: 'play none none none' }
        });
    });

    // 2a. Animate NEW Experience Timeline
    gsap.utils.toArray('.timeline-item').forEach((item) => {
        const content = item.querySelector('.timeline-content');
        
        gsap.from(content, { 
            opacity: 0,
            x: () => content.classList.contains('left') ? -60 : 60,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from(item.querySelector('.timeline-dot'), {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // 2b. Animate NEW Education Cards (Staggered)
    gsap.from('.education-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15, 
        scrollTrigger: {
            trigger: '#education .row',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });

    // 3. Animate Skill Subheadings & Cards
    gsap.utils.toArray('#skills .subheading').forEach(subheading => {
        
        gsap.from(subheading, {
            opacity: 0,
            x: -50, 
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: subheading,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });

        let content = subheading.nextElementSibling;
        
        if (content && content.classList.contains('row')) {
            gsap.from(content.querySelectorAll('.skill-card'), {
                opacity: 0,
                y: 30,
                scale: 0.95, 
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.1, 
                scrollTrigger: {
                    trigger: content,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        }

        if (subheading.textContent.includes("M.Tech Coursework")) {
            let pTag = subheading.nextElementSibling;
            let listRow = pTag.nextElementSibling;
            
            gsap.from([pTag, listRow], {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2, 
                scrollTrigger: {
                    trigger: pTag,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });

    // 4. Animate Research Paper blocks
    gsap.utils.toArray('#researchpapers .resume-section-content > div').forEach(paper => {
         gsap.from(paper, {
            opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: paper, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    // 5. Animate Awards list items
    gsap.from('#awards .fa-ul > li', {
        opacity: 0, x: -30, duration: 0.5, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '#awards .fa-ul', start: 'top 85%', toggleActions: 'play none none none' }
    });

    // 6. Animate Highlight items
    gsap.from('.highlight-item', {
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '#Highlights', start: 'top 80%', toggleActions: 'play none none none' }
    });
    // --- END SCROLLTRIGGER ANIMATIONS ---


    // --- BOOTSTRAP SCRIPTS ---
    
    // Activate Bootstrap scrollspy
    const topNav = document.body.querySelector('#topNav');
    if (topNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#topNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when a nav-link is clicked
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Navbar transparency effect
    const navbar = document.getElementById('topNav');
    if (navbar) {
        navbar.classList.add('transparent-nav');
        window.onscroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('transparent-nav');
            } else {
                navbar.classList.add('transparent-nav');
            }
        };
    }
});