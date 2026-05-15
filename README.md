# SAKHI – AI-Based PCOS Pre-Risk Prediction System

SAKHI is an AI-powered healthcare application designed to predict early PCOS pre-risk using Machine Learning and Explainable AI techniques. The system analyzes clinical, lifestyle, and hormonal data to generate accurate risk predictions and personalized health insights.

---

## Features
- PCOS pre-risk prediction using ML models
- Data preprocessing & SMOTEENN balancing
- Ensemble learning with stacking model
- Explainable AI using SHAP & LIME
- User & Doctor dashboards
- AI-generated health recommendations

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React.js |
| Backend | Node.js, FastAPI |
| ML & AI | Python, Scikit-learn, SHAP, LIME |
| Database | SQL |
| Tools | Pandas, NumPy |

---

## Machine Learning Pipeline
1. Dataset Collection  
2. Data Preprocessing  
3. Feature Engineering & Normalization  
4. SMOTEENN Balancing  
5. Model Training  
6. Ensemble Prediction  
7. Risk Classification  

---

## Models Used
- Logistic Regression
- Random Forest
- Stacking Ensemble

---

## Performance
- ROC-AUC Score: **0.97**

---

## Installation

```bash
# Clone repository
git clone <repository-url>

# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
node server.js

# FastAPI ML Service
cd ml-service
pip install -r requirements.txt
uvicorn app:app --reload
```

---

## Future Scope
- Wearable device integration
- Real-time monitoring
- Advanced AI recommendations
- Cloud deployment