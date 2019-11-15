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
        <b-col>
          <b>Delete/Edit</b>
        </b-col>
      </b-row>
    </b-list-group-item>
    <b-list-group v-bind:key="item.id" v-for="item in orderedEvents">
      <b-list-group-item variant="light">
        <b-row class="list-row">
          <b-col class="col">{{item.username}}</b-col>
          <b-col class="col-right">
            {{item.password}}
            <font-awesome-icon
              v-if="auth == 0"
              class="fa-clickable ml-3"
              @click="showPassword(item)"
              icon="eye"
              size="sm"
            />
            <i v-else class="ml-2"></i>
          </b-col>
          <b-col>
            <b-badge v-if="item.auth == 0" variant="success">MainAdmin</b-badge>
            <b-badge v-else-if="item.auth == 1" variant="primary">Admin</b-badge>
            <b-badge v-else variant="warning">Member</b-badge>
          </b-col>
          <b-col>
            <font-awesome-icon
              v-if="item.auth == 1 && auth ==0"
              @click="showModal(item)"
              class="fa-clickable"
              icon="trash-alt"
            />
            <font-awesome-icon
              v-if="item.auth == 2 || (auth == 1 && auth==0)"
              @click="showModal(item)"
              class="fa-clickable"
              icon="trash-alt"
            />
            <font-awesome-icon
              v-if="item.auth == 1 && auth ==0"
              @click="showEditModal(item)"
              class="fa-clickable ml-3"
              icon="edit"
            />
            <font-awesome-icon
              v-if="item.auth == 2 || (auth == 1 && auth==0)"
              @click="showEditModal(item)"
              class="fa-clickable ml-3"
              icon="edit"
            />
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <b-modal
      size="sm"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      ref="my-modals"
      hide-footer
      title="Delete user"
    >
      <div>
        <b-form class="d-block text-center">
          <b-form-group id="select-group-1" label="Are you sure? " label-for="select-1"></b-form-group>
          <b-button class="mr-2" @click="onDelete()" variant="success">Yes</b-button>
          <b-button @click="hideModal" variant="danger">No</b-button>
        </b-form>
      </div>
    </b-modal>
    <b-modal
      size="sm"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      ref="my-edit-modal"
      hide-footer
      title="Edit user"
    >
      <div>
        <b-form class="d-block text-center">
          <b-form-group id="select-group-1" label="Authorization: " label-for="select-1">
            <b-form-select id="select-1" v-model="selectedAuth" :options="auths" required></b-form-select>
          </b-form-group>
          <b-button class="mr-2" @click="update('b-toaster-top-center')" variant="success">Save</b-button>
          <b-button @click="hideEditModal" variant="danger">Cancel</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { db } from "@/main";
import _ from "lodash";
export default {
  name: "Users",
  props: ["login"],
  data() {
    return {
      events: [],
      selected: "",
      headerBgVariant: "dark",
      headerTextVariant: "light",
      auths: ["Admin", "Member"],
      selectedAuth: "",
      auth: this.$parent.tabAuth,
      password: false,
      today: new Date().toISOString().substr(0, 10),
    };
  },
  mounted() {
    this.getEvents();
  },
  computed: {
    orderedEvents: function() {
      return _.orderBy(this.events, "auth");
    }
  },
  methods: {
    async getEvents() {
      let snapshot = await db.collection("login").get();
      let events = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        let pass = appData.password.length;
        appData.password = "";
        for (let i = 0; i < pass; i++) {
          appData.password = appData.password + "•";
        }
        events.push(appData);
      });
      this.events = events;
    },
    async showPassword(item) {
      let snapshot = await db.collection("login").get();
      if (this.password == false) {
        snapshot.forEach(doc => {
          if (item.id == doc.id) {
            this.password = true;
            item.password = doc.data().password;
          }
        });
      } else {
        snapshot.forEach(doc => {
          if (item.id == doc.id) {
            let pass = item.password.length;
            item.password = "";
            for (let i = 0; i < pass; i++) {
              item.password = item.password + "•";
            }
            this.password = false;
          }
        });
      }
    },
    async update(toaster, append = false) {
      let a = -1;
      if (this.selectedAuth != "") {
        if (this.selectedAuth == "Admin") {
          a = 1;
        } else {
          a = 2;
        }
        await db
          .collection("login")
          .doc(this.selected.id)
          .update({
            auth: a
          });
        this.getEvents();
        this.hideEditModal();
      } else {
        this.$bvToast.toast(`Select an option before saving.`, {
          title: `Save failed!`,
          variant: "danger",
          toaster: toaster,
          solid: true,
          appendToast: append
        });
      }
    },
    async onDelete() {
      if (this.$parent.tabAuth == 0 || this.$parent.tabAuth == 1) {
        await db
          .collection("login")
          .doc(this.selected.id)
          .delete();
        this.getEvents();
        this.hideModal();
      }
    },
    showModal(item) {
      this.selected = item;
      if (
        this.selected.auth == 2 &&
        (this.$parent.tabAuth == 0 || this.$parent.tabAuth == 1)
      ) {
        this.$refs["my-modals"].show();
      } else if (this.selected.auth == 1 && this.$parent.tabAuth == 0) {
        this.$refs["my-modals"].show();
      }
    },
    hideModal() {
      this.$refs["my-modals"].hide();
    },
    showEditModal(item) {
      this.selected = item;
      if (
        this.selected.auth == 2 &&
        (this.$parent.tabAuth == 0 || this.$parent.tabAuth == 1)
      ) {
        this.$refs["my-edit-modal"].show();
      } else if (this.selected.auth == 1 && this.$parent.tabAuth == 0) {
        this.$refs["my-edit-modal"].show();
      }
    },
    hideEditModal() {
      this.$refs["my-edit-modal"].hide();
    }
  }
};
</script>

<style scoped>
.users-view {
  width: 700px;
  margin: auto;
  text-align: left;
}
.col {
  width: 30px;
  text-align: center;
}
.col-right {
  width: 30px;
  text-align: right;
}
.list-row {
  color: black;
}
.head-row {
  height: 30px;
}
.fa-clickable {
  cursor: pointer;
  outline: none;
}
</style>