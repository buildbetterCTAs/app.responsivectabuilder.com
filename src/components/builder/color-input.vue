<template>
  <div class="field">
    <label class="label">{{label}}</label>
    <div class="control">
      <input
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
    label: String
  },
  data() {
    return {
      pickerVisible: false
    }
  },
  methods: {
    showPicker() {
      this.pickerVisible = true;
    },
    hidePicker() {
      this.pickerVisible = false;
    }
  },
  components: {
    picker: Chrome
  },
  mixins: [ clickaway ]
}
</script>

<style lang="sass">
.swatch
  display: block
  width: 1.5em
  height: 1.5em
  border-radius: 3px
  margin: .35em
  position: absolute
  left: 0
  top: 0
  border: 1px solid rgba(0,0,0,.1)
  pointer-events: none

.picker
  margin-top: 8px
  position: absolute
  z-index: 3

.inputPicker
  cursor: pointer
  padding-left: 2.25em
</style>