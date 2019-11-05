<template>
  <div class="table-view">
      <b-table
      striped
      sticky-header
      outlined
      bordered
      :select-mode="selectMode"
      @click="showModal"
      selected-variant="active"
      @row-selected="onRowSelected"
      hover
      selectable
      :items="events"
      :fields="profFields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm">
      <b-modal ref="my-modal" hide-footer title="Add a person to the database">
          <div>
              <b-form>
                <b-form-group>

                </b-form-group>
              </b-form>
          </div>
      </b-modal>
    </b-table>
  </div>
</template>

<script>
import { mapState} from "vuex";
import { db } from "@/main";
export default {
  name: "Professions",
  data(){
      return{
        selectMode: 'single',
        sortBy: "id",
        sortDesc: false,
        events: [],
        selected: []
      }
  },
  computed: {
    ...mapState(["profFields", "profItems"])
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      let snapshot = await db.collection("profDatas").get();
      let events = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
      this.events = events;
    },
    async updateEvent(ev){
      await db.collection('profDatas').doc(this.currentlyEditing).update({
        name: ev.name,
        amount: ev.amount
      })
      this.selectedOpen=false
      this.currentlyEditing= null
    },
    onRowSelected(items) {
        this.selected = items
    },
    showModal(){
      this.$refs["my-modal"].show()
    }
  }
};
</script>

<style scoped>
.table-view {
  width: 1000px;
  margin: auto;
}
</style>