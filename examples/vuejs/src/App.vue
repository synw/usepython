<template>
  <div class="flex flex-row w-full p-3 primary">
    <div>Use Python</div>
    <div class="flex justify-end flex-grow">
      <py-status :py="py"></py-status>
    </div>
  </div>
  <div class="p-3">
    <py-code-block id="1" :code="code" :py="py"></py-code-block>
  </div>
</template>

<script setup lang="ts">
import PyCodeBlock from './widgets/PyCodeBlock.vue';
import PyStatus from './widgets/PyStatus.vue';
import { py } from './state';
const code = `
print('starting python script');
a = 1
b = 2
print('finished python script');
# return value
a + b`
</script>




