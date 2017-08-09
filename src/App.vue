<template>
  <div id="app">
    <!-- NAVIGATION & NOT AUTHENTICATED UI -->
    <section class="hero" v-bind:class="{ 'is-fullheight': !authenticated }">
      <div class="hero-head">
        <header style="background-color: white" class="nav">
          <div class="container">
            <div class="nav-left">
              <a href="/" class="nav-item is-brand">
                <img src="./assets/logo.svg" alt="Responsive CTA Builder logo">
              </a>
            </div>
            <div class="nav-right">
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
            </b-select>
          </b-field>
        </div>
      </section>

      <builder :ctaStyle="ctaStyle"></builder>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>Made with <span class="icon is-small is-danger"><i class="fa fa-heart"></i></span> by <a href="https://www.reiner.io">Jeff Reiner</a> and <a href="https://twitter.com/_danieljmurphy">Daniel Murphy</a>.</p>
          <p><small>© 2017 Daniel J. Murphy and Jeff Reiner</small></p>
          <div class="nav-center">
            <a class="nav-item" href="https://twitter.com/buildBetterCTAs" target="_blank">
              <span class="icon">
                <i class="fa fa-twitter"></i>
              </span>
            </a>
            <a class="nav-item" href="https://www.facebook.com/BuildBetterCTAs" target="_blank">
              <span class="icon">
                <i class="fa fa-facebook"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import builder from './components/builder'

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
              // console.error(error)
              this.$toast.open({
                message: error,
                type: 'is-danger'
              })
              return
            }
            // Set the token and user profile in local storage
            localStorage.setItem('profile', JSON.stringify(profile))
            self.authenticated = true
          })
        })
        self.lock.on('authorization_error', (error) => {
          // console.error(error)
          this.$toast.open({
            message: error.error_description,
            type: 'is-danger'
          })
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
      builder
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
$red: #ff1744

$white: #fff
$black: #000
$grey50: #fafafa
$grey100: #f5f5f5
$grey300: #e0e0e0
$grey400: #bdbdbd
$grey500: #9e9e9e

$grid: 1136px

// AUTH0 VARS
$auth-0verlay: rgba(0, 0, 0, .8) // sass-lint:disable-line variable-name-format

// sass-lint:disable variable-name-format

// INITIAL BULMA VARS
$widescreen: $grid
$fullhd: $grid

@import "~bulma/sass/utilities/initial-variables"

// DERIVED BULMA VARS
$primary: $dodger
$danger: $red
$title-weight: $weight-light

// sass-lint:enable variable-name-format

@import "~bulma"

@import "~buefy/src/scss/buefy"

//*****************
// Main App Styles
//*****************

html
  background-color: $grey50

.footer
  background-color: $grey50

.grey50
  background-color: $grey50

.container
  &.editor
    max-width: $grid - 176px

    .b-tabs // sass-lint:disable-block class-name-format
      margin: 0 -5px

      .tab-content
        overflow: visible

        .box-wrapper
          padding: 0 5px 5px

          .box
            border-radius: 0 0 5px 5px

      .tabs
        margin: 0 5px

    .title
      line-height: 1.3

//************
// Auth0 Lock
//************

// sass-lint:disable class-name-format variable-name-format
.auth0-lock
  &.auth0-lock
    .auth0-lock-header-bg
      display: none !important

    &.auth0-lock-opened
      .auth0-lock-widget
        box-shadow: none !important

.auth0-lock-overlay
  background: $auth-0verlay !important
// sass-lint:enable class-name-format
</style>
