# html-native-modal

Dead simple modal library based on the HTML 5.2 native `<dialog>`.

* Use `<dialog>` tag, `dialogElement.showModal()` and `dialogElement.close()`.
* Tiny. JS < 100 lines, CSS < 100 lines.
* Works in IE 11.
* No dependencies. No [dialog-polyfill](https://github.com/GoogleChrome/dialog-polyfill).

[Demo](https://luncheon.github.io/html-native-modal/index.html)


## Installation

### npm

```bash
npm i html-native-modal
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.0/html-native-modal.css">
<script src="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.0"></script>
```

### Download

* <a target="_blank" download="html-native-modal.css" href="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.0/html-native-modal.css">html-native-modal.css</a>
* <a target="_blank" download="html-native-modal.js" href="https://cdn.jsdelivr.net/npm/html-native-modal@0.2.0/html-native-modal.js">html-native-modal.js</a>


## Usage

```html
<link rel="stylesheet" href="html-native-modal.css">
<script src="html-native-modal.js"></script>

<button onclick="this.nextElementSibling.showModal()">Open</button>

<dialog style="width: 300px; padding: 16px 32px;">
  <button style="float: right;" onclick="this.parentElement.close()">Close</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, ...</p>
</dialog>
```


## Canceling Canceling

By default, pressing the `Esc` key or clicking on the background will close the dialog.  
To disable this behavior, listen for the `cancel` event and call `event.preventDefault()`.

```html
<dialog id="my-modal" style="width: 300px; padding: 16px 32px;">
  <button style="float: right;" onclick="this.parentElement.close()">Close</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, ...</p>
</dialog>

<script>
  document.getElementById('my-modal').addEventListener('cancel', function (event) {
    event.preventDefault()
  });
</script>
```

Inlined `<dialog oncancel="arguments[0].preventDefault()">...</dialog>` does not work on the browsers that don't support `HTMLDialogElement` natively.


## License

[WTFPL](http://www.wtfpl.net)


## Other Vanilla JS Modal Packages

* https://github.com/Ghosh/micromodal
* https://github.com/robinparisi/tingle
* https://github.com/edenspiekermann/a11y-dialog
* https://github.com/KaneCohen/modal-vanilla
* https://github.com/hubspot/vex
