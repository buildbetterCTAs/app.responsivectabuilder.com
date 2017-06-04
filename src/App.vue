<template>
  <div id="app">
    <!-- NAVIGATION & NOT AUTHENTICATED UI -->
    <section class="hero" v-bind:class="{ 'is-fullheight': !authenticated }">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-left">
              <a href="/" class="nav-item is-brand">
                <img src="./assets/logo.svg" alt="Responsive CTA Builder logo">
              </a>
              <!-- <a href="https://www.responsivectabuilder.com" target="_blank" class="nav-item">Home</a> -->
              <!-- <a target="_blank" class="nav-item">Blog</a> -->
              <a class="nav-item" href="https://docs.responsivectabuilder.com">Documentation</a>
            </div>
            <div class="nav-right">
              <!-- <a v-show="authenticated" class="nav-item">Profile</a> -->
              <div class="nav-item" v-show="!authenticated">
                <div class="field is-grouped">
                  <p class="control">
                    <a class="button is-primary" @click="login()">Login</a>
                  </p>
                </div>
              </div>
              <a class="nav-item" @click="logout()" v-show="authenticated">Logout</a>
            </div>
          </div>
        </header>
      </div>
      <div v-show="!authenticated" class="hero-body grey50">
        <div class="container has-text-centered">
          <p class="title is-4">Log in to begin building your Call-to-Actions</p>
          <div>
            <a class="button is-primary" @click="login()">Login</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA TYPE SELECT -->
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
        </div>
      </section>

      <!-- LOGIC TO SHOW CTA BUILDER TYPE BASED ON SELECTED TYPE -->
      <div v-if="ctaStyle === 'standard'">
        <standard></standard>
      </div>
      <div v-else-if="ctaStyle === 'hubspot'">
        <hubspot></hubspot>
      </div>
      <div v-else-if="ctaStyle === 'backgroundImage'">
        <background-img></background-img>
      </div>
      <div v-else>
        Yolo
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>Made with ❤️ by <a href="https://www.reiner.io">Jeff Reiner</a> and <a href="https://twitter.com/_danieljmurphy">Daniel Murphy</a>.</p>
          <div class="nav-center">
            <!-- <a class="nav-item" href="https://docs.responsivectabuilder.com" target="_blank">
              <span class="icon">
                <i class="fa fa-book"></i>
              </span>
            </a> -->
            <a class="nav-item" href="https://github.com/buildBetterCTAs/" target="_blank">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
            </a>
            <a class="nav-item" href="https://twitter.com/buildBetterCTAs" target="_blank">
              <span class="icon">
                <i class="fa fa-twitter"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import standard from './components/builder/builder-standard'
  import backgroundImage from './components/builder/builder-background-img'
  import hubspot from './components/builder/builder-hubspot'

  export default {
    name: 'app',
    data: function () {
      return {
        ctaStyle: 'standard',
        authenticated: false,
        secretThing: '',
        lock: new Auth0Lock('fTi1j_-M7Xoe2bvTMqxLG9p8ewqupq06', 'responsivectabuilder.auth0.com', {
          rememberLastLogin: true,
          theme: {
            'logo': 'https://github.com/buildbetterCTAs/branding/raw/master/img/logo.png',
            'primaryColor': '#1385e8'
          },
          languageDictionary: {
            title: ''
          }
        })
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
              console.error(error)
              return
            }
            // Set the token and user profile in local storage
            localStorage.setItem('profile', JSON.stringify(profile))
            self.authenticated = true
          })
        })
        self.lock.on('authorization_error', (error) => {
          console.error(error)
        })
      })
    },
    events: {
      'logout': function () {
        this.logout()
      }
    },
    methods: {
      login () {
        this.lock.show()
      },
      logout () {
        // To log out, we just need to remove the token and profile from local storage
        localStorage.removeItem('id_token')
        localStorage.removeItem('profile')
        this.authenticated = false
        this.$toast.open('Logged Out')
      }
    },
    components: {
      standard,
      'background-img': backgroundImage,
      hubspot
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

.footer
  background-color: $grey50

.grey50
  background-color: $grey50

.profile
  img
    border-radius: 2px

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

// AUTH0 Lock Customizations

// sass-lint:disable-all

.auth0-lock
  &.auth0-lock
    .auth0-lock-header-bg
      display: none !important

    &.auth0-lock-opened
      .auth0-lock-widget
        box-shadow: none !important

.auth0-lock-overlay
  background: rgba(0, 0, 0, .8) !important

// sass-lint:enable-all

</style>

<!-- EMBEDER STYLES -->

<style lang="sass">
$white: #fff
$black: #000
$grey300: #e0e0e0
$grey400: #bdbdbd
$grey500: #9e9e9e

// Embed Section
pre
  border-radius: 4px

.embedCopy
  position: relative
  width: 640px

  &:not(:last-child)
    margin-bottom: 16px

  .embedCopyButton
    background-color: $grey400
    border-radius: 4px 0
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
