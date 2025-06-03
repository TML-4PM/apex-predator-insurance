
import { Home, Shield, ShoppingCart, Users, Image, Phone, MessageCircle, User, Gavel, DollarSign, Briefcase, MapPin, Trophy, Upload } from "lucide-react";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Plans",
    to: "/plans",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    title: "Gallery",
    to: "/gallery",
    icon: <Image className="h-4 w-4" />,
  },
  {
    title: "Store",
    to: "/store",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Social Hub",
    to: "/social",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Chat",
    to: "/chat",
    icon: <MessageCircle className="h-4 w-4" />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <Phone className="h-4 w-4" />,
  },
];

export const protectedNavItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <User className="h-4 w-4" />,
  },
];

export const adminNavItems = [
  {
    title: "Admin Portal",
    to: "/admin",
    icon: <Gavel className="h-4 w-4" />,
  },
];

export const businessNavItems = [
  {
    title: "Wholesale",
    to: "/wholesale",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Partner Portal",
    to: "/partner",
    icon: <Briefcase className="h-4 w-4" />,
  },
];

export const featureNavItems = [
  {
    title: "Platform Audit",
    to: "/audit",
    icon: <Trophy className="h-4 w-4" />,
  },
];
