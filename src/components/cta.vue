<template>
  <div :style="{ borderRadius: cta.ctaSS.cta.borderRadius + 'px', backgroundColor: cta.ctaSS.cta.backgroundColor }" class="cta">
    <div class="cta__headline" :style="{ color: cta.ctaSS.cta.color }">{{ cta.headline }}</div>
    <div class="cta__description" :style="{ color: cta.ctaSS.cta.color }">{{ cta.description }}</div>
    <div v-if="!cta.hubspotCta">
      <a class="cta__button" :style="cta.ctaSS.button" :href="cta.buttonUrl" target="_blank">{{ cta.buttonText }}</a>
    </div>
    <div v-else>
      <div v-text="cta.hubspotCtaId"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cta',
    props: {
      cta: {
        type: Object,
        required: true,
        default: function () {
          return {
            headline,
            description,
            buttonText,
            hubspotCta,
            hubspotCtaId,
            buttonUrl,
            ctaSS: {
              cta: {
                borderRadius,
                backgroundColor,
                color
              },
              button: {
                backgroundColor,
                color
              }
            }
          }
        }
      }
    }
  }
</script>
