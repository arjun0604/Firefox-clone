# Firefox New Tab Clone

A recreation of the Firefox New Tab screen built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Project Overview

This application simulates the modern Firefox New Tab experience with the following features:
- Interactive Google search bar that redirects queries to Google Search in a new tab.
- Customizable shortcuts grid supporting add, edit, and delete operations with persistent storage.
- Live news section fetching top headlines using an external API with loading skeleton states.
- Customization side drawer for selecting preset wallpapers, uploading custom backgrounds, and toggling page sections.
- Fully responsive design supporting mobile, tablet, and desktop viewports.
- Keyboard accessible navigation and semantic HTML structure.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui / React Aria Components
- Lucide Icons

## Folder Structure

```text
firefox-clone/
├── src/
│   ├── assets/              # Icons, logos, and wallpaper images
│   ├── components/
│   │   └── ui/              # shadcn/ui reusable components
│   ├── App.tsx              # Root component and state management
│   ├── Header.tsx           # Logo and search bar
│   ├── Shortcuts.tsx        # Shortcuts grid and modal dialogs
│   ├── Shortcut.tsx         # Individual shortcut item with action menu
│   ├── NewsBody.tsx         # News section container
│   ├── NewsFetch.tsx        # News API fetcher and article cards
│   ├── Footer.tsx           # Customization drawer and wallpaper controls
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind configuration
├── public/                  # Static assets
├── .editorconfig            # Editor formatting rules
├── .prettierrc              # Prettier configuration
├── package.json             # Project dependencies and scripts
└── vite.config.ts           # Vite configuration
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
   yarn install
   # or
   npm install
   ```

4. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. Open your browser and visit:
   ```text
   http://localhost:5173
   ```

### Build for Production

To create an optimized production build:
```bash
npm run build
```
