import { RootState } from '@/redux/store';
import { stat } from 'fs';
import { useRouter } from 'next/router'
import React, { useState, } from 'react'
import { useSelector } from 'react-redux';
import Flag from 'react-world-flags';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { dividerClasses } from '@mui/material';
function Payment() {
    const state = useSelector((state: RootState) => state);
    const countries = [
        { code: "AF", name: "Afghanistan" },
        { code: "AX", name: "Åland Islands" },
        { code: "AL", name: "Albania" },
        { code: "DZ", name: "Algeria" },
        { code: "AD", name: "Andorra" },
        { code: "AO", name: "Angola" },
        { code: "AI", name: "Anguilla" },
        { code: "AQ", name: "Antarctica" },
        { code: "AG", name: "Antigua & Barbuda" },
        { code: "AR", name: "Argentina" },
        { code: "AM", name: "Armenia" },
        { code: "AW", name: "Aruba" },
        { code: "AU", name: "Australia" },
        { code: "AT", name: "Austria" },
        { code: "AZ", name: "Azerbaijan" },
        { code: "BS", name: "Bahamas" },
        { code: "BH", name: "Bahrain" },
        { code: "BD", name: "Bangladesh" },
        { code: "BB", name: "Barbados" },
        { code: "BY", name: "Belarus" },
        { code: "BE", name: "Belgium" },
        { code: "BZ", name: "Belize" },
        { code: "BJ", name: "Benin" },
        { code: "BM", name: "Bermuda" },
        { code: "BT", name: "Bhutan" },
        { code: "BO", name: "Bolivia" },
        { code: "BA", name: "Bosnia & Herzegovina" },
        { code: "BW", name: "Botswana" },
        { code: "BV", name: "Bouvet Island" },
        { code: "BR", name: "Brazil" },
        { code: "IO", name: "British Indian Ocean Territory" },
        { code: "VG", name: "British Virgin Islands" },
        { code: "BN", name: "Brunei" },
        { code: "BG", name: "Bulgaria" },
        { code: "BF", name: "Burkina Faso" },
        { code: "BI", name: "Burundi" },
        { code: "KH", name: "Cambodia" },
        { code: "CM", name: "Cameroon" },
        { code: "CA", name: "Canada" },
        { code: "CV", name: "Cape Verde" },
        { code: "KY", name: "Cayman Islands" },
        { code: "CF", name: "Central African Republic" },
        { code: "TD", name: "Chad" },
        { code: "CL", name: "Chile" },
        { code: "CN", name: "China" },
        { code: "CO", name: "Colombia" },
        { code: "KM", name: "Comoros" },
        { code: "CG", name: "Congo - Brazzaville" },
        { code: "CD", name: "Congo - Kinshasa" },
        { code: "CK", name: "Cook Islands" },
        { code: "CR", name: "Costa Rica" },
        { code: "HR", name: "Croatia" },
        { code: "CU", name: "Cuba" },
        { code: "CY", name: "Cyprus" },
        { code: "CZ", name: "Czechia" },
        { code: "DK", name: "Denmark" },
        { code: "DJ", name: "Djibouti" },
        { code: "DM", name: "Dominica" },
        { code: "DO", name: "Dominican Republic" },
        { code: "EC", name: "Ecuador" },
        { code: "EG", name: "Egypt" },
        { code: "SV", name: "El Salvador" },
        { code: "GQ", name: "Equatorial Guinea" },
        { code: "ER", name: "Eritrea" },
        { code: "EE", name: "Estonia" },
        { code: "SZ", name: "Eswatini" },
        { code: "ET", name: "Ethiopia" },
        { code: "FI", name: "Finland" },
        { code: "FR", name: "France" },
        { code: "DE", name: "Germany" },
        { code: "GR", name: "Greece" },
        { code: "GL", name: "Greenland" },
        { code: "GD", name: "Grenada" },
        { code: "GP", name: "Guadeloupe" },
        { code: "GU", name: "Guam" },
        { code: "GT", name: "Guatemala" },
        { code: "HT", name: "Haiti" },
        { code: "HN", name: "Honduras" },
        { code: "HK", name: "Hong Kong SAR China" },
        { code: "HU", name: "Hungary" },
        { code: "IS", name: "Iceland" },
        { code: "IN", name: "India" },
        { code: "ID", name: "Indonesia" },
        { code: "IE", name: "Ireland" },
        { code: "IL", name: "Israel" },
        { code: "IT", name: "Italy" },
        { code: "JP", name: "Japan" },
        { code: "KE", name: "Kenya" },
        { code: "KR", name: "South Korea" },
        { code: "US", name: "United States" },
        { code: "VN", name: "Vietnam" },
        { code: "ZA", name: "South Africa" },
        { code: "ZW", name: "Zimbabwe" },
        // Add all countries here
    ];
    const router = useRouter()
    const { data } = router.query;
    const PayWithSvg = () => (
        <svg className="InlineSVG LinkButton-logoSvg" width="50px" height="auto" focusable="false" viewBox="0 0 72 24" fill="none"><path fill="#011E0F" d="M36.12 3.677c0-1.128.95-2.045 2.069-2.045 1.118 0 2.069.922 2.069 2.045a2.075 2.075 0 0 1-2.07 2.069 2.057 2.057 0 0 1-2.068-2.07ZM29.98 1.92h3.6v20.16h-3.6V1.92ZM40.008 7.68h-3.629v14.4h3.629V7.68ZM66.096 14.39c2.731-1.68 4.589-4.18 5.323-6.715H67.79c-.945 2.42-3.115 4.239-5.5 5.011V1.916h-3.63v20.16h3.63V16.08c2.77.691 4.958 3.086 5.707 5.995h3.653c-.557-3.053-2.645-5.909-5.554-7.685ZM46.44 9.293c.95-1.263 2.803-1.997 4.306-1.997 2.803 0 5.121 2.05 5.126 5.146v9.633h-3.629v-8.832c0-1.272-.566-2.74-2.405-2.74-2.16 0-3.403 1.915-3.403 4.156v7.426h-3.629V7.69h3.634v1.603ZM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"></path><path fill="#fff" d="M11.448 4.8h-3.7c.72 3.01 2.821 5.582 5.452 7.2-2.635 1.618-4.733 4.19-5.453 7.2h3.7c.918-2.784 3.457-5.203 6.577-5.698v-3.01c-3.125-.489-5.664-2.908-6.576-5.692Z"></path></svg>
    )
    const ArrowSvg = () => (<svg
        className="InlineSVG Icon Header-backArrow mr2 Icon--sm mt-1 hover:stroke-black stroke-gray "
        focusable="false"
        width="12"
        height="12"

        viewBox="0 0 16 16"
    >
        <path
            d="M3.417 7H15a1 1 0 0 1 0 2H3.417l4.591 4.591a1 1 0 0 1-1.415 1.416l-6.3-6.3a1 1 0 0 1 0-1.414l6.3-6.3A1 1 0 0 1 8.008 2.41z"
            fill-rule="evenodd"
        ></path>
    </svg>
    )
    const [formData, setformData] = useState<{
        cardNumber: string;
        cardExpiry: string;
        securityCode: string;
        fullName: string;
        regionOrCountry: string;
        phoneNumber: string
    }>({
        cardNumber: '',
        cardExpiry: '',
        securityCode: '',
        fullName: '',
        regionOrCountry: '',
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({
        cardNumber: false,
        cardExpiry: false,
        securityCode: false,
        fullName: false,
        regionOrCountry: false,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target; // Destructure name and value from event target
        let formattedValue = value;

        if (name === 'cardExpiry') {
            // Format the card expiry field to MM/YY
            const numericValue = value.replace(/\D/g, ''); // Allow only numbers
            if (numericValue.length > 2) {
                formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
            }
            if (formattedValue.length > 5) {
                formattedValue = formattedValue.slice(0, 5); // Limit length
            }
        }

        if (name === 'cardNumber') {
            // Format the card number field to groups of 4 digits
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
                .slice(0, 19);
        }

        if (name === 'securityCode') {
            // Limit security code (CVV) to 3 or 4 digits
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        }

        // Update state with the formatted value
        setformData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    };
    const handlePhoneInputChange = (value: string) => {
        setformData((prev) => ({
            ...prev,
            phoneNumber: value,
        }));
    };
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Check each field individually and set errors
        if (formData.cardNumber === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            cardNumber: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            cardNumber: false,
          }));
        }
    
        if (formData.cardExpiry === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            cardExpiry: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            cardExpiry: false,
          }));
        }
    
        if (formData.securityCode === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            securityCode: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            securityCode: false,
          }));
        }
    
        if (formData.fullName === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            fullName: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            fullName: false,
          }));
        }
    
        if (formData.regionOrCountry === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            regionOrCountry: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            regionOrCountry: false,
          }));
        }
    
        if (formData.phoneNumber === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: false,
          }));
        }
    
        // Proceed with form submission if there are no errors
        if (
          formData.cardNumber !== "" &&
          formData.cardExpiry !== "" &&
          formData.securityCode !== "" &&
          formData.fullName !== "" &&
          formData.regionOrCountry !== "" &&
          formData.phoneNumber !== ""
        ) {
          console.log('Form submitted successfully', formData);
        } else {
          console.log('Please fill in all required fields');
        }
      };


    return (
        <div className='w-full h-[100%]  justify-center'>
            <div className='flex flex-row lg:flex-col  w-[992px] lg:w-[480px] sm:w-[320px] m-auto '>
                <div className='w-[50%] p-6 flex flex-col mt-5 lg:w-[100%]'>
                    <header className="Header" style={{ backgroundColor: "#fff" }}>
                        <div className="Header-content flex-container justify-content-space-between align-items-stretch">
                            <div className="Header-business flex-item width-grow flex-container align-items-center">
                                <a
                                    className="Link Header-businessLink Link--primary"
                                    href="http://localhost:3000/register?cancel=true"
                                    aria-label="Back to Dorway Ltd"
                                    title="Dorway Ltd"
                                    target="_self"
                                >
                                    <div style={{ position: "relative" }}>
                                        <div className="flex-container align-items-center">

                                            <div className="flex flex-row space-x-2" style={{ opacity: 1, transform: "none" }}>
                                                <ArrowSvg />
                                                <div className="HeaderImage HeaderImage--logo flex-item width-fixed flex-container justify-content-center align-items-center">
                                                    <img
                                                        alt="Dorway Ltd logo"
                                                        src="https://d1wqzb5bdbcre6.cloudfront.net/e442c63ed5d0adaaf3e26e0ceec350c7b70c5bd6dd2d6e5b6f63fd807d0bfd76/68747470733a2f2f66696c65732e7374726970652e636f6d2f66696c65732f4d44423859574e6a64463878536d7452566d68476131647462323144557a563466475a6662476c325a56394d6257684361325a7359555a795557745852316c524f4459335633705255445930307461775458765251"
                                                        className="HeaderImage-img "
                                                        loading="lazy"
                                                    />
                                                    <span className="Header-businessLink-label hidden">Back</span>
                                                </div>

                                            </div>



                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </header>

                    <div className='w-[90%] justify-center m-auto mt-5 text-left flex flex-col'>
                    {data === '300' ? (
                <>
                    <span className="text-[16px] text-gray-500 font-semibold">Try Core</span>
                    <span className="text-[32px] text-default font-semibold">30 days free</span>
                    <span className="text-[16px] text-gray-500 font-semibold">Then US$300.00 per month</span>
                    <span className="text-[16px] text-gray-500 font-semibold mt-2">100 cards, 20 trees planted per month, Cardholder permissions</span>
                </>
            ) : (
                <>
                    <span className="text-[16px] text-gray-500 font-semibold">Try Business</span>
                    <span className="text-[32px] text-default font-semibold">30 days free</span>
                    <span className="text-[16px] text-gray-500 font-semibold">Then US$750.00 per month</span>
                    <span className="text-[16px] text-gray-500 font-semibold mt-2">500 cards, 50 trees planted per month, 5 admins</span>
                </>
            )}
                    </div>

                </div>
                <div className='w-[50%] p-6 flex flex-col lg:w-[100%]  h-auto ' style={{ boxShadow: "-10px 0 15px -8px rgba(0, 0, 0, 0.1)" }} >
                    <div className='flex flex-col  justify-center w-[80%] ml-[10%] '>
                        {data==="300" && <div className='cursor:pointer hover:bg-["#7CF1A7FF"] bg-themeColor justify-center p-2 flex flex-row text-black  item-center text-center mt-2  h-[40px] rounded-[4px] w-[100%] space-x-4'>
                            <span className='text-base font-semibold'>Pay with</span> <PayWithSvg />
                        </div>}
                        {data==="300" && <div className="relative flex items-center py-8">
                            <hr className="flex-grow border-t border-gray-300" />
                            <p className="mx-4 text-gray-400 text-[14px] font-normal">Or enter payment details</p>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>}
                         {data==="750" && <div className='w-[100%] text-[22px] mb-4  font-semibold'>
                         Enter Payment Details</div>}
                        <div className="flex flex-row bg-[#F5F5F5] shadow-md  mb-10  border border-gray-200 w-[100%] py-2 px-4 rounded-[6px]  space-x-14">
                            <div className="text-default text-[14px] mt-1 font-medium">Email</div>
                            <div className="flex items-center justify-between">
                                <div className="text-base text-default font-semibold">raoikram431@gmail.com</div>
                                <div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col shadow-md">
                            <label className="text-left text-base text-gray-600">Card Confirmation</label>
                            <div className="relative w-full">
                                <input
                                    style={{ outline: "none" }}
                                    className="w-full px-4 py-2  text-base border rounded-tr-[4px] rounded-tl-[4px] focus:ring-1 focus:ring-themeColor focus:border-themeColor placeholder-gray-400"
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="1234 1234 1234 1234"
                                    autoComplete="cc-number"
                                    inputMode="numeric"
                                    aria-label="Card number"
                                    spellCheck="false"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                />
                                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex space-x-2">
                                    <img
                                        src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg"
                                        alt="Visa"
                                        className="h-4 w-auto"
                                    />
                                    <img
                                        src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"
                                        alt="MasterCard"
                                        className="h-4 w-auto"
                                    />
                                    <img
                                        src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg"
                                        alt="American Express"
                                        className="h-4 w-auto"
                                    />
                                    <img
                                        src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg"
                                        alt="Discover"
                                        className="h-4 w-auto"
                                    />
                                </div>
                            </div>
                            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                        </div>

                        <div className="flex flex-row ">
                            <div className="relative w-1/2">
                                <input
                                    className="w-full outline-none px-4 py-2 text-base rounded-bl-[4px] border border-gray-300 focus:ring-1 focus:ring-themeColor focus:border-themeColor placeholder-gray-400"
                                    autoComplete="cc-exp"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    id="cardExpiry"
                                    name="cardExpiry"
                                    type="text"
                                    inputMode="numeric"
                                    aria-label="Expiration"
                                    placeholder="MM / YY"
                                    value={formData.cardExpiry}
                                    onChange={handleChange}
                                />
                                {errors.cardExpiry && <p className="text-red-500 text-sm">{errors.cardExpiry}</p>}
                            </div>

                            <div className="relative w-1/2">
                                <input
                                    className="w-full outline-none px-4 py-2 text-base border rounded-br-md border-gray-300 focus:ring-1 focus:ring-themeColor focus:border-themeColor placeholder-gray-400"
                                    type="text"
                                    id="securityCode"
                                    name="securityCode"
                                    placeholder="CVV"
                                    autoComplete="cc-csc"
                                    inputMode="numeric"
                                    aria-label="Security code"
                                    spellCheck="false"
                                    value={formData.securityCode}
                                    onChange={handleChange}
                                />
                                {errors.securityCode && <p className="text-red-500 text-sm">{errors.securityCode}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col w-[100%]   mt-6">
                            <label className="text-left text-base text-gray-600">Card Full Name</label>
                            <input
                                className="w-full outline-none px-4 py-2 shadow-md  text-base border rounded-md border-gray-300 focus:ring-1 focus:ring-themeColor focus:border-themeColor placeholder-gray-400"
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col w-[100%]  mt-6">
                            <label className="text-left text-base text-gray-600 mb-1">Country or region</label>
                            <div className="relative w-full shadow-md ">
                                {/* Flag Display */}
                                {formData.regionOrCountry && (
                                    <div className="absolute top-1/2 left-3 transform -translate-y-1/2 flex items-center">
                                        <Flag
                                            code={formData.regionOrCountry}
                                            style={{ width: '20px', height: 'auto' }}
                                        />
                                    </div>
                                )}

                                {/* Dropdown */}
                                <select
                                    id="billingCountry"
                                    name="regionOrCountry"
                                    value={formData.regionOrCountry}
                                    className={`block w-full appearance-none border border-gray-300 bg-white px-10 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-themeColor focus:border-themeColor sm:text-sm`}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled hidden>
                                        Select a country
                                    </option>
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>



                        </div>
                        {data==="300" && <div className="flex flex-col w-full mt-6 shadow-md">
                            <div className="relative w-full border rounded-md border-gray-400">
                            <div className="flex flex-col mb-4 p-1 ">
                                <div className="text-[14px] font-semibold text-gray-800 opacity-100">
                                Securely save my information for 1-click checkout
                                </div>
                                <div
                                id="link-registration-subheader-message"
                                className="text-sm text-gray-600 mt-1"
                                >
                                Enter your phone number to create a Link account and pay faster on
                                Dorway Ltd and everywhere Link is accepted.
                                </div>
                            </div>
                                <PhoneInput
                                    country={"pk"} // Default country
                                    value={formData.phoneNumber}
                                    onChange={handlePhoneInputChange}
                                    inputStyle={{
                                        width: "100%",
                                        height: "50px",
                                        borderRadius: "6px",
                                        border: "1px solid #ccc",
                                        paddingLeft: "58px", // Account for the flag dropdown
                                    }}
                                    buttonStyle={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc",
                                        borderRadius: "6px 0 0 6px",
                                    }}
                                    dropdownStyle={{
                                        width: "250px",
                                    }}
                                    placeholder="7012 3456" // Placeholder text
                                />
                            </div>
                        </div>}
                        <button className='w-[100%] p-2 text-base text-black bg-themeColor rounded-md mt-4 font-semibold ' onSubmit={onSubmit}>Start trail</button>

                    </div>
                   
                </div>
            </div>
        </div>

    )
}

export default Payment