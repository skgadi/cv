<template>
<div style="height:calc(75vh - 41px ); width:100%">
  <object class="pdf" 
            :data=
"pdfUrl"
            width="100%"
            height="100%">
    </object>
</div>

</template>

<script setup lang="ts">
defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
});

//import PDFViewer from 'pdf-viewer-vue'

</script>
