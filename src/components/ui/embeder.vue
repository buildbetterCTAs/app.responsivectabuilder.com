<template>
  <div class="embedCopy"><pre><code>&lt;link rel="stylesheet" href="https://unpkg.com/responsive-cta-builder-css"&gt;
  &lt;div class="cta" style="border-radius: {{ cta.ctaSS.cta.borderRadius + 'px' }}; background-color: {{ cta.ctaSS.cta.backgroundColor }};"&gt;
      &lt;div class="ctaHeadline" style="color: {{ cta.ctaSS.cta.color }};"&gt;{{ cta.headline }}&lt;/div&gt;
      &lt;div class="ctaDescription" style="color: {{ cta.ctaSS.cta.color }};"&gt;{{ cta.description }}&lt;/div&gt;
      &lt;a class="ctaButton" href="{{ cta.buttonUrl }}" target="_blank" style="background-color: {{ cta.ctaSS.button.backgroundColor }}; color: {{ cta.ctaSS.button.color }};"&gt;{{ cta.buttonText }}&lt;/a&gt;
  &lt;/div&gt;</code></pre>
    <a class="embedCopyButton">Copy</a>
  </div>
</template>

<script>
  export default {
    name: 'embeder',
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
