<template>
  <div class="pb-64">
    <div class="flex justify-center">
      <div class="grid grid-cols-1 md:grid-cols-1  p-2">

        <div
          v-for="(section, index) in sections"
          :key="index"
          :id="`section${section.id}`"
        >
        <div class="text-left relative m-2 p-6 w-full mx-auto bg-white rounded-xl shadow-md  flex flex-col">
          <div class="absolute top-0 right-0 px-2 py-1">
            <button
              @click="$emit('click', 'update', section)"
              class="btn text-gray-800  px-1 py-1"
            >
              <i class="fa fa-pencil"></i>
            </button>
            <button
              @click="$emit('click', 'delete', section)"
              class="btn text-gray-800   px-1 py-1"
            >
              <i class="fa fa-trash"></i>
            </button>
          </div>
          <div class="text-lg text-gray-600  flex py-2">
            {{ section.title }}
          </div>
          <p v-if="display !== section.id" class="text-sm px-2 text-gray-800">
            {{
              section.description.length > 500
                ? section.description.slice(490) + "..."
                : section.description
            }}
          </p>
          <div v-else class="text-sm px-2 text-gray-800">
            {{ section.body }}
          </div>
          <button
            @click="$emit('updateDisplay', section)"
            class="text-blue-500 border-blue-700 focus:border-blue-900 focus:outline-none border-2 
         mt-6 inline-block whitespace-nowrap w-40 shadow-md  hover:shadow-xl rounded-lg"
          >
            <span class="px-2" v-text="view(section)"></span>
            <i
              class="fa px-1"
              :class="
                display === section.id ? 'fa-arrow-left' : 'fa-arrow-right'
              "
              aria-hidden="true"
            ></i>
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sections","display"],
  data() {
    return {
      fields: [
        { label: "Title", value: "title" },
        { label: "Description", value: "description" },
      ],
    };
  },
  methods: {
    view(section) {
      if (section.type === "page") {
        return "Discover more";
      }
      return this.display === section.id ? "View less" : "View more";
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-container {
  max-width: 95%;
  margin: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  display: grid;
  align-items: stretch;
  align-content: center;
  grid-template-columns: auto auto auto;
  background-color: white;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0px 8px 8px 0 rgba(0, 0, 0, 0.3);
  }
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.item {
  padding: 10px;
  color: rgb(107, 99, 110);
  font-size: 18px;
}
.rg_1 {
  background-color: #f8f8ff;
  color: #01987a;
}
.icon {
  cursor: pointer;
  padding: 7px;
  margin: 5px;
  color: white;
  border-radius: 4px;
}
</style>
