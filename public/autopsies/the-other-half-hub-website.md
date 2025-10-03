
# P1Website – Mental Health and Wellbeing Hub

A responsive, content-rich frontend web application built in **React** with **TailwindCSS**. Designed to support parents, fathers, and wellbeing coordinators by providing access to national and local support groups, media resources, and digital wellbeing tools. Features include interactive UI components, dynamic data from external APIs (YouTube and Spotify), custom form handling, and accessibility-conscious design.

This project was developed as a modern, scalable hub for mental health support, designed with modularity and expansion in mind.

---

## 🧠 Key Features

### 🔹 Dynamic Content Integration
- **YouTube API Integration** to fetch and display video playlists from curated channels
- **Spotify API Integration** to pull music and audio content relevant to the wellbeing theme
- Fully asynchronous fetch handling with loading states

### 🔹 Modular Component Architecture
- Pages and reusable components organized for maintainability:
  - `Pages/` – Core content views like Home, Groups, In Crisis, Staff Page
  - `Components/` – Reusable content blocks and custom UI elements
  - `Formatting/` – Layout and design framework (Header, Footer, Hero, etc.)
  - `UI/` – Interactive UI like Expandable Cards and Animated Cards
  - `Hooks/` – Custom utilities like `use-outside-click` for modals

### 🔹 Form + Interaction Design
- Custom **Wellbeing Form** for user submissions and feedback
- Group submission system to collect new support resources via structured inputs
- Expandable and animated card components for clean UX

### 🔹 Styling & Design
- **TailwindCSS** for modern responsive design
- **CSS Modules** for scoped styles on a per-component basis
- Clean typography, colour palette, and consistent layout logic
- Accessibility-friendly semantic structure

---

## 🛠 Tech Stack

- **React.js** – Core SPA framework
- **TailwindCSS** – Utility-first CSS framework
- **YouTube Data API** – For media integration
- **Spotify API** – For audio content
- **React Router** – Navigation and routing
- **Custom Hooks** – User interaction logic
- **GeoJSON** – Support for regional data (e.g. Essex boundaries)

---

## 📁 Project Structure

```
src/
├── App.js                     # Main React app logic
├── index.js                  # Entry point
├── components/
│   ├── Pages/                # Page-specific components
│   ├── UI/                   # Reusable UI widgets (cards, animations)
│   ├── Formatting/           # Layout structure (NavBar, Hero, Footer)
│   └── inputnational.js      # Group submission forms
├── hooks/
│   ├── use-outside-click.js  # Custom modal hook
│   └── usePopupWidth.js      # Utility for dynamic sizing
├── services/
│   ├── youtubeservice.js     # YouTube data handling
│   └── spotify.js            # Spotify data fetching
├── styles/                   # Modular CSS
└── data/
    └── essex-boundaries.geojson
```

---

## 👨‍💻 My Role

I was the sole developer on this project — from the initial concept and architecture to the implementation of interactive components, API integration, responsive layout, and visual branding.

This site served both a technical and organisational purpose: offering a digital wellbeing solution for use within a UK charity while showcasing my ability to build polished, production-ready frontend experiences from scratch.

---

## 🚧 Project Status

✅ Feature-complete and in working condition.  
🔄 Future plans may include CMS integration or protected user roles for content submission.

---

## 🧭 Project Background & Context

This project was developed as a **frustrated response to the limitations of the MadeOpen platform**, which hosted the original Parents 1st UK website. Their editor offered only the most basic WYSIWYG capabilities (bold, underline, bullet points), lacked font customisation, and had extremely limited design flexibility — essentially locking out any real frontend control.

Recognising that they allowed **iframe embedding**, I took the initiative to build an external site — this project — with full custom styling and layout using React, TailwindCSS, and API integration. My goal was to present a richer, branded experience that could still live inside the existing infrastructure without a full migration.

Ultimately, only the individual pages were adopted, embedded as standalone views in iframes. As such, the landing page and broader structure of this site became unused, though the development effort demonstrates full planning and execution.

Despite being an internal employee and contributor to the company’s digital direction, my feedback and efforts were not taken into account during a major 5-year strategic plan for digital transformation. The organisation chose to extend their contract with MadeOpen without consultation, further limiting innovation and flexibility.

This experience significantly contributed to my decision to seek employment elsewhere — not due to a lack of passion, but due to the consistent disregard of practical, in-house solutions and a lack of respect for developer-led improvements.

---

## 💡 Highlights

- Clean, maintainable React architecture with emphasis on scalability
- Demonstrated use of RESTful APIs for dynamic content
- Real-world UX design based on user needs and accessibility
- Modern frontend stack (TailwindCSS, React Router, Hooks)
- Thoughtful layout planning for mobile, tablet, and desktop users

---

## 🙌 Final Thoughts

This project showcases my frontend web development capabilities in a real-world setting, driven by empathy, user needs, and modern development principles. It's a portfolio piece I'm proud of — balancing functionality, design, and performance in a mission-driven context.
