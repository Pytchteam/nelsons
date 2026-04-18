export type LeadStatus = "New" | "Contacted" | "Quoting" | "Approved" | "In Production" | "Completed" | "Closed";

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  intent?: "start_business" | "promote" | "signage" | "custom";
  source?: string;
  status: LeadStatus;
  createdAt: any;
}

export interface QuoteRequest {
  id?: string;
  leadId?: string;
  productType: string;
  dimensions?: string;
  quantity?: number;
  specs?: string;
  fileUrl?: string;
  fileName?: string;
  urgency?: "standard" | "urgent" | "rush";
  notes?: string;
  status: LeadStatus;
  createdAt: any;
}

export interface PortfolioProject {
  id?: string;
  title: string;
  category: "storefront" | "vehicle" | "signage" | "event" | "print";
  beforeImageUrl: string;
  afterImageUrl: string;
  description: string;
  impact: string;
}

export interface BusinessPackage {
  id: string;
  title: string;
  price: string;
  badge?: string;
  items: string[];
  description: string;
  bestFor: string;
}
