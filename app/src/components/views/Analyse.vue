<template>
  <div class="analyse-view"> 
      <ul class="list-view">
      <li> Max People: {{max}}</li>
      <li>Number of men: {{menvalue}} </li>
      <li>Number of women: {{womenvalue}}</li>
      <li>Number of active people: {{activevalue}}</li>
      <li>Number of non-active people: {{nonactivevalue}} </li>
      <li>Number of adults: {{adultvalue}}</li>
      <li>Number of elders: {{eldervalue}}</li>
      </ul>
    <b-progress :max="max" class="mt-2"  variant="success">
      <b-progress-bar :value="menvalue" :label="`${((menvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2" variant="success">
      <b-progress-bar :value="womenvalue" :label="`${((womenvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2"  variant="primary">
      <b-progress-bar :value="activevalue" :label="`${((activevalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2"  variant="danger">
      <b-progress-bar :value="nonactivevalue" :label="`${((nonactivevalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2"  variant="info">
      <b-progress-bar :value="adultvalue" :label="`${((adultvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
    <b-progress :max="max" class="mt-2"  variant="warning">
      <b-progress-bar :value="eldervalue" :label="`${((eldervalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from "@/main";
export default {
    name:"Analyse",
      computed: {
    ...mapState(['fields', 'items'])
  },
    data() {
      return {
        value:4,
        menvalue: 0,
        womenvalue: 0,
        activevalue: 0,
        nonactivevalue: 0,
        adultvalue: 0,
        eldervalue: 0,
        max: 0
      }
    },
    mounted(){
      this.getEvents();
    },
    methods: {
        async getEvents(){
          let asd= 0
          await db.collection("clientDatas").get().then(function(querySnapshot) {  
              asd=querySnapshot.size
          });
          this.max=asd

          let snapshot = await db.collection("clientDatas").get();
          snapshot.forEach(doc => {
          if(doc.data().gender === "male"){
            this.menvalue++
          }else{
            this.womenvalue++
          }
          if(doc.data().isActive === true){
            this.activevalue++
          }else{
            this.nonactivevalue++
          }
          if(doc.data().age < 55){
            this.adultvalue++
          }else{
            this.eldervalue++
          }
          });
        }
      
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
    margin-left: 15px;
}

</style>