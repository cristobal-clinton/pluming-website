// ============================================
// PRECISION PLUMBING - COMPLETE SCRIPT
// One JS file for entire website
// ============================================

(function() {
    "use strict";
    
    // ===== CONFIGURATION =====
    const CONFIG = {
        businessName: "Precision Plumbing of Athens Ohio",
        phone: "+17408183941",
        phoneDisplay: "(740) 818-3941",
        googleReviewLink: "https://maps.app.goo.gl/HQ1sGWb8jXJERXgYA",
        adminPassword: "admin123",
        plumbers: [
            { id: 1, name: "Mike S.", rating: 4.9, lat: 39.3292, lng: -82.1013, available: true },
            { id: 2, name: "James R.", rating: 4.8, lat: 39.3350, lng: -82.0950, available: true },
            { id: 3, name: "Dave K.", rating: 5.0, lat: 39.3200, lng: -82.1100, available: true },
            { id: 4, name: "Robert T.", rating: 4.7, lat: 39.3400, lng: -82.0850, available: true }
        ]
    };
    
    // ===== INITIALIZATION =====
    function initStorage() {
        if (!localStorage.getItem('precision_orders')) {
            const defaultOrders = [
                {
                    id: 'ORD-2024-001',
                    customer: 'John Doe',
                    service: 'Emergency Plumbing Repairs',
                    status: 'plumber_assigned',
                    plumberId: 1,
                    address: '123 Court St, Athens, OH 45701',
                    lat: 39.3292,
                    lng: -82.1013,
                    price: { min: 199, max: 349 },
                    createdAt: new Date().toISOString(),
                    phone: '+17405550123'
                }
            ];
            localStorage.setItem('precision_orders', JSON.stringify(defaultOrders));
        }
        
        if (!localStorage.getItem('precision_completed')) {
            localStorage.setItem('precision_completed', JSON.stringify([]));
        }
    }
    
    initStorage();
    
    // ===== CURSOR GLOW =====
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }
    
    // ===== PARTICLES =====
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
            }
            update() {
                this.y += this.speedY;
                if (this.y > canvas.height + 50) {
                    this.reset();
                    this.y = -10;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(5, 150, 105, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            const count = Math.floor((canvas.width * canvas.height) / 20000);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };
        
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        };
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        
        resizeCanvas();
        initParticles();
        animateParticles();
    }
    
    // ===== FUTURISTIC DROPDOWN =====
    const menuTrigger = document.getElementById('menuTrigger');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (menuTrigger && dropdownMenu) {
        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            menuTrigger.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!menuTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
                menuTrigger.classList.remove('active');
                dropdownMenu.classList.remove('active');
            }
        });
    }
    
    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const step = target / 50;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 20);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ===== EXPANDABLE SERVICES =====
    const expandableServices = document.querySelectorAll('.service-expandable');
    expandableServices.forEach(service => {
        const header = service.querySelector('.service-header');
        header.addEventListener('click', () => {
            service.classList.toggle('active');
        });
    });
    
    // ===== CONTACT FORM - AUTO SELECT SERVICE =====
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('serviceSelect');
    
    if (serviceSelect && serviceParam) {
        const decodedService = decodeURIComponent(serviceParam);
        for (let option of serviceSelect.options) {
            if (option.value === decodedService) {
                option.selected = true;
                break;
            }
        }
    }
    
    // ===== CONTACT PREFERENCE TOGGLE =====
    const contactPrefRadios = document.querySelectorAll('input[name="contactPreference"]');
    const phoneField = document.getElementById('phoneField');
    const emailField = document.getElementById('emailField');
    
    if (contactPrefRadios.length) {
        const toggleFields = () => {
            const selected = document.querySelector('input[name="contactPreference"]:checked')?.value;
            if (phoneField && emailField) {
                if (selected === 'phone') {
                    phoneField.style.display = 'block';
                    emailField.style.display = 'none';
                    document.getElementById('customerPhone').required = true;
                    document.getElementById('customerEmail').required = false;
                } else if (selected === 'email') {
                    phoneField.style.display = 'none';
                    emailField.style.display = 'block';
                    document.getElementById('customerPhone').required = false;
                    document.getElementById('customerEmail').required = true;
                } else {
                    phoneField.style.display = 'block';
                    emailField.style.display = 'block';
                    document.getElementById('customerPhone').required = true;
                    document.getElementById('customerEmail').required = true;
                }
            }
        };
        
        contactPrefRadios.forEach(radio => radio.addEventListener('change', toggleFields));
        toggleFields();
    }
    
    // ===== BOOKING FORM SUBMIT =====
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const orderId = 'ORD-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
            
            // Get coordinates for address (mock for Athens area)
            const address = formData.get('address');
            const lat = 39.3292 + (Math.random() * 0.02 - 0.01);
            const lng = -82.1013 + (Math.random() * 0.02 - 0.01);
            
            const newOrder = {
                id: orderId,
                customer: formData.get('name'),
                service: formData.get('service'),
                status: 'pending',
                plumberId: null,
                address: address,
                lat: lat,
                lng: lng,
                price: { min: 99, max: 399 },
                createdAt: new Date().toISOString(),
                phone: formData.get('phone'),
                email: formData.get('email'),
                notes: formData.get('notes')
            };
            
            const orders = JSON.parse(localStorage.getItem('precision_orders') || '[]');
            orders.push(newOrder);
            localStorage.setItem('precision_orders', JSON.stringify(orders));
            
            // Show success modal
            const modal = document.getElementById('successModal');
            const orderDisplay = document.getElementById('newOrderNumber');
            if (modal && orderDisplay) {
                orderDisplay.textContent = orderId;
                modal.classList.add('active');
            }
            
            // Set track link
            const trackBtn = document.getElementById('trackOrderBtn');
            if (trackBtn) {
                trackBtn.addEventListener('click', () => {
                    window.location.href = 'track.html?order=' + orderId;
                });
            }
        });
    }
    
    // Close modal
    const closeModalBtn = document.getElementById('closeModalBtn');
    const successModal = document.getElementById('successModal');
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }
    
    // ===== ORDER TRACKING =====
    const trackOrderBtn = document.getElementById('trackOrderBtn');
    const orderIdInput = document.getElementById('orderIdInput');
    const lookupSection = document.getElementById('lookupSection');
    const orderDetails = document.getElementById('orderDetails');
    
    if (trackOrderBtn) {
        const displayOrder = (order) => {
            if (!order) return;
            
            document.getElementById('orderNumber').textContent = `Order #${order.id}`;
            const statusMap = {
                'pending': 'Pending',
                'plumber_assigned': 'Plumber Assigned',
                'on_the_way': 'On The Way',
                'in_progress': 'In Progress',
                'completed': 'Completed'
            };
            document.getElementById('orderStatus').textContent = statusMap[order.status] || order.status;
            
            const createdTime = new Date(order.createdAt);
            const minutesAgo = Math.floor((Date.now() - createdTime) / 60000);
            document.getElementById('orderTime').textContent = `Requested: ${minutesAgo} min ago`;
            
            document.querySelector('#serviceType span').textContent = order.service;
            document.getElementById('priceRange').textContent = `$${order.price.min} - $${order.price.max}`;
            
            if (order.plumberId) {
                const plumber = CONFIG.plumbers.find(p => p.id === order.plumberId);
                if (plumber) {
                    document.getElementById('plumberName').textContent = plumber.name;
                    document.getElementById('plumberRating').textContent = plumber.rating;
                    
                    // Calculate distance
                    const distance = calculateDistance(39.3292, -82.1013, order.lat, order.lng);
                    document.getElementById('plumberDistance').innerHTML = 
                        `<i class="fas fa-location-dot"></i> ${distance.toFixed(1)} miles away`;
                }
            }
            
            // Update progress steps
            const steps = document.querySelectorAll('.progress-step');
            const statusIndex = { 'pending': 1, 'plumber_assigned': 2, 'on_the_way': 3, 'in_progress': 4, 'completed': 5 };
            const currentStep = statusIndex[order.status] || 1;
            
            steps.forEach((step, i) => {
                step.classList.remove('completed', 'active');
                if (i + 1 < currentStep) step.classList.add('completed');
                if (i + 1 === currentStep) step.classList.add('active');
            });
            
            lookupSection.style.display = 'none';
            orderDetails.style.display = 'block';
            
            // Store current order for later use
            window.currentOrder = order;
        };
        
        trackOrderBtn.addEventListener('click', () => {
            const orderId = orderIdInput.value.trim() || 'ORD-2024-001';
            const orders = JSON.parse(localStorage.getItem('precision_orders') || '[]');
            const completed = JSON.parse(localStorage.getItem('precision_completed') || '[]');
            const order = orders.find(o => o.id === orderId) || completed.find(o => o.id === orderId);
            
            if (order) {
                displayOrder(order);
            } else {
                alert('Order not found');
            }
        });
        
        // Check URL for order param
        const urlOrder = urlParams.get('order');
        if (urlOrder) {
            orderIdInput.value = urlOrder;
            trackOrderBtn.click();
        }
    }
    
    // Distance calculation
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 3958.8;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }
    
    // ===== JOB DONE & REVIEW =====
    const jobDoneBtn = document.getElementById('jobDoneBtn');
    const reviewModal = document.getElementById('reviewModal');
    const closeReviewBtn = document.getElementById('closeReviewBtn');
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    const googleReviewBtn = document.getElementById('googleReviewBtn');
    const skipGoogleBtn = document.getElementById('skipGoogleBtn');
    let selectedRating = 0;
    
    if (jobDoneBtn) {
        jobDoneBtn.addEventListener('click', () => {
            reviewModal?.classList.add('active');
        });
    }
    
    if (closeReviewBtn) {
        closeReviewBtn.addEventListener('click', () => {
            reviewModal?.classList.remove('active');
        });
    }
    
    // Star rating
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                s.className = i < selectedRating ? 'fas fa-star' : 'far fa-star';
            });
        });
    });
    
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', () => {
            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }
            
            if (window.currentOrder) {
                const orders = JSON.parse(localStorage.getItem('precision_orders') || '[]');
                const completed = JSON.parse(localStorage.getItem('precision_completed') || '[]');
                
                const filtered = orders.filter(o => o.id !== window.currentOrder.id);
                window.currentOrder.status = 'completed';
                window.currentOrder.completedAt = new Date().toISOString();
                window.currentOrder.rating = selectedRating;
                
                completed.push(window.currentOrder);
                localStorage.setItem('precision_orders', JSON.stringify(filtered));
                localStorage.setItem('precision_completed', JSON.stringify(completed));
            }
            
            document.querySelector('.rating-stars').style.display = 'none';
            document.getElementById('reviewText').style.display = 'none';
            submitReviewBtn.style.display = 'none';
            document.getElementById('googlePrompt').style.display = 'block';
        });
    }
    
    if (googleReviewBtn) {
        googleReviewBtn.addEventListener('click', () => {
            window.open(CONFIG.googleReviewLink, '_blank');
            reviewModal.classList.remove('active');
            setTimeout(() => window.location.href = 'index.html', 1000);
        });
    }
    
    if (skipGoogleBtn) {
        skipGoogleBtn.addEventListener('click', () => {
            reviewModal.classList.remove('active');
            window.location.href = 'index.html';
        });
    }
    
    // ===== ADMIN DASHBOARD =====
    const loginScreen = document.getElementById('loginScreen');
    const dashboardScreen = document.getElementById('dashboardScreen');
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('adminPassword');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (sessionStorage.getItem('admin_logged') === 'true') {
        if (loginScreen) loginScreen.style.display = 'none';
        if (dashboardScreen) dashboardScreen.style.display = 'block';
        loadDashboard();
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (passwordInput.value === CONFIG.adminPassword) {
                sessionStorage.setItem('admin_logged', 'true');
                loginScreen.style.display = 'none';
                dashboardScreen.style.display = 'block';
                loadDashboard();
            } else {
                alert('Incorrect password');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('admin_logged');
            loginScreen.style.display = 'flex';
            dashboardScreen.style.display = 'none';
        });
    }
    
    function loadDashboard() {
        const orders = JSON.parse(localStorage.getItem('precision_orders') || '[]');
        const completed = JSON.parse(localStorage.getItem('precision_completed') || '[]');
        const active = orders.filter(o => o.status !== 'completed');
        
        // Update stats
        document.getElementById('activeOrdersCount').textContent = active.length;
        document.getElementById('completedTodayCount').textContent = completed.filter(o => {
            return new Date(o.completedAt).toDateString() === new Date().toDateString();
        }).length;
        document.getElementById('availablePlumbersCount').textContent = CONFIG.plumbers.filter(p => p.available).length;
        
        // Active orders list
        const listContainer = document.getElementById('activeOrdersList');
        if (active.length) {
            listContainer.innerHTML = active.map(order => {
                const nearest = findNearestPlumber(order.lat, order.lng);
                return `
                    <div class="order-item glass">
                        <div class="order-info">
                            <h4>${order.id} - ${order.customer}</h4>
                            <p><i class="fas fa-wrench"></i> ${order.service}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${order.address}</p>
                            ${nearest ? `<p style="color: var(--primary);">Nearest: ${nearest.name} (${nearest.distance.toFixed(1)} mi)</p>` : ''}
                        </div>
                        <div class="order-actions-btns">
                            <button class="btn-accept" onclick="assignPlumber('${order.id}', ${nearest?.id || 1})">Accept</button>
                            <button class="btn-decline" onclick="declineOrder('${order.id}')">Decline</button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            listContainer.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>No active orders</p></div>';
        }
        
        // Plumbers list
        const plumbersContainer = document.getElementById('plumbersList');
        plumbersContainer.innerHTML = CONFIG.plumbers.map(p => `
            <div class="plumber-card-small glass">
                <div class="plumber-avatar"><i class="fas fa-user-circle"></i></div>
                <div class="plumber-info">
                    <h4>${p.name}</h4>
                    <p><i class="fas fa-star" style="color: var(--accent);"></i> ${p.rating}</p>
                    <p class="${p.available ? 'status-available' : 'status-busy'}">
                        <i class="fas fa-circle"></i> ${p.available ? 'Available' : 'Busy'}
                    </p>
                </div>
            </div>
        `).join('');
        
        // Completed list
        const completedContainer = document.getElementById('completedOrdersList');
        const recent = completed.slice(-5).reverse();
        completedContainer.innerHTML = recent.length ? recent.map(o => `
            <div class="completed-item glass">
                <div><strong>${o.id}</strong> - ${o.customer}<br><small>${o.service}</small></div>
                <div>${o.rating ? '★'.repeat(o.rating) : ''}</div>
            </div>
        `).join('') : '<div class="empty-state"><p>No completed orders</p></div>';
    }
    
    function findNearestPlumber(orderLat, orderLng) {
        const available = CONFIG.plumbers.filter(p => p.available);
        if (!available.length) return null;
        
        const withDistance = available.map(p => ({
            ...p,
            distance: calculateDistance(orderLat, orderLng, p.lat, p.lng)
        }));
        
        return withDistance.sort((a, b) => a.distance - b.distance)[0];
    }
    
    window.assignPlumber = function(orderId, plumberId) {
        const orders = JSON.parse(localStorage.getItem('precision_orders') || '[]');
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index].plumberId = plumberId;
            orders[index].status = 'plumber_assigned';
            localStorage.setItem('precision_orders', JSON.stringify(orders));
            loadDashboard();
        }
    };
    
    window.declineOrder = function(orderId) {
        if (confirm('Decline this order?')) {
            const orders = JSON.parse(localStorage.getItem('precision_orders') || '[]');
            const filtered = orders.filter(o => o.id !== orderId);
            localStorage.setItem('precision_orders', JSON.stringify(filtered));
            loadDashboard();
        }
    };
    
    // Refresh dashboard
    const refreshBtn = document.getElementById('refreshDashboard');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadDashboard);
    }
    
    // Auto refresh admin
    if (dashboardScreen) {
        setInterval(() => {
            if (dashboardScreen.style.display === 'block') loadDashboard();
        }, 30000);
    }
    
    // ===== TILT EFFECT =====
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    console.log('✅ Precision Plumbing - All systems ready');
    
})();
