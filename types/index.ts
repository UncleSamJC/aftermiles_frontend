export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface VehicleInfo {
  id: string;
  make: string;
  model: string;
  year: number;
  user_id: string;
  is_active?: boolean;
}

export interface Trip {
  id: string;
  trip_date: string;
  start_time: string;
  end_time: string;
  vehicle_id: string;
  user_id: string;
  start_mileage: number;
  end_mileage: number;
  total_miles: number;
  purpose?: string;
  notes?: string;
} 

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}