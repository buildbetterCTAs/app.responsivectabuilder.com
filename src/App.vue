<template>
  <div id="app">
    <!-- BANNER -->
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="level">
            <div class="level-left">
              <div class="field level-item">
                <p class="control">
                  <span class="select">
                    <select v-model="ctaStyle">
                      <option value="standard">Standard</option>
                      <!-- <option value="standardImage">Standard & Image</option> -->
                      <option value="backgroundImage">Background Image</option>
                    </select>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /BANNER -->

    <div class="container">
      <!-- <div>
        <div v-if="ctaStyle === 'standard'">standard</div>
        <div v-else-if="ctaStyle === 'standardImage'">standardImage</div>
        <div v-else-if="ctaStyle === 'backgroundImage'">backgroundImage</div>
      </div> -->
      <div :style="{ maxWidth: ctaWidth + 'px' }" style="margin: 0 auto;">
        <bar></bar>
        <cta :cta="cta"></cta>
      </div>
      <!-- CTA WIDTH SLIDER -->
      <div class="ctaWidthRangeSlider">
        <input type="range" v-model="ctaWidth" value="1000" min="250" max="1000">
      </div>
    </div>

    <div class="container editor">
      <!-- EDIT BOXES -->
      <div class="boxes">
        <div class="numberTabs">
          <div class="dotLiner"></div>
          <div class="columns is-mobile">
            <div class="column">
              <div data-tab="text" class="circle isActive">1</div>
              <p class="title is-5 has-text-centered">Text</p>
            </div>
            <div class="column">
              <div data-tab="style" class="circle">2</div>
              <p class="title is-5 has-text-centered">Stylize</p>
            </div>
            <div class="column">
              <div data-tab="link" class="circle">3</div>
              <p class="title is-5 has-text-centered">Link</p>
            </div>
            <div class="column">
              <div data-tab="embed" class="circle">4</div>
              <p class="title is-5 has-text-centered">Embed</p>
            </div>
          </div>
        </div>
        <div class="tabs-content">
          <!-- TEXT -->
          <div id="text" class="tab active">
            <div class="box">
              <div class="columns">
                <div class="column is-one-quarter has-text-centered" style="align-self: center">
                  <p class="title is-5">Add text to your CTA</p>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Headline</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.headline">
                    </p>
                  </div>
                  <div class="field">
                    <label class="label">Summary</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.description">
                    </p>
                  </div>
                  <div class="field">
                    <label class="label">Button</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.buttonText">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="has-text-right">
              <a data-tab="style" class="button is-primary">Next</a>
            </div>
          </div>
          <!-- STYLE -->
          <div id="style" class="tab">
            <div class="box">
              <div class="columns">
                <div class="column is-one-quarter has-text-centered" style="align-self: center">
                  <p class="title is-5">Now customize the look & feel of your CTA</p>
                </div>
                <div class="column">
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Background Color</label>
                        <p class="control">
                          <input class="input" type="text" placeholder="Placeholder" v-model="cta.ctaSS.cta.backgroundColor">
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Border Radius</label>
                        <input class="rangeWithText" type="range" v-model="cta.ctaSS.cta.borderRadius" min="0" max="32">
                        <p>{{ cta.ctaSS.cta.borderRadius + 'px' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Font Family</label>
                        <p class="control is-expanded">
                          <span class="select is-fullwidth">
                            <select>
                              <option value="sansSerif">Sans Serif</option>
                              <option value="serif">Serif</option>
                              <option value="monospace">Monospace</option>
                            </select>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Text Color</label>
                        <p class="control">
                          <input class="input" type="text" placeholder="Placeholder" v-model="cta.ctaSS.cta.color">
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Button Color</label>
                        <p class="control">
                          <input class="input" type="text" placeholder="Placeholder" v-model="cta.ctaSS.button.backgroundColor">
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Button Text Color</label>
                        <p class="control">
                          <input class="input" type="text" placeholder="Placeholder" v-model="cta.ctaSS.button.color">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="has-text-right">
              <a data-tab="link" class="button is-primary">Next</a>
            </div>
          </div>
          <!-- LINK -->
          <div id="link" class="tab">
            <div class="box">
              <div class="columns">
                <div class="column is-one-quarter has-text-centered" style="align-self: center">
                  <p class="title is-5">Add a link or connect this CTA to a HubSpot Call-to-action</p>
                </div>
                <div class="column">
                  <div class="column">
                    <div class="field">
                      <label class="label">URL</label>
                      <p class="control">
                        <input class="input" type="url" placeholder="Placeholder" v-model="cta.buttonUrl">
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="has-text-right">
              <a data-tab="embed" class="button is-primary">Next</a>
            </div>
          </div>
          <!-- EMBED -->
          <div id="embed" class="tab">
            <div class="box">
              <p class="title is-5">Copy this code and embed it at the end of your blog post</p>
              <div class="content">
                <!-- <p class="title is-4">Here is your CTA Embed Code!</p> -->
                <p>Click to copy CTA embed code and styles and then paste them into the <strong>source code</strong> view of your blog's editor</p>
                <p>Alternatively if you plan on using many CTAs on your website or blog, add the stylesheet into the <code>&lt;head&gt;</code> section of your website</p>
              </div>
              <div class="embedCopy">
<pre><code>&lt;link rel="stylesheet" href="https://unpkg.com/responsive-cta-builder-css"&gt;
&lt;div class="cta" style="border-radius: {{ cta.ctaSS.cta.borderRadius + 'px' }}; background-color: {{ cta.ctaSS.cta.backgroundColor }};"&gt;
  &lt;div class="ctaHeadline" style="color: {{ cta.ctaSS.cta.color }};"&gt;{{ cta.headline }}&lt;/div&gt;
  &lt;div class="ctaDescription" style="color: {{ cta.ctaSS.cta.color }};"&gt;{{ cta.description }}&lt;/div&gt;
  &lt;a class="ctaButton" href="{{ cta.buttonUrl }}" target="_blank" style="background-color: {{ cta.ctaSS.button.backgroundColor }}; color: {{ cta.ctaSS.button.color }};"&gt;{{ cta.buttonText }}&lt;/a&gt;
&lt;/div&gt;</code></pre>
                <a class="embedCopyButton">Copy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="widthPreview">
        <p class="title is-4">How your CTA will look at different widths:</p>
      </div>
      <div class="columns">
        <div class="column is-two-thirds">
          <bar></bar>
          <cta :cta="cta"></cta>
        </div>
        <div class="column">
          <bar></bar>
          <cta :cta="cta"></cta>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import cta from './components/cta'
  import bar from './components/bar'

  export default {
    name: 'app',
    data: function () {
      return {
        ctaStyle: 'standard',
        ctaWidth: 1000,
        cta: {
          headline: 'This is your headline',
          description: 'This is your secondary information',
          buttonText: 'Button text',
          buttonUrl: 'https://www.responsivectabuilder.com',
          hubspotCta: false,
          hubspotCtaId: '{{ cta(' + 2136218358721375 + ')}',
          ctaSS: {
            cta: {
              borderRadius: 4,
              backgroundColor: '#0E589A',
              color: '#ffffff'
            },
            button: {
              backgroundColor: '#48A7F9',
              color: '#ffffff'
            }
          }
        }
      }
    },
    methods: {},
    components: {
      cta,
      bar
    }
  }
</script>

<style lang="sass">
// VARS
$primaryColorLight: #48a7f9
$primaryColor: #1385e8
$primaryColorDark: #0e589a

$white: #fff
$black: #000
$grey300: #e0e0e0
$grey400: #bdbdbd
$grey500: #9e9e9e

$primary: $primaryColor

@import '~bulma'
@import '~buefy/src/scss/buefy'


// STYLES
.container
  &.editor
    max-width: 1000px

.widthPreview
  margin-bottom: 32px

.rangeWithText
  height: 32px
  margin-right: 8px

  & + p
    display: inline-block
    line-height: 32px
    position: absolute

.numberTabs
  margin: 0 auto 32px
  max-width: 768px

  .columns
    z-index: 0

  .dotLiner
    border-bottom: 2px solid $grey300
    margin: 0 auto
    position: relative
    top: 17px
    width: 600px
    z-index: -1

  p
    margin-top: 8px

.circle
  background-color: $grey300
  border-radius: 16px
  cursor: pointer
  font-size: 18px
  font-weight: bold
  height: 32px
  line-height: 32px
  margin: 0 auto
  text-align: center
  width: 32px

  &.isActive
    background-color: $primaryColorDark
    color: $white

.ctaWidthRangeSlider
  margin: 32px auto
  max-width: 1000px
  width: 100%

  input
    &[type='range']
      width: 100%

.boxes
  margin-bottom: 32px

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

.tab
  display: none

  &.active
    display: block
</style>
