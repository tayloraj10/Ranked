# Ranked — Vote on What Matters

A modern React application built with TypeScript and Vite for creating and voting on custom rankings. Features a sleek, responsive interface with full dark mode support.

## Features

- 🎯 **Featured Rankings** - Highlight important polls and rankings
- 🗳️ **Interactive Voting** - Upvote/downvote system for ranking options
- 🌓 **Dark Mode** - Fully themed interface with seamless light/dark mode switching
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🔍 **Quick Search** - Find rankings instantly with autocomplete
- 📊 **Recent Activity** - Track recently voted rankings in sidebar drawer

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx, Header.css          # Navigation with search and theme toggle
│   ├── Sidebar.tsx, Sidebar.css        # Recent rankings drawer
│   ├── Ranking.tsx, Ranking.css        # Individual ranking card with voting
│   ├── FeaturedRankings.tsx            # Featured content showcase
│   ├── ThemeToggle.tsx                 # Light/dark mode switcher
│   └── DrawerButton.tsx                # Sidebar toggle button
├── pages/
│   └── Home.tsx                        # Main landing page
├── context/
│   └── RankingContext.tsx              # Global ranking state management
├── data/
│   └── sampleRankings.ts               # Sample ranking data
├── models/
│   └── Ranking.ts                      # TypeScript type definitions
├── theme.tsx                           # Theme provider and configuration
├── App.tsx                             # Main app component
└── main.tsx                            # Application entry point
```

## Theme System

This app features a comprehensive theming system with persistent light/dark mode:

- **Theme Management**: Managed via `ThemeProvider` in [src/theme.tsx](src/theme.tsx) with localStorage persistence
- **Styling**: Theme-aware components use `[data-theme='dark']` selectors for dark mode styles
- **Toggle**: Access theme switcher in the header ([src/components/ThemeToggle.tsx](src/components/ThemeToggle.tsx))
- **Material-UI Integration**: MUI components automatically adapt to theme changes

## Development

Lint your code:

```bash
npm run lint
```

ESLint configuration can be adjusted in `eslint.config.js`.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool with HMR
- **Material-UI** - Component library
- **React Icons** - Icon set
- **CSS Modules** - Scoped styling

---

Built with ⚡ Vite + React + TypeScript
