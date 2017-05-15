<template>
  <div id="app">
    <div v-if="authenticated">
      <button @click="logout()" v-show="authenticated">Logout</button>

      <!-- APPLICATION HEADER -->
      <section class="section">
        <div class="container">
          <img src="./assets/wordmark.svg" alt="Logo">
          <div class="field" style="margin-top: 16px">
            <p class="control">
              <span class="select">
                <select v-model="ctaStyle">
                  <option value="standard">Standard</option>
                  <option value="standard">Standard - HubSpot</option>
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
          <cta :isEditable="true" :hubl="hublCta" :cta="cta"></cta>
        </div>
        <!-- CTA WIDTH SLIDER -->
        <div class="ctaWidthSlider">
          <input type="range" v-model="ctaWidth" value="1000" min="250" max="1000">
        </div>
      </div>
      <!-- EDITOR -->
      <div class="container editor">
        <tabs>
          <tab label="1. Text" selected>
            <div class="box">
              <div class="columns">
                <div class="column is-one-quarter" style="align-self: center">
                  <p class="title is-5">Add text to your CTA</p>
                </div>
                <div class="column">
                  <b-field label="Headline" message="We recommend keeping your headline under 70 characters">
                    <b-input @focus="select($event)" id="headline" type="text" maxlength="140" v-model="cta.headline"></b-input>
                  </b-field>
                  <b-field label="Summary" message="We recommend keeping your description under 140 characters">
                    <b-input @focus="select($event)" id="description" type="text" maxlength="140" v-model="cta.description"></b-input>
                  </b-field>
                  <b-field label="Button" message="We recommend keeping your button text under 40 characters">
                    <b-input @focus="select($event)" id="buttonText" type="text" maxlength="40" v-model="cta.buttonText"></b-input>
                  </b-field>
                </div>
              </div>
            </div>
            <!-- <div class="has-text-right">
              <a data-tab="style" class="button is-primary">Next</a>
            </div> -->
          </tab>
          <tab label="2. Style">
            <div class="box">
              <div class="columns">
                <div class="column is-one-quarter" style="align-self: center">
                  <p class="title is-5">Now customize the look & feel of your CTA</p>
                </div>
                <div class="column">
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Background Color</label>
                        <p class="control">
                          <input @focus="select($event)" class="input" type="color" v-model="cta.ctaSS.cta.backgroundColor">
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Border Radius</label>
                        <input @focus="select($event)" class="borderRadiusSlider" type="range" v-model="cta.ctaSS.cta.borderRadius" min="0" max="32">
                        <p>{{ cta.ctaSS.cta.borderRadius + 'px' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <b-field label="Font Family" >
                        <b-select :disabled="ctaFont" v-model="ctaFontFamily" placeholder="Select A Font" expanded>
                          <option selected disabled>Select A Font</option>
                          <option value="sans-serif">Sans Serif</option>
                          <option value="serif">Serif</option>
                          <option value="monospace">Monospace</option>
                        </b-select>
                      </b-field>
                      <b-checkbox v-model="ctaFont"><b-tooltip label='DAN WRITE THE TEXT FOR THIS PLEASE' dashed animated multilined>Automatically use my website's font</b-tooltip></b-checkbox>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Text Color</label>
                        <p class="control">
                          <input @focus="select($event)" class="input" type="color" v-model="cta.ctaSS.cta.color">
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Button Color</label>
                        <p class="control">
                          <input @focus="select($event)" class="input" type="color" v-model="cta.ctaSS.button.backgroundColor">
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Button Text Color</label>
                        <p class="control">
                          <input @focus="select($event)" class="input" type="color" v-model="cta.ctaSS.button.color">
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
          </tab>
          <tab label="3. Link">
            <div class="box">
              <div class="columns">
                <div class="column is-one-quarter" style="align-self: center">
                  <p class="title is-5">Add a link or connect this CTA to a HubSpot Call-to-action</p>
                </div>
                <div class="column">
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">URL</label>
                        <p class="control">
                          <input @focus="select($event)" class="input" type="url" v-model="cta.buttonUrl">
                        </p>
                      </div>
                      <p><small><a target="_blank" :href="cta.buttonUrl">Test your URL</a></small></p>
                    </div>
                    <div class="column">
                      <!-- <div class="field">
                        <label class="label">
                          <b-tooltip label='After making a HubSpot CTA, open the "Details" view and copy the page URL, then paste the URL below' dashed animated multilined>HubSpot CTA</b-tooltip>
                        </label>
                        <p class="control">
                          <input @focus="select($event)" class="input" type="url" placeholder="Paste HubSpot CTA URL" v-model="cta.hubspotCtaUrl">
                        </p>
                      </div>
                      <div class="field">
                        <b-switch v-model="cta.hubspotCta" :disabled="!cta.hubspotCtaUrl">Enable</b-switch>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="has-text-right">
              <a data-tab="embed" class="button is-primary">Next</a>
            </div> -->
          </tab>
          <tab label="4. Embed">
            <div class="box">
              <p class="title is-5">Copy this code and embed it at the end of your blog post</p>
              <div class="content">
                <p>Click to copy CTA embed code and styles and then paste them into the <strong>source code</strong> view of your blog's editor</p>
                <p>Alternatively if you plan on using many CTAs on your website or blog, add the stylesheet into the <code>&lt;head&gt;</code> section of your website</p>
              </div>
              <embeder :cta="cta"></embeder>
            </div>
          </tab>
        </tabs>
      </div>

      <!-- CTA MULTIPLE WIDTH PREVIEW -->
      <div class="container">
        <div style="margin: 48px 0 32px 0;">
          <p class="title is-4">How your CTA will look at different widths:</p>
        </div>
        <div class="columns">
          <div class="column is-two-thirds">
            <cta :cta="cta"></cta>
          </div>
          <div class="column">
            <cta :cta="cta"></cta>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <button @click="login()" v-show="!authenticated">Login</button>
    </div>
  </div>
</template>

<script>
  import cta from './components/cta'
  import tabs from './components/ui/tabs'
  import tab from './components/ui/tab'
  import embeder from './components/ui/embeder'

  export default {
    name: 'app',
    data: function () {
      return {
        ctaStyle: 'standard',
        ctaWidth: 1000,
        ctaFont: false,
        ctaFontFamily: '',
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
        },
        authenticated: false,
        secretThing: '',
        lock: new Auth0Lock('fTi1j_-M7Xoe2bvTMqxLG9p8ewqupq06', 'responsivectabuilder.auth0.com', {
          rememberLastLogin: true,
          theme: {
            'logo': 'https://github.com/buildbetterCTAs/branding/raw/master/img/logo.png',
            'primaryColor': '#1385e8'
          }
        })
      }
    },
    computed: {
      hublCta: function () {
        let id = this.cta.hubspotCtaUrl.replace(/https:\/\/app\.hubspot\.com\/cta\/.{6}\//, '')
        let hubl = `{{ cta('` + id + `') }}`
        return hubl
      }
    },
    ready () {
      var self = this
      this.authenticated = checkAuth()
      this.lock.on('authenticated', (authResult) => {
        console.log('authenticated')
        localStorage.setItem('id_token', authResult.idToken)
        this.lock.getProfile(authResult.idToken, (error, profile) => {
          if (error) {
            // Handle error
            return
          }
          // Set the token and user profile in local storage
          localStorage.setItem('profile', JSON.stringify(profile))
          this.authenticated = true
        })
      })
      this.lock.on('authorization_error', (error) => {
        console.log('Auth Failed')
        // handle error when authorizaton fails
      })
    },
    methods: {
      select: function (event) {
        event.target.select()
      },
      login () {
        this.lock.show()
      },
      logout () {
        // To log out, we just need to remove the token and profile
        // from local storage
        localStorage.removeItem('id_token')
        localStorage.removeItem('profile')
        this.authenticated = false
      }
    },
    components: {
      cta,
      tabs,
      tab,
      embeder
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
$grid: 1136px
$widescreen: $grid
$fullhd: $grid

@import "~bulma"
@import "~buefy/src/scss/buefy"


// STYLES
.container
  &.editor
    max-width: $grid - (128px * 1.5)

    .title
      line-height: 1.3

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
</style>
