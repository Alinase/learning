import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, Search, ChevronDown, ChevronUp, Smartphone, Award, Terminal, Mail, Phone } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
  category: string;
}

export const HelpCenterPage: React.FC = () => {
  const { setCurrentView } = useApp();
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqs: FAQ[] = [
    {
      category: 'Payments',
      q: 'How do I pay with Airtel Money or MTN Mobile Money in Zambia?',
      a: 'During checkout, choose Airtel Money or MTN Mobile Money. Enter your Zambian mobile number (e.g. 097... or 096...). You will receive an instantaneous USSD push notification on your mobile handset. Enter your 4-digit mobile money PIN to authorize the payment in Zambian Kwacha (ZMW). Access to your course is unlocked instantly upon confirmation.'
    },
    {
      category: 'Payments',
      q: 'Can international learners pay with Visa, Mastercard or USD?',
      a: 'Yes! International learners can select the USD ($) currency toggle at the top of the screen and checkout securely with any international Visa or Mastercard through our regulated global card processor.'
    },
    {
      category: 'Certificates',
      q: 'How does AliTech certificate verification work?',
      a: 'Each certificate issued by AliTech Investments Ltd carries a tamper-evident serial ID (e.g. ALITECH-ZM-2026-8941) and a cryptographically generated QR code. Prospective employers and universities can visit elearning.alitech.co.zm/verify and type this ID to immediately view the recipient name, issue date, accredited hours, and validated grade.'
    },
    {
      category: 'Labs',
      q: 'Do I need a personal Google Cloud or AWS account with a credit card for labs?',
      a: 'No! All hands-on labs in AliTech courses run directly inside your web browser using our isolated cloud terminal sandbox. We provision the compute instances and network topologies for you at zero extra cost and zero personal credit card requirement.'
    },
    {
      category: 'Live Classes',
      q: 'What time zone are the live instructor masterclasses held in?',
      a: 'All live classes are scheduled in Central Africa Time (CAT / GMT+2), which is the official time in Lusaka, Zambia. Session calendar links (.ics and Google Calendar) are automatically generated in your Student Dashboard.'
    },
    {
      category: 'Corporate',
      q: 'Does AliTech offer corporate invoicing and bulk seat licensing?',
      a: 'Yes, AliTech Corporate Solutions provides group onboarding, custom private syllabi, dedicated progress tracking dashboards for HR managers, and formal VAT tax invoices with payment via bank transfer (Stanbic, Zanaco, FNB, ABSA).'
    }
  ];

  const filteredFaqs = faqs.filter((f) => {
    if (activeCategory !== 'All' && f.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="pb-20 space-y-12">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">
            Support & Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">How Can We Help You Today?</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Find immediate answers regarding Airtel & MTN Mobile Money payments, course access, certificates, and cloud
            labs.
          </p>

          <div className="max-w-xl mx-auto relative pt-4">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 mt-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help topics (e.g. Airtel, QR code, sandbox, refund)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Main FAQ content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Categories bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          {['All', 'Payments', 'Certificates', 'Labs', 'Live Classes', 'Corporate'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
                activeCategory === cat ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                    <span className="inline-block mt-3 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      Topic: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Callout */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-900">Still have a question?</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our student advisory and technical support desk in Lusaka is available Monday through Saturday.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => setCurrentView('contact')}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              Contact Support Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
