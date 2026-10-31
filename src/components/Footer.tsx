import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Headquarters */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-extrabold text-sm">
                AL
              </span>
              <span className="text-xl font-bold tracking-tight text-white">AliTech eLearning</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Empowering individuals, enterprises, and institutions across Zambia and Africa with certified training in Cloud Computing, Cybersecurity, Artificial Intelligence, and Software Engineering.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0" />
                <span>AliTech Investments Ltd · Great East Road, Lusaka, Zambia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                <a href="mailto:elearning@alitech.co.zm" className="hover:text-white transition-colors">
                  elearning@alitech.co.zm
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                <span>+260 97 700 0000 / +260 211 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-500 shrink-0" />
                <span>elearning.alitech.co.zm</span>
              </div>
            </div>
          </div>

          {/* Col 2: Learning Tracks */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Core Tracks</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Cybersecurity & SOC
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Google Cloud Platform (GCP)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Microsoft Azure & AWS
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Artificial Intelligence & ML
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Full-Stack Software Dev
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('courses')} className="hover:text-white transition-colors">
                  Data Science & Power BI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional & Enterprise */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Enterprise</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentView('corporate')} className="hover:text-white transition-colors">
                  Corporate Training Packages
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('corporate')} className="hover:text-white transition-colors">
                  Custom Team Syllabi
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('become-instructor')} className="hover:text-white transition-colors">
                  Become an Instructor
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('verify')} className="hover:text-white transition-colors">
                  Verify Credentials
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('community')} className="hover:text-white transition-colors">
                  Student Discussions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Payments & Social */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Connect & Pay</h4>
            <div className="space-y-3 text-xs">
              <a
                href="https://www.facebook.com/alitechinnovations"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-medium"
              >
                <span>AliTech on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="pt-2">
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                  Accepted Payments in Zambia
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-center font-medium text-slate-300">
                    Airtel Money
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-center font-medium text-slate-300">
                    MTN MoMo
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-center font-medium text-slate-300">
                    Zanaco / Stanbic
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-center font-medium text-slate-300">
                    Visa / Mastercard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AliTech Investments Ltd. Lusaka, Zambia. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setCurrentView('help')} className="hover:text-white transition-colors">
              Help Centre
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setCurrentView('contact')} className="hover:text-white transition-colors">
              Contact Us
            </button>
            <span aria-hidden="true">·</span>
            <span>Compliant with Zambia Data Protection Act No. 3</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
