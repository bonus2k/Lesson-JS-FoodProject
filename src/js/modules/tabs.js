function tabs() {
    const tabsParent = document.querySelector(".tabheader__items"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabItem = document.querySelectorAll(".tabheader__item");

    tabsParent.addEventListener("click", event => {
        const target = event.target;
        tabItem.forEach((item, i) => {
            if (target && target == tabItem[i]) {
                hideTabContent();
                showTabContent(i);
            }
        })
    });

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove("show", "fade")
            item.classList.add("hide")
        });
        tabItem.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    };

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show", "fade");
        tabItem[i].classList.add("tabheader__item_active");
    };

    hideTabContent();
    showTabContent();
}

module.exports = tabs;