import React, { useState } from 'react';
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: "Free",
    priceUSD: 0,
    priceINR: 0,
    description: "Perfect for trying out the platform.",
    features: [
      "60 mins of video processing/month",
      "720p export quality",
      "Watermarked exports",
      "Standard support"
    ],
    recommended: false,
    cta: "Get Started Free"
  },
  {
    name: "Pro",
    priceUSD: 19,
    priceINR: 1599,
    description: "For creators who want to go viral.",
    features: [
      "10 hours of video processing/month",
      "4K export quality",
      "No watermarks",
      "Viral Performance Scoring",
      "Custom brand templates",
      "Priority support"
    ],
    recommended: true,
    cta: "Start Pro Trial"
  },
  {
    name: "Agency",
    priceUSD: 99,
    priceINR: 8299,
    description: "For professional teams and studios.",
    features: [
      "Unlimited video processing",
      "Team collaboration (up to 5 seats)",
      "Dedicated account manager",
      "Full API access",
      "Custom integrations"
    ],
    recommended: false,
    cta: "Contact Sales"
  }
];

export default function Pricing() {
  const [currency, setCurrency] = useState('USD');

  return (
    <section className="py-24 bg-background relative border-t border-gray-800" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Toggle */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Simple, transparent pricing
          </h2>
          
          {/* Currency Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${currency === 'USD' ? 'text-white' : 'text-gray-400'}`}>USD ($)</span>
            <button 
              onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
              className="relative w-14 h-7 bg-[#252525] rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              aria-label="Toggle currency"
            >
              <div 
                className={`absolute top-1 w-5 h-5 bg-accent rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(57,255,20,0.5)] ${currency === 'USD' ? 'left-1' : 'left-8'}`}
              ></div>
            </button>
            <span className={`text-sm font-medium ${currency === 'INR' ? 'text-white' : 'text-gray-400'}`}>INR (₹)</span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative bg-surface rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${tier.recommended ? 'border-2 border-accent shadow-[0_0_30px_rgba(57,255,20,0.15)] md:-mt-8 md:mb-8 md:scale-105' : 'border border-gray-800 hover:border-gray-700'}`}
            >
              {/* Recommended Badge */}
              {tier.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-accent text-black text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Tier Info */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {currency === 'USD' ? `$${tier.priceUSD}` : `₹${tier.priceINR}`}
                  </span>
                  <span className="text-gray-500 font-medium">/month</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${tier.recommended ? 'text-accent' : 'text-gray-500'}`} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${tier.recommended ? 'bg-accent text-black hover:bg-[#32e512] shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]' : 'bg-[#252525] text-white hover:bg-gray-800 border border-gray-800'}`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
