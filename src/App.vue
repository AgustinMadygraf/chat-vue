<!--
Path: src/App.vue
-->


<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar/AppSidebar.vue'
import AppHeader from './components/AppHeader/AppHeader.vue'
import { useSidebarStore } from './stores/sidebarStore'

const sidebar = useSidebarStore()
</script>

<template>
  <div
    class="d-flex min-vh-100"
    style="background: var(--bg-main); color: var(--text-primary);"
  >
    <AppSidebar />
    <div class="flex-grow-1 d-flex flex-column" style="background: var(--bg-main);">
      <AppHeader />
      <main class="flex-grow-1 d-flex flex-column min-vh-0">
        <RouterView />
      </main>
    </div>
  </div>
</template>


