<template>
  <div>
    <Navbar
      v-if="page"
      :page="page"
      :extend="extend"
      @updateDisplay="updateDisplay"
      @changeExtend="changeExtend"
    />
    <div
      v-if="extend && !bp.up.sm"
      @click="extend = !extend"
      class="z-10 w-screen h-screen fixed top-0 left-0 bg-gray-500 opacity-25"
    ></div>
    <div class="sections text-left relative h-full" :class="margin">
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
        :display="display"
        @click="updateSection"
        @updateDisplay="updateDisplay"
      />
    </div>
  </div>
</template>

<script>
import Form from "./Form";
import Table from "./Table";
import Navbar from "./Navbar";
import api from "@/apis/section";
import bp from "@/plugins/breakpoints";
export default {
  components: {
    Form,
    Table,
    Navbar,
  },
  data() {
    return {
      bp,
      extend: true,
      show: false,
      display: -1,
      section: {},
      page: false,
      action: "create",
    };
  },
  async created() {
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
    margin: function() {
      if (this.extend && this.bp.up.sm) {
        return "ml-px220";
      }
      return "ml-14";
    },
  },
  methods: {
    changeExtend: function() {
      this.extend = !this.extend;
    },
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
    updateSection(action, section) {
      this.action = action;
      this.section = section;
      this.show = !this.show;
    },
    updateDisplay(section,view) {
      if (section.type === "section") {
        if (this.display === section.id && !view) {
          this.display = -1;
        } else {
          this.display = section.id;
          var offset = 100; // sticky nav height
          let elm = document.getElementById(`section${section.id}`); // element you are scrolling to
          window.scroll({
            top: elm.offsetTop - offset,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        this.$router.push({ path: "/lectures/" + section.id });
        window.scrollTo(0, 0);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sections {
  margin-left: 200px;
}
.sections > button {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
}
</style>
