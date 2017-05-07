<template>
  <div id="app">
    <!-- APPLICATION HEADER -->
    <section class="section">
      <div class="container">
        <img src="./assets/wordmark.svg" alt="Logo">
        <div class="field" style="margin-top: 16px">
          <p class="control">
            <span class="select">
              <select v-model="ctaStyle">
                <option value="standard">Standard</option>
                <option value="standardImage">Standard & Image</option>
                <option value="backgroundImage">Background Image</option>
              </select>
            </span>
          </p>
        </div>
        <!-- <div>
          <div v-if="ctaStyle === 'standard'">standard</div>
          <div v-else-if="ctaStyle === 'standardImage'">standardImage</div>
          <div v-else-if="ctaStyle === 'backgroundImage'">backgroundImage</div>
        </div> -->
      </div>
    </section>

    <!-- CTA PREVIEW AND WIDTH SLIDER -->
    <div class="container">
      <div :style="{ maxWidth: ctaWidth + 'px' }" style="margin: 0 auto;">
        <bar :width='true' :value="ctaWidth"></bar>
        <cta :hubl="hublCta" :cta="cta"></cta>
      </div>
      <!-- CTA WIDTH SLIDER -->
      <div class="ctaWidthSlider">
        <input type="range" v-model="ctaWidth" value="840" min="250" max="840">
      </div>
    </div>

    <!-- EDITOR -->
    <div class="container">
      <div class="tabs is-centered is-fullwidth is-marginless">
        <ul>
          <li data-tab="text" class="is-active"><a>1. Text</a></li>
          <li data-tab="style"><a>2. Style</a></li>
          <li data-tab="link"><a>3. Link</a></li>
          <li data-tab="embed"><a>4. Embed</a></li>
        </ul>
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
          <!-- <div class="has-text-right">
            <a data-tab="style" class="button is-primary">Next</a>
          </div> -->
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
                      <input class="borderRadiusSlider" type="range" v-model="cta.ctaSS.cta.borderRadius" min="0" max="32">
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
          <!-- <div class="has-text-right">
            <a data-tab="link" class="button is-primary">Next</a>
          </div> -->
        </div>
        <!-- LINK -->
        <div id="link" class="tab">
          <div class="box">
            <div class="columns">
              <div class="column is-one-quarter has-text-centered" style="align-self: center">
                <p class="title is-5">Add a link or connect this CTA to a HubSpot Call-to-action</p>
              </div>
              <div class="column">
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">URL</label>
                      <p class="control">
                        <input class="input" type="url" placeholder="Placeholder" v-model="cta.buttonUrl">
                      </p>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">
                        <b-tooltip label='After making a HubSpot CTA, open the "Details" view and copy the page URL, then paste the URL below' dashed animated multilined>HubSpot CTA</b-tooltip>
                      </label>
                      <p class="control">
                        <input class="input" type="url" placeholder="Paste HubSpot CTA URL" v-model="cta.hubspotCtaUrl">
                      </p>
                    </div>
                    <div class="field">
                      <b-switch v-model="cta.hubspotCta" :disabled="!cta.hubspotCtaUrl">Enable</b-switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="has-text-right">
            <a data-tab="embed" class="button is-primary">Next</a>
          </div> -->
        </div>
        <!-- EMBED -->
        <div id="embed" class="tab">
          <div class="box">
            <p class="title is-5">Copy this code and embed it at the end of your blog post</p>
            <div class="content">
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

    <!-- CTA MULTIPLE WIDTH PREVIEW -->
    <div class="container">
      <div style="margin: 48px 0 32px 0;">
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
          headline: 'This is a powerful, eye-catching headline',
          description: 'This is your secondary text that might explain why your reader should follow your call-to-action.',
          buttonText: 'click here, reader!',
          buttonUrl: 'https://www.responsivectabuilder.com',
          hubspotCta: false,
          hubspotCtaUrl: '',
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
    computed: {
      hublCta: function () {
        let id = this.cta.hubspotCtaUrl.replace(/https:\/\/app\.hubspot\.com\/cta\/.{6}\//, '')
        let hubl = `{{ cta('` + id + `') }}`

        return hubl
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
$picton: #48a7f9
$dodger: #1385e8
$yale: #0e589a

$white: #fff
$black: #000
$grey300: #e0e0e0
$grey400: #bdbdbd
$grey500: #9e9e9e

$primary: $dodger

// OVERWRITE BULMA'S DEFAULT GRID WIDTH
$grid: 1000px
$widescreen: $grid
$fullhd: $grid

@import "~bulma"
@import "~buefy/src/scss/buefy"


$dots: 580px

// STYLES

.tab
  display: none

  .title
    line-height: 1.3

  &.active
    display: block

  .box
    border-radius: 0 0 5px 5px

.tabs
  ul,
  a
    border-bottom: 1px solid transparent

.borderRadiusSlider
  height: 32px
  margin-right: 8px

  & + p
    display: inline-block
    line-height: 32px
    position: absolute

.ctaWidthSlider
  margin: 0 auto
  max-width: 1000px

  input
    &[type="range"]
      width: 100%

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
