<template>
  <div class="sections">
    {{ sectionId }}
    <button
      class="btn bg-primary"
      @click="updatesection('create', defaultSection('page'))"
    >
      <i class="fa fa-plus" aria-hidden="true"></i>
      New page
    </button>
    <button
      class="btn bg-primary"
      @click="updatesection('create', defaultSection('section'))"
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
      section: {},
      action: "create",
    };
  },
  async created() {
    debugger; // eslint-disable-line no-debugger
    this.section = this.defaultSection("page");
    await this.updatesections();
  },
  watch:{
    async sectionId(){
      this.section = this.defaultSection("page");
      await this.updatesections();
    }
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
        this.show = false;
      } catch (err) {
        console.log({ err });
      }
    },
    async updatesections() {
      try {
        let response = await api.read(this.sectionId);
        if (this.sectionId === null) {
          this.sections = response.data;
        }else{
          this.sections = response.data.sections;
        }
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
