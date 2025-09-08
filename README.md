# FlixFrame 🎬

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TVMaze API](https://img.shields.io/badge/API-TVmaze-green)](https://www.tvmaze.com/api)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**FlixFrame** is a modern TV show & movie discovery app built with **React + TypeScript**. Search for your favorite shows, browse popular ones, and view detailed info — all in a clean, responsive interface.

---

## 🌟 Features

- **Search TV Shows & Movies** using the TVMaze API  
- **Popular shows** displayed on initial load  
- **Show Details Modal** with:
  - Poster images
  - Show name & summary
  - Genres
  - Premiere & end dates
  - Ratings with color-coded indicators
  - Official site link
- **Responsive Design** for desktop, tablet, and mobile  
- **Loading, Error, and Empty states** handled gracefully  
- **Interactive Search Suggestions** (popular shows)  
- **TypeScript** ensures type safety  
- **Lucide React icons** for a polished UI  
- **Dark Mode** support (optional if implemented)  

---

## 🎨 Tech Stack

- **React** – Frontend library  
- **TypeScript** – Static typing  
- **React Router** – Navigation (if implemented for multiple pages)  
- **Tailwind CSS** – Styling  
- **Lucide React** – Icons  
- **Axios / Fetch API** – API calls  
- **Local State & useEffect** – Managing app state and API calls  

---

## 📡 API Integration & Services

FlixFrame uses the **[TVMaze API](https://www.tvmaze.com/api)**:

```ts
const TVMAZE_BASE_URL = 'https://api.tvmaze.com';
