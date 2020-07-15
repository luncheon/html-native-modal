# html-native-modal

Dead simple modal library based on the HTML 5.2 native `<dialog>`.

* Use `<dialog>` tag, `dialogElement.showModal()` and `dialogElement.close()`.
* Tiny. JS < 100 lines, CSS < 100 lines.
* No dependencies. No [dialog-polyfill](https://github.com/GoogleChrome/dialog-polyfill).

[Demo](https://luncheon.github.io/html-native-modal/)


## Installation

T.B.D.


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


## License

[WTFPL](http://www.wtfpl.net)


## Other Vanilla JS Modal Packages

* https://github.com/Ghosh/micromodal
* https://github.com/robinparisi/tingle
* https://github.com/edenspiekermann/a11y-dialog
* https://github.com/KaneCohen/modal-vanilla
