import { useSidebarStore } from '../../stores/sidebarStore'

export const useAppHeader = () => {
  const appName = import.meta.env.VITE_APP_NAME || 'MadyBot'
  const sidebar = useSidebarStore()

  return {
    appName,
    sidebar,
  }
}
