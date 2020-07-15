if (typeof HTMLDialogElement === 'undefined') {
  const showModal = HTMLElement.prototype.showModal
  const close = HTMLElement.prototype.close

  HTMLElement.prototype.showModal = function () {
    if (this.tagName === 'DIALOG') {
      if (this.hasAttribute('open')) {
        this.setAttribute('data-modal', '')
      } else {
        this.setAttribute('open', '')
        this.setAttribute('data-modal', '')
        this.insertAdjacentElement('afterend', document.createElement('dialog-backdrop'))
      }
      document.body.setAttribute('data-contains-modal', '')
    } else {
      showModal.apply(this, arguments)
    }
  }

  HTMLElement.prototype.close = function () {
    if (this.tagName === 'DIALOG') {
      this.setAttribute('data-modal', 'closing')
      this.addEventListener('transitionend', function () {
        if (this.getAttribute('data-modal') === 'closing') {
          document.body.removeAttribute('data-contains-modal')
          const backdrop = this.nextElementSibling
          if (backdrop && backdrop.className === 'backdrop') {
            backdrop.remove()
          }
          this.removeAttribute('data-modal')
          this.removeAttribute('open')
        }
      })
    } else {
      close.apply(this, arguments)
    }
  }

  addEventListener('click', function (event) {
    const target = event.target
    if (event.button === 0 && target.tagName === 'DIALOG-BACKDROP') {
      const dialogElement = target.previousElementSibling
      if (dialogElement && dialogElement.tagName === 'DIALOG') {
        dialogElement.close()
      }
    }
  })
} else {
  const showModal = HTMLDialogElement.prototype.showModal
  const close = HTMLDialogElement.prototype.close

  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('data-modal', '')
    close.call(this)
    showModal.apply(this, arguments)
    document.body.setAttribute('data-contains-modal', '')
  }

  HTMLDialogElement.prototype.close = function () {
    if (this.hasAttribute('data-modal')) {
      this.setAttribute('data-modal', 'closing')
      this.addEventListener('transitionend', function () {
        if (this.getAttribute('data-modal') === 'closing') {
          document.body.removeAttribute('data-contains-modal')
          this.removeAttribute('data-modal')
          close.apply(this, arguments)
        }
      })
    }
  }

  addEventListener('click', function (event) {
    const target = event.target
    if (event.button === 0 && target.tagName === 'DIALOG' && target.hasAttribute('data-modal')) {
      const rect = target.getBoundingClientRect()
      if (event.clientX < rect.left || rect.right < event.clientX || event.clientY < rect.top || rect.bottom < event.clientY) {
        target.close()
      }
    }
  })
}

addEventListener('keydown', function (event) {
  if (event.keyCode === 27 && document.body.hasAttribute('data-contains-modal')) {
    const dialogs = document.querySelectorAll('[data-modal][open]')
    const lastDialog = dialogs[dialogs.length - 1]
    if (lastDialog) {
      event.preventDefault()
      lastDialog.close()
    }
  }
})
