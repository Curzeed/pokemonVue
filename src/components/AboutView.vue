<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const search = computed({
      get() {
        return route.query.search ?? ''
      },
      set(search) {
        router.replace({query: {search}})
      }
    })

    console.log(search.value)

    return {
      search
    }
  }
}
</script>

<template>
  <h2>AboutView</h2>
  <label>
    Search: <input v-model="search" maxlength="20">
  </label>
</template>
