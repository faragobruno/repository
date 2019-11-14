<template>
  <div class="input-view">
    <b-form @submit.prevent="onSubmit('b-toaster-top-center')">
      <a>
        <b-button class="btn-bekuldes" v-b-toggle.collapse-1 variant="primary">
          Eddigi beküldések:
          <b-badge variant="light">{{tableSize}}</b-badge>
        </b-button>
        <b-collapse v-if="isbekuldott" id="collapse-1" class="mt-2">
          <b-card>
            <b-table
              striped
              sticky-header
              small
              outlined
              bordered
              :select-mode="selectMode"
              selectable
              selected-variant="active"
              @row-selected="showModal"
              hover
              :items="events"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              responsive="sm"
            >
              <template  v-slot:cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                </template>
              </template>
            </b-table>
            <b-modal :header-bg-variant="headerBgVariant" :header-text-variant="headerTextVariant" scrollable  ref="my-modals" hide-footer title="Személyes adatok">
              <div>
                <b-form>
                  <b-form-group id="input-group-1" label="Adós nettó jövedelme (FT): " label-for="input-1">
                    <b-form-input
                      disabled="disabled"
                      id="input-1"
                      v-model="modelForm.adosjov"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-2" label="KHR státusz: " label-for="input-2">
                    <b-form-input
                      disabled="disabled"
                      id="input-2"
                      v-model="modelForm.khr"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-3" label="Születési dátum: " label-for="input-3">
                    <b-form-input
                      disabled="disabled"
                      id="input-3"
                      v-model="modelForm.szuldatum"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-4" label="Munkaviszony jellege: " label-for="input-4">
                    <b-form-input
                      disabled="disabled"
                      id="input-4"
                      v-model="modelForm.munviszjell"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-5" label="Jelenlegi munkaviszony időtartama: " label-for="input-5">
                    <b-form-input
                      disabled="disabled"
                      id="input-5"
                      v-model="modelForm.munviszido"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-6" label="Hová kapja jövedelmét?: " label-for="input-6">
                    <b-form-input
                      disabled="disabled"
                      id="input-6"
                      v-model="modelForm.hovajov"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-7" label="Fennálló hitelei: " label-for="input-7">
                    <b-form-input
                      disabled="disabled"
                      id="input-7"
                      v-model="modelForm.fennallohitel"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-8" label="Havi törlesztőrészletei / keret: " label-for="input-8">
                    <b-form-input
                      disabled="disabled"
                      id="input-8"
                      v-model="modelForm.torleszto"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-9" label="Állandó lakcím: " label-for="input-9">
                    <b-form-input
                      disabled="disabled"
                      id="input-9"
                      v-model="modelForm.lakcim"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-10" label="Eltartottak száma a háztartásban: " label-for="input-10">
                    <b-form-input
                      disabled="disabled"
                      id="input-10"
                      v-model="modelForm.eltart"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-11" label="E-mail cím: " label-for="input-11">
                    <b-form-input
                      disabled="disabled"
                      id="input-11"
                      v-model="modelForm.email"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-12" label="Telefonszám: " label-for="input-12">
                    <b-form-input
                      disabled="disabled"
                      id="input-12"
                      v-model="modelForm.telefon"
                    ></b-form-input>
                  </b-form-group>
                </b-form>
              </div>
            </b-modal>
          </b-card>
        </b-collapse>
      </a>
      <b-tabs v-model="tabIndex" content-class="mt-3">
        <b-tab title="Hitel adatok" active>
          <b-list-group class="list-view">
            <b-container class="container-view" fluid>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Hitelösszeg:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="input-small" v-model="form.hitelosszeg" required></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Futamidő:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      id="input-small"
                      v-model="form.futamido"
                      :options="futam"
                      required
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-container>
          </b-list-group>
          <div class="text-center">
            <b-button-group class="mt-3">
              <b-button @click="tabIndex++">Tovább</b-button>
            </b-button-group>
          </div>
        </b-tab>
        <b-tab title="Személyes adatok">
          <b-list-group >
            <b-container class="container-view" fluid >
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Adós nettó jövedelme (FT):</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="input-small" v-model="form.adosjov" required></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">KHR státusz:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      id="input-small"
                      v-model="form.khr"
                      :options="khrstatusz"
                      required
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Születési dátum:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="input-small" v-model="form.szuldatum" required></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Munkaviszony jellege:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      id="input-small"
                      v-model="form.munviszjell"
                      :options="munjell"
                      required
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Jelenlegi munkaviszony időtartama:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      id="input-small"
                      v-model="form.munviszido"
                      :options="munido"
                      required
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Hová kapja jövedelmét?:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      id="input-small"
                      v-model="form.hovajov"
                      :options="hovajovedelem"
                      required
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Fennálló hitelei:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      id="input-small"
                      v-model="form.fennallohitel"
                      :options="fennhitel"
                      required
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Havi törlesztőrészletei / keret:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="input-small" v-model="form.torleszto" required></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Állandó lakcím:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="input-small" v-model="form.lakcim" required></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Eltartottak száma a háztartásban:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-select
                      id="input-small"
                      v-model="form.eltart"
                      :options="eltartSzam"
                      required
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">E-mail cím:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="input-small" v-model="form.email" required></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="my-1">
                  <b-col sm="4">
                    <label for="input-small">Telefonszám:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="input-small" v-model="form.telefon" required></b-form-input>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-container>
          </b-list-group>
          <b-button class="mt-3" type="submit" variant="primary">Beküldés</b-button>
          <h1></h1>
        </b-tab>
      </b-tabs>
    </b-form>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  name: "Creditdatas",
  props: ["login"],
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      let snapshot = await db.collection("creditDatas").get();
      let events = [];
      let maxId=0;
      snapshot.forEach(doc => {
        let finalData = {
          id: "",
          hitelosszeg: "",
          futamido: "",
          email: "",
          lakcim: "",
          telefonszam: ""
        }
        if(doc.data().creditId > maxId){
          maxId=doc.data().creditId
          this.creditId=maxId
        }
        if (doc.data().username == this.$parent.user) {
          let appData = doc.data();
          appData.id = doc.id;
          finalData.lakcim = appData.lakcim;
          finalData.email = appData.email;
          finalData.hitelosszeg = appData.hitelosszeg;
          finalData.futamido = appData.futamido;
          finalData.telefonszam = appData.telefon;
          finalData.id = appData.creditId;
          events.push(finalData);
        }
      });
      if (events.length > 0) {
        this.isbekuldott = true;
      }
      this.tableSize = events.length;
      this.events = events;
    },
    async onSubmit(toaster, append = false) {
      if (this.form.hitelosszeg && this.form.futamido) {
        this.creditId = this.creditId+1
        await db.collection("creditDatas").add({
          hitelosszeg: this.form.hitelosszeg,
          futamido: this.form.futamido,
          email: this.form.email,
          username: this.$parent.user,
          telefon: this.form.telefon,
          lakcim: this.form.lakcim,
          creditId: this.creditId
        });
        await db.collection("creditPersonDatas").add({
          adosnettojov: this.form.hitelosszeg,
          khrstatus: this.form.khr,
          email: this.form.email,
          lakcim: this.form.lakcim,
          munviszjell: this.form.munviszjell,
          jelenmunviszido: this.form.munviszido,
          hovajov: this.form.hovajov,
          telefon: this.form.telefon,
          eltartottszam: this.form.eltart,
          fennhitel: this.form.fennallohitel,
          szuldatum: this.form.szuldatum,
          havitorleszto: this.form.torleszto,
          creditId: this.creditId
        });
        this.$bvToast.toast(`Az adatok sikeresen feltöltődtek!`, {
          title: `Beküldés`,
          toaster: toaster,
          variant: "success",
          solid: true,
          appendToast: append
        });
          (this.form.hitelosszeg = ""),
          (this.form.adosjov = ""),
          (this.form.futamido = ""),
          (this.form.khr = ""),
          (this.form.email = ""),
          (this.form.lakcim = ""),
          (this.form.munviszjell = ""),
          (this.form.munviszido = ""),
          (this.form.hovajov = ""),
          (this.form.telefon = ""),
          (this.form.eltart = ""),
          (this.form.fennallohitel = ""),
          (this.form.szuldatum = ""),
          (this.form.torleszto = "");
        this.getEvents();
        this.tabIndex--;

      } else {
        this.$bvToast.toast(`Minden mező kitöltése kötelező!`, {
          title: `Hiba`,
          toaster: toaster,
          variant: "danger",
          solid: true,
          appendToast: append
        });
      }
    },
    async showModal(items) {
      this.selected = items;
      this.personId = this.selected[0].id
      let snapshot = await db.collection("creditPersonDatas").get();
      snapshot.forEach(doc => {
        if (doc.data().creditId == this.personId) {
          let appData = doc.data();
          appData.id = doc.id;
          this.modelForm.adosjov = appData.adosnettojov,
          this.modelForm.khr = appData.khrstatus,
          this.modelForm.email = appData.email,
          this.modelForm.lakcim = appData.lakcim,
          this.modelForm.munviszjell = appData.munviszjell,
          this.modelForm.munviszido = appData.jelenmunviszido,
          this.modelForm.hovajov = appData.hovajov,
          this.modelForm.telefon = appData.telefon,
          this.modelForm.eltart = appData.eltartottszam,
          this.modelForm.fennallohitel = appData.fennhitel,
          this.modelForm.szuldatum = appData.szuldatum,
          this.modelForm.torleszto = appData.havitorleszto
        }
      });
      if (this.selected[0].id) {
        this.$refs["my-modals"].show();
      }
    }
  },
  data() {
    return {
      personId:0,
      creditId:0,
      modelForm: {
        eltart: "",
        adosjov: "",
        email: "",
        telefon: "",
        lakcim: "",
        torleszto: "",
        fennallohitel: "",
        hovajov: "",
        munviszido: "",
        munviszjell: "",
        szuldatum: "",
        khr: ""
      },
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      selected: [],
      sortBy: "id",
      sortDesc: false,
      selectMode: "single",
      submitted: false,
      events: [],
      tableSize: 0,
      isbekuldott: false,
      disabled: false,
      form: {
        hitelosszeg: "",
        futamido: "",
        eltart: "",
        adosjov: "",
        email: "",
        telefon: "",
        lakcim: "",
        torleszto: "",
        fennallohitel: "",
        hovajov: "",
        munviszido: "",
        munviszjell: "",
        szuldatum: "",
        khr: ""
      },
      tabIndex: 1,
      khrstatusz: ["Aktív", "Passzív", "Nem szerepel"],
      munjell: [
        "Határozatlan",
        "Határozott",
        "Vállalkozói",
        "Nyugdíjas",
        "Egyéb"
      ],
      munido: [
        "Kevesebb mint 3 hónap",
        "3-6 hónap",
        "6-12 hónap",
        "12 hónap fölött"
      ],
      hovajovedelem: [
        "készpénz",
        "banki átutalás (bankok választási lehetősége)"
      ],
      fennhitel: [
        "Hitelkártya",
        "Folyószámla hitelkeret",
        "Jelzálog",
        "Személyi kölcsön",
        "Áruhitel",
        "Egyéb"
      ],
      futam: [1, 2, 3, 4, 5, 6, 7, 8],
      eltartSzam: [1, 2, 3, 4]
    };
  }
};
</script>

<style scoped>
.input-view {
  width: 1000px;
  margin: auto;
}
.container-view {
  text-align: left;
  border: 1px;
}
.row-view {
  width: 1000px;
  margin: auto;
}
.btn-bekuldes {
  width: 150px;
  height: 30px;
  font-size: 12px;
  align-content: right;
}
</style>