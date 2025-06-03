
import { HomeIcon, ShieldIcon, PhotoIcon, UsersIcon, PhoneIcon, InfoIcon, HeartIcon, StoreIcon, Building2Icon, FileTextIcon, LockIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Plans from "./pages/Plans.jsx";
import Gallery from "./pages/Gallery.jsx";
import TestimonialsPage from "./pages/TestimonialsPage.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import DonationPage from "./pages/DonationPage.jsx";
import Store from "./pages/Store.jsx";
import Wholesale from "./pages/Wholesale.jsx";
import Terms from "./pages/Terms.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

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
    icon: <PhotoIcon className="h-4 w-4" />,
    page: <Gallery />,
  },
  {
    title: "Testimonials",
    to: "/testimonials",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <TestimonialsPage />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <PhoneIcon className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "About",
    to: "/about",
    icon: <InfoIcon className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "Donate",
    to: "/donate",
    icon: <HeartIcon className="h-4 w-4" />,
    page: <DonationPage />,
  },
  {
    title: "Store",
    to: "/store",
    icon: <StoreIcon className="h-4 w-4" />,
    page: <Store />,
  },
  {
    title: "Wholesale",
    to: "/wholesale",
    icon: <Building2Icon className="h-4 w-4" />,
    page: <Wholesale />,
  },
  {
    title: "Terms",
    to: "/terms",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <Terms />,
  },
  {
    title: "Privacy",
    to: "/privacy",
    icon: <LockIcon className="h-4 w-4" />,
    page: <PrivacyPolicy />,
  },
];
