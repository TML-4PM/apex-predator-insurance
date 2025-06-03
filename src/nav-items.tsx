
import { HomeIcon, ShieldIcon, ShoppingCartIcon, GalleryVerticalEndIcon, BuildingIcon, InfoIcon, PhoneIcon, FileTextIcon, CreditCardIcon, UserIcon, CheckCircleIcon } from "lucide-react";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import Gallery from "./pages/Gallery";
import Store from "./pages/Store";
import Wholesale from "./pages/Wholesale";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CertificateVerify from "./pages/CertificateVerify";
import ProtectedRoute from "./components/ProtectedRoute";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Plans",
    to: "/plans",
    icon: <ShieldIcon className="h-4 w-4" />,
    page: <Plans />,
  },
  {
    title: "Gallery",
    to: "/gallery",
    icon: <GalleryVerticalEndIcon className="h-4 w-4" />,
    page: <Gallery />,
  },
  {
    title: "Store",
    to: "/store",
    icon: <ShoppingCartIcon className="h-4 w-4" />,
    page: <Store />,
  },
  {
    title: "Wholesale",
    to: "/wholesale",
    icon: <BuildingIcon className="h-4 w-4" />,
    page: <Wholesale />,
  },
  {
    title: "About",
    to: "/about",
    icon: <InfoIcon className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <PhoneIcon className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "Verify",
    to: "/verify",
    icon: <CheckCircleIcon className="h-4 w-4" />,
    page: <CertificateVerify />,
  },
  {
    title: "Auth",
    to: "/auth",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Auth />,
    hidden: true,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <UserIcon className="h-4 w-4" />,
    page: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    protected: true,
  },
];
