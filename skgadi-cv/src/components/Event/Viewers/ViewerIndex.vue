<template>
  <viewer-html
    v-if="inEvent.type === 'html' || inEvent.type === 'rich-text'"
    :html-text="inEvent.content"
  />
  <viewer-markdown v-if="inEvent.type === 'markdown'" :markdown-text="inEvent.content" />
  <template v-if="inEvent.type === 'text'">
    {{ inEvent.content }}
  </template>
  <viewer-pdf v-if="inEvent.type === 'pdf'" :pdf-url="inEvent.content" />
  <viewer-code v-if="inEvent.type === 'code-snippet'" :inEvent="inEvent" />
  <viewer-google-drive-element
    v-if="inEvent.type === 'google-drive-element'"
    :url="inEvent.content"
  />
  <viewer-google-form v-if="inEvent.type === 'google-form'" :url="inEvent.content" />
  <viewer-i-frame v-if="inEvent.type === 'iframe'" :url="inEvent.content" />
  <viewer-you-tube v-if="inEvent.type === 'youtube'" :url="inEvent.content" />
  <viewer-you-tube-playlist v-if="inEvent.type === 'youtube-playlist'" :url="inEvent.content" />
  <viewer-image v-if="inEvent.type === 'image'" :img-url="inEvent.content" />
  <viewer-video v-if="inEvent.type === 'video'" :video-url="inEvent.content" />
  <viewer-audio v-if="inEvent.type === 'audio'" :audio-url="inEvent.content" />
  <viewer-url v-if="inEvent.type === 'link'" :in-url="inEvent.content" />
  <viewer-bibtex v-if="inEvent.type === 'bibtex'" :in-bibtex="inEvent.content" />
</template>
<script setup lang="ts">
defineProps({
  inEvent: {
    type: Object as PropType<GSK_EVENT_CONTENT>,
    required: true,
  },
});
import { type PropType } from 'vue';
import type { GSK_EVENT_CONTENT } from 'src/services/library/types/events';

import ViewerHtml from 'components/Event/Viewers/ViewerHtml.vue';
import ViewerMarkdown from 'components/Event/Viewers/ViewerMarkdown.vue';
import ViewerPdf from 'components/Event/Viewers/ViewerPdf.vue';
import ViewerCode from 'components/Event/Viewers/ViewerCode.vue';
import ViewerGoogleDriveElement from 'components/Event/Viewers/ViewerGoogleDriveElement.vue';
import ViewerGoogleForm from 'components/Event/Viewers/ViewerGoogleForm.vue';
import ViewerIFrame from 'components/Event/Viewers/ViewerIFrame.vue';
import ViewerYouTube from 'components/Event/Viewers/ViewerYouTube.vue';
import ViewerYouTubePlaylist from 'components/Event/Viewers/ViewerYouTubePlaylist.vue';
import ViewerImage from 'components/Event/Viewers/ViewerImage.vue';
import ViewerVideo from 'components/Event/Viewers/ViewerVideo.vue';
import ViewerAudio from 'components/Event/Viewers/ViewerAudio.vue';
import ViewerUrl from 'components/Event/Viewers/ViewerUrl.vue';
import ViewerBibtex from 'components/Event/Viewers/ViewerBibtex.vue';
</script>
