<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col cols="6">
        <ValidationObserver ref="form">
          <form>
            <div class="text-center headline mb-5">ฝากของ</div>
            <v-text-field
              v-model.trim="locker.size"
              label="ขนาดล็อกเกอร์"
              placeholder="ขนาดล็อกเกอร์"
              outlined
              readonly
            >
            </v-text-field>
            <ValidationProvider
              name="Password"
              rules="required"
              v-slot="{ errors }"
            >
              <span class="red--text">{{ errors[0] }}</span>
              <v-text-field
                v-model.trim="locker.password"
                type="password"
                label="รหัสผ่าน"
                placeholder="รหัสผ่าน"
                outlined
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="cPassword"
              rules="required"
              v-slot="{ errors }"
            >
              <span class="red--text">{{ errors[0] }}</span>
              <v-text-field
                v-model.trim="cPassword"
                type="password"
                label="ยืนยันรหัสผ่าน"
                placeholder="ยืนยันรหัสผ่าน"
                outlined
              >
              </v-text-field>
            </ValidationProvider>
            <v-row>
              <v-col cols="12">
                <v-row align="center" justify="center">
                  <v-btn block color="success" class="mb-3" @click="OnSubmit"
                    >ยืนยัน</v-btn
                  >
                  <v-btn block color="error" route :to="{ name: 'home' }">
                    ยกเลิก
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

export default {
  name: "LockerDeposit",

  data() {
    return {
      locker: [],
      cPassword: ""
    };
  },

  created() {
    axios
      .get(
        `https://us-central1-lockbox-api.cloudfunctions.net/lockBox/${this.$route.params.id}`
      )
      .then(res => (this.locker = res.data));
  },

  methods: {
    async OnSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) return;
        if (this.locker.password != this.cPassword) return console.log("1");
        this.locker.start = Math.round(new Date().getTime() / (1000 * 60));
        axios
          .put(
            `https://us-central1-lockbox-api.cloudfunctions.net/lockBox/${this.$route.params.id}`,
            this.locker
          )
          .then(res => {
            console.log(res.data);
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>
