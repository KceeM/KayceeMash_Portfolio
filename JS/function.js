document.addEventListener("DOMContentLoaded", function () {

    setupNavigationButtons();
    highlightActiveButton();

    // Show all portfolio items by default
    if (document.querySelector(".portfolio-item")) {
        filterSelection("all");
    }

    setupVideoModal();

});


// ===========================
// Navigation Buttons
// ===========================

function setupNavigationButtons() {

    const buttons = [
        { id: 'homeBtn', url: 'index.html' },
        { id: 'portfolioBtn', url: 'portfolio.html' },
        { id: 'contactBtn', url: 'contact.html' }
    ];

    buttons.forEach(button => {

        const btnElement = document.getElementById(button.id);

        if (btnElement) {

            btnElement.addEventListener('click', function () {
                window.location.href = button.url;
            });

        }

    });

}


// ===========================
// Active Navigation Button
// ===========================

function highlightActiveButton() {

    const currentPage =
        window.location.pathname.split("/").pop();

    const pageMap = {
        "index.html": "homeBtn",
        "portfolio.html": "portfolioBtn",
        "contact.html": "contactBtn"
    };

    const activeBtnId = pageMap[currentPage];

    if (activeBtnId) {
        document
            .getElementById(activeBtnId)
            ?.classList.add("active");
    }

}


// ===========================
// Portfolio Filtering
// ===========================

function filterSelection(category) {

    let items =
        document.querySelectorAll('.portfolio-item');

    items.forEach(item => {

        if (
            category === "all" ||
            item.classList.contains(category)
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}


// ===========================
// Video Modal
// ===========================

function setupVideoModal() {

    const modal =
        document.getElementById("videoModal");

    const modalVideo =
        document.getElementById("modalVideo");

    const closeBtn =
        document.querySelector(".close");

    if (!modal || !modalVideo || !closeBtn) {
        return;
    }

    document
        .querySelectorAll(".portfolio-item")
        .forEach(item => {

            item.addEventListener("click", function () {

                const videoSrc =
                    this.getAttribute("data-video");

                if (!videoSrc) return;

                modal.style.display = "flex";

                modalVideo.src = videoSrc;

                modalVideo.play();

            });

        });

    closeBtn.addEventListener("click", function () {

        modal.style.display = "none";

        modalVideo.pause();

        modalVideo.src = "";

    });

    window.addEventListener("click", function (event) {

        if (event.target === modal) {

            modal.style.display = "none";

            modalVideo.pause();

            modalVideo.src = "";

        }

    });

}