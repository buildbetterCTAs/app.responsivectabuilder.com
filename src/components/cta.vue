<template>
  <div>
    <bar :width="true" :value="0"></bar>
    <div :style="{ borderRadius: cta.ctaSS.cta.borderRadius + 'px', backgroundColor: cta.ctaSS.cta.backgroundColor }" class="cta">
      <div>
        <div @click="focusOnInput('headline')" v-bind:class="{ editable: isEditable }" class="ctaHeadline" :style="{ color: cta.ctaSS.cta.color }">
          <div class="editOverlay" v-if="isEditable"></div>
          {{ cta.headline }}
        </div>
      </div>
      <div>
        <div @click="focusOnInput('description')" v-bind:class="{ editable: isEditable }" class="ctaDescription" :style="{ color: cta.ctaSS.cta.color }">
          <div class="editOverlay" v-if="isEditable"></div>
          {{ cta.description }}
        </div>
      </div>
      <div>
        <div @click="focusOnInput('buttonText')" v-if="!cta.hubspotCta" v-bind:class="{ editable: isEditable }" class="ctaButton" :style="cta.ctaSS.button">
          <div class="editOverlay" v-if="isEditable"></div>
          {{ cta.buttonText }}
        </div>
        <div v-else class="ctaButton hubl" :style="cta.ctaSS.button"><span v-text="hubl"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import bar from '../components/bar'

  export default {
    name: 'cta',
    components: {
      bar
    },
    props: {
      isEditable: Boolean,
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

      // console.log('CTA Width: ' + width)

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
  background-image: url("../assets/edit.svg")
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
