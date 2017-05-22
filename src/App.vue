<template>
  <div id="app">
    <section class="hero" v-bind:class="{ 'is-fullheight': !authenticated }">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-left">
              <a href="/" class="nav-item is-brand">
                <img src="./assets/logo.svg" alt="Responsive CTA Builder logo">
              </a>
              <a href="https://www.responsivectabuilder.com" target="_blank" class="nav-item">Home</a>
              <a target="_blank" class="nav-item"><s>Documentation</s></a>
              <a target="_blank" class="nav-item"><s>Blog</s></a>
            </div>

            <div class="nav-right">
              <a class="nav-item">
                <figure class="image profile is-16x16" style="margin-right: 8px;">
                  <img :src="userProfileImage" alt="Profile Image">
                </figure>
                <s>Profile</s>
              </a>
              <div class="nav-item">
                <div class="field is-grouped">
                  <p class="control">
                    <a class="button is-primary" @click="login()" v-show="!authenticated">Login</a>
                    <a class="button is-primary is-outlined" @click="logout()" v-show="authenticated">Logout</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div v-show="!authenticated" class="hero-body">
        <div class="container has-text-centered">
          <p class="title is-4">Log in to begin building your Call-to-Actions</p>
          <div>
            <a class="button is-primary" @click="login()">Login</a>
          </div>
        </div>
      </div>
    </section>

    <div v-if="authenticated">

      <section class="section grey50">
        <div class="container">
          <b-field label="Select CTA Type">
            <b-select v-model="ctaStyle">
              <option value="standard">Standard</option>
              <option value="hubspot">HubSpot</option>
              <option value="backgroundImage">Background Image</option>
            </b-select>
          </b-field>

          <!-- <div v-if="ctaStyle === 'standard'">
            Use Standard CTA Builder
          </div>
          <div v-else-if="ctaStyle === 'hubspot'">
            Use HubSpot CTA Builder
          </div>
          <div v-else-if="ctaStyle === 'backgroundImage'">
            Use Background Image CTA Builder
          </div>
          <div v-else>
            Yolo
          </div> -->
        </div>
      </section>

      <!-- CTA PREVIEW AND WIDTH SLIDER -->
      <div class="container">
        <div :style="{ maxWidth: ctaWidth + 'px' }" style="margin: 0 auto;">
          <cta :isEditable="editable" :cta="cta"></cta>
        </div>
        <!-- CTA WIDTH SLIDER -->
        <div class="ctaWidthSlider">
          <input type="range" v-model="ctaWidth" min="300" :max="1000">
        </div>
      </div>

      <!-- EDITOR -->
      <div class="container editor">
        <b-tabs v-model="activeTab" position="is-centered" :animated="false" expanded>
          <b-tab-item label="1. Text">
            <div class="boxWrapper">
              <div class="box">
                <div class="columns">
                  <div class="column is-one-quarter" style="align-self: center">
                    <p class="title is-5">Add text to your CTA</p>
                  </div>
                  <div class="column">
                    <b-field label="Headline" message="We recommend keeping your description under 100 characters">
                      <b-input @focus="select($event)" name="headline" type="text" maxlength="120" v-model="cta.headline"></b-input>
                    </b-field>
                    <b-field label="Summary" message="We recommend keeping your description under 160 characters">
                      <b-input @focus="select($event)" name="description" type="text" maxlength="180" v-model="cta.description"></b-input>
                    </b-field>
                    <b-field label="Button" message="We recommend keeping your button text under 40 characters">
                      <b-input @focus="select($event)" name="buttonText" type="text" maxlength="60" v-model="cta.buttonText"></b-input>
                    </b-field>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="2. Style">
            <div class="boxWrapper">
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
                            <input class="input inputPicker" readonly
                              @click="showPicker = true"
                              :style="{ borderColor: cta.ctaSS.cta.backgroundColor.hex }"
                              v-model="cta.ctaSS.cta.backgroundColor.hex">
                            <picker class="picker"
                              v-if="showPicker"
                              v-model="cta.ctaSS.cta.backgroundColor"></picker>
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
                          <b-select :disabled="ctaFont" v-model="cta.ctaSS.fontFamily" placeholder="Select A Font" expanded>
                            <optgroup label="Standard">
                              <option value="serif">Serif</option>
                              <option value="sans-serif">Sans Serif</option>
                              <option value="monospace">Monospace</option>
                            </optgroup>
                            <optgroup label="Google Fonts">
                              <option value="'Roboto'">Roboto</option>
                              <option value="'Work Sans'">Work Sans</option>
                            </optgroup>
                          </b-select>
                        </b-field>
                        <b-checkbox v-model="ctaFont"><b-tooltip label='When you embed this CTA on your website, we will automatically pull in your primary font.' dashed multilined>Automatically use my website's font</b-tooltip></b-checkbox>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Text Color</label>
                          <p class="control">
                            <input class="input inputPicker" readonly
                              @click="showPicker = true"
                              :style="{ borderColor: cta.ctaSS.cta.color.hex }"
                              v-model="cta.ctaSS.cta.color.hex">
                            <picker class="picker"
                              v-if="showPicker"
                              v-model="cta.ctaSS.cta.color"></picker>
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
            </div>
          </b-tab-item>
          <b-tab-item label="3. Link">
            <div class="boxWrapper">
              <div class="box">
                <div class="columns">
                  <div class="column is-one-quarter" style="align-self: center">
                    <p class="title is-5">Add a link to your CTA</p>
                  </div>
                  <div class="column">
                    <div class="columns">
                      <div class="column">
                        <div class="field">
                          <label class="label">URL</label>
                          <p class="control">
                            <input @focus="select($event)" class="input" type="url" v-model="cta.buttonUrl">
                          </p>
                          <p class="help">
                            <a target="_blank" :href="cta.buttonUrl">Click here to test your URL</a>
                          </p>
                        </div>
                      </div>
                      <!-- TODO: Move this to its own editor component -->
                      <!-- <div class="column">
                        <div class="field">
                          <label class="label">
                            <b-tooltip label='After making a HubSpot CTA, open the "Details" view and copy the page URL, then paste the URL below' dashed multilined>HubSpot CTA</b-tooltip>
                          </label>
                          <p class="control">
                            <input @focus="select($event)" class="input" type="url" placeholder="Paste HubSpot CTA URL" v-model="hubspotCtaUrl">
                          </p>
                        </div>
                        <div class="field">
                          <b-switch v-model="hubspotCta" :disabled="!hubspotCtaUrl">Enable</b-switch>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="4. Embed">
            <div class="boxWrapper">
              <div class="box">
                <p class="title is-5">Copy this code and embed it at the end of your blog post</p>
                <div class="content">
                  <p>Click to copy CTA embed code and styles and then paste them into the <strong>source code</strong> view of your blog's editor</p>
                </div>
                <embeder :cta="cta"></embeder>
                <div class="content">
                  <p>Alternatively if you plan on using many CTAs on your website or blog, add the stylesheet into the <code>&lt;head&gt;</code> section of your website</p>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
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
  </div>
</template>

<script>
  import cta from './components/cta'
  import embeder from './components/ui/embeder'
  import { Chrome } from 'vue-color'

  export default {
    name: 'app',
    data: function () {
      return {
        userProfileImage: 'https://placehold.it/128x128',
        activeTab: 0,
        showPicker: false,
        ctaStyle: 'standard',
        ctaWidth: 1000,
        ctaFont: false,
        hubspotCta: false,
        hubspotCtaUrl: '',
        cta: {
          headline: 'This is a powerful, eye-catching headline',
          description: 'This is your secondary text that might explain why your reader should follow your call-to-action.',
          buttonText: 'click here, reader!',
          buttonUrl: 'https://www.responsivectabuilder.com',
          ctaSS: {
            fontFamily: '',
            cta: {
              borderRadius: 4,
              backgroundColor: {
                hex: '#0E589A'
              },
              color: {
                hex: '#ffffff'
              }
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
          },
          languageDictionary: {
            title: 'Responsive CTA Builder'
          }
        })
      }
    },
    watch: {
      // Reset cta.ctaSS.fontFamily to empty to prevent fonts from being added
      ctaFont: function (font) {
        this.cta.ctaSS.fontFamily = ''
      }
    },
    computed: {
      hublCta: function () {
        let id = this.cta.hubspotCtaUrl.replace(/https:\/\/app\.hubspot\.com\/cta\/.{6}\//, '')
        let hubl = `{{ cta('` + id + `') }}`
        return hubl
      },
      editable: function () {
        if (this.activeTab === 0) {
          return true
        } else {
          return false
        }
      }
    },
    mounted () {
      var self = this
      this.$nextTick(function () {
        self.authenticated = checkAuth()
        self.lock.on('authenticated', (authResult) => {
          console.log('authenticated')
          localStorage.setItem('id_token', authResult.idToken)
          self.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
              // Handle error
              return
            }
            // Set the token and user profile in local storage
            localStorage.setItem('profile', JSON.stringify(profile))

            self.authenticated = true
          })
        })
        self.lock.on('authorization_error', (error) => {
          console.log('Oh Shit' + error)
        })
      })

      const userProfile = JSON.parse(localStorage.profile)
      self.userProfileImage = userProfile.picture
    },
    events: {
      'logout': function () {
        this.logout()
      }
    },
    methods: {
      clearFont: function (event) {
        this.cta.ctaSS.fontFamily = 'Apples'
      },
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
      embeder,
      picker: Chrome
    }
  }

  function checkAuth () {
    return !!localStorage.getItem('id_token')
  }
</script>

<style lang="sass">
// VARS
$picton: #48a7f9
$dodger: #1385e8
$yale: #0e589a

$white: #fff
$black: #000
$grey50: #fafafa
$grey100: #f5f5f5
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
html
  background-color: $grey50

.grey50
  background-color: $grey50

.profile
  img
    border-radius: 2px

.picker
  margin-top: 8px
  position: absolute
  z-index: 1

.inputPicker
  cursor: pointer

.container
  &.editor
    max-width: $grid - (128px * 1.5)

    .b-tabs // sass-lint:disable-line class-name-format
      margin: 0 -5px

      .tab-content // sass-lint:disable-line class-name-format
        overflow: visible

      .tabs
        margin: 0 5px

        &:not(:last-child)
          margin-bottom: 0

      .boxWrapper
        padding: 0 5px 5px

        .box
          border-radius: 0 0 5px 5px

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
