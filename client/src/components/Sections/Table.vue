<template>
  <div>
    <div class="flex justify-center">
      <div class="grid grid-cols-1 md:grid-cols-1  p-2">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="relative m-2 p-6 w-full mx-auto bg-white rounded-xl shadow-md  flex flex-col"
        >
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
          <div class="text-gray-600 flex">
            {{ section.title }}
          </div>
          <p class="text-xs text-gray-800">{{ section.description }}</p>
          <button
            class="text-blue-500 border-blue-700 focus:border-blue-900 border-2 
         mt-6 inline-block whitespace-nowrap w-32 shadow-md  hover:shadow-xl rounded-lg"
          >
            <a>
              View more
              <svg
                class="h-4 w-4 inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sections"],
  data() {
    return {
      fields: [
        { label: "Title", value: "title" },
        { label: "Description", value: "description" },
      ],
    };
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
