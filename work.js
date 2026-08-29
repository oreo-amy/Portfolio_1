const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get('category') || 'music';

let isAdmin = false;

document.addEventListener("DOMContentLoaded", () => {
    const catData = siteData.categories.find(c => c.id === currentCategory);
    document.getElementById("category-title").textContent = catData ? catData.title : "WORKS";

    renderGrid();

    document.getElementById("admin-login-btn").addEventListener("click", async () => {
        if(isAdmin) {
            isAdmin = false;
            alert("Logged out from Admin Mode.");
            location.reload();
            return;
        }

        const pwd = prompt("Enter Admin Password:");
        if(!pwd) return;

        const hashedInput = await hashPassword(pwd);
        
        if(hashedInput === siteData.adminPasswordHash) {
            isAdmin = true;
            document.getElementById("admin-panel").style.display = "flex";
            document.getElementById("admin-login-btn").textContent = "🔓";
            renderGrid();
            alert("Admin Mode Unlocked!");
        } else {
            alert("Incorrect Password.");
        }
    });

    document.getElementById("add-new-btn").addEventListener("click", () => {
        document.getElementById("edit-modal").style.display = "flex";
        
        document.getElementById("save-btn").onclick = () => {
            const title = document.getElementById("work-title").value;
            const src = document.getElementById("work-src").value;
            
            if(!title || !src) return alert("Please fill all fields.");

            let type = "image";
            if (currentCategory === "video") type = "youtube";
            if (currentCategory === "music") type = "soundcloud";

            const newItem = {
                id: Date.now(),
                category: currentCategory,
                type: type,
                title: title,
                src: src
            };

            siteData.portfolio.push(newItem);
            saveToBrowser();
            
            document.getElementById("work-title").value = "";
            document.getElementById("work-src").value = "";
            document.getElementById("edit-modal").style.display = "none";
            
            renderGrid();
        };
    });

    document.getElementById("close-modal-btn").addEventListener("click", () => {
        document.getElementById("edit-modal").style.display = "none";
    });
});

function renderGrid() {
    const gridContainer = document.getElementById("portfolio-grid");
    gridContainer.innerHTML = "";

    const filteredData = siteData.portfolio.filter(item => item.category === currentCategory);

    filteredData.forEach(item => {
        const card = document.createElement("div");
        card.className = "media-card";

        let mediaContent = "";
        if (item.type === "youtube") {
            mediaContent = `<iframe src="${item.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        } else if (item.type === "soundcloud") {
            mediaContent = `<iframe src="${item.src}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        } else if (item.type === "image") {
            mediaContent = `<img src="${item.src}" alt="${item.title}">`;
        }

        let adminControls = "";
        if (isAdmin) {
            adminControls = `<button class="delete-btn" onclick="deleteWork(${item.id})">Delete</button>`;
        }

        card.innerHTML = `
            ${mediaContent}
            <div class="card-info">
                <h3>${item.title}</h3>
                ${adminControls}
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

window.deleteWork = function(id) {
    if(confirm("Are you sure you want to delete this work?")) {
        siteData.portfolio = siteData.portfolio.filter(item => item.id !== id);
        saveToBrowser();
        renderGrid();
    }
}

function saveToBrowser() {
    localStorage.setItem('portfolioData', JSON.stringify(siteData.portfolio));
}

async function hashPassword(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}