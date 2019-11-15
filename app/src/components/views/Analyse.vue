<template>
  <div class="analyse-view">
    <b-row>
      <b-col>
        <h2 class="h2">Bookings</h2>
    <ul class="list-view">
      <li>
        Number of bookings/goal: {{calMax}}/{{month}}
        <b-progress :max="month" class="mt-2" variant="success">
          <b-progress-bar :value="calMax" :label="`${((calMax / month) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of bookings in the first quarter: {{firstQuar}}
        <b-progress :max="calMax" class="mt-2" variant="warning">
          <b-progress-bar :value="firstQuar" :label="`${((firstQuar / calMax) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of bookings in the second quarter: {{secondQuar}}
        <b-progress :max="calMax" class="mt-2" variant="success">
          <b-progress-bar
            :value="secondQuar"
            :label="`${((secondQuar / calMax) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of bookings in the third quarter: {{thirdQuar}}
        <b-progress :max="calMax" class="mt-2" variant="success">
          <b-progress-bar :value="thirdQuar" :label="`${((thirdQuar / calMax) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of bookings in the fourth quarter: {{fourthQuart}}
        <b-progress :max="calMax" class="mt-2" variant="warning">
          <b-progress-bar
            :value="fourthQuart"
            :label="`${((fourthQuart / calMax) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of bookings in the first half: {{firstHalf}}
        <b-progress :max="calMax" class="mt-2" variant="success">
          <b-progress-bar :value="firstHalf" :label="`${((firstHalf / calMax) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of bookings in the second half: {{secondHalf}}
        <b-progress :max="calMax" class="mt-2" variant="warning">
          <b-progress-bar
            :value="secondHalf"
            :label="`${((secondHalf / calMax) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>
      </li>
    </ul>
    </b-col>
    <b-col>
      <h2 class="h2">Driving</h2>
      <ul class="list-view">
        <li>
        Number of driving lessons taken: {{eddigiVezetesSzam}}/{{vezetesMax}}
        <b-progress :max="vezetesMax" class="mt-2" variant="success">
          <b-progress-bar :value="eddigiVezetesSzam" :label="`${((eddigiVezetesSzam / vezetesMax) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of hours driven: {{eddigiVezetesOra}}/{{vezetesMaxOra}}
        <b-progress :max="vezetesMaxOra" class="mt-2" variant="primary">
          <b-progress-bar
            :value="eddigiVezetesOra"
            :label="`${((eddigiVezetesOra / vezetesMaxOra) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>
      </li>
      <li class="mt-2">
        Remaining driving lessons: {{remaining}}
      </li>
    </ul>
    </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/main";
export default {
  name: "Analyse",
  computed: {
    ...mapState(["fields", "items"])
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),

      calMax: 0,
      month: 30,
      firstQuar: 0,
      secondQuar: 0,
      thirdQuar: 0,
      fourthQuart: 0,
      firstHalf: 0,
      secondHalf: 0,

      vezetesMax: 20,
      vezetesMaxOra: 40,
      eddigiVezetesOra: 14,
      eddigiVezetesSzam: 7,
      remaining:0,
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      let cal = 0;
      await db
        .collection("calEvent")
        .get()
        .then(function(querySnapshot) {
          cal = querySnapshot.size;
        });
      this.calMax = cal;
      let calsnapshot = await db.collection("calEvent").get();
      calsnapshot.forEach(doc => {
        if(doc.data().name == "VEZETÉS"){
          if(doc.data().start>this.today){
            this.remaining++
          }else{
          this.eddigiVezetesOra= this.eddigiVezetesOra+2
          this.eddigiVezetesSzam++;
          }
        }
        if (doc.data().start > "2020-01-01" && doc.data().end < "2020-03-31") {
          this.firstQuar++;
        } else if (
          doc.data().start > "2020-04-01" &&
          doc.data().end < "2020-06-30"
        ) {
          this.secondQuar++;
        } else if (
          doc.data().start > "2020-07-01" &&
          doc.data().end < "2020-09-30"
        ) {
          this.thirdQuar++;
        } else if (
          doc.data().start > "2020-10-01" &&
          doc.data().end < "2020-12-31"
        ) {
          this.fourthQuart++;
        }
        if (doc.data().start > "2020-01-01" && doc.data().end < "2020-05-31") {
          this.firstHalf++;
        } else if(doc.data().start > "2020-06-01" && doc.data().end < "2020-12-31"){
          this.secondHalf++;
        }
      });
    }
  }
};
</script>

<style scoped>
.analyse-view {
  width: 1000px;
  margin: auto;
}
.list-view {
  text-align: left;
  margin-left: 15px;
}
.h2{
  text-align: left;

}
</style>