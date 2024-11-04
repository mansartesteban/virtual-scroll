<template>
    <div ref="container" class="virtual-scroll-container">
        <div ref="inner" class="virtual-scroll-inner" :style="`height: ${totalHeight}px`">
            <component v-for="visibleItem in visibleItems" :is="visibleItem"></component>
        </div>
    </div>
</template>

<script setup>
import useVirtualScroll from "./useVirtualScroll"
import { findAllIndex } from "./utils"
import { useSlots, ref, computed, onMounted } from "vue"

const slots = useSlots()

const itemAttributeIdentifier = "__virtual__item__"

const boundaries = ref({ from: 0, to: 1 })

const items = computed(() => slots?.default?.()[0].children)
items.value.forEach(element => {
    if (!element.props) {
        element.props = {}
    }

    element.props[itemAttributeIdentifier] = ""
})


const visibleItems = computed(() => items.value?.slice(boundaries.value.from, boundaries.value.to))

const cumulativeHeights = ref([])
const averageHeight = computed(() => cumulativeHeights.value[cumulativeHeights.value.length - 1] / (cumulativeHeights.value.length || 1))

const totalHeight = computed(() => {
    let knownHeights = cumulativeHeights.value[cumulativeHeights.value.length - 1]
    let supposedHeights = (items.value?.length - cumulativeHeights.value.length) * averageHeight.value
    return knownHeights + supposedHeights
})

const container = ref()
const inner = ref()

const populateEmptyArea = async (lastCumulativeHeight, containerHeight) => {

    let a = 1
    while (lastCumulativeHeight <= containerHeight) {
        boundaries.value.to++
        await (() => new Promise(resolve => setTimeout(resolve, 0)))()

        let item = container.value.querySelector(`[${itemAttributeIdentifier}]:last-child`)
        let style = window.getComputedStyle(item)
        let height = parseFloat(style.marginTop) + parseFloat(style.marginBottom) + item.offsetHeight
        // let item = items.value[boundaries.value.to]
        // let height = item.offsetHeight

        lastCumulativeHeight += height
        cumulativeHeights.value.push(lastCumulativeHeight)
    }
    return lastCumulativeHeight
}

onMounted(() => {

    let lastCumulativeHeight = 0
    let containerHeight = container.value.offsetHeight

    lastCumulativeHeight = populateEmptyArea(lastCumulativeHeight, containerHeight)

    container.value.addEventListener("scroll", async (e) => {
        let matching = findAllIndex(cumulativeHeights.value, h => e.target.scrollTop <= h && e.target.scrollTop + containerHeight >= h)
        boundaries.value.from = Math.min(...matching)
        boundaries.value.to = Math.max(...matching)

        inner.value.style.paddingTop = `${cumulativeHeights.value[matching[0]]}px`

        lastCumulativeHeight = await populateEmptyArea(lastCumulativeHeight, containerHeight + e.target.scrollTop)

    })
})
</script>

<style scoped>
.virtual-scroll-container {
    overflow-y: auto;
}

.virtual-scroll-inner {
    overflow: clip;
}
</style>