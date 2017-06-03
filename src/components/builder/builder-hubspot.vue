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
                    <p class="title is-5">Add a HubSpot CTA to your Responsive CTA</p>
                  </div>
                  <div class="column">
                    <div class="columns">
                      <div class="column">
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
                      </div>
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
  import cta from '../cta/cta-hubspot'
  import embeder from '../ui/embeder-standard'
  import { Chrome } from 'vue-color'

  export default {
    name: 'builder-hubspot',
    data: function () {
      return {
        activeTab: 0,
        showPicker: false,
        ctaWidth: 1000,
        ctaFont: false,
        hubspotCta: false,
        hubspotCtaUrl: '',
        cta: {
          headline: 'This is a powerful, eye-catching headline',
          description: 'This is your secondary text that might explain why your reader should follow your call-to-action.',
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
        }
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
    methods: {
      clearFont: function (event) {
        this.cta.ctaSS.fontFamily = 'Apples'
      },
      select: function (event) {
        event.target.select()
      }
    },
    components: {
      cta,
      embeder,
      picker: Chrome
    }
  }
</script>
