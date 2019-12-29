<template>
  <v-container class="lockerwitdraw">
    <v-row align="start" justify="center">
      <v-col cols="6">
        <ValidationObserver ref="form">
          <form>
            <div class="text-center headline mb-5">รับของ</div>
            <v-text-field
              v-model.trim="locker.size"
              label="ขนาดล็อกเกอร์"
              placeholder="ขนาดล็อกเกอร์"
              outlined
              readonly
            >
            </v-text-field>
            <v-text-field
              v-model.trim="locker.time"
              label="ฝากไว้เป็นเวลา(ชั่วโมง)"
              placeholder="ฝากไว้เป็นเวลา(ชั่วโมง)"
              outlined
              readonly
            >
            </v-text-field>
            <v-text-field
              v-model.trim="locker.price"
              label="เงินที่ต้องจ่าย"
              placeholder="เงินที่ต้องจ่าย"
              type="number"
              outlined
              readonly
            >
            </v-text-field>
            <ValidationProvider
              name="Password"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model.trim="price"
                label="จำนวนเงินที่ใส่"
                placeholder="จำนวนเงินที่ใส่"
                type="number"
                outlined
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider
              name="Password"
              rules="required"
              v-slot="{ errors }"
            >
              <span class="red--text">{{ errors[0] }}</span>
              <v-text-field
                v-model.trim="password"
                type="password"
                label="รหัสผ่าน"
                placeholder="รหัสผ่าน"
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
      price: null,
      password: ""
    };
  },

  created() {
    axios
      .get(
        `https://us-central1-lockbox-api.cloudfunctions.net/lockBox/${this.$route.params.id}`
      )
      .then(res => {
        res.data["time"] = Math.ceil(
          (Math.round(new Date().getTime() / (1000 * 60)) - res.data["start"]) /
            60
        );
        if (res.data["time"] == 0) res.data["time"] = 1;
        if (res.data["size"] == "M") {
          res.data["price"] = res.data["time"] * 30;
        } else if (res.data["size"] == "L") {
          res.data["price"] = res.data["time"] * 40;
        } else if (res.data["size"] == "XL") {
          res.data["price"] = res.data["time"] * 50;
        }
        this.locker = res.data;
      });
  },

  methods: {
    async OnSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) return;
        if (this.locker.password != this.password)
          return this.alertify.error("รหัสผ่านไม่ถูกต้อง");
        if (this.locker.price > this.price)
          return this.alertify.error("จำนวนเงินไม่พอ กรุณาใส่เพิ่ม");
        delete this.locker["price"];
        delete this.locker["time"];
        this.locker.password = null;
        this.locker.start = null;
        axios
          .put(
            `https://us-central1-lockbox-api.cloudfunctions.net/lockBox/${this.$route.params.id}`,
            this.locker
          )
          .then(() => {
            this.alertify.success("ทำรายการสำเร็จแล้ว");
            this.$router.push({ name: "home" });
          })
          .catch(() => {
            this.alertify.error("ไม่สามารถทำรายการได้ กรุณาลองใหม่ภายหลัง");
          });
      });
    }
  }
};
</script>
