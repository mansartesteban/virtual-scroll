# vue-virtual-scroll

Finally a virtual scroll which can handle a list of items with variable heights! 

## Important

For now (05 Nov 2024), two known bugs prevent to use the component safely :

- The rendering speed of item could leads to error in console when scrolling too fast when they have to show the first time 
- The last item of the list is cropped by some pixels due to the calculation which is an estimation to the total height 

I'm currently working on a workaround and will keep this readme up-to-date. Any contribution is welcomed.

## Usage 

Install it on your project :

```
npm install @mansartesteban/vue-virtual-scroll
```

Use it in a component :

```vue
<template>
  <VirtualScroll>
    <div v-for="item in items" v-html=item"></div>
  </VirtualScroll>
</template>

<script setup>
  import VirtualScroll from "@mansartesteban/vue-virtual-scroll"

  const items = ref([])

  for (let i = 0 ; i < 1000 ; i++) {
    let str = "I am the line " + i

    if (Math.random() > .5) {
      str += "<br> and my size can be different" 
    }

    items.push(str)
  } 
</script>
```

## Todo

- Handle horizontal scroll
- Recompute heights on element or window resize
- Recalculate heights on list update 
- Fix rendering speed
- Fix last item cropping 
