<template>
  <div class="box">
    <p class="title is-5">Copy this code and embed it at the end of your blog post</p>
    <div class="content">
      <p>Click to copy CTA embed code and styles and then paste them into the <strong>source code</strong> view of your blog's editor</p>
    </div>
    <!-- EMBED CODE -->
    <div class="embedCopy">
      <pre><code v-text="embedCode"></code></pre>
      <a class="embedCopyButton">Copy</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'embeder',
    computed: {
      embedCode: function () {
        const headline = this.cta.headline
        const description = this.cta.description
        const hasImage = this.hasImage
        const radius = this.cta.ctaSS.cta.borderRadius
        const color = this.cta.ctaSS.cta.color.hex
        const bgColor = this.cta.ctaSS.cta.backgroundColor.hex

        const imageUrl = this.cta.imageUrl
        const imageAlt = this.cta.imageAlt

        let ctaBody = ''
        if (hasImage) {
          ctaBody = `    <div class="ctaColumns">\n` +
                    `        <div class="ctaColumn ctaImage">\n` +
                    `            <img src="${imageUrl}" alt="${imageAlt}">\n` +
                    `        </div>\n` +
                    `        <div class="ctaColumn">\n` +
                    `            <div class="ctaHeadline" style="color: ${color};">${headline}</div>\n` +
                    `            <div class="ctaDescription" style="color: ${color};">${description}</div>\n` +
                    `            ${this.buttonEmbedCode}\n` +
                    `        </div>\n` +
                    `    </div>\n`
        } else {
          ctaBody = `    <div class="ctaHeadline" style="color: ${color};">${headline}</div>\n` +
                    `    <div class="ctaDescription" style="color: ${color};">${description}</div>\n` +
                    `    ${this.buttonEmbedCode}\n`
        }

        return `<script>function load(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("link");return n.type="text/css",n.rel="stylesheet",n.href=e,t.appendChild(n),n}load('https://unpkg.com/cta.css');${this.fontStylesheet}<\/script>\n` + // eslint-disable-line no-useless-escape
               `<div class="cta" style="${this.fontFamily}border-radius: ${radius}px; ${this.backgroundImageAndOverlay}background-color: ${bgColor};">\n` +
               `${ctaBody}` +
               `</div`
      },
      buttonEmbedCode: function () {
        const style = this.ctaStyle

        const hubl = this.hubl
        const url = this.cta.buttonUrl
        const text = this.cta.buttonText
        const color = this.cta.ctaSS.button.color.hex
        const bgColor = this.cta.ctaSS.button.backgroundColor.hex

        if (style === 'hubspot') {
          return `<div class="ctaButton hubl" style="background-color: ${bgColor}; color: ${color}">${hubl}</div>`
        } else {
          return `<a class="ctaButton" href="${url}" target="_blank" style="background-color: ${bgColor}; color: ${color}">${text}</a>`
        }
      },
      backgroundImageAndOverlay: function () {
        if (this.hasBackgroundImage) {
          const {r, g, b} = this.cta.ctaSS.cta.imageOverlay.rgba
          const a = this.cta.ctaSS.cta.imageOverlay.a
          const img = this.cta.ctaSS.cta.backgroundImage

          return `background-image: linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a})), url('${img}'); `
        } else {
          return ''
        }
      },
      fontFamily: function () {
        const font = this.cta.ctaSS.fontFamily
        if (font) {
          if (font === 'Roboto Mono') {
            return `font-family: '${font}', monospace; `
          } else if (font === 'Crimson Text') {
            return `font-family: '${font}', serif; `
          } else if (font === 'Indie Flower') {
            return `font-family: '${font}', cursive; `
          } else if (font === 'serif' || font === 'sans-serif' || font === 'monospace') {
            return `font-family: '${font}'; `
          } else {
            return `font-family: '${font}', sans-serif; `
          }
        } else {
          return ''
        }
      },
      fontStylesheet: function () {
        const font = this.cta.ctaSS.fontFamily
        if (font) {
          const beginStylesheet = `load('https://fonts.googleapis.com/css?family=`
          const endStylesheet = `');`
          const googleFontsArray = [
            'Open Sans',
            'Lato',
            'Indie Flower',
            'Hind',
            'Crimson Text',
            'Roboto Mono',
            'Roboto',
            'Work Sans'
          ]
          for (let i = 0; i < googleFontsArray.length; i++) {
            if (font === googleFontsArray[i]) {
              return beginStylesheet + font.replace(' ', '+') + endStylesheet
            }
          }
        } else {
          return ''
        }
      }
    },
    props: {
      ctaStyle: String,
      hubl: String,
      hasBackgroundImage: Boolean,
      hasImage: Boolean,
      cta: {
        type: Object,
        required: true,
        default: function () {
          return {
            headline: null,
            description: null,
            buttonText: null,
            buttonUrl: null,
            imageUrl: null,
            imageAlt: null,
            ctaSS: {
              fontFamily: null,
              cta: {
                borderRadius: 4,
                backgroundImage: null,
                imageOverlay: {
                  hex: null,
                  rgba: {
                    r: null,
                    g: null,
                    b: null,
                    a: null
                  },
                  a: null
                },
                backgroundColor: {
                  hex: null
                },
                color: {
                  hex: null
                }
              },
              button: {
                backgroundColor: {
                  hex: null
                },
                color: {
                  hex: null
                }
              }
            }
          }
        }
      }
    }
  }
</script>
