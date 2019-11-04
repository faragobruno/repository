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
      hover
      selectable
      :items="profItems"
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
import { mapState, mapActions } from "vuex";
export default {
  name: "Professions",
  data(){
      return{
        selectMode: 'single',
        sortBy: "id",
        sortDesc: false,
      }
  },
  computed: {
    ...mapState(["profFields", "profItems"])
  },
  methods: {
    ...mapActions(["createProfessions"]),
    showModal() {
        console.log(1)
      this.$refs["my-modal"].show();
    },
  }
};
</script>

<style scoped>
.table-view {
  width: 1000px;
  margin: auto;
}
</style>