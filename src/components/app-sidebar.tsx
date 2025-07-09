

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Volleyball,

  GalleryVerticalEnd,

  ReceiptEuro,
  TriangleAlert,
 
  Settings2,
  SquareTerminal,
  User,
  Timer
 // MessageSquare
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher" 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
//import { NavMain } from "./nav-main"

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },

    {
      title: "Users",
      url: "#",
      icon: User,
      items: [
        {
          title: "Users List",
          url: "/users-list",
        },
        // {
        //   title: "",
        //   url: "#",
        // },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: SquareTerminal,
    },
    // {
    //   name: "Chat",
    //   url: "/chat",
    //   icon: MessageSquare,
    // },

    {
      name: "User",
      url: "/users",
      icon: User,
    },
    //  {
    //   name: "Challenge Price",
    //   url: "/challenge",
    //   icon: User,
    // },
    {
      name: "Category",
      url: "/category",
      icon: Volleyball,
    },
    {
      name: "Plans",
      url: "/plan",
      icon: ReceiptEuro,
    },
     {
      name: "Challenge Price",
      url: "/challenge-price",
      icon: ReceiptEuro,
    },
    {
      name: "Shop Price",
      url: "/shop-price",
      icon: ReceiptEuro,
    },
     {
      name: "Report",
      url: "/report",
      icon: TriangleAlert,
    },
    {
      name: "Time",
      url: "/time",
      icon: Timer,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
       
        <NavProjects projects={data.projects} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
