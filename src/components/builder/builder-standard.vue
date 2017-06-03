<template>
  <div>
      <!-- CTA PREVIEW AND WIDTH SLIDER -->
      <div class="container">
        <div :style="{ maxWidth: ctaWidth + 'px' }" style="margin: 0 auto;">
          <cta :sliderVal="ctaWidth" :isEditable="editable" :cta="cta"></cta>
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
                        <b-field label="Background Color">
                          <b-field>
                            <b-input @focus="select($event)" type="text" v-model="cta.ctaSS.cta.backgroundColor" expanded></b-input>
                            <p class="control">
                              <label for="backgroundColor" style="width: 36px;" :style="{ backgroundColor: cta.ctaSS.cta.backgroundColor }" class="button"></label>
                              <input style="visibility: hidden; position: fixed;" type="color" id="backgroundColor" v-model="cta.ctaSS.cta.backgroundColor">
                            </p>
                          </b-field>
                        </b-field>
                        <!-- <div class="field">
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
                        </div> -->
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
                              <option value="Roboto">Roboto</option>
                              <option value="Work Sans">Work Sans</option>
                              <option value="Open Sans">Open Sans</option>
                              <option value="Lato">Lato</option>
                              <option value="Indie Flower">Indie Flower</option>
                              <option value="Hind">Hind</option>
                              <option value="Crimson Text">Crimson Text</option>
                              <option value="Roboto Mono">Roboto Mono</option>
                            </optgroup>
                          </b-select>
                        </b-field>
                        <b-checkbox v-model="ctaFont"><b-tooltip label='When you embed this CTA on your website, we will automatically pull in your primary font.' dashed multilined>Automatically use my website's font</b-tooltip></b-checkbox>
                      </div>
                      <div class="column">
                        <b-field label="Text Color">
                          <b-field>
                            <b-input @focus="select($event)" type="text" v-model="cta.ctaSS.cta.color" expanded></b-input>
                            <p class="control">
                              <label for="textColor" style="width: 36px;" :style="{ backgroundColor: cta.ctaSS.cta.color }" class="button"></label>
                              <input style="visibility: hidden; position: fixed;" type="color" id="textColor" v-model="cta.ctaSS.cta.color">
                            </p>
                          </b-field>
                        </b-field>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column">
                        <b-field label="Button Color">
                          <b-field>
                            <b-input @focus="select($event)" type="text" v-model="cta.ctaSS.button.backgroundColor" expanded></b-input>
                            <p class="control">
                              <label for="buttonBackgroundColor" style="width: 36px;" :style="{ backgroundColor: cta.ctaSS.button.backgroundColor }" class="button"></label>
                              <input style="visibility: hidden; position: fixed;" type="color" id="buttonBackgroundColor" v-model="cta.ctaSS.button.backgroundColor">
                            </p>
                          </b-field>
                        </b-field>
                      </div>
                      <div class="column">
                        <b-field label="Button Text Color">
                          <b-field>
                            <b-input @focus="select($event)" type="text" v-model="cta.ctaSS.button.color" expanded></b-input>
                            <p class="control">
                              <label for="buttonTextColor" style="width: 36px;" :style="{ backgroundColor: cta.ctaSS.button.color }" class="button"></label>
                              <input style="visibility: hidden; position: fixed;" type="color" id="buttonTextColor" v-model="cta.ctaSS.button.color">
                            </p>
                          </b-field>
                        </b-field>
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
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="4. Embed">
            <div class="boxWrapper">
              <embeder :cta="cta"></embeder>
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
  import cta from '../cta/cta-standard'
  import embeder from '../ui/embeder-standard'
  // import { Chrome } from 'vue-color'

  export default {
    name: 'builder-standard',
    data: function () {
      return {
        activeTab: 0,
        showPicker: false,
        ctaWidth: 1000,
        ctaFont: false,
        cta: {
          headline: 'This is a powerful, eye-catching headline',
          description: 'This is your secondary text that might explain why your reader should follow your call-to-action.',
          buttonText: 'click here, reader!',
          buttonUrl: 'https://www.responsivectabuilder.com',
          ctaSS: {
            fontFamily: null,
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
    watch: {
      // Reset cta.ctaSS.fontFamily to empty to prevent fonts from being added
      ctaFont: function (font) {
        this.cta.ctaSS.fontFamily = null
      }
    },
    computed: {
      editable: function () {
        if (this.activeTab === 0) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      select: function (event) {
        event.target.select()
      }
    },
    components: {
      cta,
      embeder
      // picker: Chrome
    }
  }
</script>
