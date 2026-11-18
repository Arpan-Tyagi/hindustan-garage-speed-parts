import React, { useState, useEffect } from 'react';
import { BookingData, BookingReceipt } from '../types';
import { generateDocketNumber } from '../utils/formatters';
import { generateBookingWhatsAppUrl } from '../utils/whatsapp';
import { DIAGNOSTIC_BAYS } from '../data/services';
import { Calendar, MapPin, User, Car, ShieldCheck, CheckCircle2, MessageSquare, Printer, Copy, Check } from 'lucide-react';
import { MaskedHeading } from './motion/MaskedHeading';
import { TechnicalDecryptedText } from './motion/TechnicalDecryptedText';

interface BookingTerminalProps {
  initialMake?: string;
  initialModel?: string;
  initialBayId?: string;
}

export const BookingTerminal: React.FC<BookingTerminalProps> = ({
  initialMake = '',
  initialModel = '',
  initialBayId = ''
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<BookingReceipt | null>(null);

  const [formData, setFormData] = useState<BookingData>({
    vehicleMake: initialMake || 'Hyundai',
    vehicleModel: initialModel || 'Creta',
    vehicleYear: '2022',
    fuelType: 'Diesel',
    serviceCategory: 'ECM & Computer Diagnostics',
    bayPreference: initialBayId ? DIAGNOSTIC_BAYS.find(b => b.id === initialBayId)?.name || 'Bay 01' : 'Bay 01 - ECM & Digital Diagnostics',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    preferredTimeSlot: '10:00 - 12:00 IST',
    pickupOption: 'Workshop Walk-In (M.G. Marg)',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: ''
  });

  const [activeDocketNumber] = useState<string>(generateDocketNumber());

  // Handle modal escape key and prevent body scroll while active
  useEffect(() => {
    if (!submittedReceipt) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSubmittedReceipt(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [submittedReceipt]);

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDispatchWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) {
      alert('Please provide your name and contact phone number to dispatch the service docket.');
      setCurrentStep(4);
      return;
    }

    const url = generateBookingWhatsAppUrl(formData, activeDocketNumber);
    window.open(url, '_blank');

    // Also record receipt
    setSubmittedReceipt({
      ...formData,
      docketNumber: activeDocketNumber,
      createdAt: new Date().toLocaleTimeString('en-IN') + ' IST',
      estimatedInspectionFee: '₹499 (Waived on Repair Approval)',
      priorityStatus: 'DISPATCHED_TO_WHATSAPP'
    });
  };

  const handleSimulatePipeline = () => {
    if (!formData.customerName || !formData.customerPhone) {
      alert('Please fill in your name and phone number in Step 4.');
      setCurrentStep(4);
      return;
    }

    setSubmittedReceipt({
      ...formData,
      docketNumber: activeDocketNumber,
      createdAt: new Date().toLocaleTimeString('en-IN') + ' IST',
      estimatedInspectionFee: '₹499 (Waived on Repair Approval)',
      priorityStatus: 'CONFIRMED_AUTOMATED_PIPELINE'
    });
  };

  return (
    <section id="booking-terminal" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-canvas-alabaster border-b border-hairline-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-white border border-hairline-grid rounded-spec text-[10px] font-mono uppercase tracking-spec text-ink-carbon mb-3">
              <span className="w-1.5 h-1.5 bg-crimson rounded-full" />
              <span>
                <TechnicalDecryptedText text="INDEX 03 // DIGITAL TRIAGE TERMINAL" duration={280} />
              </span>
            </div>
            <MaskedHeading as="h2" className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ink-carbon uppercase tracking-tight">
              DAYLIGHT SLOT BOOKING TERMINAL
            </MaskedHeading>
            <p className="text-sm text-ink-graphite font-sans mt-2 max-w-2xl">
              Configure your vehicle telemetry and reserve dedicated workshop bay capacity. All bookings dispatch directly to Hindustan Garage’s engineering desk with automated WhatsApp and email dockets.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-ink-graphite">
            <span className="text-crimson font-semibold">DIRECT WHATSAPP: +91 8796576868</span>
          </div>
        </div>

        {/* 12-Column Responsive Configurator & Receipt Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Columns: 4-Step Interactive Configurator Form */}
          <div className="lg:col-span-7 double-bezel p-4 sm:p-8 bg-surface-white rounded-spec shadow-elevated">
            
            {/* Step Progress Indicators - min 44x44px touch targets */}
            <div className="flex items-center justify-between pb-4 border-b border-hairline-grid">
              {[
                { num: 1, label: 'Vehicle Profile' },
                { num: 2, label: 'Service Scope' },
                { num: 3, label: 'Date & Transit' },
                { num: 4, label: 'Owner Details' }
              ].map((step) => (
                <button
                  key={step.num}
                  type="button"
                  data-cursor="pointer"
                  onClick={() => setCurrentStep(step.num)}
                  className="flex items-center gap-1.5 sm:gap-2 group text-left focus:outline-none min-h-[44px] min-w-[44px] py-1 px-1 justify-center sm:justify-start"
                  aria-label={`Step ${step.num}: ${step.label}`}
                >
                  <span className={`w-8 h-8 rounded-spec flex items-center justify-center text-xs font-mono font-bold transition-all duration-200 shrink-0 ${
                    currentStep === step.num
                      ? 'bg-crimson text-white shadow-sm scale-105'
                      : currentStep > step.num
                      ? 'bg-ink-carbon text-white'
                      : 'bg-canvas-alabaster text-ink-muted border border-hairline-grid'
                  }`}>
                    {step.num}
                  </span>
                  <span className={`hidden sm:inline text-xs font-mono uppercase tracking-spec ${
                    currentStep === step.num ? 'text-ink-carbon font-bold' : 'text-ink-muted'
                  }`}>
                    {step.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Architectural Mechanical Step Progress Bar */}
            <div className="relative w-full h-[2px] bg-canvas-alabaster mb-8 rounded-full overflow-hidden">
              <div 
                className="h-full bg-crimson transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width]"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            {/* STEP 1: VEHICLE PROFILE */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-ink-carbon uppercase tracking-tight flex items-center gap-2">
                    <Car className="w-4 h-4 text-crimson" />
                    Step 1: Vehicle Specifications
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">1 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Vehicle Manufacturer / Make
                    </label>
                    <select
                      value={formData.vehicleMake}
                      onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                    >
                      <option value="Hyundai">Hyundai</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Audi">Audi</option>
                      <option value="Land Rover">Land Rover</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Tata Motors">Tata Motors</option>
                      <option value="Mahindra">Mahindra</option>
                      <option value="Maruti Suzuki">Maruti Suzuki</option>
                      <option value="Honda">Honda</option>
                      <option value="Kia">Kia</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Skoda">Skoda</option>
                      <option value="Other">Other Make</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Model / Variant
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleModel}
                      onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                      placeholder="e.g. Creta SX / 530d / Scorpio-N"
                      className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Manufacturing Year
                    </label>
                    <select
                      value={formData.vehicleYear}
                      onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                    >
                      {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010, 2005].map(yr => (
                        <option key={yr} value={yr.toString()}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Fuel / Powertrain Type
                    </label>
                    <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                      {['Diesel', 'Petrol', 'Hybrid', 'CNG', 'Electric'].map((fuel) => (
                        <button
                          type="button"
                          key={fuel}
                          onClick={() => handleInputChange('fuelType', fuel)}
                          className={`py-2 px-1 text-center text-xs font-mono uppercase rounded-spec border transition-colors min-h-[44px] flex items-center justify-center ${
                            formData.fuelType === fuel
                              ? 'bg-ink-carbon text-white border-ink-carbon font-semibold'
                              : 'bg-canvas-alabaster text-ink-graphite border-hairline-grid hover:border-ink-carbon'
                          }`}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="press-feedback px-5 py-2.5 bg-ink-carbon hover:bg-black text-white text-xs font-mono uppercase tracking-spec rounded-spec font-semibold min-h-[44px] flex items-center justify-center"
                  >
                    Proceed to Service Scope →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SERVICE SCOPE & BAY */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-ink-carbon uppercase tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-crimson" />
                    Step 2: Service Category & Diagnostic Bay
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">2 of 4</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-2">
                    Select Diagnostic Lane / Bay
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DIAGNOSTIC_BAYS.map((bay) => (
                      <button
                        type="button"
                        key={bay.id}
                        onClick={() => {
                          handleInputChange('bayPreference', `${bay.number} - ${bay.name}`);
                          handleInputChange('serviceCategory', bay.system);
                        }}
                        className={`p-3 border rounded-spec text-left transition-all min-h-[44px] cursor-pointer ${
                          formData.bayPreference.includes(bay.number)
                            ? 'bg-crimson-tint border-crimson shadow-sm'
                            : 'bg-canvas-alabaster border-hairline-grid hover:border-ink-carbon'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono font-bold text-crimson">{bay.number}</span>
                          <span className="text-[9px] font-mono text-ink-muted">{bay.turnaround}</span>
                        </div>
                        <h4 className="text-xs font-bold text-ink-carbon leading-snug">{bay.name}</h4>
                        <span className="text-[10px] text-ink-graphite block mt-1">{bay.system}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="press-feedback px-4 py-2.5 border border-hairline-grid text-ink-carbon text-xs font-mono uppercase tracking-spec rounded-spec min-h-[44px] flex items-center justify-center"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="press-feedback px-5 py-2.5 bg-ink-carbon hover:bg-black text-white text-xs font-mono uppercase tracking-spec rounded-spec font-semibold min-h-[44px] flex items-center justify-center"
                  >
                    Proceed to Schedule →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SCHEDULE & TRANSIT */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-ink-carbon uppercase tracking-tight flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-crimson" />
                    Step 3: Appointment Date & Logistics
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">3 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Preferred Date (Mon–Sat)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Time Window (IST)
                    </label>
                    <select
                      value={formData.preferredTimeSlot}
                      onChange={(e) => handleInputChange('preferredTimeSlot', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                    >
                      <option value="10:00 - 12:00 IST">10:00 – 12:00 IST (Morning Shift)</option>
                      <option value="12:00 - 14:00 IST">12:00 – 14:00 IST (Midday Triage)</option>
                      <option value="14:00 - 16:00 IST">14:00 – 16:00 IST (Afternoon Lane)</option>
                      <option value="16:00 - 18:00 IST">16:00 – 18:00 IST (Evening Batch)</option>
                      <option value="18:00 - 20:00 IST">18:00 – 20:00 IST (Late Intake)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-2">
                    Vehicle Intake Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('pickupOption', 'Workshop Walk-In (M.G. Marg)')}
                      className={`p-3.5 border rounded-spec text-left flex items-start gap-3 transition-colors ${
                        formData.pickupOption === 'Workshop Walk-In (M.G. Marg)'
                          ? 'bg-crimson-tint border-crimson'
                          : 'bg-canvas-alabaster border-hairline-grid hover:border-ink-carbon'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-ink-carbon block">Direct Workshop Walk-in</span>
                        <span className="text-[10px] text-ink-graphite font-mono">56, M.G. Marg, Civil Lines</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('pickupOption', 'Prayagraj Doorstep Valet Pickup')}
                      className={`p-3.5 border rounded-spec text-left flex items-start gap-3 transition-colors ${
                        formData.pickupOption === 'Prayagraj Doorstep Valet Pickup'
                          ? 'bg-crimson-tint border-crimson'
                          : 'bg-canvas-alabaster border-hairline-grid hover:border-ink-carbon'
                      }`}
                    >
                      <Car className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-ink-carbon block">Doorstep Valet Pickup</span>
                        <span className="text-[10px] text-ink-graphite font-mono">Available Across Prayagraj Urban</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="press-feedback px-4 py-2.5 border border-hairline-grid text-ink-carbon text-xs font-mono uppercase tracking-spec rounded-spec min-h-[44px] flex items-center justify-center"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="press-feedback px-5 py-2.5 bg-ink-carbon hover:bg-black text-white text-xs font-mono uppercase tracking-spec rounded-spec font-semibold min-h-[44px] flex items-center justify-center"
                  >
                    Proceed to Owner Info →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: OWNER INFO & SUBMISSION */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-ink-carbon uppercase tracking-tight flex items-center gap-2">
                    <User className="w-4 h-4 text-crimson" />
                    Step 4: Owner & Contact Telemetry
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">4 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleDispatchWhatsApp(); }}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                      Phone Number (WhatsApp Active) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleDispatchWhatsApp(); }}
                      placeholder="e.g. 9839000000"
                      className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                    Email Address (Optional for PDF Docket)
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleDispatchWhatsApp(); }}
                    placeholder="e.g. rajesh@example.com"
                    className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-spec text-ink-graphite mb-1.5">
                    Vehicle Symptoms / Specific Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Describe any warning lights, abnormal noises, suspension thuds, or insurance claim details..."
                    className="w-full px-3.5 py-2.5 bg-canvas-alabaster border border-hairline-grid rounded-spec text-sm font-sans text-ink-carbon focus:border-ink-carbon focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="press-feedback px-4 py-2.5 border border-hairline-grid text-ink-carbon text-xs font-mono uppercase tracking-spec rounded-spec min-h-[44px]"
                  >
                    ← Back
                  </button>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={handleSimulatePipeline}
                      className="press-feedback px-4 py-2.5 bg-canvas-alabaster hover:bg-surface-hover border border-hairline-grid text-ink-carbon text-xs font-mono uppercase tracking-spec rounded-spec font-medium min-h-[44px]"
                    >
                      Simulate Receipt
                    </button>

                    <button
                      type="button"
                      onClick={handleDispatchWhatsApp}
                      className="press-feedback inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-crimson hover:bg-crimson-hover text-white text-xs font-mono uppercase tracking-spec rounded-spec font-bold min-h-[44px]"
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>Dispatch Docket to WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right 5 Columns: Dynamic Live Service Docket Receipt */}
          <div className="lg:col-span-5 double-bezel p-4 sm:p-6 bg-surface-white rounded-spec shadow-elevated">
            
            {/* Receipt Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline-grid">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson" />
                <span className="text-[11px] font-mono font-bold tracking-spec uppercase text-ink-carbon">
                  SERVICE SPECIFICATION DOCKET
                </span>
              </div>
              <span className="text-[10px] font-mono text-ink-muted">
                <TechnicalDecryptedText text={`#${activeDocketNumber}`} duration={220} />
              </span>
            </div>

            {/* Receipt Body */}
            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec">
                <span className="text-[9px] uppercase text-ink-muted block mb-1">FACILITY ADDRESS</span>
                <span className="text-ink-carbon font-semibold block">HINDUSTAN GARAGE (EST. 1960)</span>
                <span className="text-[11px] text-ink-graphite">56, M.G. Marg, Civil Lines, Prayagraj 211001</span>
              </div>

              <div className="space-y-2 border-b border-hairline-grid pb-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-ink-muted uppercase shrink-0">VEHICLE:</span>
                  <span className="font-bold text-ink-carbon text-right break-words">
                    {formData.vehicleMake} {formData.vehicleModel || 'Model Spec'}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-ink-muted uppercase shrink-0">YEAR / FUEL:</span>
                  <span className="text-ink-graphite text-right">
                    {formData.vehicleYear} · {formData.fuelType}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-ink-muted uppercase shrink-0">ASSIGNED LANE:</span>
                  <span className="text-crimson font-bold text-right break-words">
                    {formData.bayPreference}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-ink-muted uppercase shrink-0">APPOINTMENT:</span>
                  <span className="text-ink-graphite text-right">
                    {formData.preferredDate} ({formData.preferredTimeSlot.split(' ')[0]})
                  </span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-ink-muted uppercase shrink-0">INTAKE LOGISTICS:</span>
                  <span className="text-ink-graphite text-right">
                    {formData.pickupOption.includes('Walk-In') ? 'Workshop Walk-In' : 'Doorstep Valet'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-b border-hairline-grid pb-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-ink-muted uppercase shrink-0">REGISTERED CLIENT:</span>
                  <span className="font-bold text-ink-carbon text-right break-words">
                    {formData.customerName || 'Pending Client Input'}
                  </span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-ink-muted uppercase shrink-0">CONTACT PHONE:</span>
                  <span className="text-ink-graphite text-right">
                    {formData.customerPhone || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Pricing & Guarantee Bar */}
              <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec flex justify-between items-center gap-2">
                <div>
                  <span className="text-[9px] uppercase text-ink-muted block">INSPECTION TARIFF</span>
                  <span className="text-xs font-bold text-ink-carbon">₹499 (Waived on Repair)</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold rounded-spec shrink-0">
                  GENUINE GUARANTEE
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Quick Dispatch Button from Receipt */}
            <div className="mt-6 pt-4 border-t border-hairline-grid flex flex-col gap-2.5">
              <button
                onClick={() => handleDispatchWhatsApp()}
                className="press-feedback w-full flex items-center justify-center gap-2 py-3 px-3 bg-ink-carbon hover:bg-black text-white text-[11px] sm:text-xs font-mono uppercase tracking-spec font-bold rounded-spec transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden xs:inline truncate">Transmit to WhatsApp (+91 8796576868)</span>
                <span className="xs:hidden">Transmit via WhatsApp</span>
              </button>

              <span className="text-[10px] font-mono text-center text-ink-muted block">
                Dispatches encrypted pre-formatted technical docket directly to workshop foreman.
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* CONFIRMATION PIPELINE MODAL */}
      {submittedReceipt && (
        <div 
          onClick={() => setSubmittedReceipt(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="double-bezel max-w-lg w-full max-h-[90vh] overflow-y-auto bg-surface-white rounded-spec p-5 sm:p-8 shadow-modal animate-scaleIn"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline-grid">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <h4 className="font-display font-bold text-base text-ink-carbon uppercase tracking-tight">
                  SERVICE DOCKET TRANSMITTED
                </h4>
              </div>
              <button
                onClick={() => setSubmittedReceipt(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs font-mono text-ink-muted hover:text-ink-carbon p-1"
                aria-label="Close Docket Confirmation"
              >
                [CLOSE]
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono mb-6">
              <div className="p-3 bg-canvas-alabaster border border-hairline-grid rounded-spec">
                <span className="text-[10px] text-ink-muted block uppercase">DOCKET IDENTIFIER</span>
                <span className="text-base font-bold text-crimson">{submittedReceipt.docketNumber}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border border-hairline-grid rounded-spec">
                  <span className="text-[9px] text-ink-muted block">VEHICLE</span>
                  <span className="font-semibold text-ink-carbon truncate block">{submittedReceipt.vehicleMake} {submittedReceipt.vehicleModel}</span>
                </div>
                <div className="p-2 border border-hairline-grid rounded-spec">
                  <span className="text-[9px] text-ink-muted block">APPOINTMENT</span>
                  <span className="font-semibold text-ink-carbon truncate block">{submittedReceipt.preferredDate}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-spec">
                <span className="font-bold block mb-1">AUTOMATED PIPELINE ENGAGED</span>
                <p className="text-[11px] leading-relaxed font-sans">
                  Your appointment has been registered at 56, M.G. Marg. The engineering foreman will verify bay availability and send SMS & WhatsApp confirmation within 15 minutes during workshop hours (10:00–20:00 IST).
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Docket Ref: ${submittedReceipt.docketNumber} for ${submittedReceipt.vehicleMake} ${submittedReceipt.vehicleModel}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="press-feedback flex-1 flex items-center justify-center gap-1.5 py-3 border border-hairline-grid text-ink-carbon text-xs font-mono uppercase tracking-spec rounded-spec font-medium min-h-[44px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Ref' : 'Copy Docket'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="press-feedback flex-1 flex items-center justify-center gap-1.5 py-3 bg-ink-carbon text-white text-xs font-mono uppercase tracking-spec rounded-spec font-bold min-h-[44px]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Docket</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
