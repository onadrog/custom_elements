# ThemeSwitcher

## Usage

```html
<!-- html -->

<theme-switcher
    id="themeToggle"
    class="switcher-wrapper"
    tabindex="0"
    aria-label="Change theme color."
>

    <label for="dark">Dark mode</label>
    <input
        type="radio"
        id="dark"
        name="theme-toggle"
        value="dark"
    />

    <label for="light">Light mode</label>
    <input
        type="radio"
        id="light"
        name="theme-toggle"
        value="light"
    />
</theme-switcher>
```


```css
/* css */

:root {
    --background-color: white;
}

@media (prefers-color-scheme: dark) {
    :root.dark {
        --background-color: grey;
    }
}
```
