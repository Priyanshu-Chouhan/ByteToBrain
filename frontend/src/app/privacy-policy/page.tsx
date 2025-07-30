export const metadata = {
  title: "Privacy Policy | ByteToBrain",
  description: "Privacy Policy for ByteToBrain services and website.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#232326] to-[#1e293b] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="bg-[#232326]/80 rounded-2xl p-8 text-[#C7C7CC] space-y-6">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p>We collect information you provide directly, such as when you create an account, contact us, or use our services. This may include your name, email address, phone number, and project requirements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Communicate with you about projects and updates</li>
              <li>Process payments and transactions</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist in operating our website and conducting business.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:info@bytetobrain.in" className="text-[#2997FF] hover:underline">info@bytetobrain.in</a></p>
          </section>

          <p className="text-sm text-[#A1A1A6] mt-8">Last updated: January 2025</p>
        </div>
      </div>
    </div>
  );
}