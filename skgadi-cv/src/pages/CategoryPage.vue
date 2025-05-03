<template>
  <template v-if="isAdmin">
    <template v-if="editingCategory">
      <q-card-section>
        <div style="max-width: 500px; margin: auto" class="text-center">
          <display-category :category="categoryToEdit" />
          <br />
          <br />
          <q-input
            outlined
            rounded
            v-model="categoryToEdit.name"
            label="Category Name"
            class="q-mb-md"
            :autofocus="true"
          />
          <q-input
            outlined
            rounded
            v-model="categoryToEdit.desc"
            label="Category Description"
            class="q-mb-md"
            type="textarea"
            :rows="3"
          />
          <q-input
            outlined
            rounded
            v-model="categoryToEdit.icon"
            label="Category Icon"
            class="q-mb-md"
          >
            <template #prepend>
              <q-icon :name="categoryToEdit.icon" />
            </template>
          </q-input>
          <q-input
            outlined
            rounded
            v-model="categoryToEdit.bgColor"
            label="Category Background Color"
            class="q-mb-md"
            :style="`background-color: ${categoryToEdit.bgColor};`"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color v-model="categoryToEdit.bgColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            outlined
            rounded
            v-model="categoryToEdit.fgColor"
            label="Category Text Color"
            class="q-mb-md"
            :style="`background-color: ${categoryToEdit.fgColor};`"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color v-model="categoryToEdit.fgColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="q-gutter-md text-center">
            <q-btn
              outline
              rounded
              :label="isAddCategory ? 'Add Category' : 'Update Category'"
              :icon="isAddCategory ? 'las la-plus' : 'las la-save'"
              no-caps
              color="positive"
              @click="submitChange"
              class="q-mb-md"
            />

            <q-btn
              outline
              rounded
              label="Cancel"
              icon="las la-times"
              no-caps
              color="negative"
              @click="editingCategory = false"
              class="q-mb-md"
            />
          </div>
        </div>
      </q-card-section>
    </template>
    <template v-else>
      <div class="text-center">
        <q-card-section>
          <q-btn
            outline
            rounded
            icon="add"
            label="Add Category"
            no-caps
            @click="createANewProfile"
          />
        </q-card-section>
      </div>
    </template>
  </template>
  <template v-if="profileDoc?.categories">
    <q-card-section>
      <div style="max-width: 500px; margin: auto">
        <q-list bordered separator>
          <template v-for="(category, index) in profileDoc.categories" :key="index">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <display-category :category="category" />
              </q-item-section>
              <q-item-section></q-item-section>
              <q-item-section v-if="isAdmin" side>
                <q-btn round dense flat icon="edit" @click="setCategoryToEdit(category.id)" />
              </q-item-section>
              <q-item-section v-if="isAdmin" side>
                <q-btn round dense flat icon="delete" @click="deleteCategoryInDb(category.id)" />
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </div>
    </q-card-section>
  </template>
</template>
<script setup lang="ts">
const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  profileDoc: {
    type: Object as PropType<GSK_PROFILE>,
    required: false,
    default: () => ({}),
  },
  user: {
    type: Object as PropType<User>,
    required: false,
    default: () => ({}),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

import { type PropType } from 'vue';
import type { GSK_CATEGORY, GSK_PROFILE } from 'src/services/library/types/profile';
import { type User } from 'firebase/auth';

import DisplayCategory from 'src/components/Category/DisplayCategory.vue';

import { type Ref, ref } from 'vue';
import { setProfileDocument } from 'src/services/firebase/profile-document';
import { uid } from 'quasar';

const editingCategory = ref(false);

const categoryToEdit: Ref<GSK_CATEGORY> = ref({
  id: '',
  name: '',
  desc: '',
  icon: '',
  bgColor: '',
  fgColor: '',
  createdAt: '',
});

const isAddCategory = ref(false);

const submitChange = async () => {
  editingCategory.value = false;
  if (isAddCategory.value) {
    await addToDb();
  } else {
    await updateCategoryInDb();
  }
};

const addToDb = async () => {
  const profileToUpdateInDb = JSON.parse(JSON.stringify(props.profileDoc)) as GSK_PROFILE;
  if (!profileToUpdateInDb.categories) {
    profileToUpdateInDb.categories = [];
  }
  profileToUpdateInDb.categories.push({
    ...categoryToEdit.value,
    id: uid(),
  });
  await setProfileDocument(props.user.uid, profileToUpdateInDb);
};

const deleteCategoryInDb = async (categoryId: string) => {
  //confirm before proceeding
  const confirmDelete = confirm('Are you sure you want to delete the category?');
  if (!confirmDelete) {
    return;
  }
  const profileToUpdateInDb = JSON.parse(JSON.stringify(props.profileDoc)) as GSK_PROFILE;
  if (!profileToUpdateInDb.categories) {
    profileToUpdateInDb.categories = [];
  }
  profileToUpdateInDb.categories = profileToUpdateInDb.categories.filter(
    (category) => category.id !== categoryId,
  );
  await setProfileDocument(props.user.uid, profileToUpdateInDb);
};

const setCategoryToEdit = (categoryId: string) => {
  const category = props?.profileDoc?.categories?.find((cat) => cat.id === categoryId);
  if (category) {
    categoryToEdit.value = { ...category };
    isAddCategory.value = false;
    editingCategory.value = true;
  }
};

const updateCategoryInDb = async () => {
  const profileToUpdateInDb = JSON.parse(JSON.stringify(props.profileDoc)) as GSK_PROFILE;
  if (!profileToUpdateInDb.categories) {
    profileToUpdateInDb.categories = [];
  }
  const index = profileToUpdateInDb.categories.findIndex(
    (category) => category.id === categoryToEdit.value.id,
  );
  if (index !== -1) {
    profileToUpdateInDb.categories[index] = { ...categoryToEdit.value };
  }
  await setProfileDocument(props.user.uid, profileToUpdateInDb);
};

const createANewProfile = () => {
  categoryToEdit.value = {
    id: '',
    name: '',
    desc: '',
    icon: '',
    bgColor: '',
    fgColor: '',
  };
  editingCategory.value = true;
  isAddCategory.value = true;
};
</script>
