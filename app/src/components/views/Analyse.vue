<template>
  <div class="analyse-view">
    <ul class="list-view">
      <li>Max People: {{max}}</li>
      <li>
        Number of men: {{menvalue}}
        <b-progress :max="max" class="mt-2" variant="success">
          <b-progress-bar :value="menvalue" :label="`${((menvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of women: {{womenvalue}}
        <b-progress :max="max" class="mt-2" variant="success">
          <b-progress-bar :value="womenvalue" :label="`${((womenvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of active people: {{activevalue}}
        <b-progress :max="max" class="mt-2" variant="primary">
          <b-progress-bar
            :value="activevalue"
            :label="`${((activevalue / max) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of non-active people: {{nonactivevalue}}
        <b-progress :max="max" class="mt-2" variant="danger">
          <b-progress-bar
            :value="nonactivevalue"
            :label="`${((nonactivevalue / max) * 100).toFixed(2)}%`"
          ></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of adults: {{adultvalue}}
        <b-progress :max="max" class="mt-2" variant="info">
          <b-progress-bar :value="adultvalue" :label="`${((adultvalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <li>
        Number of elders: {{eldervalue}}
        <b-progress :max="max" class="mt-2" variant="warning">
          <b-progress-bar :value="eldervalue" :label="`${((eldervalue / max) * 100).toFixed(2)}%`"></b-progress-bar>
        </b-progress>
      </li>
      <h1></h1>
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
      menvalue: 0,
      womenvalue: 0,
      activevalue: 0,
      nonactivevalue: 0,
      adultvalue: 0,
      eldervalue: 0,
      max: 0,

      calMax: 0,
      month: 30,
      firstQuar: 0,
      secondQuar: 0,
      thirdQuar: 0,
      fourthQuart: 0,
      firstHalf: 0,
      secondHalf: 0
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      let asd = 0;
      await db
        .collection("clientDatas")
        .get()
        .then(function(querySnapshot) {
          asd = querySnapshot.size;
        });
      this.max = asd;
      let snapshot = await db.collection("clientDatas").get();
      snapshot.forEach(doc => {
        if (doc.data().gender === "male") {
          this.menvalue++;
        } else {
          this.womenvalue++;
        }
        if (doc.data().isActive === true) {
          this.activevalue++;
        } else {
          this.nonactivevalue++;
        }
        if (doc.data().age < 55) {
          this.adultvalue++;
        } else {
          this.eldervalue++;
        }
      });

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
</style>