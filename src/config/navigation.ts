import {
  Activity,
  BellRing,
  BookOpen,
  Building2,
  CreditCard,
  Inbox,
  LayoutDashboard,
  Megaphone,
  Plug,
  Radar,
  ScrollText,
  Settings,
  ShieldAlert,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** One-line context shown next to the page title in the top bar. */
  description: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: "General",
    items: [
      {
        title: "Overview",
        href: "/overview",
        icon: LayoutDashboard,
        description: "Live · platform at a glance",
      },
      { title: "Users", href: "/users", icon: Users, description: "18,402 total" },
      {
        title: "Billing & Revenue",
        href: "/billing",
        icon: CreditCard,
        description: "Subscriptions, trials and wallets",
      },
      {
        title: "Agencies",
        href: "/agencies",
        icon: Building2,
        description: "Multi-brand portfolios",
      },
      {
        title: "Access Codes",
        href: "/access-codes",
        icon: Ticket,
        description: "Promo and partner grants",
      },
    ],
  },
  {
    label: "Content oversight",
    items: [
      {
        title: "Content & Moderation",
        href: "/moderation",
        icon: ShieldAlert,
        description: "Visual Engine V2 review queue · platform-wide",
      },
      {
        title: "Brand Playbooks",
        href: "/playbooks",
        icon: BookOpen,
        description: "Support / read-only view",
      },
      {
        title: "Campaigns",
        href: "/campaigns",
        icon: Megaphone,
        description: "Jane Ads · all figures in NGN",
      },
    ],
  },
  {
    label: "Market intelligence",
    items: [
      {
        title: "Listening Curation",
        href: "/listening",
        icon: Radar,
        description: "Ported from the MI curation console",
      },
      {
        title: "Platform Alerts",
        href: "/alerts",
        icon: BellRing,
        description: "Cross-tenant connection & ad-platform breakage",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "System Health",
        href: "/system-health",
        icon: Activity,
        description: "Updated 12s ago",
      },
      {
        title: "Ad Platforms",
        href: "/ad-platforms",
        icon: Plug,
        description: "Connection status across all tenants",
      },
      {
        title: "Unified Inbox",
        href: "/inbox",
        icon: Inbox,
        description: "Connection health, not message content",
      },
      {
        title: "Audit Log",
        href: "/audit-log",
        icon: ScrollText,
        description: "Every admin action, attributed",
      },
      { title: "Settings", href: "/settings", icon: Settings, description: "Access and policy" },
    ],
  },
];

const flatNavigation = navigation.flatMap((group) => group.items);

export function findNavItem(pathname: string): NavItem | undefined {
  return flatNavigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}
