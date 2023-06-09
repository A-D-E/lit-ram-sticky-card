import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

// make jquery & foundation available in the window object

declare global {
  interface Window {
    $: any
  }
}
window.$ = $
@customElement('sticky-card')
export class StickyCard extends LitElement {
  // get the properties from the parent element

  @property({ type: Boolean, attribute: 'image-right' }) imageRight = false
  @property({ type: String, attribute: 'image-src' }) imageSrc = ''
  @property({ type: String, attribute: 'image-alt' }) imageAlt = ''
  @property({ type: Array, attribute: 'text-items' }) textItems = []
  @property({ type: Boolean, attribute: 'use-light-dom' }) useLightDom = false
  @property({ type: String }) uniqueId = ''

  // add constructor with super() to avoid error

  constructor() {
    super()
    this.uniqueId = Math.random().toString(36).substr(2, 9)
  }

  getStyles() {
    // "casy-" prefix is used to avoid conflicts with other styles (CArd-StickY)
    const casyPrefix = `casy-${this.uniqueId}`
    return css`
      .${unsafeCSS(casyPrefix)}-section-wrap {
        line-height: 1.5;
        box-sizing: border-box;
        margin: 0;
        margin-top: 3rem;
        display: grid;
        position: relative;
        padding: 0;
        grid-template-columns:
          [full-start] minmax(2rem, 1fr)
          [standard-start] 3.75rem [narrow-start] minmax(1rem, 67.5rem)
          [narrow-end] 3.75rem [standard-end] minmax(2rem, 1fr) [full-end];
        margin-block: 6rem;
      }

      .casy-image-right {
        grid-column: 2 !important;
      }
      .casy-text-left {
        grid-column: 1 !important;
      }
      .${unsafeCSS(casyPrefix)}-main-container {
        line-height: 1.5;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        grid-column: standard;
        gap: 4rem;
        display: grid;
        grid-gap: 4rem;
        grid-auto-rows: minmax(100vh, max-content);
        align-items: center;
        grid-template-columns: 1fr 1fr;
        margin-bottom: -10vh;
      }
      .${unsafeCSS(casyPrefix)}-image-container {
        line-height: 1.5;
        gap: 4rem;
        box-sizing: border-box;
        margin: 0;
        position: sticky;
        top: 75.0313px;
        padding: 2rem 0;
        min-height: calc(100vh - 75.0313px);
        grid-column: 1;
        display: grid;
        place-items: center;
      }
      .${unsafeCSS(casyPrefix)}-image {
        border-radius: 8px;
        box-shadow: 0 13px 27px -5px #32325d40, 0 8px 16px -8px #0000004d,
          0 -6px 16px -6px #00000008;
      }
      .${unsafeCSS(casyPrefix)}-sticky-item {
        line-height: 1.5;
        gap: 4rem;
        box-sizing: border-box;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        min-height: 0;
        grid-column: 2;
        padding: 4rem;
        margin-top: 0;
      }
    `
  }

  // add flag "useLightDom" to createRenderRoot() for using light dom instead of shadow dom

  createRenderRoot() {
    return this.useLightDom ? this : super.createRenderRoot()
  }

  // add foundation to the window object on first update

  async firstUpdated() {
    await this.waitForJQueryAndFoundation()
    window.$(document).foundation()
  }

  waitForJQueryAndFoundation() {
    return new Promise<void>((resolve) => {
      const checkJQueryAndFoundation = () => {
        if (window.$ && window.$.fn.foundation) {
          resolve()
        } else {
          setTimeout(checkJQueryAndFoundation, 50)
        }
      }
      checkJQueryAndFoundation()
    })
  }

  // render the component html

  render() {
    // add unique id to the css classes to avoid conflicts with other styles (CArd-StickY)
    const casyPrefix = `casy-${this.uniqueId}`
    const gridRowFix = (num: number) => {
      return this.imageRight ? `grid-row: ${num + 1}` : `grid-row: auto`
    }
    // use the styles from the static get styles() method
    return html`
      <style>
        ${this.getStyles()}
      </style>
      <div class="${casyPrefix}-section-wrap ">
        <div class="${casyPrefix}-main-container">
          <div
            class="${casyPrefix}-image-container ${this.imageRight
              ? 'casy-image-right'
              : ''}"
          >
            <img
              class="${casyPrefix}-image"
              src="${this.imageSrc}"
              alt="${this.imageAlt}"
            />
          </div>
          ${this.textItems.map(
            (item: { title: String; text: String }, i) =>
              html`
                <div
                  class="${casyPrefix}-sticky-item ${this.imageRight
                    ? 'casy-text-left'
                    : ''}"
                  style="grid-row: initial; ${gridRowFix(i)}"
                >
                  <h2>${item.title}</h2>
                  <p>${item.text}</p>
                </div>
              `
          )}
        </div>
      </div>
    `
  }
}
