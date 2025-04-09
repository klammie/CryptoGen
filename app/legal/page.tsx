import React from "react";

export default function page() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-primary ">
        Legal Information
      </h1>
      <div className="space-y-6 text-gray-800">
        <div>
          <h2 className="text-lg font-semibold">1. General Disclaimer</h2>
          <p className="mt-2">
            CryptoGen is committed to providing accurate and timely information
            regarding cryptocurrency trading. However, we do not guarantee the
            completeness or accuracy of the content. Cryptocurrency trading
            involves risk, and you should conduct your own research before
            making any trading decisions. CryptoGen will not be held liable for
            any losses incurred.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">2. Terms of Service</h2>
          <p className="mt-2">
            By using our platform, you agree to our Terms of Service. These
            terms outline your rights and responsibilities while using
            CryptoGen’s services. They cover account registration, trading
            activities, prohibited actions, and dispute resolution.
          </p>
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>Users must be at least 18 years old.</li>
            <li>
              Only one account per device is allowed for security reasons.
            </li>
            <li>
              Users are responsible for maintaining the confidentiality of their
              account information.
            </li>
            <li>
              Any violations of our terms may result in account suspension or
              termination.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">3. Privacy Policy</h2>
          <p className="mt-2">
            Your privacy is important to us. Our Privacy Policy explains how we
            collect, use, and protect your personal information. We comply with
            all relevant data protection regulations and ensure that your data
            is handled securely.
          </p>
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>We collect information to provide and improve our services.</li>
            <li>Your data is never sold to third parties.</li>
            <li>
              You have the right to access, modify, and delete your personal
              information.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">4. Risk Disclosure</h2>
          <p className="mt-2">
            Trading cryptocurrencies involves substantial risk and is not
            suitable for every investor. The value of cryptocurrencies can
            fluctuate significantly, leading to potential losses. You should
            only trade with money you can afford to lose.
          </p>
          <p className="mt-2 font-semibold">Important:</p>
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>Past performance is not indicative of future results.</li>
            <li>
              Consider consulting a financial advisor before engaging in trading
              activities.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            5. Anti-Money Laundering (AML) Policy
          </h2>
          <p className="mt-2">
            CryptoGen is committed to preventing money laundering and terrorist
            financing. We comply with all applicable AML laws and regulations
            and have implemented robust procedures to detect and prevent
            suspicious activities.
          </p>
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>User verification processes.</li>
            <li>Monitoring and reporting of suspicious transactions.</li>
            <li>Regular audits and compliance checks.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            6. Copyright and Intellectual Property
          </h2>
          <p className="mt-2">
            All content on the CryptoGen website, including text, graphics,
            logos, and images, is the property of CryptoGen or its licensors and
            is protected by copyright laws. Unauthorized use of our content is
            strictly prohibited.
          </p>
          <p className="mt-2 font-semibold">Note:</p>
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>
              You may not reproduce, distribute, or create derivative works from
              our content without explicit permission.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">7. Governing Law</h2>
          <p className="mt-2">
            These legal terms are governed by and construed in accordance with
            the laws of [Your Jurisdiction]. Any disputes arising from these
            terms will be resolved through binding arbitration in [Your
            Jurisdiction].
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">8. Contact Information</h2>
          <p className="mt-2">
            For any questions or concerns regarding our legal information,
            please contact us at:
          </p>
          <p className="mt-2">
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:legal@cryptogen.com"
              className="text-blue-500 hover:underline"
            >
              legal@cryptogen.com
            </a>
          </p>
          <p className="mt-2">
            <span className="font-semibold">Address:</span> 6 Cork Rd,
            Carrigaline Middle, Carrigaline, Co. Cork, P43 HW98, Ireland
          </p>
        </div>
      </div>
    </div>
  );
}
