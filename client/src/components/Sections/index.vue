<template>
  <div class="sections">
    <button
      class="btn bg-primary"
      @click="updatesection('create', pageDefault)"
    >
      <i class="fa fa-plus" aria-hidden="true"></i>
      New page
    </button>
    <button
      class="btn bg-primary"
      @click="updatesection('create', sectionDefault)"
    >
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
      pageDefault: {
        type: "page",
        title: null,
        description: null,
      },
      sectionDefault: {
        type: "section",
        title: null,
        description: null,
        body: null
      },
      section: {},
      action: "create",
    };
  },
  async created() {
    await this.updatesections();
  },
  methods: {
    async submit(section) {
      try {
        switch (this.action) {
          case "create":
            await api.create(section)
            break;
          case "update":
            await api.update(section.id,section)
            break;
          case "delete":
            await api.delete(section.id)
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
        let response = await api.read();
        this.sections = response.data;
      } catch (err) {
        console.log({ err });
      }
    },
    async updatesection(action, section) {
      this.action = action;
      this.section = section;
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
