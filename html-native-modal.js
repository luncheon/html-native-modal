{
  const cancel = function (dialog) {
    const event = document.createEvent('Event')
    event.initEvent('cancel', false, true)
    dialog.dispatchEvent(event)
    event.defaultPrevented || dialog.close('cancel')
  }

  if (typeof HTMLDialogElement === 'undefined') {
    const showModal = HTMLElement.prototype.showModal
    const close = HTMLElement.prototype.close
    const onAnimationEnd = function () {
      if (this.getAttribute('data-modal') === 'closing') {
        document.body.removeAttribute('data-contains-modal')
        const backdrop = this.nextElementSibling
        backdrop && backdrop.tagName === 'DIALOG-BACKDROP' && backdrop.remove()
        this.removeAttribute('data-modal')
        this.removeAttribute('open')
      }
    }

    HTMLElement.prototype.showModal = function () {
      if (this.tagName !== 'DIALOG') {
        return showModal.apply(this, arguments)
      }
      this.addEventListener('animationend', onAnimationEnd)
      this.addEventListener('animationcancel', onAnimationEnd)
      this.addEventListener('transitionend', onAnimationEnd)
      if (this.hasAttribute('open')) {
        this.setAttribute('data-modal', '')
      } else {
        this.setAttribute('open', '')
        this.setAttribute('data-modal', '')
        this.insertAdjacentElement('afterend', document.createElement('dialog-backdrop'))
      }
      document.body.setAttribute('data-contains-modal', '')
    }

    HTMLElement.prototype.close = function () {
      if (this.tagName !== 'DIALOG' || !this.hasAttribute('data-modal')) {
        return close.apply(this, arguments)
      }
      this.setAttribute('data-modal', 'closing')
    }

    addEventListener('click', function (event) {
      if (event.button === 0 && event.target.tagName === 'DIALOG-BACKDROP') {
        const dialogElement = event.target.previousElementSibling
        dialogElement && dialogElement.tagName === 'DIALOG' && cancel(dialogElement)
      }
    })
  } else {
    const showModal = HTMLDialogElement.prototype.showModal
    const close = HTMLDialogElement.prototype.close
    const onAnimationEnd = function () {
      if (this.getAttribute('data-modal') === 'closing') {
        document.body.removeAttribute('data-contains-modal')
        this.removeAttribute('data-modal')
        close.apply(this, arguments)
      }
    }

    HTMLDialogElement.prototype.showModal = function () {
      this.addEventListener('animationend', onAnimationEnd)
      this.addEventListener('animationcancel', onAnimationEnd)
      this.addEventListener('transitionend', onAnimationEnd)
      this.setAttribute('data-modal', '')
      close.call(this)
      document.body.setAttribute('data-contains-modal', '')
      showModal.apply(this, arguments)
    }

    HTMLDialogElement.prototype.close = function () {
      return this.hasAttribute('data-modal') ? this.setAttribute('data-modal', 'closing') : close.apply(this, arguments)
    }

    addEventListener('click', function (event) {
      if (event.button === 0 && event.target.tagName === 'DIALOG' && event.target.hasAttribute('data-modal')) {
        const rect = event.target.getBoundingClientRect()
        if (event.clientX < rect.left || rect.right < event.clientX || event.clientY < rect.top || rect.bottom < event.clientY) {
          cancel(event.target)
        }
      }
    })
  }

  addEventListener('keydown', function (event) {
    if (event.keyCode === 27 && document.body.hasAttribute('data-contains-modal')) {
      const dialogs = document.querySelectorAll('[data-modal][open]')
      if (dialogs.length !== 0) {
        event.preventDefault()
        cancel(dialogs[dialogs.length - 1])
      }
    }
  })
}
