<template>
  <div class="column">
    <div class="col">
      <ViewerHtml :htmlText="htmlApa" />
    </div>
    <div class="col">
      <copiable-chip label="BibTeX" :text-to-copy="inBibtex" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  inBibtex: {
    type: String,
    required: true,
  },
});

import ViewerHtml from 'components/Event/Viewers/ViewerHtml.vue';
import CopiableChip from 'src/components/Generic/CopiableChip.vue';

import { computed } from 'vue';

import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex'; // Import BibTeX plugin
import '@citation-js/plugin-doi';
import '@citation-js/plugin-csl';

const cite = computed(() => {
  try {
    const bibtex = props.inBibtex;
    const cite = new Cite(bibtex);
    return cite;
  } catch (error) {
    console.log('Error parsing BibTeX:', error);
    return null;
  }
});

const htmlApa = computed(() => {
  try {
    if (!cite.value) {
      return '<p>Error parsing BibTeX</p>';
    }
    return cite.value.format('bibliography', {
      format: 'html',
      template: 'apa',
      lang: 'en-US',
    });
  } catch (error) {
    console.error('Error formatting BibTeX:', error);
    return '<p>Error formatting BibTeX</p>';
  }
});
</script>
