export const metadata = {
  title: "Terms & Conditions | ByteToBrain",
  description: "Terms and Conditions for ByteToBrain services.",
};

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
        <div className="bg-[#232326]/80 rounded-2xl p-8 text-[#C7C7CC] space-y-6">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
            <p>By accessing and using ByteToBrain services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Services</h2>
            <p>ByteToBrain provides web development, mobile app development, digital marketing, UI/UX design, and related technology services. We reserve the right to modify or discontinue services at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment terms will be specified in individual project agreements</li>
              <li>All payments are due as per agreed timelines</li>
              <li>Late payments may incur additional charges</li>
              <li>Refunds are subject to project-specific terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
            <p>Upon full payment, clients receive ownership of custom-developed work. ByteToBrain retains rights to general methodologies, techniques, and pre-existing intellectual property.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p>ByteToBrain shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <p>For questions regarding these terms, contact us at <a href="mailto:info@bytetobrain.in" className="text-[#2997FF] hover:underline">info@bytetobrain.in</a></p>
          </section>

          <p className="text-sm text-[#A1A1A6] mt-8">Last updated: January 2025</p>
        </div>
      </div>
    </div>
  );
}