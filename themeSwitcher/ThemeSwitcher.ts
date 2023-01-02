class ThemeSwitcher extends HTMLElement {
    root: DOMTokenList
    theme: string
    inputs: NodeListOf<HTMLInputElement>
    constructor() {
        super();
        this.root = document.documentElement.classList;
        this.theme = "";
        this.inputs = this.querySelectorAll("input[name='theme-toggle']");
    }

    connectedCallback() {
        this.setAttribute('aria-label', 'Change theme color.');
        this.getSessionStorage();
        (this.querySelector(`input[value=${this.theme}]`) as HTMLInputElement).checked = true;
        this.inputs.forEach((i) => i.addEventListener("change", (e) => this.handleToggle(e)));
    }

    getSessionStorage(): void {

        if (sessionStorage.getItem("theme")) {
            this.theme = sessionStorage.getItem("theme") as string;
        }
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            this.theme = "dark";
        } else {
            this.theme = "light";
        }
        this.changeTheme();
    }

    handleToggle(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.theme = target.value;
        sessionStorage.setItem("theme", this.theme);
        this.changeTheme();
    }

    changeTheme() {

        if (this.theme === "light") {
            this.root.remove("dark");
        } else {
            this.root.add("dark");
        }
    }

}
customElements.define('theme-switcher', ThemeSwitcher);
