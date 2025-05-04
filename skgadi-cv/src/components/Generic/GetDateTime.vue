<template>
  <div class="row items-center">
    <div class="col text-left">
      <show-date-with-icon :date-time="dateTime" :icon="icon" />
    </div>
    <div class="col-auto">
      <q-btn color="primary" flat icon="las la-pen-fancy" round>
        <q-menu>
          <div style="min-width: 300px">
            <q-input
              v-model="dateTimeText"
              outlined
              rounded
              class="q-ma-md"
              :autofocus="true"
              :clearable="true"
            />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn color="primary" flat icon="las la-globe-americas" round>
        <q-menu>
          <div style="min-width: 300px">
            <q-select
              class="q-ma-md"
              outlined
              rounded
              v-model="selectedTimeZon"
              :options="importantTimeZones"
              label="Select Time Zone"
              emit-value
              map-options
            />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn color="primary" flat icon="las la-calendar-day" round>
        <q-menu>
          <div class="q-gutter-md row items-start">
            <q-date v-model="selectedDate" />
          </div>
        </q-menu>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn color="primary" flat icon="las la-clock" round>
        <q-menu>
          <div class="q-gutter-md row items-start">
            <q-time v-model="selectedTime" format24h with-seconds />
          </div>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const dateTime = defineModel<Date>({ required: true });

defineProps({
  icon: {
    type: String,
    default: 'las la-calendar',
  },
});

import ShowDateWithIcon from 'components/Generic/ShowDateWithIcon.vue';

import { onMounted, ref, watch } from 'vue';
import moment from 'moment-timezone';

const importantTimeZones = [
  'Asia/Kolkata',
  'America/Mexico_City',
  'Etc/GMT',
  'Etc/GMT+0',
  'Etc/GMT+1',
  'Etc/GMT+10',
  'Etc/GMT+11',
  'Etc/GMT+12',
  'Etc/GMT+2',
  'Etc/GMT+3',
  'Etc/GMT+4',
  'Etc/GMT+5',
  'Etc/GMT+6',
  'Etc/GMT+7',
  'Etc/GMT+8',
  'Etc/GMT+9',
  'Etc/GMT-0',
  'Etc/GMT-1',
  'Etc/GMT-10',
  'Etc/GMT-11',
  'Etc/GMT-12',
  'Etc/GMT-13',
  'Etc/GMT-14',
  'Etc/GMT-2',
  'Etc/GMT-3',
  'Etc/GMT-4',
  'Etc/GMT-5',
  'Etc/GMT-6',
  'Etc/GMT-7',
  'Etc/GMT-8',
  'Etc/GMT-9',
  'Etc/GMT0',
  'Etc/Greenwich',
  'Etc/UCT',
  'Etc/UTC',
  'Etc/Universal',
  'Etc/Zulu',
];

const selectedTimeZon = ref('America/Mexico_City');
const selectedDate = ref(moment(dateTime.value).format('YYYY/MM/DD'));
const selectedTime = ref(moment(dateTime.value).format('HH:mm:ss'));

watch([selectedDate, selectedTime, selectedTimeZon], () => {
  setDate();
});

const setDate = () => {
  const dateMoment = moment(selectedDate.value, 'YYYY/MM/DD');
  const timeMoment = moment(selectedTime.value, 'HH:mm:ss');
  const newDateTime = dateMoment
    .set({
      hour: timeMoment.hour(),
      minute: timeMoment.minute(),
      second: timeMoment.second(),
    })
    .tz(selectedTimeZon.value, true);
  dateTime.value = newDateTime.toDate();
  dateTimeText.value = newDateTime.toISOString();
};

const dateTimeText = ref(moment(dateTime.value).toISOString());
watch(dateTimeText, () => {
  try {
    const dateFromText = moment(dateTimeText.value);
    if (dateFromText.isValid()) {
      dateTime.value = dateFromText.toDate();
    } else {
      console.error('Invalid date format:', dateTimeText.value);
    }
  } catch (error) {
    console.error('Error parsing dateTimeText:', error);
  }
});

onMounted(() => {
  setValuesFromDateTimeToLocals();
});

const setValuesFromDateTimeToLocals = () => {
  selectedTimeZon.value = moment.tz.guess();
  selectedDate.value = moment(dateTime.value).format('YYYY/MM/DD');
  selectedTime.value = moment(dateTime.value).format('HH:mm:ss');
};

watch(
  () => dateTime.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      setValuesFromDateTimeToLocals();
    }
  },
  { immediate: true, deep: true },
);
</script>
