'use client';

import { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PredictionForm() {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handlePredict = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPrediction({
        disease: 'Common Cold',
        confidence: 92,
        severity: 'Low',
        recommendations: [
          'Rest and stay hydrated',
          'Take over-the-counter pain relievers',
          'Consult a doctor if symptoms persist'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="backdrop-blur-md bg-white/70 rounded-3xl shadow-xl border border-white/20 p-8 h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Disease Prediction</h3>
      </div>

      <div className="space-y-6">
        {/* Symptoms Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter your symptoms (e.g., fever, cough, headache)"
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            rows={4}
          />
        </div>

        {/* Age Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Gender Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            aria-label="Select gender"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={loading || !symptoms || !age || !gender}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Predict Disease</span>
          )}
        </button>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-gray-800">Prediction Result</h4>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Predicted Disease:</span>
                <p className="text-xl font-bold text-blue-600">{prediction.disease}</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Confidence:</span>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-1000"
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{prediction.confidence}%</span>
                </div>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Severity:</span>
                <p className="text-lg font-semibold text-gray-800">{prediction.severity}</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-600 block mb-2">Recommendations:</span>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
