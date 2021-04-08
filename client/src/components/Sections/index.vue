<template>
  <div class="sections">
    {{ sectionId }}
    <Navbar v-if="page" :page="page" @updateDisplay="updateDisplay" />
    <button
      class="btn bg-primary"
      @click="updateSection('create', defaultSection('page'))"
    >
      <i class="fa fa-plus" aria-hidden="true"></i>
      New page
    </button>
    <button
      class="btn bg-primary"
      @click="updateSection('create', defaultSection('section'))"
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
    <Table
      :sections="page.sections"
      @click="updateSection"
      @updateDisplay="updateDisplay"
    />
  </div>
</template>

<script>
import Form from "./Form";
import Table from "./Table";
import Navbar from "./Navbar";
import api from "@/apis/section";
export default {
  components: {
    Form,
    Table,
    Navbar
  },
  data() {
    return {
      show: false,
      display: -1,
      section: {},
      page: false,
      action: "create",
    };
  },
  async created() {
    debugger; // eslint-disable-line no-debugger
    this.section = this.defaultSection("page");
    await this.updatePage();
  },
  watch: {
    async sectionId() {
      this.section = this.defaultSection("page");
      await this.updatePage();
    },
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
        await this.updatePage();
        this.show = false;
      } catch (err) {
        console.log({ err });
      }
    },
    async updatePage() {
      try {
        let response = await api.read(this.sectionId);
        if (this.sectionId === null) {
          this.page = this.defaultSection("page");
          this.page.sections = response.data;
        } else {
          this.page = response.data;
        }
      } catch (err) {
        console.log({ err });
      }
    },
    async updateSection(action, section) {
      this.action = action;
      this.section = section;
      this.show = !this.show;
    },
    async updateDisplay(section) {
      if (section.type === "section") {
        if (this.display === section.id) {
          this.display = -1;
        } else {
          this.display = section.id;
        }
      } else {
        this.$router.push({ path: "/lectures/" + section.id });
      }
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
