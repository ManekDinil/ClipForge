# ClipForge Project Map

Based on the provided Software Requirements Specification (SRS) for the ClipForge project, this document outlines the recommended full-stack directory structure. It integrates the immediate React frontend requirements with the planned future server-side capabilities, while mapping the Functional Requirements (FRs) to specific components.

## Directory Structure

The project is structured to support both the React frontend (the current focus) and the planned backend for video processing and AI integration.

```text
clipforge/
├── frontend/                      # React Frontend (Current Phase Focus)
│   ├── public/
│   ├── src/
│   │   ├── assets/                # Static assets and global styles
│   │   ├── components/            # Reusable UI architecture
│   │   │   ├── uploader/          # Video upload & validation zones
│   │   │   ├── editor/            # Caption editing & 9:16 previews
│   │   │   └── timeline/          # Transcription blocks
│   │   ├── pages/                 # Core product pillars (Routing)
│   │   │   ├── LandingPage.jsx
│   │   │   ├── UploadDashboard.jsx
│   │   │   └── ClipEditor.jsx
│   │   ├── services/              # API clients for backend communication
│   │   ├── utils/                 # Utilities (e.g., input sanitization for XSS)
│   │   ├── App.jsx                # react-router-dom setup
│   │   └── main.jsx
│   ├── package.json               # Frontend dependencies
│   └── tailwind.config.js         # Tailwind styling & breakpoints
│
├── backend/                       # Server-Side Logic (Future Roadmap)
│   ├── api/                       # API routes (REST/GraphQL)
│   │   ├── routes/
│   │   └── controllers/
│   ├── data_processing/           # Core AI and Video logic
│   │   ├── ffmpeg_service.js      # Video manipulation & high-speed cutting
│   │   └── whisper_service.js     # OpenAI Whisper transcription logic
│   ├── models/                    # Database schemas (Users, Clips, Videos)
│   ├── middleware/
│   │   └── auth.js                # JWT validation
│   ├── .env                       # Environment variables (API keys, secrets)
│   └── server.js                  # Backend entry point
│
└── README.md
```

## Essential Configuration Files

| File | Location | Purpose |
|------|----------|---------|
| `tailwind.config.js` | `/frontend` | Configures Tailwind CSS themes and responsive breakpoints (mobile: 375px, tablet: 768px, desktop: 1440px) as defined in Sec 4.1. |
| `package.json` | `/frontend` | Manages frontend dependencies like `react`, `react-router-dom`, `lucide-react`, and `tailwindcss`. |
| `.env` | `/frontend` & `/backend` | Secure storage for variables. Frontend uses it for API URLs; Backend uses it for JWT secrets and OpenAI API keys. |
| `vite.config.js` | `/frontend` | Frontend build tooling for optimal Load Time (FCP < 1.5s) and performance. |

## Functional Requirements (FR) Mapping

The following table maps the Functional Requirements (FRs) defined in the SRS to their corresponding implementation files within the frontend structure.

| Feature ID | Requirement Description | Target File / Component |
|------------|-------------------------|-------------------------|
| **FR-1** | **Video Uploader**: Drag-and-drop zone with real-time progress simulation and format validation. | `frontend/src/components/uploader/VideoUploader.jsx` |
| **FR-2** | **AI Caption Editor**: Dual-pane layout with a 9:16 vertical preview and an editing sidebar for styling. | `frontend/src/components/editor/AICaptionEditor.jsx` |
| **FR-3** | **Sync Timeline**: Timestamped transcription blocks allowing manual correction of AI-generated text. | `frontend/src/components/timeline/SyncTimeline.jsx` |
| **FR-4** | **Viral Scoring**: Visual badges predicting social performance for each highlight clip. | `frontend/src/components/editor/ViralScoringBadge.jsx` |
| **FR-5** | **AI Regeneration**: "Magic" button to trigger re-analysis of specific clips for improved results. | `frontend/src/components/editor/AIRegenerationButton.jsx` |

## Security & Non-Functional Tracing

- **JWT & XSS (Sec 4.2)**: Secure session management and cross-site scripting prevention are handled via `backend/middleware/auth.js` and frontend sanitization utilities like `frontend/src/utils/sanitize.js`.
- **Performance & Usability (Sec 4.1)**: Achieved through Vite build optimizations and responsive layouts defined centrally in `tailwind.config.js`.
