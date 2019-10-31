<template>
  <div class="analyse-view"> 
      <ul class="list-view">
      <li> Max People: {{ getMaxPeople }}</li>
      <li>Number of men: {{getMenLength.length}} </li>
      <li>Number of women: {{getWomenLength.length}}</li>
      <li>Number of active people: {{getActivePeople.length}}</li>
      <li>Number of non-active people: {{getNonActivePeople.length}} </li>
      <li>Number of adults: {{getAdults.length}}</li>
      <li>Number of elders: {{getElders.length}}</li>
      </ul>
    <b-progress :max="max" class="mt-2" show-progress animated variant="success">
      <b-progress-bar :value="menvalue" :label="`${((menvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2" show-progress animated variant="success">
      <b-progress-bar :value="womenvalue" :label="`${((womenvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2" show-progress animated variant="primary">
      <b-progress-bar :value="activevalue" :label="`${((activevalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2" show-progress animated variant="danger">
      <b-progress-bar :value="nonactivevalue" :label="`${((nonactivevalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2" show-progress animated variant="info">
      <b-progress-bar :value="adultvalue" :label="`${((adultvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2" show-progress animated variant="warning">
      <b-progress-bar :value="eldervalue" :label="`${((eldervalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name:"Analyse",
      computed: {
    ...mapState(['fields', 'items']),
    ...mapGetters(['getMaxPeople', 'getMenLength',
    'getWomenLength','getActivePeople','getNonActivePeople',
    'getAdults','getElders'])
  },
    data() {
      return {
        value:4,
        menvalue: this.$store.getters.getMenLength.length,
        womenvalue: this.$store.getters.getWomenLength.length,
        activevalue: this.$store.getters.getActivePeople.length,
        nonactivevalue: this.$store.getters.getNonActivePeople.length,
        adultvalue: this.$store.getters.getAdults.length,
        eldervalue: this.$store.getters.getElders.length,
        max: this.$store.getters.getMaxPeople 
      }
    },
    methods: {
    }
}
</script>

<style scoped>
.analyse-view{
    width: 1000px;
    margin: auto;
}
.list-view{
    text-align: left;
}

</style>