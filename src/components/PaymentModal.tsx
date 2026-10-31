import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, ShieldCheck, Smartphone, CreditCard, Building2, Download, Printer, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentModal: React.FC = () => {
  const { activePaymentCourse, setActivePaymentCourse, currency, enrollInCourse, promoCodes } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'Airtel Money' | 'MTN Mobile Money' | 'Card' | 'Bank Transfer'>('Airtel Money');
  const [phoneNumber, setPhoneNumber] = useState('0977824192');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('841');
  const [cardHolder, setCardHolder] = useState('Chileshe Mwape');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const [stage, setStage] = useState<'input' | 'processing-ussd' | 'success'>('input');
  const [ussdTimer, setUssdTimer] = useState(4);
  const [transactionRef, setTransactionRef] = useState('');

  if (!activePaymentCourse) return null;

  const rawPriceZMW = activePaymentCourse.priceZMW;
  const rawPriceUSD = activePaymentCourse.priceUSD;

  const discountRate = appliedPromo ? (100 - appliedPromo.discountPercent) / 100 : 1;
  const finalPriceZMW = Math.round(rawPriceZMW * discountRate);
  const finalPriceUSD = Math.round(rawPriceUSD * discountRate);

  const handleApplyPromo = () => {
    setPromoError('');
    const match = promoCodes.find((p) => p.code.toUpperCase() === promoInput.trim().toUpperCase() && p.active);
    if (match) {
      setAppliedPromo({ code: match.code, discountPercent: match.discountPercent });
    } else {
      setPromoError('Invalid or expired promotional code. Try "ZAMBIA2026" or "AFRICATECH"');
    }
  };

  const handleInitiatePayment = () => {
    setStage('processing-ussd');
    setUssdTimer(3);

    const ref = `${paymentMethod.toUpperCase().slice(0, 3)}-ZM-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setTransactionRef(ref);

    // Simulate USSD prompt countdown
    const interval = setInterval(() => {
      setUssdTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStage('success');
          enrollInCourse(activePaymentCourse.id, paymentMethod, phoneNumber);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {
            // Ignore confetti in unsupported environments
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1200);
  };

  const handleClose = () => {
    setActivePaymentCourse(null);
    setStage('input');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-teal-700">AliTech Secure Checkout</span>
            <h3 className="text-base font-bold text-slate-900 truncate max-w-sm">{activePaymentCourse.title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {stage === 'input' && (
          <div className="p-6 space-y-6">
            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Total Enrolment Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {currency === 'ZMW' ? `ZMW ${finalPriceZMW.toLocaleString()}` : `$${finalPriceUSD}`}
                  </span>
                  {appliedPromo && (
                    <span className="text-xs text-slate-400 line-through">
                      {currency === 'ZMW' ? `ZMW ${rawPriceZMW}` : `$${rawPriceUSD}`}
                    </span>
                  )}
                </div>
              </div>
              {appliedPromo && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {appliedPromo.discountPercent}% Off Applied
                </span>
              )}
            </div>

            {/* Promo Code Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Promotional or Institutional Voucher</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. ZAMBIA2026"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 uppercase tracking-wider"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-rose-600">{promoError}</p>}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Airtel Money')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                    paymentMethod === 'Airtel Money'
                      ? 'border-red-500 bg-red-50/40 text-slate-900 ring-2 ring-red-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Airtel Money</span>
                    <span className="block text-[11px] text-slate-500">Instant USSD PIN prompt</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('MTN Mobile Money')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                    paymentMethod === 'MTN Mobile Money'
                      ? 'border-yellow-500 bg-yellow-50/40 text-slate-900 ring-2 ring-yellow-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">MTN MoMo</span>
                    <span className="block text-[11px] text-slate-500">Zambia Mobile Wallet</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                    paymentMethod === 'Card'
                      ? 'border-teal-600 bg-teal-50/40 text-slate-900 ring-2 ring-teal-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Card Payment</span>
                    <span className="block text-[11px] text-slate-500">Visa / Mastercard</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Bank Transfer')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                    paymentMethod === 'Bank Transfer'
                      ? 'border-slate-700 bg-slate-50 text-slate-900 ring-2 ring-slate-400'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">Bank Transfer</span>
                    <span className="block text-[11px] text-slate-500">Zanaco / Stanbic Zambia</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Dynamic Inputs according to payment method */}
            {(paymentMethod === 'Airtel Money' || paymentMethod === 'MTN Mobile Money') && (
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <label className="text-xs font-medium text-slate-700">
                  {paymentMethod === 'Airtel Money' ? 'Airtel Zambia Mobile Number' : 'MTN Zambia Mobile Number'}
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700">
                    +260
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                    placeholder={paymentMethod === 'Airtel Money' ? '097XXXXXXX' : '096XXXXXXX'}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  A real-time prompt will be pushed to this mobile number for authorization.
                </p>
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="text-xs font-medium text-slate-700">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-700">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700">CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Bank Transfer' && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-900 block">AliTech Corporate Bank Details:</span>
                <div className="font-mono text-[11px] space-y-0.5">
                  <p>Bank: Stanbic Bank Zambia (Lusaka Main)</p>
                  <p>Account Name: AliTech Investments Ltd</p>
                  <p>Account No: 9130004928172</p>
                  <p>Branch Code: 040001 · Swift: SBICZMLX</p>
                </div>
                <p className="text-[11px] text-teal-700">
                  Instant verification is simulated. Clicking "Authorize" confirms simulated transfer.
                </p>
              </div>
            )}

            {/* Action button */}
            <button
              type="button"
              onClick={handleInitiatePayment}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                Authorize Enrolment ({currency === 'ZMW' ? `ZMW ${finalPriceZMW.toLocaleString()}` : `$${finalPriceUSD}`})
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Encrypted via Bank of Zambia regulated payment aggregators</span>
            </div>
          </div>
        )}

        {stage === 'processing-ussd' && (
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-slate-900">
                {paymentMethod === 'Airtel Money' || paymentMethod === 'MTN Mobile Money'
                  ? 'Pushing USSD Prompt to Mobile...'
                  : 'Authorizing Secure Payment...'}
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                {paymentMethod === 'Airtel Money' || paymentMethod === 'MTN Mobile Money' ? (
                  <>
                    Please check phone <span className="font-mono font-semibold">+260 {phoneNumber}</span> and enter
                    your Mobile Money PIN to approve {currency === 'ZMW' ? `ZMW ${finalPriceZMW}` : `$${finalPriceUSD}`}.
                  </>
                ) : (
                  'Verifying transaction with processing network...'
                )}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-mono text-slate-600">
              <span>Waiting for approval ({ussdTimer}s)</span>
            </div>
          </div>
        )}

        {stage === 'success' && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Enrolment Confirmed!</h4>
              <p className="text-xs text-slate-600">
                Welcome to <span className="font-semibold text-slate-800">{activePaymentCourse.title}</span>.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2 font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Receipt Number:</span>
                <span className="font-bold text-slate-800">{transactionRef}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Payment Method:</span>
                <span className="text-slate-800">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Amount Paid:</span>
                <span className="font-bold text-emerald-700">
                  {currency === 'ZMW' ? `ZMW ${finalPriceZMW.toLocaleString()}` : `$${finalPriceUSD}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Merchant:</span>
                <span className="text-slate-800">AliTech Investments Ltd (Lusaka)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Date:</span>
                <span className="text-slate-800">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Go to My Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
