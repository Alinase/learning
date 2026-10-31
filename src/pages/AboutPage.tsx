import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Users, Globe, ExternalLink, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="pb-20 space-y-16">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 tracking-wider uppercase">
            <span>About AliTech</span>
            <span aria-hidden="true">·</span>
            <span>AliTech Investments Ltd</span>
            <span aria-hidden="true">·</span>
            <span>Lusaka, Zambia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">
            Bridging Africa's Digital Divide Through World-Class Technology Education
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Headquartered in Lusaka, Zambia, AliTech is a digital transformation and technology enterprise specializing in
            Cloud Computing, Cybersecurity, Artificial Intelligence, and Professional Technology Training.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <a
              href="https://www.facebook.com/alitechinnovations"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-700 transition-colors"
            >
              <span>Visit AliTech Innovations on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Narrative & Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900">Our Story & Mission</h2>
            <p>
              Founded with the conviction that Africa possesses immense engineering talent, AliTech was established in
              Lusaka to provide world-class, rigorous technology training that directly maps to global industry
              certifications (Google Cloud, AWS, Microsoft, CompTIA).
            </p>
            <p>
              Unlike generic video libraries, <strong>AliTech eLearning</strong> couples high-definition instructional
              content with browser-sandboxed cloud shells, real-time cyber defense simulations, and seamless mobile money
              enrolment via Airtel Money and MTN MoMo.
            </p>
            <div className="pt-2 space-y-2 text-slate-800 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Empowering over 5,400 technology learners across 14 African nations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Institutional partner to top Zambian commercial banks, telecoms, and universities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Compliant with the Zambia Data Protection Act No. 3 of 2021</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3]">
              <img
                src="/src/assets/images/alitech_hero_learning_1793474031264.jpg"
                alt="AliTech Innovation Hub Lusaka"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Faculty */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">AliTech Leadership</span>
          <h2 className="text-2xl font-bold text-slate-900">Guided by Experienced Technologists</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-center">
            <img
              src="/src/assets/images/african_tech_instructor_1793474033391.jpg"
              alt="Alinafe Nyirenda"
              className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-teal-500 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">Alinafe Nyirenda</h3>
              <p className="text-xs text-teal-700 font-medium">Founder & Principal Cloud Architect</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Google Cloud and AWS Certified Architect with 14+ years experience leading enterprise digital transformation
                in Southern Africa.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
              alt="Mwamba Mulenga"
              className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-teal-500 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">Mwamba Mulenga</h3>
              <p className="text-xs text-teal-700 font-medium">Platform Director & Academic Registrar</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Oversees institutional curriculum rigor, employer accreditation relationships, and certified testing standards.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
              alt="Mutale Chanda"
              className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-teal-500 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">Mutale Chanda</h3>
              <p className="text-xs text-teal-700 font-medium">Lead Cyber Threat Specialist & CISSP</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Specializes in defense-in-depth, banking security operations, and digital forensics investigations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
