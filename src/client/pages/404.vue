<template lang="pug">
  div(class="flex w-full h-full justify-center items-center")
    h1(class="text-white flex text-4xl") {{ $ml.get('404').text }}
</template>

<script>
export default {
  meta: {
    title: '404',
    meta: [
      {name: 'robots', content: 'noindex, nofollow'},
    ]
  }
}
</script>
<style>

</style>