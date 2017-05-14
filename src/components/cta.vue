<template>
  <div :style="{ borderRadius: cta.ctaSS.cta.borderRadius + 'px', backgroundColor: cta.ctaSS.cta.backgroundColor }" class="cta">
    <div v-bind:class="{ editable: isEditable }" class="ctaHeadline" :style="{ color: cta.ctaSS.cta.color }">
      <label for="headline" class="edit" v-if="isEditable"></label>
      {{ cta.headline }}
    </div>
    <div v-bind:class="{ editable: isEditable }" class="ctaDescription" :style="{ color: cta.ctaSS.cta.color }">
      <label for="description" class="edit" v-if="isEditable"></label>
      {{ cta.description }}
    </div>
    <div v-if="!cta.hubspotCta" v-bind:class="{ editable: isEditable }" class="ctaButton" :style="cta.ctaSS.button">
      <label for="buttonText" class="edit" v-if="isEditable"></label>
      {{ cta.buttonText }}
    </div>
    <div v-else class="ctaButton hubl" :style="cta.ctaSS.button"><span v-text="hubl"></span></div>
  </div>
</template>

<script>
  export default {
    name: 'cta',
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
    }
  }
</script>

<style lang="sass" scoped>
// VARS
$buttonHeight: 40px
$buttonHeightLarge: 54px

$mediumScreen: 992px
$smallScreen: 600px
$smallerScreen: 400px
$tinyScreen: 330px

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

  @media #{$smallAndDown}
    padding: 32px
  @media #{$smallerAndDown}
    padding: 24px
  @media #{$tinyAndDown}
    padding: 16px


.ctaHeadline
  display: block
  font-size: 40px
  font-weight: bold
  line-height: 1.3
  margin-bottom: 16px
  margin-top: 0

  @media #{$smallAndDown}
    font-size: 30px
  @media #{$smallerAndDown}
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
    margin-top: 16px

  @media #{$smallAndDown}
    padding: 0
    text-align: center
    width: 100%


// EDITOR STYLES
$white: #fff
$overlay: rgba($white, .54)

.editable
  display: inline-block
  position: relative

.edit
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
