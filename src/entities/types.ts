// Base interfaces for request/response
export interface Employee {
  id?: number;
  name: string;
  role: string;
  created_at?: string;
}

export interface Device {
  id?: number;
  device_name: string;
  type: string;
  owner_id?: number | null;
  created_at?: string;
}

// Database row types
export interface EmployeeRow {
  id: number;
  name: string;
  role: string;
  created_at: string;
}

export interface DeviceRow {
  id: number;
  device_name: string;
  type: string;
  owner_id: number | null;
  created_at: string;
}
