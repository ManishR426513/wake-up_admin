import * as React from "react"
import {

  SquareTerminal,

  ShoppingCart,
  Swords,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"

const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Users", url: "/users" },
        { title: "Category", url: "/category" },
        { title: "Plans", url: "/plan" },
        { title: "Wakeup Message", url: "/time" },
        { title: "Report", url: "/report" },
      ],
    },
    {
      title: "Challenge",
      url: "#",
      icon: Swords,
      items: [
        { title: "Entries", url: "/challenge" },
        { title: "Range", url: "/challenge-price" },
      ],
    },
    {
      title: "Shop",
      url: "#",
      icon: ShoppingCart,
      items: [
        { title: "Shop", url: "/shop" },
        { title: "Range", url: "/shop-price" },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      icon: ShoppingCart,
      items: [
        { title: "Payments", url: "/transactions" },

       
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
