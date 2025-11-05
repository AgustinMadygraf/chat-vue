<!--
Path: src/App.vue
-->

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

import { ref } from 'vue'
const sidebarRef = ref()
function openSidebar() { sidebarRef.value.openSidebar() }
</script>

<template>
  <div class="d-flex min-vh-100 bg-dark text-light font-sans">
    <AppSidebar ref="sidebarRef" />
    <div class="flex-grow-1 d-flex flex-column bg-dark-subtle">
      <AppHeader :openSidebar="openSidebar" />
      <main class="flex-grow-1 d-flex flex-column min-vh-0">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </div>
</template>


