import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Mail, Phone, Clock, ExternalLink, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showNotification } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showNotification('Message sent to AliTech support team in Lusaka!');
  };

  return (
    <div className="pb-20 space-y-16">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 tracking-wider uppercase">
            <span>Contact AliTech</span>
            <span aria-hidden="true">·</span>
            <span>Lusaka Headquarters</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">
            We're Here to Support Your Learning Journey
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Reach out to our student admissions, corporate training advisors, or technical support operations desk in
            Lusaka, Zambia.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Headquarters (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
              <p className="text-xs text-slate-500 mt-1">
                AliTech Investments Ltd is registered and headquartered in Lusaka, Zambia.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">Physical Headquarters</strong>
                  <p className="text-slate-500 mt-0.5">AliTech Technology Hub · Great East Road</p>
                  <p className="text-slate-500">Lusaka, Zambia</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">Email Inquiries</strong>
                  <p className="text-slate-500 mt-0.5">General & Admissions: elearning@alitech.co.zm</p>
                  <p className="text-slate-500">Corporate & Government: corporate@alitech.co.zm</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">Direct Phone & WhatsApp</strong>
                  <p className="text-slate-500 mt-0.5">+260 97 700 0000 (Admissions)</p>
                  <p className="text-slate-500">+260 211 000 000 (Switchboard)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">Support Hours (Lusaka Time / CAT)</strong>
                  <p className="text-slate-500 mt-0.5">Monday – Friday: 08:00 – 18:00 CAT</p>
                  <p className="text-slate-500">Saturday: 09:00 – 15:00 CAT</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-2">
              <strong className="block text-teal-950 font-bold">Connect on Social Media</strong>
              <p>Follow AliTech Innovations for weekly technology updates, webinars, and tech jobs in Zambia.</p>
              <a
                href="https://www.facebook.com/alitechinnovations"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-teal-700 hover:text-teal-800"
              >
                <span>facebook.com/alitechinnovations</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Interactive Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form below and an AliTech advisor will respond within 4 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Message Dispatched!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your message regarding <em>"{subject}"</em> has been routed to our
                  Lusaka support team. A representative will reach out to <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bwalya Mwila"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="bwalya@example.zm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+260 97 ... "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Inquiry Category</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Mobile Money Assistance">Airtel / MTN Mobile Money Help</option>
                      <option value="Corporate Training Inquiry">Corporate Training Proposal</option>
                      <option value="Certificate Verification">Certificate Verification</option>
                      <option value="Instructor Application">Instructor Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist your technology training requirements?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Lusaka Hub</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
