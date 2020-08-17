# html-native-modal

Dead simple modal library based on the HTML 5.2 native `<dialog>`.

* APIs are based on the [`HTMLDialogElement` spec](https://www.w3.org/TR/html52/interactive-elements.html#the-dialog-element).  
(See also [HTMLDialogElement - Web APIs | MDN](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement))
  - `<dialog>` tag
  - `dialogElement.showModal()` method
  - `dialogElement.close()` method
  - `cancel` event
* No dependencies. No polyfills. Works with any framework.
* Tiny. JS < 100 lines, CSS < 100 lines.
* Works in IE 11.

[Demo](https://luncheon.github.io/html-native-modal/index.html)

[Preact example on CodeSandbox](https://codesandbox.io/s/html-native-modal-on-preact-rwt8y?file=/index.tsx)

## Installation

### npm

```bash
npm i html-native-modal
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.1/html-native-modal.css">
<script src="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.1"></script>
```

### Download

* <a target="_blank" download="html-native-modal.css" href="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.1/html-native-modal.css">html-native-modal.css</a>
* <a target="_blank" download="html-native-modal.js" href="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.1/html-native-modal.js">html-native-modal.js</a>


## Usage

```html
<link rel="stylesheet" href="html-native-modal.css">
<script src="html-native-modal.js"></script>

<button onclick="this.nextElementSibling.showModal()">Open</button>

<dialog style="width: 480px; padding: 16px 32px;">
  <button style="float: right;" onclick="this.parentElement.close()">Close</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, ...</p>
</dialog>
```

[Run on CodePen](https://codepen.io/luncheon/pen/MWyewoz/left/)


## Canceling Canceling

By default, pressing the `Esc` key or clicking on the background will close the dialog.  
To disable this behavior, listen for the `cancel` event and call `event.preventDefault()`.

```html
<dialog id="my-modal" style="width: 480px; padding: 16px 32px;">
  <button style="float: right;" onclick="this.parentElement.close()">Close</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, ...</p>
</dialog>

<script>
  document
    .getElementById('my-modal')
    .addEventListener('cancel', function (event) {
      event.preventDefault()
    });
</script>
```

[Run on CodePen](https://codepen.io/luncheon/pen/JjXKdLd/left/)

Inlined `<dialog oncancel="arguments[0].preventDefault()">...</dialog>` does not work on the browsers that don't support `HTMLDialogElement` natively.


## License

[WTFPL](http://www.wtfpl.net)


## Other Vanilla JS Modal Packages

* https://github.com/Ghosh/micromodal
* https://github.com/robinparisi/tingle
* https://github.com/edenspiekermann/a11y-dialog
* https://github.com/KaneCohen/modal-vanilla
* https://github.com/hubspot/vex
