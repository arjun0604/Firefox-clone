# Firefox New Tab Clone

A recreation of the Firefox New Tab screen built with React, TypeScript, Tailwind CSS, shadcn/ui, React Router, Axios, Redux Toolkit, and Context API.

## Project Overview

This application simulates the modern Firefox New Tab experience with the following features:
- Interactive Google search bar that redirects queries to Google Search in a new tab.
- Customizable shortcuts grid supporting add, edit, and delete operations with persistent storage.
- Live news section fetching top headlines using Axios with loading skeleton states and error handling.
- Dedicated news detail page with clean reading mode and dark/light theme toggle.
- Customization side drawer for selecting preset wallpapers, uploading custom backgrounds, and toggling page sections.
- Global state management using Redux Toolkit for news data and React Context API for UI settings.
- Fully responsive design supporting mobile, tablet, and desktop viewports.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui / React Aria Components
- React Router DOM
- Axios
- Redux Toolkit & React Redux
- React Context API
- Lucide Icons

## Routes Overview

- `/` (Home Page): Main Firefox New Tab view featuring the Google search bar, shortcuts grid, live news headlines, and customization drawer.
- `/news/:id` (News Detail Page): Editorial reader view displaying the selected article's full story, author, date, source badge, link to original publisher, and dark mode toggle.

## API Details

News data is fetched from NewsAPI using an isolated Axios service layer (`src/api/NewsService.ts`):
- Base URL: Configured using a Vite proxy (`/api/news/v2`) to query `/top-headlines?country=us`.
- Environment Variables: The API key is stored securely in a `.env` file (`VITE_NEWS_API_KEY`) and accessed via `import.meta.env`.
- Data Cleaning: Automatically filters out removed articles and broken image sources before updating state.

## State Management Architecture

The project uses two global state management layers:

1. **Redux Toolkit (`src/store/`)**:
   - Used for managing asynchronous news data.
   - Uses `createAsyncThunk` (`fetchNews`) to fetch headlines and handle pending, fulfilled, and rejected states.
   - Provides global access to articles across both the home grid and detail views.

2. **React Context API (`src/context/SettingsContext.tsx`)**:
   - Used for managing app-wide UI settings including wallpaper selection, shortcut rows, and section visibility.
   - Syncs user preferences with `localStorage`.
   - Eliminates prop drilling across components.

## Folder Structure

```text
firefox-clone/
├── src/
│   ├── api/
│   │   └── NewsService.ts      # Axios client and API functions
│   ├── assets/                 # Icons, logos, and default wallpapers
│   ├── components/
│   │   └── ui/                 # shadcn/ui reusable components
│   ├── context/
│   │   └── SettingsContext.tsx # Context provider for settings & wallpaper
│   ├── pages/
│   │   ├── HomePage.tsx        # Home route (/)
│   │   └── NewsPage.tsx        # News detail route (/news/:id)
│   ├── store/
│   │   ├── hooks.ts            # Typed Redux hooks
│   │   ├── newSlice.ts         # News slice and async thunk
│   │   └── store.ts            # Redux store configuration
│   ├── App.tsx                 # Router setup
│   ├── DrawerSettings.tsx      # Shortcut and stories toggle switches
│   ├── Footer.tsx              # Customization drawer container
│   ├── Header.tsx              # Logo and search bar
│   ├── NewsBody.tsx            # News section container
│   ├── NewsFetch.tsx           # News grid component consuming Redux
│   ├── Shortcut.tsx            # Individual shortcut item
│   ├── Shortcuts.tsx           # Shortcuts grid and modal dialogs
│   ├── WallpaperPicker.tsx     # Preset and custom wallpaper picker
│   ├── main.tsx                # Application entry point with providers
│   └── index.css               # Global styles and Tailwind configuration
├── public/                     # Static assets
├── .env.example                # Template for environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies and scripts
└── vite.config.ts              # Vite proxy configuration
```

## Setup and Run Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arjun0604/Firefox-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Firefox-clone/firefox-clone
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory:
   ```env
   VITE_NEWS_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and visit:
   ```text
   http://localhost:5173
   ```

### Build for Production

To create an optimized production build:
```bash
npm run build
```
