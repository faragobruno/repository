<template>
  <div class="table-view">
    <b-row class="row-view">
      <b-col>
        <b-form-input class="input-row" v-model="search" size="sm" placeholder="Search name..."></b-form-input>
      </b-col>
      <b-col>
        <b-button size="sm" @click="onSearch()" type="submit" variant="primary">Search</b-button>
      </b-col>
    </b-row>
    <b-table
      striped
      sticky-header
      outlined
      bordered
      :select-mode="selectMode"
      selected-variant="active"
      @row-selected="showModal"
      hover
      selectable
      :items="events"
      :fields="profFields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
        </template>
      </template>
    </b-table>
    <b-button variant="success" class="w-50">
    <i><font-awesome-icon icon="file-excel" size="lg"/></i>
    <export-excel :data="events" worksheet="Bookings" name="Bookings.xls"></export-excel>
    </b-button>
    <b-modal
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      ref="my-modals"
      hide-footer
      title="Edit"
    >
      <div>
        <b-form @submit.prevent="onSubmit(selected)">
          <b-form-group id="select-group-1" label="Accept request? " label-for="select-1">
            <b-form-select id="select-1" v-model="form.isAllowed" :options="allowed" required></b-form-select>
          </b-form-group>
          <b-button type="submit" @click="toast('b-toaster-top-center')" variant="primary">Save</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/main";
export default {
  name: "Requests",
  props: ["calendar"],
  data() {
    return {
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ],
      selectMode: "single",
      sortDesc: false,
      events: [],
      selected: [],
      allowed: [true, false],
      form: {
        isAllowed: false
      },
      sortBy: "start",
      headerBgVariant: "dark",
      headerTextVariant: "light",
      search: ""
    };
  },
  computed: {
    ...mapState(["profFields", "profItems"])
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      let snapshot = await db.collection("calEvent").get();
      let events = [];
      let s = this.search;
      snapshot.forEach(doc => {
        if (s != "") {
          if (
            doc
              .data()
              .name.toLowerCase()
              .includes(s.toLowerCase())
          ) {
            let appData = doc.data();
            appData.id = doc.id;
            events.push(appData);
          }
        } else {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
        }
      });
      this.search = "";
      this.events = events;
    },
    onSearch() {
      this.getEvents();
    },
    async onSubmit(selected) {
      await db
        .collection("calEvent")
        .doc(selected[0].id)
        .update({
          isAllowed: this.form.isAllowed
        });
      this.getEvents();
      this.hideModal();
    },
    onRowSelected(items) {
      this.selected = items;
    },
    showModal(items) {
      this.selected = items;
      if (this.selected[0].id) {
        this.$refs["my-modals"].show();
      }
    },
    hideModal() {
      this.$refs["my-modals"].hide();
    },
    toast(toaster, append = false) {
      this.$bvToast.toast(`Successful submit!`, {
        title: `Edit`,
        variant: "success",
        toaster: toaster,
        solid: true,
        appendToast: append
      });
    }
  }
};
</script>

<style scoped>
.table-view {
  width: 1000px;
  margin: auto;
}
.row-view {
  width: 280px;
}
.input-row {
  width: 150px;
}
</style>