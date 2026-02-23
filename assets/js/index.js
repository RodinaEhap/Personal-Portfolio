//mobile menu!
const menuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("mobile-menu");
  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});
//====================================================================
const modeToggle = document.getElementById("theme-toggle-button");
const htmlElement = document.querySelector("html");
let flag = false;
let savedTheme = localStorage.getItem("theme");
const settingToggle = document.getElementById("settings-toggle");
const sidebar = document.getElementById("settings-sidebar");
const closeSetting = document.getElementById("close-settings");
let fontChecked = document.querySelectorAll(".font-option");
let savedFont = localStorage.getItem("userFont");
const themeGrid = document.getElementById("theme-colors-grid");
const savedColors = localStorage.getItem("userTheme")
  ? JSON.parse(localStorage.getItem("userTheme"))
  : null;
const themes = [
  {
    name: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#ec4899",
  },
  {
    name: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#ef4444",
  },
  {
    name: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#2dd4bf",
  },
  {
    name: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    name: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];
const customSelects = document.querySelectorAll(".custom-select");
const optionsContainer = document.querySelectorAll(".custom-option");
const list = document.querySelectorAll(".custom-options");
const scrollToTop = document.getElementById("scroll-to-top");
const links = document.querySelectorAll("#header a");
const sections = document.querySelectorAll("section[id]");
const reset = document.getElementById("reset-settings");

getTheme();
getFont();
getThemeColors();
getUserOPT();
modeToggle.addEventListener("click", () => {
  // flag? (htmlElement.classList.add("dark"),localStorage.setItem("theme","dark")): (htmlElement.classList.remove("dark"),localStorage.setItem("theme","light"));//hard to manipulate!*
  flag = !flag;
  themeUI(flag);
});

function getTheme() {
  flag = savedTheme === "dark";
  themeUI(flag);
}
function themeUI(flagPar) {
  if (flagPar) {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}
settingToggle.addEventListener("click", () => {
  sidebar.removeAttribute("inert");
  sidebar.classList.remove("translate-x-full");

  settingToggle.style.transform = "translateY(-50%) translateX(-320px)";
  settingToggle.setAttribute("aria-expanded", "true");
});
closeSetting.addEventListener("click", close);
function close() {
  settingToggle.focus();
  sidebar.setAttribute("inert", "");
  sidebar.classList.add("translate-x-full");
  settingToggle.style.transform = "translateY(-50%) translateX(0)";
  settingToggle.setAttribute("aria-expanded", "false");
}
fontChecked.forEach((font) => {
  font.addEventListener("click", () => {
    fontUI(font);
  });
});
function getFont() {
  if (savedFont) {
    fontChecked.forEach((font) => {
      if (font.dataset.font === savedFont) fontUI(font);
    });
  }
}
function clearAllFonts() {
  fontChecked.forEach((fonts) => {
    fonts.classList.remove("active");
    fonts.setAttribute("aria-checked", "false");
  });
}
function fontUI(fontPar) {
  clearAllFonts();
  fontPar.classList.add("active");
  fontPar.setAttribute("aria-checked", "true");
  const dataFont = fontPar.dataset.font;
  // console.log("Selected font is:", dataFont);
  htmlElement.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
  htmlElement.classList.add(`font-${dataFont}`);
  localStorage.setItem("userFont", dataFont);
}
themes.forEach((t) => {
  const btn = document.createElement("button");
  btn.className =
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm";
  btn.style.background = `linear-gradient(135deg, ${t.primary}, ${t.secondary})`;
  btn.setAttribute("title", t.name);
  btn.setAttribute("data-primary", t.primary);
  btn.setAttribute("data-secondary", t.secondary);
  if (savedColors) {
    if (savedColors.primary === t.primary) {
      activeRing(btn);
    }
  } else {
    if (t.name === "Purple Blue") {
      activeRing(btn);
    }
  }
  btn.addEventListener("click", () => {
    htmlElement.style.setProperty("--color-primary", t.primary);
    htmlElement.style.setProperty("--color-secondary", t.secondary);
    htmlElement.style.setProperty("--color-accent", t.accent);
    activeRing(btn);
    const colorsCurrentTheme = {
      primary: t.primary,
      secondary: t.secondary,
      accent: t.accent,
    };
    localStorage.setItem("userTheme", JSON.stringify(colorsCurrentTheme));
  });
  themeGrid.appendChild(btn);
});
function activeRing(buttonPar) {
  const btns = themeGrid.querySelectorAll("button");
  btns.forEach((b) => {
    b.classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "dark:ring-offset-slate-900",
    );
  });
  buttonPar.classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "dark:ring-offset-slate-900",
  );
}
function getThemeColors() {
  if (savedColors) {
    htmlElement.style.setProperty("--color-primary", savedColors.primary);
    htmlElement.style.setProperty("--color-secondary", savedColors.secondary);
    htmlElement.style.setProperty("--color-accent", savedColors.accent);
  }
}
reset.addEventListener("click", () => {
  localStorage.removeItem("userFont");
  localStorage.removeItem("userTheme");
  htmlElement.style.setProperty("--color-primary", themes[0].primary);
  htmlElement.style.setProperty("--color-secondary", themes[0].secondary);
  htmlElement.style.setProperty("--color-accent", themes[0].accent);
  themeGrid.querySelector("button")
    ? activeRing(themeGrid.querySelector("button"))
    : null;
  if (fontChecked[1]) fontUI(fontChecked[1]);
  close();
});
customSelects.forEach((c) => {
  c.addEventListener("click", () => {
    const wrapper = c.closest(".custom-select-wrapper");
    const listOptions = wrapper.querySelector(".custom-options");
    const arrowIcon = wrapper.querySelector("i");
    list.forEach((li) => {
      if (li !== listOptions) li.classList.add("hidden");
      li.previousElementSibling.querySelector("i").style.transform =
        "rotate(0deg)";
    });
    listOptions.classList.toggle("hidden");
    rotateArrow(listOptions, arrowIcon, c);
  });
});
optionsContainer.forEach((op) => {
  op.addEventListener("click", () => {
    const wrapper = op.closest(".custom-select-wrapper");
    const selectC = wrapper.querySelector(".custom-select");
    const selectedText = wrapper.querySelector(".selected-text");
    const listOptions = wrapper.querySelector(".custom-options");
    const arrowIcon = wrapper.querySelector("i");
    let userOption = (selectedText.innerText = op.innerText);
    selectedText.classList.replace("text-slate-500", "text-slate-800");
    selectedText.classList.replace("dark:text-slate-400", "dark:text-white");
    listOptions.classList.add("hidden");
    rotateArrow(listOptions, arrowIcon, op);
    selectC.setAttribute("aria-expanded", "false");
    localStorage.setItem("optUser", userOption);
  });
});
function rotateArrow(listOptions, arrowIcon, c) {
  let flag = listOptions.classList.contains("hidden")
    ? (arrowIcon.style.transform = "rotate(0deg)")
    : (arrowIcon.style.transform = "rotate(180deg)");
  const hasAccess = !flag;
  c.setAttribute("aria-expanded", hasAccess);
}
function getUserOPT() {
  const opt = localStorage.getItem("optUser");
  return opt;
}
addEventListener("scroll", () => {
  if (scrollY > 0) {
    scrollToTop.classList.replace("invisible", "visible");
    scrollToTop.classList.replace("opacity-0", "opacity-100");
  } else {
    scrollToTop.classList.replace("visible", "invisible");
    scrollToTop.classList.replace("opacity-100", "opacity-0");
  }
});
scrollToTop.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
const active = new IntersectionObserver(
  (where) => {
    where.forEach((w) => {
      if (w.isIntersecting) {
        const id = w.target.getAttribute("id");
        const activeLink = document.querySelector(`#header a[href="#${id}"]`);
        links.forEach((link) => {
          link.classList.remove("active");
        });
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.3 },
);
sections.forEach((sec) => active.observe(sec));
