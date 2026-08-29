document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("site-name").textContent = siteData.profile.name;
    document.getElementById("site-subtitle").textContent = siteData.profile.subtitle;
    document.getElementById("site-location").textContent = siteData.profile.location;
    document.getElementById("site-email").textContent = siteData.profile.email;

    const menuList = document.getElementById("menu-list");
    const floatingContainer = document.getElementById("floating-images-container");

    siteData.categories.forEach((category) => {
        const menuItem = document.createElement("a");
        menuItem.className = "menu-item";
        menuItem.textContent = category.title;
        menuItem.href = `work.html?category=${category.id}`;
        
        menuList.appendChild(menuItem);

        const imgElements = [];
        category.images.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "float-img";
            
            const width = Math.random() * 150 + 200; 
            const top = Math.random() * 60 + 10; 
            const left = Math.random() * 70 + 10; 
            
            img.style.width = `${width}px`;
            img.style.top = `${top}%`;
            img.style.left = `${left}%`;
            
            floatingContainer.appendChild(img);
            imgElements.push(img);
        });

        menuItem.addEventListener("mouseenter", () => imgElements.forEach(img => img.classList.add("active")));
        menuItem.addEventListener("mouseleave", () => imgElements.forEach(img => img.classList.remove("active")));
    });

    const gridContainer = document.getElementById("portfolio-grid");
    
    if (gridContainer) {
        siteData.categories.forEach(category => {
            const repItem = siteData.portfolio.find(item => item.category === category.id);
            
            if (repItem) {
                const card = document.createElement("div");
                card.className = "media-card";

                let mediaContent = "";
                if (repItem.type === "youtube") {
                    mediaContent = `<iframe src="${repItem.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
                } else if (repItem.type === "soundcloud") {
                    mediaContent = `<iframe src="${repItem.src}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
                } else if (repItem.type === "image") {
                    mediaContent = `<img src="${repItem.src}" alt="${repItem.title}">`;
                }

                card.style.cursor = "pointer";
                card.onclick = () => { window.location.href = `work.html?category=${category.id}`; };

                card.innerHTML = `
                    ${mediaContent}
                    <div class="card-info">
                        <h3><span style="color: #aaa; font-size: 0.8rem; margin-right: 8px;">[${category.title}]</span> ${repItem.title}</h3>
                    </div>
                `;
                gridContainer.appendChild(card);
            }
        });
    }
});