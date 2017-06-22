<template>
  <div :class="responsiveClass">
    <bar :value="displayElementWidth"></bar>

    <div v-if="hasBackgroundImage" class="cta"
      :style="{
        borderRadius: cta.ctaSS.cta.borderRadius + 'px',
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
        backgroundColor: cta.ctaSS.cta.backgroundColor.hex,
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
        <span v-if="ctaStyle === 'hubspot'">
          <div class="ctaButton hubl"
            :style="{
              color: cta.ctaSS.button.color.hex,
              backgroundColor: cta.ctaSS.button.backgroundColor.hex
            }"
          >
            <span v-text="hubl"></span>
          </div>
        </span><span v-else>
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
        </span>
      </div>
    </div>

    <div v-else class="cta"
      :style="{
        borderRadius: cta.ctaSS.cta.borderRadius + 'px',
        backgroundColor: cta.ctaSS.cta.backgroundColor.hex,
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
        <span v-if="ctaStyle === 'hubspot'">
          <div class="ctaButton hubl"
            :style="{
              color: cta.ctaSS.button.color.hex,
              backgroundColor: cta.ctaSS.button.backgroundColor.hex
            }"
          >
            <span v-text="hubl"></span>
          </div>
        </span><span v-else>
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
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import bar from './ui/bar'

  export default {
    name: 'cta',
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
      hasBackgroundImage: Boolean,
      hubl: String,
      ctaStyle: String,
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
    computed: {
      responsiveClass () {
        const mediumScreen = 768
        const smallScreen = 600
        const smallerScreen = 425
        const tinyScreen = 320

        const width = this.displayElementWidth

        if (width > mediumScreen) {
          return ''
        } else if (width > smallScreen) {
          return 'medium'
        } else if (width > smallerScreen) {
          return 'small'
        } else if (width > tinyScreen) {
          return 'smaller'
        } else {
          return 'tiny'
        }
      }
    },
    methods: {
      focusOnInput: function (name) {
        document.getElementsByName(name)[0].focus()
      },
      calcWidth: function () {
        this.displayElementWidth = this.$el.clientWidth
      }
    },
    mounted () {
      this.calcWidth()
      window.addEventListener('resize', () => {
        this.calcWidth()
      })
    },
    watch: {
      sliderVal: function () {
        this.calcWidth()
      }
    }
  }
</script>

<style lang="sass" scoped>
//******************
// CTA EMBED STYLES
//******************

@import "~cta.css"

//******************
// JS MEDIA QUERIES
//******************

// Medium & Down
.medium,
.small,
.smaller,
.tiny
  .cta
    padding: 40px

  .ctaHeadline
    font-size: 36px

  .ctaButton
    height: 54px
    line-height: 54px
    margin-top: 8px

// Small & Down
.small,
.smaller,
.tiny
  .cta
    padding: 32px

  .ctaHeadline
    font-size: 30px

  .ctaButton
    height: auto
    line-height: 2
    padding: 8px
    text-align: center
    width: 100%

// Smaller & Down
.smaller,
.tiny
  .cta
    padding: 24px

  .ctaHeadline
    font-size: 28px

  .ctaDescription
    font-size: 18px

// Tiny & Down
.tiny
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
  background-size: 32px
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
