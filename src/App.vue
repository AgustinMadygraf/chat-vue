<!--
Path: src/App.vue
-->

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'

import { ref } from 'vue'
const sidebarRef = ref()
function openSidebar() { sidebarRef.value.openSidebar() }
</script>

<template>
  <div
    class="d-flex min-vh-100"
    style="background: var(--bg-main); color: var(--text-primary);"
  >
    <AppSidebar ref="sidebarRef" />
    <div class="flex-grow-1 d-flex flex-column" style="background: var(--bg-main);">
      <AppHeader :openSidebar="openSidebar" />
      <main class="flex-grow-1 d-flex flex-column min-vh-0">
        <RouterView />
      </main>
    </div>
  </div>
</template>


