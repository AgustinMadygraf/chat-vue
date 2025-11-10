import { computed } from 'vue'
import { useSidebarStore } from '../../stores/sidebarStore'

export const useAppSidebar = () => {
  const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
  const sidebar = useSidebarStore()
  const showSidebar = computed(() => sidebar.isOpen)

  return {
    appName,
    sidebar,
    showSidebar,
  }
}
