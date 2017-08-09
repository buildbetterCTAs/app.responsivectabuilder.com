<template>
  <div class="field">
    <label class="label">{{label}}</label>
    <div class="control">
      <input
        :disabled="enabled"
        readonly
        type="text"
        class="input inputPicker"
        :value="value.hex"
        @click="showPicker"/>
      <div class="swatch" :style="{ background: value.hex }"></div>
      <picker
        class="picker"
        v-on-clickaway="hidePicker"
        v-if="pickerVisible"
        :value="value"
        @input="val => $emit('input', val)">
      </picker>
    </div>
  </div>
</template>

<script>
  import { mixin as clickaway } from 'vue-clickaway'
  import { Chrome } from 'vue-color'

  export default {
    props: {
      value: Object,
      label: String,
      enabled: Boolean
    },
    data () {
      return {
        pickerVisible: false
      }
    },
    methods: {
      showPicker () {
        this.pickerVisible = true
      },
      hidePicker () {
        this.pickerVisible = false
      }
    },
    components: {
      picker: Chrome
    },
    mixins: [ clickaway ]
  }
</script>

<style lang="sass">

$swatchShadow: rgba(0, 0, 0, .1)

.swatch
  border-radius: 3px
  box-shadow: inset 0 0 0 1px $swatchShadow
  display: block
  height: 1.5em
  left: 0
  margin: .35em
  pointer-events: none
  position: absolute
  top: 0
  width: 1.5em

.picker
  margin-top: 8px
  position: absolute
  z-index: 3

.input
  &.inputPicker
    cursor: pointer
    padding-left: 2.25em

</style>
