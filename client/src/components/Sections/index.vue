<template>
  <div class="sections">
    {{ sectionId }}
    <button class="btn bg-primary" @click="updatesection('create', 'page')">
      <i class="fa fa-plus" aria-hidden="true"></i>
      New page
    </button>
    <button class="btn bg-primary" @click="updatesection('create', 'section')">
      <i class="fa fa-plus" aria-hidden="true"></i>
      New section
    </button>
    <Form
      v-if="show"
      :show="show"
      :action="action"
      :section="section"
      @show="show = !show"
      @submit="submit"
    />
    <Table :sections="sections" @click="updatesection" />
  </div>
</template>

<script>
import Form from "./Form";
import Table from "./Table";
import api from "@/apis/section";
export default {
  components: {
    Form,
    Table,
  },
  data() {
    return {
      show: false,
      sections: [],
      section: {},
      action: "create",
    };
  },
  async created() {
    await this.updatesections();
  },
  computed: {
    sectionId() {
      return this.$route.params.id || null;
    },
  },
  methods: {
    defaultSection(type) {
      return {
        type: type,
        title: null,
        description: null,
        body: null,
        sectionId: this.sectionId,
      };
    },
    async submit(section) {
      try {
        switch (this.action) {
          case "create":
            await api.create(section);
            break;
          case "update":
            await api.update(section.id, section);
            break;
          case "delete":
            await api.delete(section.id);
            break;
        }
        await this.updatesections();
        this.show = !this.show;
      } catch (err) {
        console.log({ err });
      }
    },
    async updatesections() {
      try {
        let response = await api.read(this.sectionId);
        this.sections = response.data;
      } catch (err) {
        console.log({ err });
      }
    },
    async updatesection(action, type) {
      console.log("section",type, this.defaultSection(type), this.$route.params);
      this.action = action;
      this.section = this.defaultSection[type];
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.sections {
  margin: auto;
  max-width: 1000px;
}
.sections > button {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
}
</style>
