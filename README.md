# CalmCopy

**CalmCopy** is an internal AI-powered content generation tool designed for Lemonade's team. It guides users through a context-setting wizard to generate on-brand, high-quality content using **Google Gemini**.

## 🎯 Product Overview

This tool replaces complex prompt engineering with a simple, human-centric workflow:
1.  **Login**: Secure entry (MVP: `demo` / `demo`).
2.  **Settings**: Configure **Gemini API Key** or use "Mock Mode" for testing.
3.  **Wizard**: A 3-step flow to define **Segment**, **Tone**, and **Audience**.
4.  **Chat**: An interactive interface with dynamic greetings based on your context.
5.  **Action**: A "I'm happy!" flow to distribute content to the right channels.

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Create a `.env.local` file in the root directory:
    ```bash
    GEMINI_API_KEY=your_google_api_key
    ```
    *(Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000).

5.  **Login**:
    -   Username: `demo`
    -   Password: `demo`

## ✨ Key Features

*   **Context Wizard**: Tailor content for *Internal Comms*, *PR*, *Customer Emails*, *Marketing Copy*, or *Product Micro-copy*.
*   **Dynamic Greetings**: The AI greets you with specific advice based on your selected segment.
*   **Context Editor**: Edit your choices directly in the chat without losing your place.
*   **Action Modal**: Click **"I'm happy!"** to see suggested channels (Slack, LinkedIn, etc.) and simulate sending with a delightful lemon spinner.
*   **Gemini Integration**: Powered by Google's `gemini-1.5-flash` (via `gemini-flash-latest` alias) for fast, high-quality responses.

## 🏗️ System Design

### Architecture
-   **Framework**: Next.js 14 (App Router).
-   **Styling**: Vanilla CSS Modules with Global Variables for Lemonade branding.
-   **AI Provider**: Google Generative AI SDK.

### Security
-   API Keys are handled securely via server-side environment variables (`.env.local`) or client-side settings (localStorage fallback).
-   No sensitive data is stored in a backend database for this MVP.

## 🎨 Brand Alignment
-   **Colors**: Lemonade Pink (#FF0083), Dark Gray (#2D2D2D), and White.
-   **Tone**: Friendly, clear, and human.
