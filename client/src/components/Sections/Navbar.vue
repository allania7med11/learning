<template>
  <div
    :class="extend ? 'w-px220' : 'w-10'"
    class="Z-20 text-left h-screen text-xl bg-gray-800 whitespace-nowrap fixed top-12 left-0 flex flex-col pl-4 pb-4  text-gray-300"
  >
    <div>
      <span @click="$emit('changeExtend')">
        <i :class="extend ? 'fa fa-times' : 'fa fa-bars'"></i>
      </span>
    </div>
    <div v-if="$route.params.id" class="text-xl space-x-5 py-1 flex">
      <div
        class="hover:text-white cursor-pointer"
        @click="$emit('updateDisplay', parent)"
      >
        <i class="fa fa-arrow-circle-o-left"></i>
      </div>
      <div v-if="extend">
        <div>{{ page.title }}</div>
      </div>
    </div>
    <hr />
    <div class="max-h-screen pt-2 overflow-y-auto divide-y divide-gray-600">
      <div v-for="(section, key) in page.sections" :key="key">
        <div
          class="py-4 hover:text-white cursor-pointer"
          @click="$emit('updateDisplay', section)"
        >
          {{ key + 1 }}<span v-if="extend">.{{ section.title }}</span>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
export default {
  props: ["page", "extend"],
  computed: {
    parent() {
      return this.page.sectionId
        ? {
            type: "page",
            id: this.page.sectionId,
          }
        : {
            type: "page",
            id: "",
          };
    },
  },
};
</script>
<style>
body {
  @apply bg-gray-200;
}
.nav {
  width: 220px;
}
.content {
  margin-left: 200px;
}
</style>
