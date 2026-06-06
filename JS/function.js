document.addEventListener("DOMContentLoaded", function () {

    setupNavigationButtons();
    highlightActiveButton();

    // Show all portfolio items by default
    if (document.querySelector(".portfolio-item")) {
        filterSelection("all");
    }

    // ==========================
    // VIDEO MODAL
    // ==========================

    const modal = document.getElementById("videoModal");
    const youtubePlayer = document.getElementById("youtubePlayer");
    const modalVideo = document.getElementById("modalVideo");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".portfolio-item").forEach(item => {

        item.addEventListener("click", function () {

            const type = this.getAttribute("data-type");
            const videoSrc = this.getAttribute("data-video");

            if (!videoSrc) return;

            modal.style.display = "flex";

            if (type === "youtube") {

                youtubePlayer.style.display = "block";
                modalVideo.style.display = "none";

                youtubePlayer.src =
                    `https://www.youtube.com/embed/${videoSrc}?autoplay=1&mute=1`;

            } else {

                youtubePlayer.style.display = "none";
                modalVideo.style.display = "block";

                modalVideo.src = videoSrc;
                modalVideo.play();
            }

        });

    });

    // ==========================
    // CLOSE BUTTON
    // ==========================

    closeBtn.addEventListener("click", function () {

        modal.style.display = "none";

        youtubePlayer.src = "";

        modalVideo.pause();
        modalVideo.src = "";

    });

    // ==========================
    // CLICK OUTSIDE MODAL
    // ==========================

    window.addEventListener("click", function (event) {

        if (event.target === modal) {

            modal.style.display = "none";

            youtubePlayer.src = "";

            modalVideo.pause();
            modalVideo.src = "";

        }

    });

});


// ==========================
// NAVIGATION BUTTONS
// ==========================

function setupNavigationButtons() {

    const buttons = [
        { id: "homeBtn", url: "index.html" },
        { id: "portfolioBtn", url: "portfolio.html" },
        { id: "contactBtn", url: "contact.html" }
    ];

    buttons.forEach(button => {

        const btnElement = document.getElementById(button.id);

        if (btnElement) {

            btnElement.addEventListener("click", function () {

                window.location.href = button.url;

            });

        }

    });

}


// ==========================
// ACTIVE PAGE HIGHLIGHT
// ==========================

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


// ==========================
// PORTFOLIO FILTERS
// ==========================

function filterSelection(category) {

    let items =
        document.querySelectorAll(".portfolio-item");

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