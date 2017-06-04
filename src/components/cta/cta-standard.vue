<template>
  <div>
    <bar :value="sliderVal || displayElementWidth"></bar>
    <div class="cta"
      :style="{
        borderRadius: cta.ctaSS.cta.borderRadius + 'px',
        backgroundColor: cta.ctaSS.cta.backgroundColor,
        backgroundImage: 'linear-gradient(rgba(' +
                          cta.ctaSS.cta.imageOverlay.rgba.r + ', ' +
                          cta.ctaSS.cta.imageOverlay.rgba.g + ', ' +
                          cta.ctaSS.cta.imageOverlay.rgba.b + ', ' +
                          cta.ctaSS.cta.imageOverlay.a +
                        '), rgba('+
                          cta.ctaSS.cta.imageOverlay.rgba.r + ', ' +
                          cta.ctaSS.cta.imageOverlay.rgba.g + ', ' +
                          cta.ctaSS.cta.imageOverlay.rgba.b + ', ' +
                          cta.ctaSS.cta.imageOverlay.a +
                        ')), url(' + cta.ctaSS.cta.backgroundImage + ')',
        fontFamily: cta.ctaSS.fontFamily
      }"
    >
      <div>
        <div class="ctaHeadline"
          :class="{ editable: isEditable }"
          :style="{ color: cta.ctaSS.cta.color.hex }"
          @click="focusOnInput('headline')"
        >
          <div class="editOverlay" v-if="isEditable"></div>
          {{ cta.headline }}
        </div>
      </div>
      <div>
        <div class="ctaDescription"
          :class="{ editable: isEditable }"
          :style="{ color: cta.ctaSS.cta.color.hex }"
          @click="focusOnInput('description')"
        >
          <div class="editOverlay" v-if="isEditable"></div>
          {{ cta.description }}
        </div>
      </div>
      <div>
        <div class="ctaButton"
          :class="{ editable: isEditable }"
          :style="{
            color: cta.ctaSS.button.color.hex,
            backgroundColor: cta.ctaSS.button.backgroundColor.hex
          }"
          @click="focusOnInput('buttonText')"
        >
          <div class="editOverlay" v-if="isEditable"></div>
          {{ cta.buttonText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bar from '../ui/bar'

  export default {
    name: 'cta-standard',
    components: {
      bar
    },
    data: function () {
      return {
        displayElementWidth: 0
      }
    },
    props: {
      sliderVal: [String, Number],
      isEditable: Boolean,
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
                borderRadius: null,
                backgroundImage: null,
                imageOverlay: null,
                backgroundColor: null,
                color: null
              },
              button: {
                backgroundColor: null,
                color: null
              }
            }
          }
        }
      }
    },
    methods: {
      focusOnInput: function (name) {
        document.getElementsByName(name)[0].focus()
      }
    },
    mounted: function () {
      const mediumScreen = 768
      const smallScreen = 600
      const smallerScreen = 425
      const tinyScreen = 320
      const classes = this.$el.classList

      let width = this.$el.clientWidth

      // Pass element width of CTA to the bars component
      this.displayElementWidth = width

      if (width <= mediumScreen) {
        classes.add('mediumAndDown')
      }
      if (width <= smallScreen) {
        classes.add('smallAndDown')
      }
      if (width <= smallerScreen) {
        classes.add('smallerAndDown')
      }
      if (width <= tinyScreen) {
        classes.add('tinyAndDown')
      }
    }
  }
</script>

<style lang="sass" scoped>
//******************
// CTA EMBED STYLES
//******************

// VARS
$buttonHeight: 40px
$buttonHeightLarge: 54px

$mediumScreen: 768px
$smallScreen: 600px
$smallerScreen: 425px
$tinyScreen: 320px

$mediumAndDown: "only screen and (max-width : #{$mediumScreen})" !default
$smallAndDown: "only screen and (max-width : #{$smallScreen})" !default
$smallerAndDown: "only screen and (max-width : #{$smallerScreen})" !default
$tinyAndDown: "only screen and (max-width : #{$tinyScreen})" !default

// STYLES
.cta
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  border-radius: 4px
  box-sizing: border-box
  margin-bottom: 1rem
  margin-top: 1rem
  padding: 48px
  width: 100%

  @media #{$mediumAndDown}
    padding: 40px
  @media #{$smallAndDown}
    padding: 32px
  @media #{$smallerAndDown}
    padding: 24px
  @media #{$tinyAndDown}
    padding: 18px


.ctaHeadline
  display: block
  font-size: 40px
  font-weight: bold
  line-height: 1.3
  margin-bottom: 16px
  margin-top: 0

  @media #{$mediumAndDown}
    font-size: 36px
  @media #{$smallAndDown}
    font-size: 32px
  @media #{$smallerAndDown}
    font-size: 28px
  @media #{$tinyAndDown}
    font-size: 24px


.ctaDescription
  display: block
  font-size: 20px
  font-weight: normal
  margin-bottom: 16px

  @media #{$smallerAndDown}
    font-size: 18px


.ctaButton
  border-radius: 2px
  display: inline-block
  font-size: 16px
  font-weight: bold
  height: $buttonHeight
  letter-spacing: .5px
  line-height: $buttonHeight
  padding: 0 32px
  text-decoration: none
  text-transform: uppercase

  &.hubl
    span
      font-size: 16px
      line-height: $buttonHeight
      text-transform: initial

  @media #{$mediumAndDown}
    height: $buttonHeightLarge
    line-height: $buttonHeightLarge
    margin-top: 8px

  @media #{$smallAndDown}
    height: auto
    line-height: 2
    padding: 8px 0
    text-align: center
    width: 100%

//******************
// JS MEDIA QUERIES
//******************

// Medium & Down
.mediumAndDown
  .cta
    padding: 40px

  .ctaHeadline
    font-size: 36px

  .ctaButton
    height: $buttonHeightLarge
    line-height: $buttonHeightLarge
    margin-top: 8px

// Small & Down
.smallAndDown
  .cta
    padding: 32px

  .ctaHeadline
    font-size: 30px

  .ctaButton
    height: auto
    line-height: 2
    padding: 8px 0
    text-align: center
    width: 100%

// Smaller & Down
.smallerAndDown
  .cta
    padding: 24px

  .ctaHeadline
    font-size: 28px

  .ctaDescription
    font-size: 18px

// Tiny & Down
.tinyAndDown
  .cta
    padding: 16px

  .ctaHeadline
    font-size: 24px

//*****************
// EDITABLE STYLES
//*****************

$white: #fff
$overlay: rgba($white, .54)

.editable
  display: inline-block
  position: relative

.editOverlay
  background-color: $overlay
  background-image: url("../../assets/edit.svg")
  background-position: center
  background-repeat: no-repeat
  background-size: auto calc(100% - 8px)
  bottom: 0
  cursor: pointer
  left: 0
  opacity: 0
  position: absolute
  right: 0
  top: 0
  transition: opacity .2s ease-out

  &:hover
    opacity: 1

</style>
