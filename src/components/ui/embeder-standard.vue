<template>
  <div class="box">
    <p class="title is-5">Copy this code and embed it at the end of your blog post</p>
    <div class="content">
      <p>Click to copy CTA embed code and styles and then paste them into the <strong>source code</strong> view of your blog's editor</p>
    </div>
<div class="embedCopy"><pre><code>{{ fontStylesheet }}&lt;link rel="stylesheet" href="https://unpkg.com/cta.css"&gt;
&lt;div class="cta" style="{{ fontFamily }}border-radius: {{ cta.ctaSS.cta.borderRadius + 'px' }}; <span v-if="hasBackgroundImage">{{ backgroundImageAndOverlay }} </span>background-color: {{ cta.ctaSS.cta.backgroundColor.hex }};"&gt;
    &lt;div class="ctaHeadline" style="color: {{ cta.ctaSS.cta.color.hex }};"&gt;{{ cta.headline }}&lt;/div&gt;
    &lt;div class="ctaDescription" style="color: {{ cta.ctaSS.cta.color.hex }};"&gt;{{ cta.description }}&lt;/div&gt;
    &lt;a class="ctaButton" href="{{ cta.buttonUrl }}" target="_blank" style="background-color: {{ cta.ctaSS.button.backgroundColor.hex }}; color: {{ cta.ctaSS.button.color.hex }};"&gt;{{ cta.buttonText }}&lt;/a&gt;
&lt;/div&gt;</code></pre>
<a class="embedCopyButton">Copy</a>
</div>
    <div class="content">
      <p>Alternatively if you plan on using many CTAs on your website or blog, add the stylesheet(s) into the <code>&lt;head&gt;</code> section of your website</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'embeder',
    computed: {
      backgroundImageAndOverlay: function () {
        let url = this.cta.ctaSS.cta.backgroundImage
        let r = this.cta.ctaSS.cta.imageOverlay.rgba.r
        let g = this.cta.ctaSS.cta.imageOverlay.rgba.g
        let b = this.cta.ctaSS.cta.imageOverlay.rgba.b
        let a = this.cta.ctaSS.cta.imageOverlay.a

        let bg = `background-image: linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a})), url('${url}');`
        return bg
      },
      fontFamily: function () {
        let font = this.cta.ctaSS.fontFamily
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
        }
      },
      fontStylesheet: function () {
        let font = this.cta.ctaSS.fontFamily
        if (font) {
          const beginStylesheet = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family='
          const endStylesheet = '">\n'
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
        }
      }
    },
    props: {
      hasBackgroundImage: Boolean,
      cta: {
        type: Object,
        required: true,
        default: function () {
          return {
            headline: null,
            description: null,
            buttonText: null,
            buttonUrl: null,
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
