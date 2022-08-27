<template>
  <code-editor v-model="parsedCode" :languages="[['python', 'Python']]" :display_language="false" :hide_header="true"
    @keyup.ctrl.enter="runTheCode()" theme="light" width="540px" spellcheck="false">
  </code-editor>
  <button class="mt-3 border btn" :class="canRun ? 'cursor-pointer' : 'cursor-wait'" @click="runTheCode()">
    <i-cil:media-play class="inline-block" :class="!canRun ? 'txt-lighter' : 'txt-success'"></i-cil:media-play>
    &nbsp;Execute
  </button>
  <div class="pt-3 pl-8">
    <div class="pt-3 pl-8">
      <pre v-for="row in log.stdOut" v-html="row"></pre>
    </div>
  </div>
  <div class="pt-3 pl-8" v-if="log.exception">
    <div v-html="log.exception"></div>
  </div>
  <div class="pt-3 pl-8" v-if="outputHtml">
    <div v-html="outputHtml"></div>
  </div>
</template>

<script setup lang="ts">
import 'highlight.js';
import { usePython, PyLog } from "usepython";
import CodeEditor from 'simple-code-editor';
import { computed, reactive, ref } from "vue";
import { useStore } from '@nanostores/vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  py: {
    type: Object as typeof usePython,
    required: true
  },
  code: {
    type: String,
    default: ""
  }
});

const parsedCode = ref(props.code);
const outputHtml = ref<string | null>(null);
const isExecuting = useStore(props.py.isExecuting);
const isReady = useStore(props.py.isReady);
const log = reactive<PyLog>({
  id: "",
  stdOut: [],
  stdErr: [],
  exception: ""
});

props.py.log.listen((val) => {
  if (val.id == props.id) {
    log.id = val.id;
    log.stdOut = val.stdOut;
    log.stdErr = val.stdErr;
    log.exception = val.exception;
  }
})

async function runTheCode() {
  outputHtml.value = "";
  if (!canRun) {
    return
  }
  //console.log("Run", typeof (parsedCode.value), parsedCode.value);
  const { results, error } = await props.py.run(parsedCode.value, props.id);
  console.log("PYRES", results)
  console.log("PYERR", error)
  if (results) {
    console.log("RES TYPE", typeof results, results);
    if (results instanceof Map) {
      outputHtml.value = JSON.stringify(Object.fromEntries(results.entries()), null, "  ")
    } else {
      outputHtml.value = `${results}`
    }
  }
};

const canRun = computed<Boolean>(() => {
  return isReady.value == true && isExecuting.value == false
});
</script>

<style lang="sass" scoped>
.code-block
  min-width: 48rem
</style>