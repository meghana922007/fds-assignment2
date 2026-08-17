# Pinikeshi Meghana — Interactive Portfolio (React)

A fully functional, multi-page portfolio website built with React, React Router, and Hooks. Extended from the static HTML/CSS portfolio (Assignment 1) into a dynamic single-page application with client-side routing, theme toggling, form validation, and interactive components.

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# 1. Extract the project folder
cd portfolio-react

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser and navigate to:
# http://localhost:5173
```

### Build for Production
```bash
npm run build
```

The production build will be output to the `dist/` folder with zero console errors.

---

## 🏗 Component Tree & State-Lifting Decisions

### Folder Structure
```
src/
├── components/
│   ├── Layout.jsx       # Shared layout wrapper (Navbar + Footer + Outlet)
│   ├── Navbar.jsx       # Navigation with theme toggle & mobile menu
│   ├── Footer.jsx       # Site footer
│   ├── ProjectCard.jsx  # Reusable project card (all data via props)
│   ├── Skills.jsx       # Skills display with prop drilling demo
│   └── ContactForm.jsx  # Controlled form with validation
├── pages/
│   ├── Home.jsx         # Hero section + loading simulation
│   ├── About.jsx        # Education, skills, timeline, soft skills
│   ├── Projects.jsx     # Projects grid listing
│   ├── Contact.jsx      # Contact info + form
│   ├── ProjectDetail.jsx# Dynamic route for individual projects
│   └── NotFound.jsx     # 404 catch-all page
├── data/
│   └── projects.js      # Centralized project data array
├── App.jsx              # Root component: routing + theme state
├── App.css              # Global styles with dark mode support
└── main.jsx             # React entry point with BrowserRouter
```

### State-Lifting Decisions

| State | Location | Reason |
|-------|----------|--------|
| **Theme (dark/light)** | `App.jsx` | Needed by `Navbar` (toggle button) and affects global CSS. Lifted to top level and passed down via props through `Layout` → `Navbar`. |
| **Contact form fields** | `ContactForm.jsx` | Local to the form component. No other component needs this data. |
| **Contact validation errors** | `ContactForm.jsx` | Derived from form state. Kept co-located with form logic. |
| **Project card expanded** | `ProjectCard.jsx` | Scoped per instance. Each card manages its own toggle independently to demonstrate proper state isolation. |
| **Mobile menu open** | `Navbar.jsx` | Local UI state, only Navbar needs to know. |
| **Scroll shadow** | `Navbar.jsx` | Local UI state for header styling on scroll. |
| **Loading state** | `Home.jsx` | Only the Home page needs the simulated loading sequence. |

### Prop Drilling (2+ Levels Deep)

1. **About → Skills → SkillGroup**
   - `About.jsx` receives `skillsData` array and passes it to `<Skills skillsData={skillsData} />`
   - `Skills.jsx` maps over groups and passes individual `{ heading, tags }` objects to `<SkillGroup heading={group.heading} tags={group.tags} />`
   - **Depth:** 2 levels

2. **App → Projects → ProjectsGrid → ProjectCard**
   - `App.jsx` passes `projects` array to `<Projects projects={projects} />`
   - `Projects.jsx` passes the array to `<ProjectsGrid projects={projects} />`
   - `ProjectsGrid` destructures each project object and passes fields as individual props to `<ProjectCard ... />`
   - **Depth:** 3 levels

---

## ⚡ useEffect Hooks Implemented

### 1. Theme Persistence (`App.jsx`)
```jsx
useEffect(() => {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'dark' || saved === 'light') setTheme(saved)
}, [])
```
**Why:** Reads the user's previously selected theme from `localStorage` on initial app load. Runs once on mount (empty dependency array).

```jsx
useEffect(() => {
  localStorage.setItem('portfolio-theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}, [theme])
```
**Why:** Persists theme changes to `localStorage` and applies the `data-theme` attribute to `<html>` for CSS dark mode selectors. Runs on every theme change.

### 2. Home Loading Simulation (`Home.jsx`)
```jsx
useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 1000)
  return () => clearTimeout(timer)
}, [])
```
**Why:** Simulates a brief loading sequence (1 second) when the Home component mounts. Demonstrates async initialization patterns. Includes cleanup to clear the timer if the component unmounts early, preventing memory leaks and state updates on unmounted components.

### 3. Scroll Listener with Cleanup (`Navbar.jsx`)
```jsx
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20)
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```
**Why:** Adds a scroll event listener to toggle the header shadow when the user scrolls down. **Cleanup function removes the listener** on unmount to prevent memory leaks.

### 4. Resize Listener with Cleanup (`Navbar.jsx`)
```jsx
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) setMenuOpen(false)
  }
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```
**Why:** Automatically closes the mobile navigation menu when the window is resized above tablet breakpoint. **Cleanup function removes the listener** on unmount.

---

## 🎨 Features Checklist

- [x] Reusable components: `Navbar`, `ProjectCard`, `Skills`, `ContactForm`, `Footer`, `Layout`
- [x] `ProjectCard` receives all data via props (no hardcoded content)
- [x] 4+ projects mapped from `src/data/projects.js`
- [x] Prop drilling 2+ levels deep (About→Skills→SkillGroup and App→Projects→ProjectsGrid→ProjectCard)
- [x] Dark/light theme toggle with state lifted to `App`
- [x] Controlled contact form with validation (name, email, message)
- [x] Submit button disabled until required fields are valid
- [x] "View details" toggle per `ProjectCard` (independent state per instance)
- [x] Home loading simulation via `useEffect` + `setTimeout`
- [x] Theme persistence to `localStorage` via `useEffect`
- [x] All `useEffect` hooks with subscriptions/timers include cleanup functions
- [x] `react-router-dom` configured with `BrowserRouter`
- [x] Routes: `/`, `/about`, `/projects`, `/contact`
- [x] Dynamic route: `/projects/:projectId`
- [x] 404 catch-all route with link back to Home
- [x] Shared layout (`Navbar` + `Footer`) via `Outlet`
- [x] Navigation uses `<NavLink>` (not `<a>` tags)
- [x] CSS adapted from Assignment 1 with dark mode support
- [x] Responsive breakpoints (mobile ≤480px, tablet ≤768px)
- [x] Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- [x] WCAG AA color contrast maintained
- [x] Functional components with Hooks only (no class components)
- [x] No third-party state management libraries
- [x] No UI component libraries (plain JSX + CSS)
- [x] Builds successfully with `npm run build`

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI library |
| `react-dom` | ^18.3.1 | DOM renderer |
| `react-router-dom` | ^6.26.0 | Client-side routing |
| `vite` | ^5.3.4 | Build tool |
| `@vitejs/plugin-react` | ^4.3.1 | React support for Vite |

---

## 📝 Notes

- Place your profile image at `public/Image.png` for the hero section to display correctly.
- The theme toggle button is located in the navbar, next to the hamburger menu on mobile.
- All project data is centralized in `src/data/projects.js` for easy maintenance.
- The contact form currently simulates submission (no backend yet — that will be added in Assignment 3 with Node.js/Express).

---

**Crafted with ♥ by Pinikeshi Meghana**  
Roll No. 24CSB0A54 · NIT Warangal · 2026
