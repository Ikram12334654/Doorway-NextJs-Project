import React, { useState } from 'react';
import WestIcon from "@mui/icons-material/West";
// Demo Data Interfaces
interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Failed';
  description: string;
  url: string;
}

interface PaymentMethod {
  type: string;
  lastFour: string;
  expiry: string;
}

interface BillingInfo {
  name: string;
  email: string;
}

// Demo Data
const invoices: Invoice[] = [
  {
    id: 'inv_001',
    date: '28 Feb 2025',
    amount: 'US$300.00',
    status: 'Failed',
    description: 'Core',
    url: 'https://invoice.stripe.com/inv_001',
  },
  {
    id: 'inv_002',
    date: '31 Jan 2025',
    amount: 'US$300.00',
    status: 'Failed',
    description: 'Core',
    url: 'https://invoice.stripe.com/inv_002',
  },
  {
    id: 'inv_003',
    date: '1 Jan 2025',
    amount: 'US$0.00',
    status: 'Paid',
    description: 'Trial period for Core',
    url: 'https://invoice.stripe.com/inv_003',
  },
];

const paymentMethod: PaymentMethod = {
  type: 'Visa',
  lastFour: '9746',
  expiry: '02/2027',
};

const billingInfo: BillingInfo = {
  name: 'Nextuf Store',
  email: 'sami_ullah71@outlook.com',
};

const BillingDashboard: React.FC = () => {
  const [modal , setModal] = useState("subscription");

  return (
    <div className="flex flex-col min-mde:flex-row h-screen w-screen bg-white min-sm:flex-col">
      {/* Left Sidebar */}
      <div className="flex-2/5 p-16 min-md:p-16 min-sm:p-4 bg-white overflow-y-auto min-h-screen">
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Logo */}
            <a href="/pages/home.tsx" className="block mb-8 min-sm:mb-4">
              <img
                src="https://files.stripe.com/files/MDB8YWNjdF8xSmtRVmhGa1dtb21DUzV4fGZfbGl2ZV9MbWhCa2ZsYUZyUWtXR1lRODY3V3pRUDY00tawTXvRQ"
                alt="Dorway Ltd"
                className="max-w-[224px] h-auto"
              />
            </a>

            {/* Branding Text */}
            <div className="mt-12 max-w-[292px] min-sm:mt-6">
              <span className="font-poppins text-xl text-gray-800 min-md:text-md min-sm:text-sm">
                Dorway Ltd partners with Stripe for simplified billing.
              </span>
            </div>

            {/* Return Link */}
            <a
              href="/home"
              className="flex items-center mt-8 text-sm text-gray-800 hover:text-brand-600 min-sm:mt-4"
            >
             <WestIcon fontSize="small" />
              <span className="font-poppins">Return to Dorway Ltd</span>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-8 opacity-60 min-sm:mt-4">
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-800 hover:text-brand-600"
            >
              <span className="font-poppins mr-2">Powered by Stripe</span>
              <span className="text-sm">[Stripe Logo]</span>
            </a>
            <a
              href="https://stripe.com/billing"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-sm text-gray-800 hover:text-brand-600 font-poppins"
            >
              Learn more about Stripe Billing
            </a>
            <div className="flex gap-4 mt-2">
              <a
                href="https://stripe.com/terms"
                className="text-sm text-gray-800 hover:text-brand-600 font-poppins"
              >
                Terms
              </a>
              <a
                href="https://stripe.com/privacy"
                className="text-sm text-gray-800 hover:text-brand-600 font-poppins"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-3/5 p-20 min-md:p-16 min-sm:p-4 shadow-left w-screen overflow-y-auto min-h-screen ">
        {/* Current Subscription */}
       {modal==="subscription"&&<>
        <div className="mb-16 min-sm:mb-8">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <span className="font-poppins-bold text-sm min-lg:text-mde uppercase text-gray-800">
              Current Subscription
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-poppins text-lg text-gray-800 min-md:text-mde min-sm:text-sm min-lg:text-mde">
                  Core
                </span>
                <div className="mt-2">
                  <span className="font-poppins-bold text-xl text-gray-800 min-md:text-lg min-sm:text-mde">
                    US$300.00 per month
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span className="font-poppins text-sm min-lg:text-mde text-gray-800">
                Your subscription renews on{' '}
                <span className="font-mono">30 April 2025</span>.
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-16 min-sm:mb-8 w-full">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <span className="font-poppins-bold text-sm min-lg:text-mde uppercase text-gray-800">
              Payment Method
            </span>
          </div>
          <div className="max-w-[464px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-[#00579f] p-2 rounded">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path d="M0 0h32v32H0z" fill="#00579f" />
                      <g fill="#fff" fill-rule="nonzero">
                        <path d="M13.823 19.876H11.8l1.265-7.736h2.023zm7.334-7.546a5.036 5.036 0 0 0-1.814-.33c-1.998 0-3.405 1.053-3.414 2.56-.016 1.11 1.007 1.728 1.773 2.098.783.379 1.05.626 1.05.963-.009.518-.633.757-1.216.757-.808 0-1.24-.123-1.898-.411l-.267-.124-.283 1.737c.475.213 1.349.403 2.257.411 2.123 0 3.505-1.037 3.521-2.641.008-.881-.532-1.556-1.698-2.107-.708-.354-1.141-.593-1.141-.955.008-.33.366-.667 1.165-.667a3.471 3.471 0 0 1 1.507.297l.183.082zm2.69 4.806.807-2.165c-.008.017.167-.452.266-.74l.142.666s.383 1.852.466 2.239h-1.682zm2.497-4.996h-1.565c-.483 0-.85.14-1.058.642l-3.005 7.094h2.123l.425-1.16h2.597c.059.271.242 1.16.242 1.16h1.873zm-16.234 0-1.982 5.275-.216-1.07c-.366-1.234-1.515-2.575-2.797-3.242l1.815 6.765h2.14l3.18-7.728z" />
                        <path d="M6.289 12.14H3.033L3 12.297c2.54.641 4.221 2.189 4.912 4.049l-.708-3.556c-.116-.494-.474-.633-.915-.65z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="ml-2 font-poppins text-sm min-lg:text-mde text-gray-800 min-sm:text-sm min-lg:text-mde">
                  {paymentMethod.type} •••• {paymentMethod.lastFour}
                </span>
              </div>
              <span className="font-poppins text-sm min-lg:text-mde text-gray-800 min-sm:text-sm min-lg:text-mde">
                Expires {paymentMethod.expiry}
              </span>
            </div>
            <div className="mt-6 flex gap-4">
              <a
                href="/p/session/live_YWNjdF8xSmtRVmhGa1dtb21DUzV4LF9TOVFzajdBdnM5SFAySjJvUjA2dU5qQ0Y1aWt6eXBC0100iMPmf4rK/payment-methods"
                className="flex items-center text-sm min-lg:text-mde text-gray-500 hover:text-brand-600 font-poppins min-sm:text-sm min-lg:text-mde"
              >
                <svg
                  className="w-3 h-3 mr-2"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 .25c.483 0 .875.392.875.875v6h6a.875.875 0 0 1 0 1.75h-6v6a.875.875 0 0 1-1.75 0v-6h-6a.875.875 0 1 1 0-1.75h6v-6c0-.483.392-.875.875-.875Z"
                    fill="currentColor"
                  />
                </svg>
                Add payment method
              </a>
            </div>
          </div>
        </div>

        {/* Billing and Shipping Information */}
        <div className="mb-16 min-sm:mb-8 w-full">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <span className="font-poppins-bold text-sm min-lg:text-mde uppercase text-gray-800">
              Billing and Shipping Information
            </span>
          </div>
          <div className="max-w-[464px] flex flex-col gap-6">
            <div className="flex">
              <span className="w-40 text-sm min-lg:text-mde text-gray-500 font-poppins min-sm:text-sm min-lg:text-mde">
                Name
              </span>
              <span className="flex-1 text-sm min-lg:text-mde text-gray-800 font-poppins min-sm:text-sm min-lg:text-mde">
                {billingInfo.name}
              </span>
            </div>
            <div className="flex">
              <span className="w-40 text-sm min-lg:text-mde text-gray-500 font-poppins min-sm:text-sm min-lg:text-mde">
                Email
              </span>
              <span className="flex-1 text-sm min-lg:text-mde text-gray-800 font-poppins min-sm:text-sm min-lg:text-mde">
                {billingInfo.email}
              </span>
            </div>
            <button
              className="flex items-center text-sm min-lg:text-mde text-gray-500 hover:text-brand-600 font-poppins min-sm:text-sm min-lg:text-mde"
            >
              <svg
                className="w-3 h-3 mr-2"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.75 2.5c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V8.694a.75.75 0 0 1 1.5 0v3.556A2.75 2.75 0 0 1 12.25 15h-8.5A2.75 2.75 0 0 1 1 12.25v-8.5A2.75 2.75 0 0 1 3.75 1h3.556a.75.75 0 1 1 0 1.5H3.75Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.739 1.178a1.75 1.75 0 0 0-2.478.002l-6.05 6.073a.75.75 0 0 0-.2.361l-.742 3.217a.75.75 0 0 0 .9.9l3.217-.743a.75.75 0 0 0 .363-.201l6.053-6.076a1.75 1.75 0 0 0-.003-2.472l-1.06-1.06ZM12.323 2.24a.25.25 0 0 1 .354 0l1.06 1.06a.25.25 0 0 1 0 .354l-.745.749-1.415-1.415.746-.748ZM10.52 4.05 6.425 8.16 6.001 10l1.837-.425 4.096-4.11L10.52 4.05Z"
                  fill="currentColor"
                />
              </svg>
              Update information
            </button>
          </div>
        </div>

        {/* Invoice History */}
        <div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4 w-full">
            <span className="font-poppins-bold text-sm min-lg:text-mde uppercase text-gray-800">
              Invoice History
            </span>
            <button className="text-gray-800 hover:text-brand-600">
              <svg
                className="w-3 h-3"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.883 9.085a5 5 0 1 1 1.202-1.202l2.666 2.666a.847.847 0 0 1 0 1.202.847.847 0 0 1-1.202 0L7.883 9.085ZM8.3 5a3.3 3.3 0 1 1-6.6 0 3.3 3.3 0 0 1 6.6 0Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4 max-w-[490px]">
            {invoices.map((invoice) => (
              <a
                key={invoice.id}
                href={invoice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center p-4 hover:bg-gray-100 rounded"
              >
                <span className="font-poppins text-sm min-lg:text-mde text-gray-800 min-sm:text-sm min-lg:text-mde">
                  {invoice.date}
                </span>
                <span className="font-poppins text-sm min-lg:text-mde text-gray-800 min-sm:text-sm min-lg:text-mde">
                  {invoice.amount}
                </span>
                <span
                  className={`font-poppins text-sm min-lg:text-mde ${
                    invoice.status === 'Paid' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {invoice.status}
                </span>
                <span className="font-poppins text-sm min-lg:text-mde text-gray-800 min-sm:text-sm min-lg:text-mde">
                  {invoice.description.slice(0,6)+"..."}
                </span>
              </a>
            ))}
          </div>
        </div></>}
      </div>
    </div>
  );
};

export default BillingDashboard;