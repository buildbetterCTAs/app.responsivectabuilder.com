<template>
  <div class="bars"><span></span></div>
</template>

<script>
  export default {
    name: 'bar',
    created () {
      console.log(this.firstChild);
      // var bars = document.querySelector('.bars');
      // var width = bars.nextElementSibling.clientWidth;
      // bars.firstChild.innerText = width + 'px';
    }
  }
</script>
