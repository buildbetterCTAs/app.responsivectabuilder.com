<template>
  <div class="bars"><span v-if="width">{{ value + 'px' }}</span></div>
</template>

<script>
  export default {
    name: 'bar',
    props: {
      width: Boolean,
      value: [String, Number]
    }
  }
</script>

<style lang="sass" scoped>
// VARS
$black: #000
$white: #fff
$widthBarStroke: 2px solid rgba($black, .12)
$widthBarTextColor: rgba($black, .38)

// STYLES
.bars
  border-left: $widthBarStroke
  border-right: $widthBarStroke
  height: 18px
  line-height: 18px
  position: relative
  text-align: center
  width: 100%

  span
    background-color: $white
    color: $widthBarTextColor
    font-weight: 500
    padding: 0 8px

  &::after
    border-top: $widthBarStroke
    bottom: 0
    content: ""
    left: 50%
    position: absolute
    top: calc(50% - 1px)
    transform: translate(-50%)
    width: 100%
    z-index: -1

</style>
