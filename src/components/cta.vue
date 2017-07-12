<template>
  <div :class="responsiveClass">
    <bar :value="displayElementWidth"></bar>
    <div class="rcta_embed"
      :style="{
        borderRadius: cta.ctaSS.cta.borderRadius + 'px',
        /* @TODO: MERGE THESE (backgroundColor & backgroundImage) */
        backgroundImage: backgroundImageWithGradient,
        backgroundColor: cta.ctaSS.cta.backgroundColor.hex,
        fontFamily: cta.ctaSS.fontFamily
      }"
    >
      <div class="rcta_columns">
        <div v-if="hasImage" class="rcta_column rcta_image">
          <img :src="cta.imageUrl" :alt="cta.imageAlt" @click="focusOnInput('imageUrl')">
        </div>
        <div class="rcta_column">
          <div>
            <div class="rcta_headline"
              :class="{ editable: isEditable }"
              :style="{ color: cta.ctaSS.cta.color.hex }"
              @click="focusOnInput('headline')"
            >
              <div class="editOverlay" v-if="isEditable"></div>
              {{ cta.headline }}
            </div>
          </div>
          <div>
            <div class="rcta_description"
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
              <b-tooltip label="Your button will not look like this. To customize the text of your button edit the button text within your HubSpot portal." multilined size="is-large"><div class="rcta_button rcta_button-hubl"
                :style="{
                  color: cta.ctaSS.button.color.hex,
                  backgroundColor: cta.ctaSS.button.backgroundColor.hex
                }"
              >
                <span v-text="hubl"></span>
              </div></b-tooltip>
            </span><span v-else>
              <div class="rcta_button"
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
      hasImage: Boolean,
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
            imageUrl: null,
            imageAlt: null,
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
      backgroundImageWithGradient () {
        if (this.hasBackgroundImage === true) {
          const {r, g, b} = this.cta.ctaSS.cta.imageOverlay.rgba
          const a = this.cta.ctaSS.cta.imageOverlay.a
          const img = this.cta.ctaSS.cta.backgroundImage

          return `linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a})), url('${img}')`
        } else {
          return null
        }
      },
      responsiveClass () {
        const mediumLargeScreen = 800
        const mediumScreen = 768
        const smallScreen = 600
        const smallerScreen = 425
        const tinyScreen = 320

        const width = this.displayElementWidth

        if (width > mediumLargeScreen) {
          return ''
        } else if (width > mediumScreen) {
          return 'mediumLarge'
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
// sass-lint:disable class-name-format

//******************
// CTA EMBED STYLES
//******************

.rcta_embed
  transition: all .2s ease // sass-lint:disable-line no-transition-all

@import "~cta.css"

//******************
// JS MEDIA QUERIES
//******************

// Medium-Large & Down
.mediumLarge,
.medium,
.small,
.smaller,
.tiny
  .rcta_column
    &.rcta_image
      display: none

// Medium & Down
.medium,
.small,
.smaller,
.tiny
  .rcta_embed
    padding: 40px

  .rcta_headline
    font-size: 36px

  .rcta_button
    height: 54px
    line-height: 54px
    margin-top: 8px

// Small & Down
.small,
.smaller,
.tiny
  .rcta_embed
    padding: 32px

  .rcta_headline
    font-size: 30px

  .rcta_button
    height: auto
    line-height: 2
    padding: 8px
    text-align: center
    width: 100%

// Smaller & Down
.smaller,
.tiny
  .rcta_embed
    padding: 24px

  .rcta_headline
    font-size: 28px

  .rcta_description
    font-size: 18px

// Tiny & Down
.tiny
  .rcta_embed
    padding: 16px

  .rcta_headline
    font-size: 24px

// sass-lint:enable class-name-format

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
