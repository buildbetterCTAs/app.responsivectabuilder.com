<template>
  <div>
      <!-- CTA PREVIEW AND WIDTH SLIDER -->
      <div class="container">
        <div :style="{ maxWidth: ctaWidth + 'px' }" style="margin: 0 auto;">
          <cta :sliderVal="ctaWidth" :isEditable="editable" :hubl="hublCta" :hasBackgroundImage="addBackgroundImage" :cta="cta"></cta>
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
                        <b-field label="Background Image URL">
                          <b-input :disabled="!addBackgroundImage" @focus="select($event)" name="backgroundImage" type="url" v-model="cta.ctaSS.cta.backgroundImage"></b-input>
                        </b-field>
                        <b-switch v-model="addBackgroundImage">Enable Background Image</b-switch>
                      </div>
                      <div class="column">
                        <colorInput :enabled="!addBackgroundImage" label="Image Overlay" v-model="cta.ctaSS.cta.imageOverlay"></colorInput>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column">
                        <colorInput label="Background Color" v-model="cta.ctaSS.cta.backgroundColor"></colorInput>
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
                        <colorInput label="Text Color" v-model="cta.ctaSS.cta.color"></colorInput>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column">
                        <colorInput label="Button Color" v-model="cta.ctaSS.button.backgroundColor"></colorInput>
                      </div>
                      <div class="column">
                        <colorInput label="Button Text Color" v-model="cta.ctaSS.button.color"></colorInput>
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
                        <b-field>
                          <p>1. Build a "Link (No Style)" CTA in HubSpot<br>2. Open "Details" view and copy the page's URL<br>3. Paste the URL below</p>
                        </b-field>
                        <b-field label="HubSpot CTA">
                          <b-input @focus="select($event)" name="hubspotCta" type="url" placeholder="Paste HubSpot CTA URL" v-model="hubspotCtaUrl"></b-input>
                        </b-field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="4. Embed">
            <div class="boxWrapper">
              <embeder :hasBackgroundImage="addBackgroundImage" :hubl="hublCta" :cta="cta"></embeder>
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
            <cta :hubl="hublCta" :cta="cta"></cta>
          </div>
          <div class="column">
            <cta :hubl="hublCta" :cta="cta"></cta>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cta from '../cta/cta-hubspot'
  import embeder from '../ui/embeder-hubspot'
  import colorInput from './color-input'

  export default {
    name: 'builder-hubspot',
    data: function () {
      return {
        activeTab: 0,
        ctaWidth: 1000,
        ctaFont: false,
        addBackgroundImage: false,
        hubspotCtaUrl: '',
        cta: {
          headline: 'This is a powerful, eye-catching headline',
          description: 'This is your secondary text that might explain why your reader should follow your call-to-action.',
          ctaSS: {
            fontFamily: null,
            cta: {
              borderRadius: 4,
              backgroundImage: 'https://unsplash.it/1280/720',
              imageOverlay: {
                hex: '#48A7F9',
                rgba: {
                  r: 72,
                  g: 167,
                  b: 249,
                  a: 0.5
                },
                a: 0.5
              },
              backgroundColor: {
                hex: '#0E589A'
              },
              color: {
                hex: '#ffffff'
              }
            },
            button: {
              backgroundColor: {
                hex: '#48A7F9'
              },
              color: {
                hex: '#ffffff'
              }
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
      hublCta: function () {
        let ctaID = this.hubspotCtaUrl.replace(/https:\/\/app\.hubspot\.com\/cta\/.{6}\//, '')
        let embed = `{{ cta('` + ctaID + `') }}`
        return embed
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
      select: function (event) {
        event.target.select()
      }
    },
    components: {
      cta,
      embeder,
      colorInput
    }
  }
</script>
