export type VehicleCategory = 'all' | 'luxury' | 'daily';

export interface DiagnosticBay {
  id: string;
  number: string; // e.g. "BAY 01"
  name: string;
  hindiTag: string;
  system: string;
  description: string;
  tooling: string[];
  capabilities: string[];
  turnaround: string;
  warranty: string;
  status: 'ONLINE' | 'ACTIVE_DIAGNOSTIC' | 'STANDBY';
  telemetryMetric: string;
  telemetryValue: string;
  imageUrl?: string;
}

export interface VehicleMastered {
  id: string;
  make: string;
  model: string;
  year: number;
  category: 'luxury' | 'daily';
  scope: string;
  engineSpec: string;
  turnaround: string;
  replacedComponents: string[];
  customerSnippet: string;
  ownerCity: string;
  rating: number;
  tag: string;
  imageUrl?: string;
}

export interface SpeedPart {
  id: string;
  name: string;
  category: 'hyundai-oem' | 'suspension' | 'braking' | 'electrical' | 'transmission' | 'body';
  categoryLabel: string;
  hsnCode: string;
  oePartNumber: string;
  compatibleModels: string[];
  wholesalePriceFormatted: string;
  retailPriceFormatted: string;
  moq: number; // Minimum Order Quantity for trade
  inStock: boolean;
  stockLocation: string;
  specNotes: string;
}

export interface BookingData {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Hybrid' | 'Electric';
  serviceCategory: string;
  bayPreference: string;
  preferredDate: string;
  preferredTimeSlot: string;
  pickupOption: 'Workshop Walk-In (M.G. Marg)' | 'Prayagraj Doorstep Valet Pickup';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
}

export interface BookingReceipt extends BookingData {
  docketNumber: string;
  createdAt: string;
  estimatedInspectionFee: string;
  priorityStatus: string;
}

export interface TimelineMilestone {
  year: string;
  eraTitle: string;
  headline: string;
  description: string;
  archivalFact: string;
  technologiesIntroduced: string[];
  imageUrl?: string;
}

export interface ArticleSection {
  heading: string;
  body: string;
  technicalSpec?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  publishDate: string;
  readTime: string;
  category: string;
  author: string;
  summary: string;
  sections: ArticleSection[];
  localKeywords: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Cashless Insurance' | 'Precision Engineering' | 'Speed Parts Wholesale' | 'Workshop Operations';
  specReference?: string;
}

export interface WorkshopStatus {
  isOpen: boolean;
  currentDay: string;
  istTimeString: string;
  statusBadge: string;
  nextOpenNotice: string;
}
