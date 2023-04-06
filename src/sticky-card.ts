import { LitElement, html, css } from "lit"
import { customElement, property } from "lit/decorators.js"

// make jquery & foundation available in the window object

declare global {
    interface Window {
        $: any
    }
}

@customElement("sticky-card")
export class StickyCard extends LitElement {

    // get the properties from the parent element
    
    @property({ type: Boolean, attribute: 'image-right' }) imageRight = false
    @property({ type: String, attribute: 'image-src'}) imageSrc = ""
    @property({ type: String, attribute: 'image-alt'}) imageAlt = ""
    @property({ type: Array, attribute: 'text-items'}) textItems = []
    @property({ type: Boolean, attribute: 'use-light-dom' }) useLightDom = false


    static get styles() {

        // "casy-" prefix is used to avoid conflicts with other styles (CArd-StickY)

        return css`
        .casy-section-wrap {
            line-height: 1.5;
            box-sizing: border-box;
            margin: 0;
            margin-top: 3rem;
            display: grid;
            position: relative;
            padding: 0;
            grid-template-columns: [full-start] minmax(2rem,1fr) [standard-start] 3.75rem [narrow-start] minmax(1rem,67.5rem) [narrow-end] 3.75rem [standard-end] minmax(2rem,1fr) [full-end];
            margin-block: 6rem;
        }
         .casy-image-on-right .casy-image-container {
            grid-column: 2;
        }
        .casy-image-on-right .casy-sticky-item {
            grid-column: 1;
        }
        .casy-main-container{
            line-height: 1.5;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            grid-column: standard;
            gap: 4rem;
            display: grid;
            grid-gap: 4rem;
            grid-auto-rows: minmax(100vh,max-content);
            align-items: center;
            grid-template-columns: 1fr 1fr;
            margin-bottom: -10vh;
        }
        .casy-image-container {
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
        .casy-image {
            border-radius: 8px;
            box-shadow: 0 13px 27px -5px #32325d40, 0 8px 16px -8px #0000004d, 0 -6px 16px -6px #00000008;
        }
        .casy-sticky-item{
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

    // add constructor with super() to avoid error

    constructor() {
        super()
    }

    // add flag "useLightDom" to createRenderRoot() for using light dom instead of shadow dom

    createRenderRoot() {
        return this.useLightDom ? this : super.createRenderRoot()
    }

    // add foundation to the window object on first update

    firstUpdated() {
        window.$(document).foundation()
    }

    // render the component html 

    render() {
        // use the styles from the static get styles() method
        return html`
            <style>
            ${StickyCard.styles}
            </style>
            <div class="casy-section-wrap ${this.imageRight ? 'casy-image-on-right': ''}">
                <div class="casy-main-container">
                <div class="casy-image-container">
                    <img class="casy-image" src="${this.imageSrc}" alt="${this.imageAlt}" />
                </div>
                    ${this.textItems.map(
                    (item: { title: String, text: String }) =>
                        html`
                        <div class="casy-sticky-item">
                            <h2>${item.title}</h2>
                            <p>${item.text}</p>
                        </div>
                        `,
                    )}
                </div>
            </div>
        `
    }
}

