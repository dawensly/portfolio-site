document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalCloseButton = document.querySelector('.modal .close-button');
    const allProjectFolders = document.querySelectorAll('.project-folder');

    // 1. Grab your main text/image targets
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    
    // Locates your existing "View on GitHub" anchor button inside the template wrapper
    const githubButton = document.querySelector('#project-modal-overlay .modal a.button:first-of-type') || document.querySelector('.modal a[href*="github"]');

    // Functional actions to cycle visibility states
    const openModal = () => {
        modalOverlay.classList.add('active');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    // Add click listeners to ALL project folder blocks
    allProjectFolders.forEach(folder => {
        folder.addEventListener('click', () => {
            // Extract the baseline info strings from the clicked target element
            const title = folder.getAttribute('data-title') || "Project Title";
            const imageSrc = folder.getAttribute('data-image-src') || "";
            const description = folder.getAttribute('data-description') || "";
            const githubUrl = folder.getAttribute('data-github-src') || "#";

            // Inject content text modifications dynamically
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = description;
            
            // Handle snapshot preview visibility toggling bounds cleanly
            if (modalImage) {
                if (imageSrc) {
                    modalImage.src = imageSrc;
                    modalImage.style.display = "block";
                } else {
                    modalImage.style.display = "none";
                }
            }

            /* --- INJECT REPOSITORY LINK ROUTER --- */
            if (githubButton) {
                githubButton.href = githubUrl;
                githubButton.target = "_blank"; // Safely routes reference tabs open outwards
                
                // Hide button state cleanups if working fields stay empty
                if (githubUrl === "#") {
                    githubButton.style.display = "none";
                } else {
                    githubButton.style.display = "inline-block";
                }
            }

            openModal();
        });
    });

    /* --- THE RESTORED CLOSE LISTENERS --- */
    // Add click listener to the 'X' button to drop the active viewport status
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

    // Add click listener to the overlay mask to dismiss windows cleanly
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            // Only drop if user is striking bare structural background components
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }
});