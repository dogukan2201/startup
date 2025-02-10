export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "customer" | "barber";
  registeredAt: string;
  address?: Address;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "pending" | "confirmed" | "cancelled";
  barber: User;
  customer: User;
}

export interface Barber extends User {
  experience: number;
  image: string;
  description: string;
  availability: string[];
  rating: number;
  reviews: number;
  services: Service[];
  meetings: Meeting[];
  workingHours: { day: string; open: string; close: string }[];
  socialMedia?: {
    instagram?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
}
export interface FilterType {
  rating: number | null;
  experience: any | null;
  location: string | null;
  price: { min: number; max: number };
  specialty: string | null;
  gender: string | null;
}

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (filters: FilterType) => void;
  initialFilters: FilterType;
}
