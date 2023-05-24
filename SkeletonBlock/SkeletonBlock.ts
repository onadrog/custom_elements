/**
 * @license
 *
 * The MIT License (MIT)
 *
 *  Copyright 2023 Sébastien Gordano
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of
 *  this software and associated documentation files (the “Software”), to deal in the
 *  Software without restriction, including without limitation the rights to use, copy,
 *  modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 *  and to permit persons to whom the Software is furnished to do so,
 *  subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 *  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR
 *  A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 *  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE
 *  OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Create a block with 'waves' that indicate data are loadings.
 */
class SkeletonBlock extends HTMLElement {
	#isAvatar: boolean;
	#nb_lines: number;
	#stylesheet: CSSStyleSheet;
	#shadow: ShadowRoot;
	#w: string;
	#h: string;
	constructor() {
		super();
		this.#stylesheet = new CSSStyleSheet();
		this.#shadow = this.attachShadow({ mode: "open" });
		this.#isAvatar = !!this.dataset.avatar || false;
		this.#nb_lines = parseInt(this.dataset.lines || "0", 10);
		this.#w = `${parseInt(this.dataset.width || "161", 10)}px`;
		this.#h = `${parseInt(this.dataset.height || "100", 10)}px`;
		// new CustomEvent("skeleton_block:destroy");
	}

	connectedCallback() {
		this.#shadow.adoptedStyleSheets = [this.#stylesheet];
		const div = document.createElement("div");
		div.classList.add("loop");
		this.#shadow.appendChild(div);
		this.#stylesheet.insertRule(
			`div {
                width: ${this.#w};
                height: ${this.#h};
            }`,
			this.#stylesheet.cssRules.length,
		);
		this.#stylesheet.insertRule(
			`.loop::after{
                content: "";
                transform: translateX(-100%);
                position: absolute;
                inset: 0;
                background: linear-gradient(90deg, transparent, 40%, #6969693F, 60%, transparent);
                animation: loop infinite linear .9s;
            }`,
			this.#stylesheet.cssRules.length,
		);
		this.#stylesheet.insertRule(
			`.loop {
                border-radius: 3px;
                background-color: #8C8C8Cff;
                position: relative;
                overflow: hidden;
            }`,
			this.#stylesheet.cssRules.length,
		);

		this.#stylesheet.insertRule(
			`@keyframes loop {
                100% {
                    transform: translateX(100%);
                }
            }`,
			this.#stylesheet.cssRules.length,
		);

		if (this.#isAvatar) {
			this.#stylesheet.insertRule(
				`.loop {
                    border-radius: 50%;
                    height: ${this.#w}
                }`,
				this.#stylesheet.cssRules.length,
			);
		}
		if (this.#nb_lines > 0) {
			this.#createLines(div);
		}
		this.addEventListener("skeleton_block:destroy", this.#selfDestruction);
	}

	#createLines(parent: HTMLDivElement) {
		const p = document.createElement("p");
		parent.classList.remove("loop");

		this.#stylesheet.insertRule(
			`p {
                margin:0;
                width: 100%;
                height: 100%;
            }`,
			this.#stylesheet.cssRules.length,
		);
		for (let i = 0; i < this.#nb_lines; ++i) {
			const span = document.createElement("span");
			span.classList.add("loop");
			span.style.width = `${Math.floor(Math.random() * (100 - 69) + 69)}%`;
			p.appendChild(span);
		}
		this.#stylesheet.insertRule(
			`span {
                display: inline-block;
                width: 100%;
                height: 1rem;
            }`,
			this.#stylesheet.cssRules.length,
		);
		parent.appendChild(p);
	}

	#selfDestruction() {
		this.parentNode?.removeChild(this);
	}

	disconnectedCallback() {
		removeEventListener("skeleton_block:destroy", this.#selfDestruction);
	}
}

customElements.define("skeleton-block", SkeletonBlock);
