# Lemonade AI Content Tool (MVP)

An internal AI-powered content generation tool designed for Lemonade's team. It guides users through a context-setting wizard to generate on-brand, high-quality content using AI.

## 🎯 Product Overview

This tool replaces complex prompt engineering with a simple, human-centric workflow:
1.  **Login**: Secure entry (MVP: `demo` / `demo`).
2.  **Settings**: Configure OpenAI API Key or use "Mock Mode" for testing.
3.  **Wizard**: A 3-step flow to define **Segment**, **Tone**, and **Audience**.
4.  **Chat**: An interactive interface to generate content based on the defined context.

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000).

4.  **Login**:
    -   Username: `demo`
    -   Password: `demo`

5.  **Configure AI**:
    -   Go to **Settings** (if not redirected automatically, or via URL `/settings`).
    -   Enter your OpenAI API Key for real generation.
    -   Or leave it empty to use **Mock Mode** (simulated responses).

## 🏗️ System Design

### Architecture
-   **Framework**: Next.js 14 (App Router) for full-stack capabilities.
-   **Styling**: Vanilla CSS Modules with Global Variables for Lemonade branding.
-   **State Management**: React Context (`SessionContext`, `SettingsContext`) for cross-component state.

### Key Components
-   **`Wizard`**: Orchestrates the progressive disclosure of context gathering.
-   **`ChatInterface`**: Handles the user-AI interaction loop.
-   **`API Route` (`/api/generate`)**:
    -   Acts as a secure gateway to OpenAI.
    -   Injects "System Prompts" to enforce Lemonade's brand voice.
    -   Handles "Mock Mode" logic for testing without costs.

### Security
-   API Keys are stored in the user's browser (`localStorage`) for the MVP, ensuring they are never saved to a backend database.
-   The API route proxies requests, so the key is never exposed in network requests to OpenAI from the client directly (if we were using a server-side key, but here we pass it securely).

## 🎨 Brand Alignment
-   **Colors**: Lemonade Pink (#FF0083), Dark Gray (#2D2D2D), and White.
-   **Typography**: Clean sans-serif (System UI).
-   **Tone**: Friendly, clear, and human.

## 📦 Deliverables
-   [x] Working MVP
-   [x] Clean, readable code
-   [x] Implementation Plan
-   [x] README
