# SkeletonBlock


## Usage
```html
<!-- html -->
<article class="card">
    <skeleton-block data-avatar="0" class="card-avatar" ></skeleton-block>
    <skeleton-block data-height="24" data-width="113px" ></skeleton-block>
    <skeleton-block data-lines="3" data-width="268" ></skeleton-block>
</article>
```

### Remove elements

```js

const data = await fetch("");

/**  do more stuff with your data
* ...
* then when your data are ready remove the custom element.
*/

const destroyEvent = new CustomEvent("skeleton_block:destroy");
const elements = document.querySelectorAll("skeleton-block");
elements.forEach(e => e.dispatchEvent("skeleton_block:destroy"))
```
