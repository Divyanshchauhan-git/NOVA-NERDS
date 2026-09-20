<div align="center">
<img width="1600" height="528" alt="HAHAHAHHAHHHHHAHAHAAAHAHAHAHAHHHAHAHA" src="https://github.com/user-attachments/assets/3f680554-1f27-4865-9604-a59d0aac5f2d" />

</div>

# NOVA-NERDS — Meridian Flood Command EOC

Autonomous AI-Driven Emergency Operations Center (EOC) Decision-Support Platform for Flood Response & Disaster Management.

## Overview
Meridian Flood Command provides real-time hydrological analysis, casualty mitigation risk scoring, emergency asset deployment, aerial reconnaissance drone telemetry, and predictive flood tracking powered by Google Gemini.

## Features
- **Real-Time Situation Appraisal**: Automated AI briefing on hydrological flood progression and immediate tactical dispatches.
- **Visual Flood Assessment**: AI-driven analysis of field images and damage detection.
- **Dynamic Infrastructure & Mobility Monitoring**: Status tracking for sluice gates, pumps, power utilities, and evacuation shelters.
- **Contingency Mode**: Offline-ready local-first emergency fallback telemetry.

## Quickstart

### Prerequisites
- Node.js (v18+)
- npm

### 1. Installation
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your Gemini API key:
```bash
cp .env.example .env
```
Add your key inside `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

