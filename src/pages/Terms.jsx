import React from 'react';
import { SEO } from '../components/SEO';

export const Terms = () => {
  return (
    <>
      <SEO
        title="Terms of Service | Savanna & Beyond"
        description="Terms of Service for Savanna & Beyond safari booking and expedition services in Kenya."
        url="https://savannabeyond.co.ke/terms"
      />
      <div className="pt-32 pb-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-heading text-charcoal mb-6">Terms of Service</h1>
          <p className="text-zinc-400 text-sm uppercase tracking-widest font-bold mb-16">Last updated: April 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-10 font-body text-[15px] leading-relaxed text-zinc-600">
            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">1. About Us</h2>
              <p>Savanna & Beyond Ltd. is a KWS-licensed and KATO-registered safari operator based in Nairobi, Kenya. These terms govern your use of our website and booking services at savannabeyond.co.ke.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">2. Booking & Payment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are displayed in US Dollars (USD) and are inclusive of applicable park fees unless otherwise stated.</li>
                <li>A booking is confirmed upon receipt of full payment via PayPal or an approved alternative method.</li>
                <li>Payment is processed securely through PayPal. Savanna & Beyond does not store or handle credit card details directly.</li>
                <li>Booking reference numbers are generated upon submission and serve as your official receipt identifier.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">3. Cancellation & Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>60+ days before departure:</strong> Full refund minus a $50 administrative fee</li>
                <li><strong>30-59 days before departure:</strong> 50% refund</li>
                <li><strong>15-29 days before departure:</strong> 25% refund</li>
                <li><strong>Less than 15 days:</strong> No refund. Credit may be issued for future travel at our discretion.</li>
              </ul>
              <p className="mt-4">All cancellation requests must be submitted in writing to <a href="mailto:expeditions@savannabeyond.co.ke" className="text-gold hover:underline">expeditions@savannabeyond.co.ke</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">4. Trip Modifications</h2>
              <p>We accommodate itinerary changes subject to availability. Modifications requested within 14 days of departure may incur additional charges. Safari routes may be adjusted for wildlife migration, weather, or safety by your guide.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">5. Traveler Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Valid passport and Kenyan visa (where applicable) are the traveler's responsibility.</li>
                <li>Travel and medical insurance is strongly recommended and is the traveler's responsibility.</li>
                <li>Travelers must follow all safety instructions from guides and park authorities.</li>
                <li>You must disclose any medical conditions relevant to participation in safari activities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">6. Liability</h2>
              <p>While we take every precaution for your safety, safaris involve inherent risks associated with wildlife and natural environments. Savanna & Beyond is not liable for injury, illness, loss, or damage arising from circumstances beyond our reasonable control, including but not limited to weather, wildlife behavior, or government restrictions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">7. Intellectual Property</h2>
              <p>All content on this website, including text, images, logos, and design, is the property of Savanna & Beyond Ltd. and is protected under Kenyan and international copyright law. Unauthorized reproduction is prohibited.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">8. Governing Law</h2>
              <p>These terms are governed by the laws of the Republic of Kenya. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Kenya.</p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-charcoal mb-4">9. Contact</h2>
              <p>For questions about these terms:</p>
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
