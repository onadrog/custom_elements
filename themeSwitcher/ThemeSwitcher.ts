/**
 * @licence
 *
 * The MIT License (MIT)
 *
 * Copyright 2023 Sébastien Gordano
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
class ThemeSwitcher extends HTMLElement {
	root: DOMTokenList;
	theme: string;
	inputs: NodeListOf<HTMLInputElement>;
	constructor() {
		super();
		this.root = document.documentElement.classList;
		this.theme = "";
		this.inputs = this.querySelectorAll("input[name='theme-toggle']");
	}

	connectedCallback() {
		this.getSessionStorage();
		(
			this.querySelector(`input[value=${this.theme}]`) as HTMLInputElement
		).checked = true;
		this.inputs.forEach((i) =>
			i.addEventListener("change", (e) => this.handleToggle(e)),
		);
	}

	getSessionStorage(): void {
		if (sessionStorage.getItem("theme")) {
			this.theme = sessionStorage.getItem("theme") as string;
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
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
customElements.define("theme-switcher", ThemeSwitcher);
