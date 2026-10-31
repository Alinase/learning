import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Certificate } from '../types';
import { ShieldCheck, Search, Award, CheckCircle2, XCircle, ArrowRight, ExternalLink } from 'lucide-react';

export const VerifyCertificatePage: React.FC = () => {
  const { verifyCertificateId, setActiveCertificate } = useApp();

  const [inputCode, setInputCode] = useState('ALITECH-ZM-2026-8941');
  const [result, setResult] = useState<Certificate | null>(() => verifyCertificateId('ALITECH-ZM-2026-8941'));
  const [searched, setSearched] = useState(true);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const match = verifyCertificateId(inputCode);
    setResult(match);
    setSearched(true);
  };

  const handleQuickSample = (code: string) => {
    setInputCode(code);
    const match = verifyCertificateId(code);
    setResult(match);
    setSearched(true);
  };

  return (
    <div className="pb-20 space-y-16">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Public Credential Verification Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Authenticate an Official AliTech Certificate
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Verify the authenticity of digital certificates issued by AliTech Investments Ltd to students, professionals,
            and corporate teams across Zambia and international jurisdictions.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-4">
            <form onSubmit={handleVerify} className="relative flex items-center">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter Certificate Serial (e.g. ALITECH-ZM-2026-8941)..."
                className="w-full pl-5 pr-32 py-3.5 rounded-2xl bg-white text-slate-900 font-mono text-sm uppercase tracking-wider focus:outline-hidden focus:ring-2 focus:ring-teal-500 shadow-xl"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                Verify Now
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>Quick Sample:</span>
              <button
                type="button"
                onClick={() => handleQuickSample('ALITECH-ZM-2026-8941')}
                className="text-teal-400 hover:underline font-mono"
              >
                ALITECH-ZM-2026-8941
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Result Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {searched && (
          <div>
            {result ? (
              <div className="bg-white rounded-3xl border-2 border-emerald-500/50 p-6 sm:p-10 shadow-xl space-y-6">
                {/* Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                        Official Status: Verified Authentic
                      </span>
                      <h2 className="text-xl font-bold text-slate-900">Valid Credential Record</h2>
                    </div>
                  </div>

                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                    ID: {result.id}
                  </span>
                </div>

                {/* Recipient and Course Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700">
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                    <span className="text-slate-400 block text-[11px] uppercase">Awarded To</span>
                    <span className="text-base font-bold text-slate-900 block">{result.studentName}</span>
                    <span className="text-slate-500">Student ID: {result.studentId}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                    <span className="text-slate-400 block text-[11px] uppercase">Course Title</span>
                    <span className="text-sm font-bold text-teal-800 block">{result.courseTitle}</span>
                    <span className="text-slate-500">Total Duration: {result.totalHours} Accredited Hours</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                    <span className="text-slate-400 block text-[11px] uppercase">Academic Grade Achieved</span>
                    <span className="text-base font-bold text-emerald-700 block">{result.gradePercentage}%</span>
                    <span className="text-slate-500">Passing Threshold: 80%</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 space-y-1">
                    <span className="text-slate-400 block text-[11px] uppercase">Issuing Authority</span>
                    <span className="text-xs font-bold text-slate-900 block">{result.accreditedBy}</span>
                    <span className="text-slate-500">Issue Date: {result.issueDate}</span>
                  </div>
                </div>

                {/* Verification Seal & Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Cryptographic Hash: {result.verificationCode}</span>
                  </div>

                  <button
                    onClick={() => setActiveCertificate(result)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Official Certificate & Seal</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-rose-200 p-8 text-center space-y-3 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Certificate Not Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No registered record corresponds to serial "{inputCode}". Please double check the ID stamped on the
                  certificate or contact the registrar.
                </p>
                <button
                  onClick={() => handleQuickSample('ALITECH-ZM-2026-8941')}
                  className="text-xs font-semibold text-teal-700 underline"
                >
                  Try verifying sample ID: ALITECH-ZM-2026-8941
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
