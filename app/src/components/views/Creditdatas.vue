<template>
  <div class="input-view">
    <b-form @submit.prevent="onSubmit('b-toaster-top-center')">
      <b-tabs v-model="tabIndex" content-class="mt-3">
        <b-tab title="Hitel adatok" active>
          <b-list-group class="list-view">
            <b-container class="container-view" fluid>
              <b-list-group-item >
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
          <b-list-group>
            <b-container class="container-view" fluid>
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
          </b-list-group >
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
  methods: {
    async onSubmit(toaster, append = false) {
      console.log(this.form.id);
      if (this.form.hitelosszeg && this.form.futamido) {
        await db.collection("creditDatas").add({
          hitelosszeg: this.form.hitelosszeg,
          futamido: this.form.futamido,
          email: this.form.email,
          username: this.$parent.user,
          telefon: this.form.telefon,
          lakcim: this.form.lakcim
          //personId: this.form
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
          havitorleszto: this.form.torleszto
        });
        this.$bvToast.toast(`Az adatok sikeresen feltöltődtek!`, {
          title: `Beküldés`,
          toaster: toaster,
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
      } else {
        this.$bvToast.toast(`Minden mező kitöltése kötelező!`, {
          title: `Hiba`,
          toaster: toaster,
          solid: true,
          appendToast: append
        });
      }
    }
  },
  data() {
    return {
      submitted: false,
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
.list-view{
    
}
</style>