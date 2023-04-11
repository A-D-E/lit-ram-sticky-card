# Sticky Card Component

Sticky Card is a web component that creates a responsive and adaptable sticky card layout. It utilizes the Lit library and is easy to integrate into existing web applications.

## Features

- Easy integration into existing projects
- Responsive design (todo)
- Customizable text and image content
- Support for Light DOM and Shadow DOM

## Installation

To use the Sticky Card component in your project, install it via npm:

```sh
npm install --save sticky-card
```

## Usage

Import the Sticky Card component and register it as a custom element in your project:

```javascript
import 'sticky-card';
```

## Use the custom sticky-card element in your HTML markup:

```html
<sticky-card 
use-light-dom
image-right 
image-src="path/to/image.jpg" 
image-alt="Alternative Text" 
text-items="[
      { "title": "Title 1", "text": "Text 1" },
      { "title": "Title 2", "text": "Text 2" }
    ]"
></sticky-card>
```
## API

### Properties:

  <ul><li><code>imageRight</code>: Moves the image to the right if <code>true</code>. Default value is <code>false</code>.</li><li><code>imageSrc</code>: Path to the image file.</li><li><code>imageAlt</code>: Alternative text for the image.</li><li><code>textItems</code>: An array of objects containing title and text for each section of the card.</li><li><code>useLightDom</code>: Uses Light DOM instead of Shadow DOM if <code>true</code>. Default value is <code>false</code>.</li></ul>

  

# License

This project is licensed under the MIT License. For more information, please see the LICENSE file.