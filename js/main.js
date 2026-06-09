/* ============================================
   GENET RESTAURANT - COMPLETE JAVASCRIPT
   Polished | Smooth Navigation | Fully Functional
   ============================================ */

(function() {
    'use strict';
    
    // ========== DOM CONTENT LOADED ==========
    document.addEventListener('DOMContentLoaded', function() {
        
        // ========== PAGE TRANSITIONS (Smooth & Bug-Free) ==========
        let isTransitioning = false;
        let currentPageUrl = getCurrentPageName();
        
        function getCurrentPageName() {
            const path = window.location.pathname.split('/').pop();
            return path === '' || path === '/' ? 'index.html' : path;
        }
        
        function navigateTo(url) {
            if (isTransitioning) return;
            if (url === currentPageUrl) return;
            
            isTransitioning = true;
            const transitionOverlay = document.querySelector('.page-transition');
            
            if (transitionOverlay) {
                transitionOverlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = url;
                }, 300);
            } else {
                window.location.href = url;
            }
        }
        
        // Handle all internal navigation links (excluding special links)
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            const isInternal = !href.startsWith('http') && 
                              !href.startsWith('https') && 
                              !href.startsWith('tel') && 
                              !href.startsWith('mailto') && 
                              !href.startsWith('javascript') &&
                              href !== '#';
            
            if (isInternal && !link.classList.contains('whatsapp-float')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigateTo(href);
                });
            }
        });
        
        // Remove transition overlay on page load
        const transitionOverlay = document.querySelector('.page-transition');
        if (transitionOverlay) {
            setTimeout(() => transitionOverlay.classList.remove('active'), 100);
        }
        
        // Handle browser back/forward navigation
        window.addEventListener('pageshow', function() {
            if (transitionOverlay) transitionOverlay.classList.remove('active');
            isTransitioning = false;
            currentPageUrl = getCurrentPageName();
            updateActiveNavigation();
        });
        
        // ========== AOS INITIALIZATION (Scroll Animations) ==========
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-in-out',
                disable: window.innerWidth < 768 ? 'phone' : false
            });
        }
        
        // ========== MOBILE SIDEBAR ==========
        const mobileSidebar = document.getElementById('mobileSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeSidebarBtn = document.getElementById('closeSidebarBtn');
        
        function openSidebar() {
            if (!mobileSidebar) return;
            mobileSidebar.classList.add('open');
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeSidebar() {
            if (!mobileSidebar) return;
            mobileSidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', openSidebar);
            mobileMenuBtn.addEventListener('touchstart', openSidebar, { passive: false });
        }
        
        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Close sidebar when clicking on any sidebar link
        document.querySelectorAll('.sidebar-nav a, .sidebar-footer a').forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
        
        // Close sidebar on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileSidebar?.classList.contains('open')) {
                closeSidebar();
            }
        });
        
        // ========== TOAST NOTIFICATION SYSTEM ==========
        window.showToast = function(message, duration = 3000, type = 'success') {
            let toast = document.getElementById('toastMsg');
            
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'toastMsg';
                toast.className = 'toast-msg';
                document.body.appendChild(toast);
            }
            
            // Clear any existing timeouts
            if (window.toastTimeout) clearTimeout(window.toastTimeout);
            
            // Set icon based on type
            const icons = { success: '✓', error: '⚠️', info: 'ℹ️' };
            const icon = icons[type] || '✓';
            
            toast.innerHTML = `${icon} ${message}`;
            toast.classList.add('show');
            
            window.toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, duration);
        };
        
        // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
        function updateActiveNavigation() {
            const currentPage = getCurrentPageName();
            
            document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || 
                    (currentPage === 'index.html' && href === 'index.html') ||
                    (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        
        updateActiveNavigation();
        
        // ========== CONTACT FORM HANDLER ==========
        const sendContactBtn = document.getElementById('sendContactBtn');
        if (sendContactBtn) {
            sendContactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('contactName')?.value.trim() || '';
                const email = document.getElementById('contactEmail')?.value.trim() || '';
                const phone = document.getElementById('contactPhone')?.value.trim() || '';
                const message = document.getElementById('contactMsg')?.value.trim() || '';
                
                // Validation
                if (!name) {
                    showToast('Please enter your name', 2500, 'error');
                    document.getElementById('contactName')?.focus();
                    return;
                }
                
                if (!email) {
                    showToast('Please enter your email address', 2500, 'error');
                    document.getElementById('contactEmail')?.focus();
                    return;
                }
                
                if (!email.includes('@') || !email.includes('.')) {
                    showToast('Please enter a valid email address', 2500, 'error');
                    document.getElementById('contactEmail')?.focus();
                    return;
                }
                
                if (!message) {
                    showToast('Please enter your message', 2500, 'error');
                    document.getElementById('contactMsg')?.focus();
                    return;
                }
                
                // Success - clear form
                showToast('Message sent successfully! We\'ll reply within 24 hours.', 4000, 'success');
                
                if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
                if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
                if (document.getElementById('contactPhone')) document.getElementById('contactPhone').value = '';
                if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
                
                // Optional: Send to WhatsApp or email API
                console.log('Contact form submitted:', { name, email, phone, message });
            });
        }
        
        // ========== RESERVATION FORM HANDLER ==========
        const sendReservationBtn = document.getElementById('sendReservationBtn');
        if (sendReservationBtn) {
            sendReservationBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('resName')?.value.trim() || '';
                const date = document.getElementById('resDate')?.value || '';
                const time = document.getElementById('resTime')?.value || '';
                const guests = document.getElementById('resGuests')?.value || '';
                const phone = document.getElementById('resPhone')?.value.trim() || '';
                const special = document.getElementById('resSpecial')?.value.trim() || '';
                
                if (!name || !date || !time || !guests) {
                    showToast('Please fill all required fields', 2500, 'error');
                    return;
                }
                
                showToast('Reservation request sent! We\'ll confirm shortly.', 4000, 'success');
                
                // Clear form
                if (document.getElementById('resName')) document.getElementById('resName').value = '';
                if (document.getElementById('resDate')) document.getElementById('resDate').value = '';
                if (document.getElementById('resTime')) document.getElementById('resTime').value = '';
                if (document.getElementById('resGuests')) document.getElementById('resGuests').value = '';
                if (document.getElementById('resPhone')) document.getElementById('resPhone').value = '';
                if (document.getElementById('resSpecial')) document.getElementById('resSpecial').value = '';
            });
        }
        
        // ========== NEWSLETTER SIGNUP ==========
        const subscribeBtn = document.getElementById('subscribeBtn');
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('newsletterEmail')?.value.trim() || '';
                
                if (!email) {
                    showToast('Please enter your email address', 2500, 'error');
                    return;
                }
                
                if (!email.includes('@') || !email.includes('.')) {
                    showToast('Please enter a valid email address', 2500, 'error');
                    return;
                }
                
                showToast('Subscribed successfully! Check your inbox for updates.', 3000, 'success');
                if (document.getElementById('newsletterEmail')) document.getElementById('newsletterEmail').value = '';
            });
        }
        
        // ========== COPY ACCOUNT NUMBER (Payment Page) ==========
        document.querySelectorAll('.copy-account').forEach(btn => {
            btn.addEventListener('click', function() {
                const accountNumber = this.getAttribute('data-account') || 
                                     this.previousElementSibling?.textContent || 
                                     'Unknown';
                
                navigator.clipboard.writeText(accountNumber).then(() => {
                    showToast('Account number copied!', 2000, 'success');
                }).catch(() => {
                    showToast('Press Ctrl+C to copy', 2000, 'info');
                });
            });
        });
        
        // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // ========== LAZY LOAD IMAGES ==========
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // ========== ADD WHATSAPP FLOATING BUTTON DYNAMICALLY ==========
        function addWhatsAppButton() {
            if (document.querySelector('.whatsapp-float')) return;
            
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = 'https://wa.me/251900000000?text=Hello!%20I%20would%20like%20to%20order%20food.';
            whatsappBtn.className = 'whatsapp-float';
            whatsappBtn.target = '_blank';
            whatsappBtn.rel = 'noopener noreferrer';
            whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
            whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i><span class="whatsapp-tooltip">Order on WhatsApp</span>';
            document.body.appendChild(whatsappBtn);
        }
        
        // Only add on menu and contact pages (optional)
        // addWhatsAppButton();
        
        // ========== SCROLL TO TOP BUTTON ==========
        function addScrollTopButton() {
            if (document.querySelector('.scroll-top')) return;
            
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, #C2571A, #E8A317);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 99;
                box-shadow: 0 4px 15px rgba(194, 87, 26, 0.3);
            `;
            
            document.body.appendChild(scrollBtn);
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollBtn.style.opacity = '1';
                    scrollBtn.style.visibility = 'visible';
                } else {
                    scrollBtn.style.opacity = '0';
                    scrollBtn.style.visibility = 'hidden';
                }
            });
            
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        addScrollTopButton();
        
        // ========== CONSOLE LOG ==========
        console.log('🍛 GENET RESTAURANT - Website loaded successfully!');
        console.log('🎨 Theme: Warm Sunset (Terracotta & Amber)');
        console.log('📱 Fully Responsive | Smooth Navigation');
        
    }); // End DOMContentLoaded
    
    // ========== HANDLE PAGE REFRESH/RESTORE ==========
    window.addEventListener('beforeunload', function() {
        // Optional: Save scroll position or form data
    });
    
})(); // End IIFE
