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
export interface Service {
  name: string;
  price: number;
}

export interface WorkingHours {
  start: string;
  end: string;
}

export interface Barber {
  services?: Service[];
  workingHours?: WorkingHours;
}

export interface AppointmentProps {
  isVisible: boolean;
  onClose: () => void;
  barber: Barber;
}
