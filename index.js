
        let currentSlide = 0;
        let currentProject = null;

        const projects = {
            panasonic: {
                title: 'Multi-Operator Produksi Assembling',
                subtitle: 'PT Panasonic Gobel Energy Indonesia - Juli 2025 – November 2025',
                description: 'Bertanggung jawab dalam operasional produksi baterai lithium di salah satu pabrik terbesar di Indonesia. Menangani pengoperasian mesin, quality control, dan maintenance dengan target produksi tinggi setiap harinya.',
                features: [
                    'Mengoperasikan mesin Auto Coin Lithium Battery dengan hasil produksi rata-rata 12.000 pcs per hari',
                    'Melakukan quality control visual terhadap setiap produk baterai yang telah diproduksi',
                    'Bertanggung jawab atas maintenance mesin dan peralatan produksi',
                    'Melaporkan dan mengatasi masalah pada mesin maupun kualitas produksi',
                    'Memastikan compliance dengan standard operating procedures (SOP)',
                    'Kolaborasi dengan tim untuk mencapai target produksi harian'
                ],
                images: [
                    { type: 'placeholder', icon: '⚙️', text: 'Production Line' },
                    { type: 'placeholder', icon: '📈', text: 'Daily Output 12K+' },
                    { type: 'placeholder', icon: '🔍', text: 'Quality Control' },
                    { type: 'placeholder', icon: '✅', text: 'Safety Standards' }
                ]
            },
            blog: {
                title: 'Content Creator & Blog Administrator',
                subtitle: 'Personal Project - onenan.my.id',
                description: 'Platform blog pribadi yang dikelola secara profesional dengan fokus pada content creation, SEO optimization, dan web development. Mengelola seluruh aspek dari content strategy, technical implementation, hingga maintenance website.',
                features: [
                    'Mengelola dan menulis artikel berkualitas dengan menerapkan teknik SEO (Search Engine Optimization) untuk meningkatkan visibilitas konten di mesin pencari',
                    'Melakukan kustomisasi tampilan blog menggunakan Blogger XML/HTML editor untuk memastikan desain yang responsive dan user-friendly',
                    'Mengelola administrasi website secara menyeluruh, termasuk pengaturan domain kustom dan pemeliharaan konten secara berkala',
                    'Implementasi best practices untuk website performance dan loading speed',
                    'Content planning dan publikasi artikel sesuai content calendar',
                    'Monitoring analytics dan optimization berdasarkan data pengunjung'
                ],
                images: [
                    { type: 'placeholder', icon: '📝', text: 'Blog Homepage' },
                    { type: 'placeholder', icon: '📊', text: 'SEO Analytics' },
                    { type: 'placeholder', icon: '🎨', text: 'Custom XML Design' },
                    { type: 'placeholder', icon: '📱', text: 'Mobile Responsive' }
                ]
            }
        };

        function openModal(projectId) {
            currentProject = projects[projectId];
            currentSlide = 0;
            
            document.getElementById('modalTitle').textContent = currentProject.title;
            document.getElementById('modalSubtitle').textContent = currentProject.subtitle;
            document.getElementById('modalDescription').textContent = currentProject.description;
            
            const featuresList = document.getElementById('modalFeatures');
            featuresList.innerHTML = '';
            currentProject.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            renderSlider();
            document.getElementById('projectModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('projectModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function renderSlider() {
            const wrapper = document.getElementById('sliderWrapper');
            const dots = document.getElementById('sliderDots');
            
            wrapper.innerHTML = '';
            dots.innerHTML = '';
            
            currentProject.images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = 'slide';
                
                const placeholder = document.createElement('div');
                placeholder.className = 'slide-placeholder';
                placeholder.innerHTML = `<div style="text-align: center;"><div style="font-size: 4rem; margin-bottom: 1rem;">${image.icon}</div><div style="font-size: 1.2rem; color: rgba(255,255,255,0.8);">${image.text}</div></div>`;
                
                slide.appendChild(placeholder);
                wrapper.appendChild(slide);
                
                const dot = document.createElement('div');
                dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
                dot.onclick = () => goToSlide(index);
                dots.appendChild(dot);
            });
            
            updateSlider();
        }

        function updateSlider() {
            const wrapper = document.getElementById('sliderWrapper');
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % currentProject.images.length;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + currentProject.images.length) % currentProject.images.length;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        document.getElementById('projectModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        function toggleMenu() {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.querySelector('.nav-toggle');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

        function closeMenu() {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.querySelector('.nav-toggle');
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMenu();
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-menu a');
            
            let current = 'home';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        function sendMessage() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields!');
                return;
            }

            if (!email.includes('@')) {
                alert('Invalid email address!');
                return;
            }

            // Create mailto link
            const subject = encodeURIComponent(`Message from ${name} - Portfolio Contact`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:user@anantwm.my.id?subject=${subject}&body=${body}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Reset form after short delay
            setTimeout(() => {
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
            }, 500);
        }