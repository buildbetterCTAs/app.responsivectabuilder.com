<template>
  <div>
    <div class="tabs is-centered is-fullwidth is-marginless">
      <ul>
        <li :class="{ 'is-active': (activeTab === tab) }" v-for="tab in tabs"><a @click="activate(tab)">{{ tab }}</a></li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tabs',
    data: function () {
      return {
        activeTab: '',
        tabs: []
      }
    },
    // HACK: Should probably do this better
    updated: function () {
      if (this.activeTab === '1. Text') {
        this.$parent.editable = true
      } else {
        this.$parent.editable = false
      }
    },
    methods: {
      activate: function (tab) {
        this.activeTab = tab
        this.$emit('activateTab', tab)
      }
    }
  }
</script>
