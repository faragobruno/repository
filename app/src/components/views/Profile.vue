<template>
  <div class="users-view">
    <b-list-group-item variant="dark">
      <b-row class="head-row">
        <b-col class="col-left">
          <h3>Profile</h3>
        </b-col>
      </b-row>
    </b-list-group-item>
    <b-list-group v-bind:key="item.id" v-for="item in events">
      <b-list-group-item variant="light">
        <b-row class="mb-1"><b-col class="col-left"><b class="mr-4">Username: </b></b-col><b-col class="col-left">{{item.username}}</b-col></b-row>
        <b-row class="mb-1"><b-col class="col-left"><b class="mr-4">Password: </b></b-col><b-col class="col-left">{{item.password}}</b-col></b-row>
        <b-row class="mb-1"><b-col class="col-left"><b class="mr-4">Gender: </b></b-col><b-col class="col-left">{{item.gender}}</b-col></b-row>
        <b-row class="mb-1"><b-col class="col-left"><b class="mr-4">City: </b></b-col><b-col class="col-left">{{item.city}}</b-col></b-row>
        <b-row class="mb-1"><b-col class="col-left"><b class="mr-4">Birth: </b></b-col><b-col class="col-left">{{item.birth}}</b-col></b-row>
        <b-row class="mb-1"><b-col class="col-left"><b class="mr-4">Bookings: </b></b-col><b-col class="col-left">{{bookings}}</b-col></b-row>
        <b-row class="mb-1"><b-col class="col-left"><b class="mr-4">Credits claimed: </b></b-col><b-col class="col-left">{{sentCredits}}</b-col></b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  name: "Profile",
  props: ["app"],
  data() {
    return {
      events: [],
      headerBgVariant: "dark",
      headerTextVariant: "light",
      user: this.$parent.user,
      bookings:[],
      sentCredits:[]
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      let cal = await db.collection("calEvent").get();
      let bookingOssz=[]
      cal.forEach(doc => {
        if (this.user == doc.data().username) {
          let appData = doc.data();
          appData.id = doc.id;
          bookingOssz.push(appData);
        }
      });
      this.bookings = bookingOssz.length
      
      let credit = await db.collection("creditDatas").get();
      let creditOssz = [];
      credit.forEach(doc => {
        if (this.user == doc.data().username) {
          let appData = doc.data();
          appData.id = doc.id;
          creditOssz.push(appData);
        }
      });
      this.sentCredits =creditOssz.length;

      let snapshot = await db.collection("login").get();
      let events = [];
      snapshot.forEach(doc => {
        if (this.user == doc.data().username) {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
        }
      });
      this.events = events;
    }
  }
};
</script>

<style scoped>
.users-view {
  width: 450px;
  margin: auto;
  text-align: left;
}
.col {
  width: 30px;
  text-align: center;
}
.col-left {
  text-align: left;
}
.list-row {
  color: black;
}
.head-row {
  height: 50px;
}
</style>