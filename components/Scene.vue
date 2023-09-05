<script lang="ts" setup>
import { getGraphData, initGraph } from '~/utils/graph'

const graphWrapper = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (graphWrapper.value) {
    const graph = initGraph()
    const data = getGraphData()

    graph(graphWrapper.value).graphData(data)
  }
})
</script>

<template>
<div ref="graphWrapper" />
</template>
