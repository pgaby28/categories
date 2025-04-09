<template>
  <v-app>
    <v-container>
      <v-card class="mx-auto my-6" max-width="600">
        <v-card-title class="text-h4 py-4">
          Category Path Finder
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="searchCategory">
            <v-row>
              <v-col cols="9">
                <v-text-field
                v-model="searchQuery"
                label="Category name"
                placeholder="E.g: category4"
                variant="outlined"
                density="comfortable"
                clearable
                @click:append="searchCategory"
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn
                variant="flat"
                color="primary"
                size="46"
                block
                @click="searchCategory()"
              >
                <v-icon start icon="mdi-magnify"></v-icon>
                Search
              </v-btn>
            </v-col>
            </v-row>
          </v-form>

          <v-card-subtitle class="px-0 pt-4">Result:</v-card-subtitle>

          <v-alert v-if="searchResult" color="success" class="mb-4">
            <code class="font-weight-medium">{{ searchResult }}</code>
          </v-alert>

          <v-alert v-else-if="searchResult === null" color="error" class="mb-4">
            Category not found
          </v-alert>

          <v-alert v-else color="info" class="mb-4">
            Enter a category name to search
          </v-alert>

          <v-divider class="my-4"></v-divider>

          <v-card-subtitle class="px-0">Examples:</v-card-subtitle>

          <div class="d-flex flex-column">
            <v-btn
              v-for="example in ['category4', 'category2', 'category5']"
              :key="example"
              variant="outlined"
              color="primary"
              density="comfortable"
              block
              class="justify-start text-none mb-2"
              @click="searchQuery = example; searchCategory()"
            >
              <code>getCategoryPath(categories, '{{ example }}')</code>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const searchResult = ref(undefined);

const categories = [
  {
    name: 'category1',
    subcategories: [
      {
        name: 'category2',
        subcategories: []
      },
      {
        name: 'category3',
        subcategories: [
          {
            name: 'category4',
            subcategories: []
          }
        ]
      }
    ]
  },
  {
    name: 'category5',
    subcategories: []
  }
];

const getCategoryPath = (categories, categoryName) => {
  const findPath = (categories, categoryName, currentPath = '') => {
    for (const category of categories) {
      const newPath = currentPath + '/' + category.name;

      if (category.name === categoryName) {
        return newPath;
      }

      if (category.subcategories && category.subcategories.length > 0) {
        const result = findPath(category.subcategories, categoryName, newPath);
        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  return findPath(categories, categoryName);
};

const searchCategory = () => {
  if (!searchQuery.value.trim()) {
    searchResult.value = undefined;
    return;
  }

  const result = getCategoryPath(categories, searchQuery.value);
  searchResult.value = result;
};
</script>

<style scoped>
.v-card-text {
  padding: 24px;
}
</style>