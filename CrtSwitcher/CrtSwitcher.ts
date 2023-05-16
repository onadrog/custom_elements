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
class CrtSwitcher extends HTMLElement {
	root: DOMTokenList;
	svgPath: SVGPathElement;
	input: HTMLInputElement;
	fill: string;
	constructor() {
		super();
		this.root = document.documentElement.classList;
		this.input = this.querySelector("input") as HTMLInputElement;
		this.svgPath = this.querySelector(
			"svg > path.crt-screen",
		) as SVGPathElement;
		this.fill = "none";
	}

	connectedCallback() {
		this.getSessionStorage();
		this.fill === "currentColor"
			? (this.input.checked = true)
			: (this.input.checked = false);
		this.input.addEventListener("change", (e) => this.handleToggle(e));
	}

	getSessionStorage(): void {
		if (sessionStorage.getItem("fill")) {
			this.fill = sessionStorage.getItem("fill") as string;
		}
		this.changeEffect();
	}

	private handleToggle(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.checked) {
			this.fill = "currentColor";
		} else {
			this.fill = "none";
		}
		this.changeEffect();
	}

	private changeEffect() {
		if (this.fill === "none") {
			this.root.remove("crt");
		} else {
			this.root.add("crt");
		}
		sessionStorage.setItem("fill", this.fill);
		this.svgPath.setAttribute("fill", this.fill);
	}
}

customElements.define("crt-switcher", CrtSwitcher);
