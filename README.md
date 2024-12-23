# Fleet Management API

A TypeScript-based REST API for managing company devices and employees. Built with Express and SQLite for simplicity and ease of use.

## Features

- CRUD operations for Employees and Devices
- SQLite database with typed operations
- Express.js with TypeScript
- Modular architecture with clear separation of concerns
- Automatic database seeding with sample data

## Getting Started

### Prerequisites

- Node.js (>= 20.9)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:R1D502/fleet-interview-api.git
cd fleet-interview-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api`.

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

#### Employee Object Structure
```typescript
{
  id?: number;
  name: string;
  role: "Developer" | "Designer" | "Manager" | "Product Owner";
  created_at?: string;
}
```

### Devices

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/devices` | Get all devices |
| GET | `/api/devices/:id` | Get device by ID |
| POST | `/api/devices` | Create new device |
| PUT | `/api/devices/:id` | Update device |
| DELETE | `/api/devices/:id` | Delete device |

#### Device Object Structure
```typescript
{
  id?: number;
  device_name: string;
  type: "Laptop" | "Display" | "Peripheral";
  owner_id?: number;
  created_at?: string;
}
```

## Development

### Project Structure

```
src/
├── controllers/     # Request handlers
├── database/       # Database configuration and operations
├── entities/       # TypeScript interfaces and types
└── routes/         # API route definitions
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Database

The API uses SQLite with an in-memory database that is seeded with sample data on startup. The database includes:
- Two sample employees (Developer and Designer)
- Two sample devices (Laptop and Display)

## License

This project is licensed under the APLv2 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project was bootstrapped with [node-typescript-boilerplate](https://github.com/jsynowiec/node-typescript-boilerplate).
