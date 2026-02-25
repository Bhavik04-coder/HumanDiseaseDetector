# Human Disease Detector

A comprehensive healthcare platform combining AI-powered disease prediction with a modern, cinematic frontend experience.

## 🎯 Project Overview

This project consists of two main components:
1. **Frontend (Next.js)** - Cinematic healthcare landing page with animated features
2. **Backend (Python)** - Production-ready disease prediction system using ML ensemble

---

## 🎨 Frontend - Dhanvantari AI

A premium, cinematic healthcare landing page featuring scroll-driven animations, canvas-based image sequences, and smooth interactions with a beautiful sky blue and white theme.

### Frontend Features

- Responsive navigation bar with "Dhanvantari AI" branding
- Full-screen hero video background with animated text
- Animated features section with 6 key capabilities:
  - AI Diagnosis (Pulsing Neural Nodes)
  - 24/7 Monitoring (Smooth Sine Wave)
  - Expert Network (Soft Bokeh Particles)
  - Secure & Private (Digital Shield/Grid)
  - Health Analytics (Growing Data Pillars)
  - Mobile Access (Floating App UI Glass)
- How It Works section with 4-step process
- Canvas-based scroll animation (128 frames)
- About section with statistics
- Call-to-action section with metrics
- Footer with links and social media
- Smooth scroll with Lenis
- Framer Motion animations throughout

### Frontend Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (Smooth Scroll)

### Getting Started (Frontend)

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Frontend Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Lenis provider
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── landing/            # Landing page components
│   ├── doctor/             # Doctor dashboard components
│   ├── patient/            # Patient dashboard components
│   ├── ui/                 # Reusable UI components
│   └── animations/         # Animation components
└── public/
    ├── herosection.mp4     # Hero video
    └── scroll-sequence/    # 128 frame images
```

---

## 🤖 Backend - Disease Prediction System

A high-performance multiclass classification system designed to predict final disease outcomes from binary symptom features. The system utilizes a multi-model ensemble (XGBoost, LightGBM, Random Forest) with GPU acceleration and serves predictions via a FastAPI service.

### Backend Features

- **Multi-Model Ensemble**: Combines XGBoost, LightGBM, and Random Forest
- **GPU Acceleration**: Optimized for NVIDIA GPU
- **Graph-Based Feature Engineering**: Node2Vec embeddings
- **Production-Ready API**: FastAPI based inference service
- **Explainable AI (XAI)**: Feature importance analysis and SHAP values
- **Robust Preprocessing**: End-to-end sklearn pipeline

### Backend Structure

```
├── Final_dataset.csv       # Training dataset (260k+ rows)
├── app.py                   # FastAPI Application
├── train_optuna.py          # Main training script
├── symptom_relationships.py # Co-occurrence analysis
├── graph_features.py        # Node2Vec embedding generation
├── pipeline.py              # Core logic & custom Graph Transformer
├── test_app.py              # Sample client for API testing
├── requirements.txt         # Project dependencies
└── best_pipeline.joblib     # Trained ensemble pipeline
```

### Backend Installation

1. Set up a virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

### Backend Usage

1. **Training**: Re-train the model:
   ```bash
   python train_optuna.py
   ```

2. **Running the API**:
   ```bash
   python app.py
   ```

3. **Testing**:
   ```bash
   python test_app.py
   ```

### Performance Summary

- **Overall Accuracy**: ~80%
- **Macro F1 Score**: 0.76
- **Target Count**: 669 unique diseases
- **Input Features**: 500+ binary symptom indicators + 32D Node2Vec Embeddings

---

## 🚀 Build & Deploy

### Frontend Build
```bash
npm run build
npm start
```

### Backend Deployment
The FastAPI service runs on port 8000 and can be deployed using Docker or any Python hosting service.

---

## 📄 License

Internal Project - Healthcare AI Platform
