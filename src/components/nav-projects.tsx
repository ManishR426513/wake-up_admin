import {
  // Folder,
  // Forward,
  // MoreHorizontal,
  // Trash2,
  type LucideIcon,
} from "lucide-react"


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  //SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
 // useSidebar,
} from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"
import { useTheme } from "@/context/theme-context"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  // const { isMobile } = useSidebar()
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
      {projects.map((item) => {
          const isActive = location.pathname === item.url;
          const activeClass = theme === "light" ? "bg-[#f5f5f5]" : "bg-[#262626]";

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive ? activeClass : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}

