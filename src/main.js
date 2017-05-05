// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import Clipboard from 'clipboard'

Vue.use(Buefy)

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
    // Intercom('trackEvent', 'cta-built')

    // FIRE GOOGLE ANALYTICS EVENT
    // ga('send', {
    //   hitType: 'event',
    //   eventCategory: 'Call-to-Action',
    //   eventAction: 'copy',
    //   eventLabel: 'Embed Code Copied'
    // })

    // CHANGE BUTTON TEXT
    target.innerText = 'Copied'

    // COPY INNER TEXT TO CLIPBOARD
    return target.previousElementSibling.innerText
  }
});

// BARS
// (function () {
//   var bars = document.querySelectorAll('.bars');
//
//   for (var i = 0; i < bars.length; i++) {
//     var width = bars[i].nextElementSibling.clientWidth;
//     bars[i].firstChild.innerText = width + 'px';
//   }
// })();

// TABS
(function () {
  var el = document.querySelectorAll('.circle')

  // TAB
  for (var i = 0; i < el.length; i++) {
    el[i].addEventListener('click', function () {
      const id = this.getAttribute('data-tab')

      for (var i = 0; i < el.length; i++) {
        el[i].classList.remove('isActive')
      }

      var tabContents = document.querySelectorAll('.tab')
      for (i = 0; i < el.length; i++) {
        tabContents[i].classList.remove('active')
      }

      this.classList.add('isActive')

      document.getElementById(id).classList.add('active')
    }, false)
  }
})()
