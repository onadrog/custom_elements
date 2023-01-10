# CrtSwitcher

Add a crt effect on the screen, 
** NO FANCY TEXT SHAKING OR LINE TEARING ! **

## Usage

```html
<!-- html -->

<crt-switcher
    class="switcher-wrapper"
    aria-label="Toggle CRT screen effect."
    tabindex="0">
    <label for="crtSwicth">
        <span class="sr-only">Enable the CRT mode</span>
        <svg fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" width="18" height="18" astro-icon="computer" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;"><path fill-rule="evenodd" d="M.516 0C.23 0 0 .205 0 .46v11.81c0 .255.23.46.516.46h3.256c.393.068.89.294 1.566.687-1.533.447-2.56 1.185-2.56 1.607 0 .634 2.33.876 5.203.876s5.202-.242 5.202-.876c0-.432-1.089-1.196-2.692-1.638.565-.374.996-.594 1.378-.655h3.515c.286 0 .516-.206.516-.462V.461c0-.256-.23-.461-.516-.461zm1.631 1.5H13.73c.583 0 .698.118.698.639V8.79c0 .521-.115.94-.698.94H2.193c-.583 0-.703-.419-.703-.94V2.14c0-.521.074-.639.656-.639zm9.763 9.346c.566 0 1.024.223 1.024.498s-.458.498-1.024.498c-.565 0-1.023-.223-1.023-.498s.458-.498 1.023-.498zm-8.785.15c.158 0 .31.036.422.102.112.065.175.154.175.246s-.063.181-.175.247a.857.857 0 0 1-.422.102c-.33 0-.597-.156-.597-.349 0-.192.267-.348.597-.348zm1.322 0c.33 0 .597.156.597.348 0 .193-.268.349-.597.349a.857.857 0 0 1-.423-.102c-.112-.066-.175-.155-.175-.247s.063-.18.175-.246a.857.857 0 0 1 .423-.102zm1.377 0c.33 0 .597.156.597.348 0 .193-.267.349-.597.349a.857.857 0 0 1-.423-.102c-.112-.066-.174-.155-.174-.247s.062-.18.174-.246a.857.857 0 0 1 .423-.102z"></path><path fill="currentColor" d="M3.082 2.116h9.736c.46 0 .83.37.83.83V8.19c0 .46-.37.83-.83.83H3.082c-.46 0-.83-.37-.83-.83V2.945c0-.46.37-.83.83-.83z" class="crt-screen" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;"></path></svg>
        <input
            type="checkbox"
            name="crtSwitch"
            id="crtSwicth"
            class="sr-only"
        />
    </label>
</crt-switcher>
```

```css
/* css */

.crt {
  position: relative;
}

.crt::before {
  content: " ";
  display: block;
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.06),
      rgba(0, 0, 255, 0.06)
    );
  background-size: 100% 3px, 6px 100%;
  pointer-events: none;
  z-index: 2;
}
```
