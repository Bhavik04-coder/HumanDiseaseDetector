'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, AlertCircle, CheckCircle2, X, Stethoscope, ArrowRight, ArrowLeft, Bot, Activity } from 'lucide-react';
import PatientNavbar from '@/components/patient/PatientNavbar';
import NeuralNetworkContainer from '@/components/ui/NeuralNetworkContainer';
import Footer from '@/components/patient/Footer';

// Common symptoms list
const COMMON_SYMPTOMS = [
  'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering',
  'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue',
  'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue',
  'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss',
  'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough',
  'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration',
  'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea',
  'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain',
  'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure',
  'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
  'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
  'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
  'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness',
  'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes',
  'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts',
  'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness',
  'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance',
  'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine',
  'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
  'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body',
  'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite',
  'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration',
  'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma',
  'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload',
  'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking',
  'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting',
  'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
  'yellow_crust_ooze'
];

interface PredictionResult {
  prediction: string;
  confidence: number;
}

export default function DiseasePredictionPage() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState('http://localhost:8000');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const filteredSymptoms = COMMON_SYMPTOMS.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.includes(symptom)
  );

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSearchTerm('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const symptomsDict: Record<string, number> = {};
      COMMON_SYMPTOMS.forEach(symptom => {
        symptomsDict[symptom] = selectedSymptoms.includes(symptom) ? 1 : 0;
      });

      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: symptomsDict
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      setPrediction({
        prediction: data.prediction,
        confidence: Math.round(data.confidence * 100)
      });
    } catch (err) {
      let errorMessage = 'Failed to get prediction. ';
      
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        errorMessage += `Cannot connect to API at ${apiUrl}. Please ensure the FastAPI server is running.`;
      } else if (err instanceof Error) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Unknown error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultDoctor = () => {
    router.push('/consult-doctor');
  };

  return (
    <NeuralNetworkContainer className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <PatientNavbar />
      
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 pt-32 pb-20"
      >
        {/* Animated background orbs */}
        <div 
          className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl transition-all duration-500 ease-out"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: `translate(-50%, -50%) scale(${1 + mousePosition.y * 0.3})`,
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-purple-400/20 rounded-full blur-3xl transition-all duration-700 ease-out"
          style={{
            left: `${(1 - mousePosition.x) * 100}%`,
            top: `${(1 - mousePosition.y) * 100}%`,
            transform: `translate(-50%, -50%) scale(${1 + mousePosition.x * 0.3})`,
          }}
        />
        
        {/* Floating icons */}
        <div 
          className="absolute transition-all duration-500 ease-out opacity-20"
          style={{
            left: `${20 + mousePosition.x * 10}%`,
            top: `${30 + mousePosition.y * 10}%`,
            transform: `rotate(${mousePosition.x * 20}deg)`,
          }}
        >
          <Activity className="w-16 h-16 text-white" />
        </div>
        <div 
          className="absolute transition-all duration-700 ease-out opacity-20"
          style={{
            right: `${15 + mousePosition.x * 10}%`,
            top: `${40 + mousePosition.y * 15}%`,
            transform: `rotate(${-mousePosition.y * 20}deg)`,
          }}
        >
          <Bot className="w-20 h-20 text-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6 transition-transform duration-300"
              style={{
                transform: `translateY(${mousePosition.y * -10}px)`,
              }}
            >
              AI Disease Prediction
              <span className="block text-blue-200 mt-2">& Medical Assistant</span>
            </h1>
            <p 
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto transition-transform duration-500"
              style={{
                transform: `translateY(${mousePosition.y * -5}px)`,
              }}
            >
              Advanced AI-powered disease prediction based on your symptoms. 
              Get instant analysis and connect with doctors for professional care.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/20"
                style={{
                  transform: `translateX(${mousePosition.x * -10}px)`,
                }}
              >
                <Activity className="w-5 h-5" />
                <span className="font-medium">AI-Powered Analysis</span>
              </div>
              <div 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-400 hover:bg-white/20"
              >
                <Bot className="w-5 h-5" />
                <span className="font-medium">Instant Results</span>
              </div>
              <div 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-500 hover:bg-white/20"
                style={{
                  transform: `translateX(${mousePosition.x * 10}px)`,
                }}
              >
                <Stethoscope className="w-5 h-5" />
                <span className="font-medium">Expert Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/patient-dashboard')}
          className="mb-6 flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Back to Dashboard</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/30 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Symptom Analysis</h2>
                <p className="text-gray-600 text-sm">Select your symptoms for AI prediction</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* API URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  API URL (optional)
                </label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://localhost:8000"
                  className="w-full px-4 py-3 bg-white/70 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm shadow-sm"
                />
              </div>

              {/* Symptom Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Symptoms
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search symptoms..."
                    className="w-full px-5 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                  />
                  {searchTerm && filteredSymptoms.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                      {filteredSymptoms.slice(0, 10).map((symptom) => (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => addSymptom(symptom)}
                          className="w-full px-5 py-3 text-left hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700 border-b border-gray-100 last:border-0"
                        >
                          {symptom.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Selected Symptoms ({selectedSymptoms.length})
                  </label>
                  <div className="flex flex-wrap gap-2 p-4 bg-white/50 rounded-xl border-2 border-blue-100 max-h-48 overflow-y-auto">
                    {selectedSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-md"
                      >
                        <span>{symptom.replace(/_/g, ' ')}</span>
                        <button
                          type="button"
                          onClick={() => removeSymptom(symptom)}
                          className="hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-5 bg-red-50 border-2 border-red-200 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Predict Button */}
              <button
                type="button"
                onClick={handlePredict}
                disabled={loading || selectedSymptoms.length === 0}
                className="w-full px-8 py-5 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Predict Disease</span>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/30 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Prediction Results</h2>
                <p className="text-gray-600 text-sm">AI-powered disease analysis</p>
              </div>
            </div>

            {!prediction && !loading && (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Prediction Yet</h3>
                <p className="text-gray-500">Select symptoms and click "Predict Disease" to get AI analysis</p>
              </div>
            )}

            {prediction && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl border-2 border-blue-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Analysis Complete</h3>
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  
                  <div className="p-5 bg-white/70 rounded-xl border border-blue-100">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Predicted Disease:</span>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{prediction.prediction}</p>
                  </div>
                  
                  <div className="p-5 bg-white/70 rounded-xl border border-blue-100">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Confidence Level:</span>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-1000 rounded-full"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xl font-bold text-gray-800 min-w-[60px]">{prediction.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="p-5 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-bold mb-2">⚠️ Important Medical Disclaimer:</p>
                      <p className="leading-relaxed">This is an AI prediction and should not replace professional medical advice. Please consult with a qualified healthcare provider for proper diagnosis and treatment.</p>
                    </div>
                  </div>
                </div>

                {/* Consult Doctor Button */}
                <button
                  type="button"
                  onClick={handleConsultDoctor}
                  className="w-full px-8 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <Stethoscope className="w-6 h-6" />
                  <span>Consult a Doctor</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </NeuralNetworkContainer>
  );
}
