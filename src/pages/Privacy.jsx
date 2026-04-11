import React from 'react';
import { SEO } from '../components/SEO';

export const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Savanna & Beyond"
        description="Privacy Policy for Savanna & Beyond safari booking services. Learn how we collect, use, and protect your personal information."
        url="https://savannabeyond.co.ke/privacy"
      />
      <div className="pt-32 pb-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-heading text-charcoal mb-6">Privacy Policy</h1>
          <p className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-16">Last updated: April 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-10 font-body text-[15px] leading-relaxed text-zinc-600">
            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">1. Information We Collect</h2>
              <p>When you use our website or book a safari, we collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Contact details:</strong> Full name, email address, WhatsApp/phone number</li>
                <li><strong>Booking details:</strong> Travel dates, number of travelers, package selection, special requests</li>
                <li><strong>Payment information:</strong> Processed securely through PayPal. We do not store credit card numbers on our servers.</li>
                <li><strong>Technical data:</strong> Browser type, IP address, language preference (stored locally on your device)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and manage your safari booking</li>
                <li>To communicate with you about your trip via email or WhatsApp</li>
                <li>To process payments through our secure payment partners</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">3. Data Storage & Security</h2>
              <p>Your booking data is stored securely using Google Firebase with encryption at rest and in transit. Payment processing is handled entirely by PayPal under their PCI-DSS compliant infrastructure. We implement industry-standard security measures to protect your personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">4. Cookies & Local Storage</h2>
              <p>We use browser local storage to remember your language preference. We do not use third-party tracking cookies. Essential cookies may be set by our payment processor (PayPal) during checkout.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">5. Third-Party Services</h2>
              <p>We share necessary information with the following trusted partners:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>PayPal:</strong> For payment processing</li>
                <li><strong>Google Firebase:</strong> For secure data storage</li>
                <li><strong>Google Fonts:</strong> For typography delivery</li>
              </ul>
              <p className="mt-4">We do not sell, rent, or trade your personal information to any third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">6. Your Rights</h2>
              <p>Under applicable data protection laws, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Request data portability</li>
              </ul>
              <p className="mt-4">To exercise any of these rights, contact us at <a href="mailto:expeditions@savannabeyond.co.ke" className="text-gold hover:underline">expeditions@savannabeyond.co.ke</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">7. Data Retention</h2>
              <p>We retain booking data for a period of 7 years to comply with Kenyan tax and tourism regulations. You may request earlier deletion of non-essential data by contacting us.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">8. Contact</h2>
              <p>For privacy-related inquiries:</p>
              <p className="mt-4">
                <strong>Savanna & Beyond Ltd.</strong><br />
                Wilson Airport Plaza V, Tower B<br />
                Langata Road, Nairobi, Kenya<br />
                <a href="mailto:expeditions@savannabeyond.co.ke" className="text-gold hover:underline">expeditions@savannabeyond.co.ke</a><br />
                +254 718 592 358
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
