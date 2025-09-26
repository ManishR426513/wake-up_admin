import * as React from "react"
import {
  SquareTerminal,
  ShoppingCart,
  Swords,
  Command,
  Building,
  Briefcase,
  Newspaper,
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
import { TeamSwitcher } from "./team-switcher"

const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: Building, // Updated from GalleryVerticalEnd
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Briefcase, // Updated from AudioWaveform
      plan: "Startup",
    },
  ],
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
        { title: "Limit", url: "/limit" },
        { title: "Wakeup Message", url: "/time" },
        { title: "Report", url: "/report" },
      ],
    },
     {
      title: "Feed",
      url: "#",
      icon: Newspaper,
      items: [
        { title: "Content", url: "/feed" },
       
      ],
    },
    // {
    //   title: "Challenge",
    //   url: "#",
    //   icon: Swords,
    //   items: [
    //     { title: "Participants", url: "/challenge" },
    //     { title: "Range", url: "/challenge-price" },
    //   ],
    // },
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
      title: "Teacher",
      url: "#",
      icon: ShoppingCart,
      items: [
        { title: "Teacher", url: "/teacher" },
        { title: "Range", url: "/teacher-price" },
      ],
    },
    {
      title: "Sport",
      url: "#",
      icon: Swords,
      items: [
        { title: "Sport", url: "/sport" },
        { title: "Range", url: "/sport-price" },
      ],
    },
    {
      title: "Master Class",
      url: "#",
      icon: Briefcase,
      items: [
        { title: "Master Class", url: "/master-class" },
      ],
    },
    // {
    //   title: "Transactions",
    //   url: "#",
    //   icon: CreditCard,
    //   items: [
    //     { title: "Payments", url: "/transactions" },
    //     { title: "Withdrawal Request", url: "/withdrawal" },
    //   ],
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
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
