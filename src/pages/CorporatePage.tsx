import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseCategory } from '../types';
import { CATEGORIES } from '../data/mockData';
import {
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileText,
  DollarSign,
  ArrowRight,
  Send,
  Download
} from 'lucide-react';

export const CorporatePage: React.FC = () => {
  const { currency, showNotification } = useApp();

  const [teamSeats, setTeamSeats] = useState(15);
  const [selectedTrack, setSelectedTrack] = useState(CATEGORIES[1].name); // Cloud Computing
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Seat pricing calculation: base 1200 ZMW ($45 USD) per seat with volume discount
  const basePriceZMW = 1200;
  const basePriceUSD = 45;

  let discountPct = 0;
  if (teamSeats >= 50) discountPct = 30;
  else if (teamSeats >= 25) discountPct = 20;
  else if (teamSeats >= 10) discountPct = 10;

  const subtotalZMW = teamSeats * basePriceZMW;
  const totalZMW = Math.round(subtotalZMW * (1 - discountPct / 100));

  const subtotalUSD = teamSeats * basePriceUSD;
  const totalUSD = Math.round(subtotalUSD * (1 - discountPct / 100));

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) return;
    setSubmitted(true);
    showNotification(`Corporate training proposal requested for ${companyName}! Our enterprise director will contact you.`);
  };

  return (
    <div className="pb-20 space-y-16">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 tracking-wider uppercase">
            <span>Enterprise Solutions</span>
            <span aria-hidden="true">·</span>
            <span>Corporate & Institutional Training</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">
            Empower Your Engineering & Business Teams With Certified Modern Technology
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Custom enterprise cohorts for commercial banks, telecom operators, mining leaders, and government
            institutions across Zambia and Southern Africa.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#calculator"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              Calculate Team Pricing
            </a>
            <button
              onClick={() => showNotification('Downloaded AliTech Corporate Training Prospectus 2026.pdf')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Enterprise Prospectus (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Customized Enterprise Curriculum</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We tailor modules around your exact software stack, internal data protection standards, and corporate cloud
              tenants.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Dedicated Executive Dashboard</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              HR and engineering leadership gain real-time visibility into employee module completions, assessment grades,
              and certification attainment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Flexible Corporate Invoicing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pay via corporate bank transfer (Stanbic, Zanaco, FNB, ABSA) in Zambian Kwacha (ZMW) or USD with official VAT
              tax invoices and PACRA compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Calculator and Proposal Request */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Pricing Calculator */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                Transparent Pricing
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Team Seat Pricing Calculator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Progressive enterprise tier discounts automatically applied.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                  <span>Number of Team Seats:</span>
                  <span className="font-mono text-teal-400 text-sm font-bold">{teamSeats} Employees</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={teamSeats}
                  onChange={(e) => setTeamSeats(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>5 Seats</span>
                  <span>50 Seats (30% off)</span>
                  <span>100+ Seats</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1.5">Target Training Track</label>
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value as CourseCategory)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-hidden"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cost Summary Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Standard Rate ({teamSeats} seats):</span>
                  <span>{currency === 'ZMW' ? `ZMW ${subtotalZMW.toLocaleString()}` : `$${subtotalUSD}`}</span>
                </div>
                {discountPct > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Corporate Volume Discount:</span>
                    <span>-{discountPct}%</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-bold text-white">
                  <span>Estimated Total:</span>
                  <span className="text-teal-400">
                    {currency === 'ZMW' ? `ZMW ${totalZMW.toLocaleString()}` : `$${totalUSD.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Request Official Proposal Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Request Official Corporate Proposal</h2>
              <p className="text-xs text-slate-500 mt-1">
                Receive a formalized technical syllabus, quotation, and scheduling availability within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Proposal Request Received</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you! Our Corporate Solutions Director in Lusaka will reach out to <strong>{email}</strong> with
                  the custom training plan for <strong>{companyName}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Company / Institution Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stanbic Bank Zambia"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Contact Officer Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Head of IT / HR Director"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="officer@company.co.zm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Phone / Mobile (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+260 97 ... "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Specific Training Requirements & Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current tech challenges, expected timeline, on-site vs remote preference..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Formal Training Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
