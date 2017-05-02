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
                      <!-- <option value="backgroundImage">Background Image</option> -->
                    </select>
                  </span>
                </p>
              </div>
            </div>
            <!-- <div class="level-item has-text-centered">
              <a href="http://responsivectabuilder.com"><img src="./assets/logo.svg" alt="Responsive CTA Builder"></a>
            </div> -->
            <!-- <div class="level-right">
              <div class="level-item">
                <a class="button is-primary">Get Embed Code</a>
              </div>
            </div> -->
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
        <!-- BARS -->
        <bar></bar>
        <!-- /BARS -->
        <cta :cta="cta"></cta>
      </div>
      <!-- CTA WIDTH SLIDER -->
      <div class="ctaWidthRangeSlider">
        <input type="range" v-model="ctaWidth" value="1000" min="250" max="1000">
      </div>

      <!-- EDIT BOXES -->
      <div class="boxes">
        <div class="container">
          <div class="numberTabs">
            <div class="columns">
              <div class="column">
                <div data-tab="text" class="circle is-active">1</div>
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
        </div>
        <div class="tabs-content">
          <!-- TEXT -->
          <div id="text" class="tab active">
            <div class="box">
              <p class="title is-5">Add text to your CTA</p>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Headline</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.headline">
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Summary</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.description">
                    </p>
                  </div>
                </div>
                <div class="column">
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
              <p class="title is-5">Now customize the look & feel of your CTA</p>
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
                    <label class="label">Text Color</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.ctaSS.cta.color">
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Border Radius</label>
                    <div class="">
                      <input class="rangeWithText" type="range" v-model="cta.ctaSS.cta.borderRadius" min="0" max="32">
                      <p>{{ cta.ctaSS.cta.borderRadius + 'px' }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-one-quarter">
                  <div class="field">
                    <label class="label">Button Color</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.ctaSS.button.backgroundColor">
                    </p>
                  </div>
                </div>
                <div class="column is-one-quarter">
                  <div class="field">
                    <label class="label">Button Text Color</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Placeholder" v-model="cta.ctaSS.button.color">
                    </p>
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
              <p class="title is-5">Add a link or connect this CTA to a HubSpot Call-to-action</p>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">URL</label>
                    <p class="control">
                      <input class="input" type="url" placeholder="Placeholder" v-model="cta.buttonUrl">
                    </p>
                  </div>
                </div>
                <!-- <div class="column">
                  <div class="field">
                    <label class="label">HubSpot CTA ID</label>
                    <p class="control">
                      <input class="input" type="url" placeholder="Placeholder" v-model="cta.hubspotCtaId">
                    </p>
                  </div>
                  <div class="field">
                    <b-switch v-model="cta.hubspotCta"></b-switch>
                  </div>
                </div> -->
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
&lt;div style="border-radius: {{ cta.ctaSS.cta.borderRadius + 'px' }}; background-color: {{ cta.ctaSS.cta.backgroundColor }};" class="cta"&gt;
  &lt;div class="cta__headline" style="color: {{ cta.ctaSS.cta.color }};"&gt;{{ cta.headline }}&lt;/div&gt;
  &lt;div class="cta__description" style="color: {{ cta.ctaSS.cta.color }};"&gt;{{ cta.description }}&lt;/div&gt;
  &lt;a class="cta__button" style="background-color: {{ cta.ctaSS.button.backgroundColor }}; color: {{ cta.ctaSS.button.color }};" href="{{ cta.buttonUrl }}" target="_blank"&gt;{{ cta.buttonText }}&lt;/a&gt;
&lt;/div&gt;</code></pre>
                <a class="embedCopyButton">Copy</a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          hubspotCtaId: "{{ cta('" + 2136218358721375 + ")}}",
          ctaSS: {
            cta: {
              borderRadius: 8,
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

<style lang="scss">
  // BRAND COLORS
  $primaryColorLight: #48A7F9;
  $primaryColor: #1385E8;
  $primaryColorDark: #0E589A;

  $primary: $primaryColor;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>

<!-- BARS -->
<style lang="sass">
  $widthBarStroke: 2px solid rgba(black, 0.12)

  .bars
    width: 100%
    border-right: $widthBarStroke
    border-left: $widthBarStroke
    height: 18px
    line-height: 18px
    text-align: center
    position: relative

    span
      color: rgba(black, 0.38)
      background-color: white
      padding: 0 8px
      font-weight: 500

    &:after
      content: ""
      position: absolute
      z-index: -1
      top: calc(50% - 1px)
      border-top: $widthBarStroke
      width: 100%
      bottom: 0
      left: 50%
      transform: translate(-50%)
</style>

<!-- BUILDER -->
<style lang="sass">
  $primaryColorLight: #48A7F9
  $primaryColor: #1385E8
  $primaryColorDark: #0E589A

  .widthPreview
    margin-bottom: 32px

  .rangeWithText
    height: 32px
    margin-right: 8px

    & + p
      position: absolute
      line-height: 32px
      display: inline-block

  .numberTabs
    margin-bottom: 32px
    p
      margin-top: 8px

  .circle
    height: 32px
    width: 32px
    background-color: #E0E0E0
    border-radius: 16px
    margin: 0 auto
    font-size: 18px
    text-align: center
    line-height: 32px
    font-weight: bold
    cursor: pointer

    &.is-active
      background-color: $primaryColorDark
      color: white

  .ctaWidthRangeSlider
    margin: 32px auto
    max-width: 1000px
    width: 100%
    input[type="range"]
      width: 100%

  .boxes
    margin-bottom: 32px

  .embedCopy
    position: relative

    &:not(:last-child)
      margin-bottom: 16px

    .embedCopyButton
      border-radius: 4px 0 0 0
      cursor: pointer
      background-color: #bdbdbd
      color: #fff
      font-weight: bold
      font-size: 14px
      padding: 2px 10px
      position: absolute
      bottom: 0
      right: 0

      &:hover
        background-color: #9e9e9e

  .tab
    display: none

    &.active
      display: block
</style>
