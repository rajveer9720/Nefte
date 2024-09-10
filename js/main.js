const primColors = document.querySelectorAll(".change_prime_color")
const seconColors = document.querySelectorAll(".change_secon_color")
const root_theme = document.querySelector(":root")
const backToTop = document.getElementById("back-to-top")

// settings wrapper
const settings = document.getElementById("settings")

let lsPrimaryColor, lsSecondaryColor;

window.addEventListener('load', function () {
    let preloader = document.querySelector('.preloader')

    setTimeout(() => {
        preloader.classList.add('transition-all')
        preloader.classList.add('duration-700')
        preloader.classList.add('opacity-0')
        preloader.classList.add('invisible')
    }, 1000)

    // set color in localStorage
    lsPrimaryColor = window.localStorage.getItem("nefte_primary_color")
    lsSecondaryColor = window.localStorage.getItem("nefte_secondary_color")


    if(lsPrimaryColor) root_theme.style.setProperty('--color-primary', lsPrimaryColor);
    if(lsSecondaryColor) root_theme.style.setProperty('--color-secondary', lsSecondaryColor);   
    
    // checked primary active color
    for (let i = 0; i < primColors.length; i++) {
        const element = primColors[i];
        const checkedIcon = element.children[0]

        if (element.getAttribute("data-color") === lsPrimaryColor) {
            checkedIcon.classList.replace("invisible", "visible")
            element.classList.add("ring-2" , "ring-offset-2", "ring-primary")
        }
        
    }
    
    // checked secondary active color
    for (let i = 0; i < seconColors.length; i++) {
        const element = seconColors[i];
        const checkedIcon = element.children[0]

        if (element.getAttribute("data-color") === lsSecondaryColor) {
            checkedIcon.classList.replace("invisible", "visible")
            element.classList.add("ring-2" , "ring-offset-2", "ring-secondary")
        }
        
    }

})

// Global
document.addEventListener('click', function (e) {
    // Close settings
    if (!e.target.classList.contains("settings-wrapper")) {
        settings.classList.replace("right-4", "-right-60")
    }
})


// Search box modal
let searchWrapper = document.querySelector(".search-wrapper")
let searchBox = document.querySelector(".search-box")
let openSearchbars = document.querySelectorAll('.open-search')
let searchClose = document.querySelector("#search-close")

function openSearch() {
    searchBox.classList.add("!mt-0")
    searchWrapper.classList.add("!visible")
    searchWrapper.classList.add("!opacity-100")
}

function closeSearch() {
    searchBox.classList.remove("!mt-0")
    searchWrapper.classList.remove("!visible")
    searchWrapper.classList.remove("!opacity-100")
}

for (let openSearchbar of openSearchbars) {
    openSearchbar.addEventListener("click", openSearch)
}

searchClose.addEventListener("click", closeSearch)
document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
        closeSearch()
    }
    if (e.ctrlKey && e.keyCode === 75) {
        openSearch()
    }
})
// Search modal end

// mobile menu
var OpenMenu = document.getElementById('open-menu')
var menuWrapper = document.getElementById('menu-wrapper')
var closeMenu = document.getElementById('close-menu')


OpenMenu.addEventListener('click', function () {
    menuWrapper.classList.remove('hidden')
})

closeMenu.addEventListener('click', function () {
    menuWrapper.classList.add('hidden')
})
// mobile menu end


// Theme color change 

// color hanger helper function
const colorChanger = (colors, item, type , lsName,  ) => {
    colors.forEach(i => {
        i.classList.remove("ring-2" , "ring-offset-2", `ring-${type}`)
        i.children[0].classList.replace("visible", "invisible")
    })

    const newColor = item.getAttribute("data-color");

    const checkedIcon = item.children[0]

    root_theme.style.setProperty(`--color-${type}`, newColor);

    // Set color in localStorage
     window.localStorage.setItem(lsName, newColor);

    // Add active class to the clicked check-icon
    if (newColor === localStorage.getItem(lsName)) {
        item.classList.add("ring-2" , "ring-offset-2",`ring-${type}`)
        checkedIcon.classList.replace("invisible", "visible")
    }
}

// primary color
primColors.forEach((item) => item.addEventListener("click", (e) => {
    colorChanger(primColors, item, "primary", "nefte_primary_color")
}))

// secondary color
seconColors.forEach((item) => item.addEventListener("click", (e) => {
    colorChanger(seconColors, item, "secondary", "nefte_secondary_color")
}))

// Color setting sho/hide 
const settingToggler = document.getElementById("settings_toggler")  
settingToggler.addEventListener("click", (e) => {
    e.stopPropagation()
    
    if (settings.classList.contains("right-4")) {
        settings.classList.replace("right-4", "-right-60")
    } else {
        settings.classList.replace("-right-60", "right-4")
    }
})

// Show/hide the "Back to Top" button based on scroll position
window.addEventListener('scroll', function (e) {
    //getting the scrolling height of window
    const height = this.scrollY

    if (height > 100) {
        backToTop.classList.remove("invisible" , "opacity-0");
    } else {
        backToTop.classList.add("invisible" , "opacity-0");
    }

    // this will work when your window scrolled.
    // if (height > 200) {
    //     stickyHeader.classList.add("sticky");
    // } else {
    //     stickyHeader.classList.remove("sticky");
    // }
});

// back to top
backToTop.addEventListener("click", (e) => {
    if (window.pageYOffset < 50) {
        backToTop.classList.add("invisible")
    } else {
        backToTop.classList.remove("invisible")
    }
    window.scrollTo({
        top: 0
    })
})   
