<template>
  <div class="users-view">
    <b-list-group-item variant="dark">
      <b-row class="head-row">
        <b-col>
          <b>Username</b>
        </b-col>
        <b-col>
          <b>Password</b>
        </b-col>
        <b-col>
          <b>Authorization</b>
        </b-col>
        <b-col >
          <b>Delete</b>
        </b-col>
      </b-row>
    </b-list-group-item>
    <b-list-group v-bind:key="item.id" v-for="item in events">
      <b-list-group-item variant="light">
        <b-row class="list-row">
          <b-col class="col">{{item.username}}</b-col>
          <b-col>{{item.password}}</b-col>
          <b-col>
            <b-badge v-if="item.auth == 0" variant="success">MainAdmin</b-badge>
            <b-badge v-else-if="item.auth == 1" variant="primary">Admin</b-badge>
            <b-badge v-else variant="warning">Member</b-badge>
          </b-col>
          <b-col  v-if="item.auth == 2">
            <font-awesome-icon icon="trash-alt" />
          </b-col>
          <b-col v-else></b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  name: "Users",
  props: ["login"],
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.getEvents();
    console.log(this.$parent.tabAuth)
  },
  methods: {
    async getEvents() {
      let snapshot = await db.collection("login").get();
      let events = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
      this.events = events;
    }
  }
};
</script>

<style scoped>
.users-view {
  width: 500px;
  margin: auto;
  text-align: left;
}
.col {
  width: 30px;
  text-align: center;
}
.list-row {
  color: black;
}
.head-row {
  height: 30px;
}
</style>