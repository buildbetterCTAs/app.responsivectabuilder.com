<template>
  <div class="embedCopy"><pre><code>{{ fontStylesheet }}&lt;link rel="stylesheet" href="https://unpkg.com/responsive-cta-builder-css"&gt;
  &lt;div class="cta" style="{{ fontFamily }}border-radius: {{ cta.ctaSS.cta.borderRadius + 'px' }}; background-color: {{ cta.ctaSS.cta.backgroundColor.hex }};"&gt;
      &lt;div class="ctaHeadline" style="color: {{ cta.ctaSS.cta.color.hex }};"&gt;{{ cta.headline }}&lt;/div&gt;
      &lt;div class="ctaDescription" style="color: {{ cta.ctaSS.cta.color.hex }};"&gt;{{ cta.description }}&lt;/div&gt;
      &lt;a class="ctaButton" href="{{ cta.buttonUrl }}" target="_blank" style="background-color: {{ cta.ctaSS.button.backgroundColor }}; color: {{ cta.ctaSS.button.color }};"&gt;{{ cta.buttonText }}&lt;/a&gt;
  &lt;/div&gt;</code></pre>
    <a class="embedCopyButton">Copy</a>
  </div>
</template>

<script>
  export default {
    name: 'embeder',
    computed: {
      fontFamily: function () {
        let font = this.cta.ctaSS.fontFamily
        if (font) {
          if (font === 'Roboto Mono') {
            return `font-family: '` + font + `', monospace; `
          } else if (font === 'Crimson Text') {
            return `font-family: '` + font + `', serif; `
          } else if (font === 'Indie Flower') {
            return `font-family: '` + font + `', cursive; `
          } else if (font === 'serif' || font === 'sans-serif' || font === 'monospace') {
            return `font-family: '` + font + `'; `
          } else {
            return `font-family: '` + font + `', sans-serif; `
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
      hubl: String,
      cta: {
        type: Object,
        required: true,
        default: function () {
          return {
            headline: '',
            description: '',
            buttonText: '',
            buttonUrl: '',
            hubspotCta: false,
            ctaSS: {
              fontFamily: '',
              cta: {
                borderRadius: '',
                backgroundColor: '',
                color: ''
              },
              button: {
                backgroundColor: '',
                color: ''
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
$white: #fff
$black: #000
$grey300: #e0e0e0
$grey400: #bdbdbd
$grey500: #9e9e9e

// Embed Section
.embedCopy
  position: relative

  &:not(:last-child)
    margin-bottom: 16px

  .embedCopyButton
    background-color: $grey400
    border-radius: 4px 0 0
    bottom: 0
    color: $white
    cursor: pointer
    font-size: 14px
    font-weight: bold
    padding: 2px 10px
    position: absolute
    right: 0

    &:hover
      background-color: $grey500
</style>
