# Tourist Destination Lumina App 🏝️

A modern Next.js application for exploring and managing tourist destinations in El Salvador. Built with TypeScript, Tailwind CSS, and a modular architecture.

## 🚀 Features

- Browse and discover tourist destinations
- Add new destinations
- Delete existing destinations
- Responsive design optimized for all devices
- Modern UI with El Salvador theming

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 18.0 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **API Backend** running on `localhost:8000` (required for full functionality)

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/alexisRojas99/tourist_destination_lumina_app.git
cd tourist_destination_lumina_app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

**Important:** Make sure your API backend is running on `localhost:8000` before starting the application.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 5. Open the application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎯 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check code quality

## 🏗️ Project Structure

```
tourist_destination_lumina_app/
├── app/                    # Next.js App Router pages
│   ├── destinations/       # Destinations listing page
│   ├── add-destination/   # Add destination form
│   └── layout.tsx         # Root layout
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # Basic UI components
│   │   ├── layout/       # Layout components
│   │   └── features/     # Feature-specific components
│   ├── lib/              # Utilities and API functions
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

## 🔧 Configuration

### API Integration

The app requires a backend API running on `localhost:8000`. The API should provide:

- `GET /destinations` - Fetch destinations with optional filters
- `POST /destinations` - Create new destinations
- `DELETE /destinations/{id}` - Delete destinations

### Environment Variables

| Variable                   | Description                  | Required |
| -------------------------- | ---------------------------- | -------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the API backend | Yes      |

## 🛠️ Technologies Used

- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **ESLint** - Code linting and quality

## 🎨 Design Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **El Salvador Theme** - Custom colors and imagery representing El Salvador
- **Modern UI** - Clean, intuitive interface with smooth interactions
- **Accessibility** - Built with accessibility best practices

## 🚨 Troubleshooting

### Common Issues

**1. API Connection Issues**

- Ensure your backend API is running on `localhost:8000`
- Check that the `.env` file is properly configured
- Verify the API endpoints are accessible

**2. Build Errors**

- Clear the `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

**3. Environment Variables**

- Make sure environment variables start with `NEXT_PUBLIC_` for client-side access
- Restart the development server after changing environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for exploring the beautiful destinations of El Salvador by Alexis Rojas.
Feel free to reach out for any questions or contributions!
