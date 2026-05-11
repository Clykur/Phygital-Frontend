import { type SanityDocument } from "next-sanity";

export interface HeroSection {
  title: string;
  subtitle?: string;
  image?: any;
  ctaText?: string;
  ctaLink?: string;
}

export interface FeatureItem {
  _key: string;
  title: string;
  description: string;
  icon?: any;
}

export interface FeaturesSection {
  title: string;
  description?: string;
  features: FeatureItem[];
}

export interface AboutSection {
  title: string;
  content: any[];
  image?: any;
}

export interface ContactSection {
  title: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Homepage extends SanityDocument {
  title: string;
  hero: HeroSection;
  features: FeaturesSection;
  about: AboutSection;
  contact: ContactSection;
}
