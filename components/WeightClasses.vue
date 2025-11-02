<template>
  <div class="weight-classes">
    <h2>UFC Weight Classes</h2>
    <div v-if="loading" class="loading">
      Loading weight classes...
    </div>
    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>
    <div v-else-if="weightClasses.length > 0" class="weight-classes-list">
      <ul>
        <li v-for="weightClass in weightClasses" :key="weightClass.name">
          <a :href="weightClass.url" target="_blank">{{ weightClass.name }}</a>
          <span v-if="weightClass.champion" class="champion"> - Champion: {{ weightClass.champion }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="no-data">
      No weight classes found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface WeightClass {
  name: string
  url: string
  champion?: string
}

const weightClasses = ref<WeightClass[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchWeightClasses = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch('/api/weight-classes')
    const data = await response.json()
    
    if (data.success) {
      weightClasses.value = data.data
    } else {
      error.value = data.error || 'Failed to fetch weight classes'
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred while fetching weight classes'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWeightClasses()
})
</script>

<style scoped>
.weight-classes {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.loading, .error, .no-data {
  padding: 20px;
  text-align: center;
}

.error {
  color: #ff0000;
}

.weight-classes-list ul {
  list-style-type: none;
  padding: 0;
}

.weight-classes-list li {
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.weight-classes-list li:last-child {
  border-bottom: none;
}

.weight-classes-list a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.weight-classes-list a:hover {
  text-decoration: underline;
}

.champion {
  color: #28a745;
  font-style: italic;
}
</style>
