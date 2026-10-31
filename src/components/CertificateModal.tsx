import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, CheckCircle, ExternalLink, Award, Share2 } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { activeCertificate, setActiveCertificate, setCurrentView } = useApp();

  if (!activeCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleVerifyLink = () => {
    setActiveCertificate(null);
    setCurrentView('verify');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
        {/* Action bar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 no-print">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Award className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-slate-900">Official AliTech Certificate of Completion</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-500">{activeCertificate.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleVerifyLink}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <span>Public Verification</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setActiveCertificate(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-stone-50 border-8 border-stone-200 m-4 rounded-xl relative select-none">
          {/* Inner decorative golden border */}
          <div className="border-2 border-teal-800/40 p-6 sm:p-10 bg-white rounded-lg relative overflow-hidden">
            {/* Corner flourishes */}
            <div className="absolute top-2 left-2 text-teal-700/30 text-2xl font-serif">✦</div>
            <div className="absolute top-2 right-2 text-teal-700/30 text-2xl font-serif">✦</div>
            <div className="absolute bottom-2 left-2 text-teal-700/30 text-2xl font-serif">✦</div>
            <div className="absolute bottom-2 right-2 text-teal-700/30 text-2xl font-serif">✦</div>

            {/* Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex items-center justify-center gap-2 mb-1">
                <span className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
                  AL
                </span>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  ALITECH INVESTMENTS LTD
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest text-teal-800 font-semibold">
                Directorate of Professional Technology Training & Certifications · Lusaka, Zambia
              </p>
              <div className="w-24 h-0.5 bg-teal-600 mx-auto mt-2"></div>
            </div>

            {/* Certificate Title */}
            <div className="text-center space-y-2 my-6">
              <h2 className="text-2xl sm:text-4xl font-serif tracking-tight text-slate-900 italic font-semibold">
                Certificate of Professional Completion
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                This is to officially certify that
              </p>
            </div>

            {/* Student Name */}
            <div className="text-center my-6">
              <p className="text-2xl sm:text-4xl font-bold text-teal-900 border-b-2 border-slate-300 inline-block px-8 pb-2">
                {activeCertificate.studentName}
              </p>
            </div>

            {/* Body Prose */}
            <div className="text-center max-w-xl mx-auto my-6 space-y-2">
              <p className="text-sm text-slate-600 leading-relaxed">
                has successfully completed all required modules, assessments, and practical hands-on labs for the
                professional training program in
              </p>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                {activeCertificate.courseTitle}
              </p>
              <p className="text-xs text-slate-500">
                Total Accredited Duration: {activeCertificate.totalHours} Hours · Academic Passing Grade: {activeCertificate.gradePercentage}%
              </p>
            </div>

            {/* Signatures & Seal & QR Code */}
            <div className="pt-8 mt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
              {/* Signature 1 */}
              <div className="space-y-1">
                <div className="font-serif italic text-lg text-slate-800 border-b border-slate-400 pb-1 max-w-[180px] mx-auto">
                  Alinafe Nyirenda
                </div>
                <p className="text-[11px] font-bold text-slate-800">Alinafe Nyirenda</p>
                <p className="text-[10px] text-slate-500">Principal Cloud Architect, AliTech</p>
              </div>

              {/* Official Seal */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-amber-600/60 bg-amber-50/50 flex flex-col items-center justify-center p-2 text-center shadow-xs">
                  <Award className="w-6 h-6 text-amber-700 mb-0.5" />
                  <span className="text-[9px] font-extrabold uppercase tracking-tighter text-amber-900 leading-none">
                    ALITECH OFFICIAL SEAL
                  </span>
                  <span className="text-[8px] text-amber-800">LUSAKA · ZM</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 font-mono">{activeCertificate.id}</span>
              </div>

              {/* QR Code and verification */}
              <div className="flex flex-col items-center sm:items-end text-right space-y-1">
                {/* SVG QR Code Simulation */}
                <div className="p-1 bg-white border border-slate-300 rounded shadow-xs">
                  <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    {/* Corners */}
                    <rect x="10" y="10" width="24" height="24" fill="black" />
                    <rect x="14" y="14" width="16" height="16" fill="white" />
                    <rect x="18" y="18" width="8" height="8" fill="black" />

                    <rect x="66" y="10" width="24" height="24" fill="black" />
                    <rect x="70" y="14" width="16" height="16" fill="white" />
                    <rect x="74" y="18" width="8" height="8" fill="black" />

                    <rect x="10" y="66" width="24" height="24" fill="black" />
                    <rect x="14" y="70" width="16" height="16" fill="white" />
                    <rect x="18" y="74" width="8" height="8" fill="black" />

                    {/* Data dots */}
                    <rect x="42" y="12" width="6" height="6" fill="black" />
                    <rect x="52" y="18" width="6" height="6" fill="black" />
                    <rect x="42" y="28" width="6" height="6" fill="black" />
                    <rect x="52" y="38" width="6" height="6" fill="black" />
                    <rect x="12" y="44" width="6" height="6" fill="black" />
                    <rect x="22" y="52" width="6" height="6" fill="black" />
                    <rect x="32" y="44" width="6" height="6" fill="black" />
                    <rect x="42" y="54" width="6" height="6" fill="black" />
                    <rect x="52" y="64" width="6" height="6" fill="black" />
                    <rect x="62" y="54" width="6" height="6" fill="black" />
                    <rect x="72" y="44" width="6" height="6" fill="black" />
                    <rect x="82" y="64" width="6" height="6" fill="black" />
                    <rect x="42" y="74" width="6" height="6" fill="black" />
                    <rect x="62" y="74" width="6" height="6" fill="black" />
                    <rect x="82" y="84" width="6" height="6" fill="black" />
                  </svg>
                </div>
                <p className="text-[10px] text-slate-500 font-mono text-center sm:text-right">
                  Scan or verify at:
                  <br />
                  <span className="text-teal-700 font-semibold">elearning.alitech.co.zm/verify</span>
                </p>
                <p className="text-[10px] text-slate-400">Date: {activeCertificate.issueDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
