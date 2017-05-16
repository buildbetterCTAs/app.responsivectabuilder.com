// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import Clipboard from 'clipboard'

Vue.use(Buefy, {
  defaultTooltipAnimated: true
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

// CLIPBOARD
new Clipboard('.embedCopyButton', {
  text: function (target) {
    // FIRE INTERCOM EVENT
    Intercom('trackEvent', 'cta-built')

    // FIRE GOOGLE ANALYTICS EVENT
    ga('send', {
      hitType: 'event',
      eventCategory: 'Call-to-Action',
      eventAction: 'copy',
      eventLabel: 'Embed Code Copied'
    })

    // CHANGE BUTTON TEXT
    target.innerText = 'Copied'

    // COPY INNER TEXT TO CLIPBOARD
    return target.previousElementSibling.innerText
  }
})
