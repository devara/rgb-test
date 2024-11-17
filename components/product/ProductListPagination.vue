<template>
  <div class="!mt-8 flex items-center">
    <span class="items-center hidden space-x-3 md:inline-flex">
      <label>Page</label>
      <select
        v-model="pageSetting.page"
        class="items-center px-3 py-2 border rounded-lg">
        <option
          v-for="n in listMeta?.totalPages ?? 2"
          :key="n"
          :value="n">
          {{ n }}
        </option>
      </select>
      <label> of {{ listMeta?.totalPages ?? 1 }}</label>
    </span>

    <span class="inline-flex items-center mx-auto space-x-3">
      <button
        v-if="pageSetting.page > 1"
        @click="togglePage('prev')">
        &#8592; Prev
      </button>
      <button
        v-if="(listMeta?.totalPages ?? 1) > pageSetting.page"
        @click="togglePage('next')">
        Next &#8594;
      </button>
    </span>

    <span class="inline-flex items-center space-x-3 place-self-end">
      <label>Per page</label>
      <select
        v-model="perPage"
        class="items-center px-3 py-2 border rounded-lg">
        <option
          v-for="val in [5, 10, 15]"
          :key="val"
          :value="val">
          {{ val }}
        </option>
      </select>
    </span>
  </div>
</template>

<script lang="ts" setup>
const {
  pageSetting,
  listMeta,
} = storeToRefs(useProductStore())

const perPage = ref(pageSetting.value.per_page)

function togglePage (value: 'prev' | 'next') {
  if (value === 'next')
    pageSetting.value.page++
  else
    pageSetting.value.page--
}

watch(perPage, (value) => {
  pageSetting.value.page     = 1
  pageSetting.value.per_page = value
})
</script>
