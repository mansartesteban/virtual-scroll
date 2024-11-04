import { ref, toRef } from "vue"

const defaultOptions = {
    displayNumber: 5,
    triggerHeight: 200,
}

const useVirtualScroll = (scrollContainer, list, options) => {

    options = { ...defaultOptions, ...options }
    list = toRef(list)

    const min = ref(0)
    const max = ref(options.displayNumber)
    const visibleItems = computed(() => list.value.slice(min.value, max.value))

    scrollContainer.addEventListener("scroll", (e) => {
        if (scrollContainer.scrollHeight - e.scrollTop <= options.triggerHeight) {
            max.value += defaultOptions.displayNumber
        }
    })

    return {
        items: visibleItems
    }

}

export default useVirtualScroll