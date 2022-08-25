<template>
  <div v-if="pyInstallLog.stage == 0">
    <i-mdi:language-python class="ml-2 mr-5 text-2xl txt-neutral"></i-mdi:language-python>
  </div>
  <div v-else-if="[1, 2].includes(pyInstallLog.stage)" class="flex flex-row">
    <div>{{ pyInstallLog.msg }}</div>
    <div>
      <i-file-icons:config-python class="ml-2 mr-5 text-2xl"></i-file-icons:config-python>
    </div>
  </div>
  <div v-else-if="[3, 4].includes(pyInstallLog.stage)" class="flex flex-row">
    <div>{{ pyInstallLog.msg }}</div>
    <div>
      <i-file-icons:test-python class="ml-2 mr-5 text-2xl"></i-file-icons:test-python>
    </div>
  </div>
  <div v-else-if="pyInstallLog.stage == 5">
    <i-mdi:language-python class="mr-5 text-2xl" :class="isPyExecuting == false ? '' : 'txt-danger'">
    </i-mdi:language-python>
  </div>
</template>

<script setup lang="ts">
import { usePython } from "usepython";
import { useStore } from '@nanostores/vue';

const props = defineProps({
  py: {
    type: Object as typeof usePython,
    required: true
  },
});

const pyInstallLog = useStore(props.py.installLog);
const isPyExecuting = useStore(props.py.isExecuting);
</script>