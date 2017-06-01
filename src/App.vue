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
              <a href="https://www.responsivectabuilder.com" target="_blank" class="nav-item">Home</a>
              <a target="_blank" class="nav-item"><s>Documentation</s></a>
              <a target="_blank" class="nav-item"><s>Blog</s></a>
            </div>
            <div class="nav-right">
              <!-- <a v-show="authenticated" class="nav-item"><s>Profile</s></a> -->
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

    <!-- CTA TYPE SELECT -->
    <div v-if="authenticated">
      <section class="section grey50">
        <div class="container">
          <b-field label="Select CTA Type">
            <b-select v-model="ctaStyle">
              <option value="standard">Standard</option>
              <!-- <option value="hubspot">HubSpot</option> -->
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
        Use HubSpot CTA Builder
      </div>
      <div v-else-if="ctaStyle === 'backgroundImage'">
        <background-img></background-img>
      </div>
      <div v-else>
        Yolo
      </div>
    </div>
  </div>
</template>

<script>
  import standard from './components/builder/builder-standard'
  import backgroundImage from './components/builder/builder-background-img'

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
            title: 'Responsive CTA Builder'
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
      }
    },
    components: {
      standard,
      'background-img': backgroundImage
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
