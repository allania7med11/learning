<template>
  <div class="modal" ref="modal" @click="updateShow">
    
    <div v-if="action !== 'delete'" class="card">
      {{ section }}
      <div @click="$emit('show')" class="close">
        <i class="fa fa-times"></i>
      </div>
      <form @submit="submit">
        <div class="title">{{ title }}</div>
        <label for="ftitle">Title:</label>
        <input
          type="text"
          v-model="section.title"
          id="ftitle"
          title="title"
          required
        />
        <label for="fdescription">Description:</label>
        <input
          type="text"
          v-model="section.description"
          id="fdescription"
          title="description"
          required
        />
        <template v-if="section.type==='section'">
          <label for="fbody">Body:</label>
          <input
            type="text"
            v-model="section.body"
            id="fbody"
            title="body"
            required
          />
        </template>

        <div class="text-center">
          <button
            v-if="action == 'create'"
            type="submit"
            class="btn bg-primary"
          >
            Create
            <i class="fa fa-plus ml-1"></i>
          </button>
          <button v-else type="submit" class="btn bg-warning">
            Update
            <i class="fa fa-pencil ml-1"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="card" v-else>
      <div @click="$emit('show')" class="close">
        <i class="fa fa-times"></i>
      </div>
      <form @submit="submit" class="text-center text-2xl">
        Are you sure you want to delete
        <span class="font-bold">{{ section.title }}</span> {{ section.type }}?
        <div class="text-center">
          <button type="submit" class="btn bg-danger mt-5 text-xl">
            Delete
            <i class="fa fa-trash ml-1"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show", "action", "section"],
  computed: {
    title() {
      return this.action == "create"
        ? `Create new ${ this.section.type}`
        : `Update ${this.section.type}`;
    },
  },
  created() {
    debugger; // eslint-disable-line no-debugger

    console.log("form",this.section)
  },
  methods: {
    submit: function(evt) {
      evt.preventDefault();
      this.$emit("submit", this.section);
    },
    updateShow(evt) {
      if (evt.target == this.$refs.modal) {
        this.$emit("show");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  //display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.2); /* Black w/ opacity */
}
.card {
  position: relative;
  z-index: 2;
  margin: auto;
  background-color: white;
  max-width: 800px;
  padding: 30px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 8px 8px 0 rgba(0, 0, 0, 0.3);
  }
}
.card .title {
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.card input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 0.3s;
  &:focus {
    outline: none !important;
    border: 1px solid blue;
    box-shadow: 0 0 1px blue;
  }
}
.card .close {
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px 10px;
  padding: 5px;
  color: gainsboro;
  &:hover {
    color: grey;
  }
}
</style>
