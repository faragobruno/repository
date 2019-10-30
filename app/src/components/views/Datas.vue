<template>
  <div class="table-view">
    <b-table
      striped
      sticky-header
      outlined
      bordered
      hover 
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
    ></b-table>

    <b-button id="show-btn" @click="showModal" class="success-btn" variant="success">Add</b-button>
    <b-button variant="danger">Delete</b-button>

    <b-modal ref="my-modal" hide-footer title="Add a person to the database">
      <div class="d-block text-center">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Last Name: " label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter your name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="select-group-2" label="Gender: " label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="form.gender"
          :options="genders"
          required
          placeholder="Pick your gender"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Email:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter your email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Age:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.age"
          required
          placeholder="Enter your age"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" @click="toast('b-toaster-top-center')" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
//import { mapMutations } from 'vuex'
export default {
  name: 'Home',
   methods: {
     //...mapMutations([
     // 'createAddition'
     //]),
     toast(toaster, append = false) {
        this.$bvToast.toast(`Successful submit!`, {
          title: `Adding`,
          toaster: toaster,
          solid: true,
          appendToast: append
        })
      },
      showModal() {
        this.$refs['my-modal'].show()
      },
      onSubmit() {
        this.form = {
        name: '',
        gender: '',
        email: '',
        age: null
      }
      },
      onReset() {
        this.form.name = ''
        this.form.gender = ''
        this.form.email = ''
        this.form.age = null

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
   },
  data() {
      return {
        form: {
          name: '',
          gender:'',
          email: '',
          age: null
        },
        genders:['male','female'],
        sortBy: 'age',
        sortDesc: false,
        show:true,
        
      }
    }
  }
</script>


<style scoped>
.table-view{
  width: 1000px;
  margin: auto;
}
.success-btn{
  margin-right: 5px;
  width: 73px;
}
</style>
