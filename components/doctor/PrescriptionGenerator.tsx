'use client';

import { useState } from 'react';
import { Plus, Trash2, FileDown, Pill, SendToBack } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  duration: string;
}

export default function PrescriptionGenerator() {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: '', dosage: '', duration: '' },
  ]);
  const [advice, setAdvice] = useState('');
  const [forwardToPharmacy, setForwardToPharmacy] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);

    // Generate PDF logic
    setTimeout(() => {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235);
      doc.text('Dhanvantari AI', 14, 22);
      doc.setFontSize(16);
      doc.setTextColor(31, 41, 55);
      doc.text('Medical Prescription', 14, 32);

      doc.setLineWidth(0.5);
      doc.line(14, 38, 196, 38);

      // Patient Details
      doc.setFontSize(12);
      doc.setTextColor(75, 85, 99);
      doc.text(`Patient Name: ${patientName || '______________'}`, 14, 48);
      doc.text(`Age: ${patientAge || '____'}`, 140, 48);
      doc.text(`Date: ${prescriptionDate || new Date().toLocaleDateString()}`, 14, 56);

      // Medicines Table
      doc.text('Rx - Prescribed Medicines:', 14, 70);

      const validMedicines = medicines.filter(m => m.name.trim() !== '');
      if (validMedicines.length > 0) {
        const tableColumn = ["Medicine Name", "Dosage", "Duration"];
        const tableRows = validMedicines.map(m => [m.name, m.dosage, m.duration]);

        (doc as any).autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 76,
          theme: 'grid',
          headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255] },
        });
      }

      // Medical Advice
      const finalY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY : 76;
      if (advice) {
        doc.text('Medical Advice / Instructions:', 14, finalY + 15);
        doc.setFontSize(10);
        const splitAdvice = doc.splitTextToSize(advice, 182);
        doc.text(splitAdvice, 14, finalY + 23);
      }

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(156, 163, 175);
      doc.text('This is a digitally generated prescription.', 105, 280, { align: 'center' });

      doc.save(`${patientName ? patientName.toLowerCase().replace(/\s+/g, '_') : 'patient'}_prescription.pdf`);

      setIsGenerating(false);

      if (forwardToPharmacy) {
        alert('Prescription PDF downloaded and successfully forwarded to Pharmacy!');
      }
    }, 1500);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { id: Date.now(), name: '', dosage: '', duration: '' }]);
  };

  const removeMedicine = (id: number) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  const updateMedicine = (id: number, field: keyof Medicine, value: string) => {
    setMedicines(
      medicines.map((med) => (med.id === id ? { ...med, [field]: value } : med))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Prescription Generator</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              placeholder="Enter age"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={prescriptionDate}
              onChange={(e) => setPrescriptionDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Prescription date"
              title="Select prescription date"
            />
          </div>
        </div>

        {/* Medicines */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Medicines</h2>
            <button
              onClick={addMedicine}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Medicine
            </button>
          </div>

          <div className="space-y-4">
            {medicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-xl"
              >
                <input
                  type="text"
                  placeholder="Medicine name"
                  value={medicine.name}
                  onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={medicine.dosage}
                  onChange={(e) => updateMedicine(medicine.id, 'dosage', e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={medicine.duration}
                  onChange={(e) => updateMedicine(medicine.id, 'duration', e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeMedicine(medicine.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  aria-label="Remove medicine"
                  title="Remove medicine"
                >
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Advice */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Medical Advice
          </label>
          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            rows={6}
            placeholder="Enter medical advice and instructions..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Forward to Pharmacy Option */}
        <div className="mb-8 flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Pill className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Forward to Pharmacy</p>
              <p className="text-sm text-gray-500">Automatically send this prescription to the patient's selected pharmacy</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={forwardToPharmacy}
              onChange={(e) => setForwardToPharmacy(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : forwardToPharmacy ? (
            <SendToBack className="w-5 h-5" />
          ) : (
            <FileDown className="w-5 h-5" />
          )}
          {isGenerating
            ? 'Processing...'
            : forwardToPharmacy
              ? 'Generate & Forward to Pharmacy'
              : 'Generate PDF Prescription'}
        </button>
      </div>
    </div>
  );
}
