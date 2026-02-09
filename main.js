  <script>
        document.addEventListener("DOMContentLoaded", () => {
            // 1. Counter Logic
            let count = 0;
            const counterElement = document.getElementById("counter");
            if (counterElement) {
                const interval = setInterval(() => {
                    if (count >= 100) {
                        clearInterval(interval);
                    } else {
                        count++;
                        counterElement.textContent = count;
                    }
                }, 20);
            }

            // 2. Form Submission
            const contactForm = document.querySelector('.contact-form');
            const modal = document.getElementById('success-modal');

            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (modal) { modal.style.display = 'flex'; }
                });
            }
        });

        // 3. Modal Close
        function closeModal() {
            const modal = document.getElementById('success-modal');
            if (modal) { modal.style.display = 'none'; }
            document.querySelector('.contact-form').reset();
        }
        function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'flex';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
}

// Close if user clicks outside the box
window.onclick = function(event) {
    let modal = document.getElementById('reviewModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function handleReviewSubmit(event) {
    event.preventDefault(); // Prevents the page from refreshing
    
    // 1. Hide the form
    document.getElementById('reviewFormContainer').style.display = 'none';
    
    // 2. Show the success message
    document.getElementById('reviewSuccessMessage').style.display = 'block';
    
    // Optional: Log data or send to server here
    console.log("Review submitted successfully");
}

// Update your existing close function to reset the form for the next time
function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
    
    // Reset the modal state after it closes so the form comes back
    setTimeout(() => {
        document.getElementById('reviewFormContainer').style.display = 'block';
        document.getElementById('reviewSuccessMessage').style.display = 'none';
        document.getElementById('reviewForm').reset();
    }, 500);
}
  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.main-nav a, .cta-button, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Process only internal hash links
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault(); // Prevent instant jump

                // 1. Close the menu immediately
                menuToggle.checked = false;

                // 2. WAIT for the menu animation to finish (0.4s in your CSS)
                // This ensures the page layout is back to normal height
                setTimeout(() => {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 100; // Height of your sticky header
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 450); // 450ms matches your 0.4s CSS transition + small buffer
            }
        });
    });
});
function toggleKitchenGrid() {
    const grid = document.getElementById('kitchen-full-catalog');
    const isOpening = !grid.classList.contains('show-grid');
    
    if (isOpening) {
        // OPENING logic
        grid.classList.add('show-grid');
        setTimeout(() => {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        // CLOSING logic
        // 1. Find the section title to scroll back to
        const scrollTarget = document.querySelector('.subtitle'); 
        
        // 2. Scroll up first
        window.scrollTo({
            top: scrollTarget.offsetTop - 100, 
            behavior: 'smooth'
        });

        // 3. Hide the grid after a small delay so the scroll feels natural
        setTimeout(() => {
            grid.classList.remove('show-grid');
        }, 300);
    }
}
function clearProductSearch() {
    const input = document.getElementById('productSearch');
    input.value = '';
    filterProducts(); // This resets the grid visibility
}

// Update your existing filterProducts function slightly:
function filterProducts() {
    const input = document.getElementById('productSearch');
    const clearBtn = document.getElementById('clearSearch');
    const filter = input.value.toLowerCase();
    
    // Show/Hide clear button
    clearBtn.style.display = input.value.length > 0 ? "block" : "none";

    const cards = document.getElementsByClassName('product-item-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    for (let i = 0; i < cards.length; i++) {
        const title = cards[i].querySelector('h3').innerText.toLowerCase();
        const category = cards[i].querySelector('.category-label').innerText.toLowerCase();
        
        if (title.includes(filter) || category.includes(filter)) {
            cards[i].style.display = ""; 
            visibleCount++;
        } else {
            cards[i].style.display = "none"; 
        }
    }
    noResults.style.display = visibleCount === 0 ? "block" : "none";
}
function toggleBathroomGrid() {
    const grid = document.getElementById('bathroom-full-catalog');
    if (!grid.classList.contains('show-grid')) {
        grid.classList.add('show-grid');
        setTimeout(() => { grid.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
        const portal = document.querySelector('.bathroom-bg');
        window.scrollTo({ top: portal.offsetTop - 150, behavior: 'smooth' });
        setTimeout(() => { grid.classList.remove('show-grid'); }, 400);
    }
}

function filterBathroom() {
    const input = document.getElementById('bathroomSearch');
    const clearBtn = document.getElementById('clearBathSearch');
    const filter = input.value.toLowerCase();
    clearBtn.style.display = input.value.length > 0 ? "block" : "none";

    const cards = document.querySelectorAll('#bathroomGrid .product-item-card');
    let count = 0;
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(filter)) {
            card.style.display = "";
            count++;
        } else {
            card.style.display = "none";
        }
    });
    document.getElementById('noBathResults').style.display = count === 0 ? "block" : "none";
}

function clearBathSearch() {
    document.getElementById('bathroomSearch').value = '';
    filterBathroom();
}

function toggleConstructionGrid() {
    // 1. Find the hidden catalog by its ID
    const grid = document.getElementById('construction-full-catalog');
    
    // 2. Check if it's already open
    const isOpening = !grid.classList.contains('show-grid');
    
    if (isOpening) {
        // 3. Add the class to drop it down/show it
        grid.classList.add('show-grid');
        
        // 4. Smooth scroll so the user sees the products immediately
        setTimeout(() => {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        // 5. Close it and scroll back up to the portal card
        const portal = document.querySelector('.construction-bg');
        window.scrollTo({ top: portal.offsetTop - 100, behavior: 'smooth' });
        
        setTimeout(() => {
            grid.classList.remove('show-grid');
        }, 400);
    }
}
    </script>