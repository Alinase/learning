import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, PromoCode, Announcement } from '../types';
import { CATEGORIES } from '../data/mockData';
import {
  ShieldAlert,
  Users,
  CreditCard,
  Award,
  Tag,
  Bell,
  BarChart3,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Trash2,
  Download,
  Search,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    allUsers,
    setAllUsers,
    courses,
    transactions,
    promoCodes,
    setPromoCodes,
    announcements,
    setAnnouncements,
    formatPrice,
    showNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'finance' | 'certificates' | 'promos' | 'announcements'>('overview');

  // Promo code creator state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState(20);

  // Announcement creator state
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnMsg, setNewAnnMsg] = useState('');

  // Total finances
  const totalRevenueZMW = transactions.reduce((acc, curr) => acc + curr.amountZMW, 0);
  const totalRevenueUSD = transactions.reduce((acc, curr) => acc + curr.amountUSD, 0);

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    const promo: PromoCode = {
      code: newPromoCode.trim().toUpperCase(),
      discountPercent: Number(newPromoDiscount),
      expiresAt: '2026-12-31',
      usageCount: 0,
      active: true
    };

    setPromoCodes((prev) => [promo, ...prev]);
    setNewPromoCode('');
    showNotification(`Promo code ${promo.code} activated!`);
  };

  const handleTogglePromo = (code: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.code === code ? { ...p, active: !p.active } : p))
    );
    showNotification(`Updated status for ${code}`);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnMsg.trim()) return;

    const ann: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      message: newAnnMsg,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      priority: 'important',
      targetAudience: 'all'
    };

    setAnnouncements((prev) => [ann, ...prev]);
    setNewAnnTitle('');
    setNewAnnMsg('');
    showNotification('Announcement posted to all users!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center font-bold text-2xl shadow-sm">
            ADM
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <span>Platform Administration</span>
              <span aria-hidden="true">·</span>
              <span>AliTech Investments Ltd</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">AliTech Executive Console</h1>
            <p className="text-xs text-slate-400 mt-0.5">Registry, Revenue & Course Governance</p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
          <div>
            <span className="text-slate-400 block">Total Revenue</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              ZMW {totalRevenueZMW.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Total Learners</span>
            <span className="text-xl font-extrabold text-white font-mono">5,420</span>
          </div>
          <div>
            <span className="text-slate-400 block">System Status</span>
            <span className="text-sm font-bold text-teal-400">All Nodes Active</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'overview' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Overview & Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'finance' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Revenue & Transactions ({transactions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'users' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>User Management ({allUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promos')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'promos' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Discount & Promo Codes ({promoCodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'announcements' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Platform Announcements</span>
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs text-slate-500">Gross Mobile Money Revenue</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono block">
                ZMW {totalRevenueZMW.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">Airtel Money & MTN MoMo</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs text-slate-500">Active Published Courses</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono block">{courses.length}</span>
              <span className="text-[11px] text-slate-500">Across 9 technology categories</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs text-slate-500">Total Issued Certificates</span>
              <span className="text-2xl font-extrabold text-teal-600 font-mono block">1,420</span>
              <span className="text-[11px] text-teal-700 font-medium">Verified by Zambian employers</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <span className="text-xs text-slate-500">Corporate Clients</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono block">28</span>
              <span className="text-[11px] text-slate-500">Banks, Telcos & Mining</span>
            </div>
          </div>

          {/* Revenue by Method breakdown */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Payment Aggregator Volume Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <span className="font-bold text-red-900 block">Airtel Money Zambia</span>
                <span className="text-base font-extrabold text-red-700 font-mono">48% of volume</span>
              </div>
              <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                <span className="font-bold text-yellow-900 block">MTN Mobile Money</span>
                <span className="text-base font-extrabold text-yellow-700 font-mono">34% of volume</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                <span className="font-bold text-slate-900 block">Bank Transfer (EFT/RTGS)</span>
                <span className="text-base font-extrabold text-slate-700 font-mono">12% of volume</span>
              </div>
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                <span className="font-bold text-teal-900 block">Visa & Mastercard</span>
                <span className="text-base font-extrabold text-teal-700 font-mono">6% of volume</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Finance */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Live Transaction Audit Log</h2>
            <button
              onClick={() => showNotification('Exported financial ledger to CSV!')}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Ref Number</th>
                  <th className="py-3.5 px-4">Learner</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Method</th>
                  <th className="py-3.5 px-4">Amount (ZMW)</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900">{tx.referenceNumber}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{tx.studentName}</span>
                      <span className="text-[11px] text-slate-400">{tx.studentEmail}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate">{tx.courseTitle}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800">{tx.paymentMethod}</span>
                      {tx.phoneNumber && (
                        <span className="block text-[11px] text-slate-400 font-mono">{tx.phoneNumber}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ZMW {tx.amountZMW.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">{tx.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Users */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Learner & Instructor Directory</h2>
            <span className="text-xs text-slate-500 font-mono">{allUsers.length} Registered Accounts</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Enrolments</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {allUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-semibold text-slate-900 block">{u.name}</span>
                          <span className="text-[11px] text-slate-400">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 capitalize font-medium">{u.role}</td>
                    <td className="py-3.5 px-4">{u.location}</td>
                    <td className="py-3.5 px-4 font-mono">{u.enrolledCourseIds.length}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                        Active
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => showNotification(`Audit log reviewed for ${u.name}`)}
                        className="text-teal-700 hover:text-teal-900 font-semibold text-[11px]"
                      >
                        Audit Activity
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Promo Codes */}
      {activeTab === 'promos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Create Promo */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Create Promotional Discount</h3>
              <form onSubmit={handleAddPromo} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LUSAKA25"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg uppercase tracking-wider font-mono focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={newPromoDiscount}
                    onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-colors"
                >
                  Create Voucher
                </button>
              </form>
            </div>

            {/* Existing Codes */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Voucher Code</th>
                    <th className="py-3 px-4">Discount</th>
                    <th className="py-3 px-4">Redemptions</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {promoCodes.map((p) => (
                    <tr key={p.code} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.code}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">{p.discountPercent}% Off</td>
                      <td className="py-3 px-4 font-mono">{p.usageCount} uses</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            p.active ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'
                          }`}
                        >
                          {p.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleTogglePromo(p.code)}
                          className="text-[11px] font-medium text-slate-600 hover:text-slate-900"
                        >
                          {p.active ? 'Disable' : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Platform Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Broadcast Platform Announcement</h3>
              <form onSubmit={handleAddAnnouncement} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Headline</label>
                  <input
                    type="text"
                    required
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    placeholder="e.g. Q4 Cloud Certification Cohort Opens"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Message Content</label>
                  <textarea
                    rows={4}
                    required
                    value={newAnnMsg}
                    onChange={(e) => setNewAnnMsg(e.target.value)}
                    placeholder="Enter broadcast details..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-colors"
                >
                  Broadcast to All Users
                </button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 text-sm">{ann.title}</span>
                    <span className="text-slate-400">{ann.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{ann.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
