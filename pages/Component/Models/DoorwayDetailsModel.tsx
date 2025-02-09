import React, { useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


interface CloseModelProps {
    onClose: () => void;
}

const DoorwayDetailsModel: React.FC<CloseModelProps> = ({ onClose }) => {
    const [selectedDepartment, setSelectedDepartment] = React.useState<string | null>('Hr');
    const [firstName, setFirstName] = React.useState<string>('Sami');
    const [lastName, setLastName] = React.useState<string>('Ullah');
    const [jobTitle, setJobTitle] = React.useState<string>('CEO');
    const [company, setCompany] = React.useState<string>('Outlook');
    const [license, setLicense] = React.useState<string>('');
    const [prefix, setPrefix] = React.useState<string>('');
    const [suffix, setSuffix] = React.useState<string>('');
    const [model, setModel] = useState(false)
    const [emails, setEmails] = useState<{ value: string; type: string }[]>([
        { value: "", type: "" }
    ]);
    
    const [phoneNumbers, setPhoneNumbers] = useState<{ value: string; type: string }[]>([
        { value: "03349388918", type: "" },
        { value: "03091504735", type: "" }
    ]);
    
    const [addresses, setAddresses] = useState<string[]>([""]);
    const [urls, setUrls] = useState<{ value: string; type: string }[]>([
        {value :"https://example.com" , type:"Work"}

    ]);
    const [customValue, setCustomValue] = useState<string>("");
    const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({});


    const handleSelectOption = (
        setState: React.Dispatch<React.SetStateAction<{ value: string; type: string }[]>>,
        label: string,
        index: number,
        option: string
    ) => {
        setState((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, type: option !== "Custom" ? option : "" } : item
            )
        );
    
        if (option !== "Custom") {
            setCustomValue(""); // Clear the custom value
        }
    
        // Close only the dropdown for the specific field
        setDropdownStates((prev) => ({
            ...prev,
            [`${label}-${index}`]: false, // Ensure key format matches `toggleDropdown`
        }));
    };
    
    
    

    const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomValue(e.target.value);
    };
    

    const handleSave = (
        setState: React.Dispatch<React.SetStateAction<{ value: string; type: string }[]>>,
        label: string,
        index: number
    ) => {
        if (customValue.trim() !== "") {
            setState((prev) =>
                prev.map((item, i) =>
                    i === index ? { ...item, type: customValue } : item
                )
            );
        }
    
        // Close the dropdown after saving
        setDropdownStates((prev) => ({
            ...prev,
            [`${label}-${index}`]: false, // Ensure it matches the toggleDropdown key format
        }));
    };
    
    const handleAddField = (
        setState: React.Dispatch<React.SetStateAction<{ value: string; type: string }[]>>
    ) => {
        setState((prev) => [...prev, { value: "", type: "" }]);
    };
    

    const handleFieldChange = (
        index: number,
        newValue: string,
        setState: React.Dispatch<React.SetStateAction<{ value: string; type: string }[]>>
    ) => {
        setState((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, value: newValue } : item
            )
        );
    };
    

    const handleRemoveField = (
        index: number,
        setState: React.Dispatch<React.SetStateAction<{ value: string; type: string }[]>>
    ) => {
        setState((prev) => prev.filter((_, i) => i !== index));
    };
    
    const toggleDropdown = (label: string, index: number) => {
        setDropdownStates((prev) => ({
            ...prev,
            [`${label}-${index}`]: !prev[`${label}-${index}`],
        }));
    };
    
    

    const renderUrlFields = (
        label: string,
        state: { value: string; type: string }[],
        setState: React.Dispatch<React.SetStateAction<{ value: string; type: string }[]>>,
        placeholder: string,
        type: string = "text"
    ) => (
        <div className="flex flex-col gap-[12px] items-start">
            <div className="text-small font-semibold">{label}</div>
            {state.map((item, index) => (
                <div key={index} className="w-full flex flex-col gap-[4px]">
                    <div className="flex items-center justify-between w-full">
                        {/* Dropdown for selecting type */}
                        <div className="relative flex-1">
                            <div
                                className="cursor-pointer rounded-[6px] hover:bg-brand-50 border-black px-[12px] py-[10px] flex items-center justify-between w-max gap-[8px]"
                                onClick={() => toggleDropdown(label, index)}
                            >
                                <div className="flex items-center gap-[8px]">
                                    <span className={`font-medium ${item.type ? "text-petite" : "text-gray-300"}`}>
                                        {item.type || "Select Type"}
                                    </span>
                                </div>
                                <div>
                                    {item.type ? (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                            <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#DBDBDBFF">
                                            <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                                        </svg>
                                    )}
                                </div>
                            </div>
    
                            {/* Dropdown menu */}
                            {dropdownStates[`${label}-${index}`] && (
                                <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                                    <div className="p-[8px] flex flex-col gap-[8px]">
                                        {["Work", "Home", "Custom"].map((option) => (
                                            <div
                                                key={option}
                                                className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-[12px] py-[10px] flex items-center w-full"
                                                onClick={() => handleSelectOption(setState,label, index, option)}
                                            >
                                                <span className="text-petite font-medium">{option}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
    
                            {/* Custom type input field */}
                            {item.type === "" && dropdownStates[`${label}-${index}`] && (
                                <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                                    <div className="p-[8px] flex flex-col gap-[8px]">
                                        <input
                                            className="border-box bg-transparent text-petite border-0 ring-transparent outline-none w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                            type="text"
                                            value={customValue}
                                            onChange={handleCustomValueChange}
                                            placeholder="Enter Custom Value"
                                        />
                                        <div className="flex gap-[10px]">
                                            <button
                                                className="rounded-[6px] text-petite font-semibold px-[11px] py-[5px] border-[1px] text-gray-700 bg-white hover:bg-gray-50 cursor-pointer w-full"
                                                onClick={() => handleSelectOption(setState,label, index, "")}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="rounded-[6px] text-petite font-semibold px-[12px] py-[6px] text-white bg-brand-500 hover:bg-brand-400 cursor-pointer w-full"
                                                onClick={() => handleSave(setState,label, index)}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
    
                        {/* Remove field button */}
                        {index > 0 && (
                            <svg
                                onClick={() => handleRemoveField(index, setState)}
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="w-[20px] h-[20px] text-gray-300 cursor-pointer hover:text-danger"
                            >
                                <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                            </svg>
                        )}
                    </div>
    
                    {/* URL input field */}
                    <div className="flex items-center justify-stretch gap-[10px]">
                        <div className="flex-grow">
                            <div
                                className="border-[1px] rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor"
                                style={{ backgroundColor: index === 0 ? "#EEEEEE" : "white" }}
                            >
                                <input
                                    className="border-box bg-transparent rounded-md text-petite border-[1px] focus:border-themeColor ring-transparent outline-none w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                    type={type}
                                    value={item.value}
                                    onChange={(e) => index > 0 && handleFieldChange(index, e.target.value, setState)}
                                    placeholder={placeholder}
                                    readOnly={index === 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
    
            {/* Add new field button */}
            <button
                className="inline-flex items-center rounded-[6px] text-petite font-medium justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                onClick={() => handleAddField(setState)}
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-5 h-5">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                <span>Add New {label}</span>
            </button>
        </div>
    );
    
    const renderFields = (
        label: string,
        state: { value: string; type: string }[], // Updated state structure
        setState: React.Dispatch<React.SetStateAction<{ value: string; type: string }[]>>,
        placeholder: string,
        type: string = "text",
        readOnly: boolean = false,
        bgColor?: string
    ) => (
        <div className="flex flex-col gap-[12px] items-start">
            <div className="text-small font-semibold">{label}</div>
            {state.map(({ value, type }, index) => ( // Extracting value and type
                <div key={index} className="w-full flex flex-col gap-[4px]">
                    <div className="flex items-center">
                        <div className="flex-grow relative">
                            <div className="flex items-center cursor-pointer hover:text-brand">
                                <div className="relative">
                                    <div
                                        className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-[12px] py-[10px] flex items-center w-full gap-[8px]"
                                        onClick={() => toggleDropdown(label, index)}
                                    >
                                        <div className="flex items-center flex-grow gap-[8px]">
                                            <div className="flex flex-col gap-[4px]">
                                                <span className={`font-medium whitespace-nowrap ${type ? "text-petite" : "text-gray-300"}`}>
                                                    {type || "Select Type"}
                                                </span>
                                            </div>
                                        </div>
                                        {type ? (
                                            <svg
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                className="remixicon text-brand-500 w-[20px]"
                                            >
                                                <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="#DBDBDBFF"
                                                className="remixicon w-[16px] h-[16px]"
                                            >
                                                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                                            </svg>
                                        )}
                                    </div>
                                    {dropdownStates[`${label}-${index}`] && (
                                        <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                                            <div className="p-[8px] flex flex-col gap-[8px]">
                                                {["Work", "Home", "Custom"].map((option) => (
                                                    <div
                                                        key={option}
                                                        className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-[12px] py-[10px] flex items-center w-full gap-[8px]"
                                                        onClick={() => handleSelectOption(setState,label, index, option)}
                                                    >
                                                        <span className="text-petite font-medium whitespace-nowrap">{option}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {type === "Custom" && (
                                        <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                                            <div className="p-[8px] flex flex-col gap-[8px]">
                                                <input
                                                    className="border-box bg-transparent text-petite border-[1px] focus:border-themeColor ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                    type="text"
                                                    value={customValue}
                                                    onChange={handleCustomValueChange}
                                                    placeholder="Enter Custom Value"
                                                />
                                                <div className="flex gap-[10px]">
                                                    <div
                                                        className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out w-full px-[11px] py-[5px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                                                        onClick={() => handleSelectOption(setState,label, index, "")}
                                                    >
                                                        Cancel
                                                    </div>
                                                    <div
                                                        className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out w-full px-[12px] py-[6px] text-white bg-brand-500 hover:bg-brand-400 focus:border-brand-200 cursor-pointer"
                                                        onClick={() => handleSave(setState,label,index)}
                                                    >
                                                        Save
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <svg
                            onClick={() => handleRemoveField(index, setState)}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="remixicon w-[20px] h-[20px] text-gray-300 cursor-pointer hover:text-danger"
                        >
                            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                        </svg>
                    </div>
                    <input
                        className="border-box bg-transparent text-petite rounded-md border-[1px] focus:border-themeColor ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                        type={type}
                        value={value}
                        onChange={(e) => !readOnly && handleFieldChange(index, e.target.value, setState)}
                        placeholder={placeholder}
                        readOnly={readOnly}
                    />
                </div>
            ))}
            <div
                className="inline-flex items-center rounded-[6px] text-petite font-medium justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                onClick={() => handleAddField(setState)}
            >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                <span>Add New {label}</span>
            </div>
        </div>
    );
    
    const handleCancel = () => {
        onClose();
    };

    const handleOptionSelect = (option: string) => {
        setSelectedDepartment(option);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target.value);
    };

    return (
        <div
            className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 overflow-hidden h-full">
                <div className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="p-[22px] flex gap-[12px] border-b border-b-gray-100 items-center">
                            <div className="flex-grow text-gray-950 text-small font-medium">
                                Doorway Details
                            </div>
                            <div className="cursor-pointer" onClick={handleCancel}>
                                <svg
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    className="remixicon text-gray-300"
                                >
                                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-scroll flex-grow">
                            <div className="px-[24px] py-[32px] flex flex-col gap-[36px] w-full">
                                {/* Management Information */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center text-small font-semibold">
                                        <span>Management Information</span>
                                        <span className="px-2 py-1 bg-brand-50 border-themeColor-100 text-brand-500 border text-tiny font-medium rounded truncate">
                                            Primary
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        {/* Prefix and Suffix Inputs in Row */}
                                        <div className="flex gap-[12px] max-w-full">
                                            <div className="flex-1">
                                                <div className="text-petite font-medium">Prefix</div>
                                                <input
                                                    className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                    type="text"
                                                    value={prefix}
                                                    onChange={(e) => handleChange(e, setPrefix)}
                                                    placeholder="Enter Prefix"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="text-petite font-medium">Suffix</div>
                                                <input
                                                    className="border-[1.5px] rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus:outline-none focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                    type="text"
                                                    value={suffix}
                                                    onChange={(e) => handleChange(e, setSuffix)}
                                                    placeholder="Enter Suffix"
                                                />
                                            </div>
                                        </div>

                                        {/* First Name and Last Name Inputs in Row */}
                                        <div className="flex gap-[12px] max-w-full">
                                            <div className="flex-1">
                                                <div className="text-petite font-medium">
                                                    First Name <span className="text-danger-600">*</span>
                                                </div>
                                                <input
                                                    className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => handleChange(e, setFirstName)}
                                                    placeholder="Enter First Name"
                                                    autoComplete="given-name"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="text-petite font-medium">
                                                    Last Name <span className="text-danger-600">*</span>
                                                </div>
                                                <input
                                                    className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => handleChange(e, setLastName)}
                                                    placeholder="Enter Last Name"
                                                    autoComplete="family-name"
                                                />
                                            </div>
                                        </div>

                                        {/* Job Title and Company Inputs in Row */}
                                        <div className="flex gap-[12px] max-w-full">
                                            <div className="flex-1">
                                                <div className="text-petite font-medium">Job Title</div>
                                                <input
                                                    className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                    type="text"
                                                    value={jobTitle}
                                                    onChange={(e) => handleChange(e, setJobTitle)}
                                                    placeholder="Enter Job Title"
                                                    autoComplete="organization-title"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="text-petite font-medium">Company</div>
                                                <input
                                                    className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                    type="text"
                                                    value={company}
                                                    onChange={(e) => handleChange(e, setCompany)}
                                                    placeholder="Enter Company"
                                                    autoComplete="organization"
                                                />
                                            </div>
                                        </div>

                                        {/* Licence Input */}
                                        <div>
                                            <div className="text-petite font-medium">Licence</div>
                                            <input
                                                className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                type="text"
                                                value={license}
                                                onChange={(e) => handleChange(e, setLicense)}
                                                placeholder="Enter Licence"
                                            />
                                        </div>

                                        {/* Department Select Input */}
                                        <div className="max-w-[390px]">
                                            <h4 className="mb-2">Department</h4>
                                            <div className="relative">
                                                {/* Custom Dropdown Button */}
                                                <div className="flex items-center justify-between w-full py-2 px-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1ed761] cursor-pointer" role='button' onClick={() => setModel(!model)}>
                                                    {/* Selected Department */}
                                                    <span>{selectedDepartment || "Select a device type..."}</span>
                                                    {/* Dropdown Icon */}
                                                    <ArrowDropDownIcon className="text-gray-600" />
                                                </div>

                                                {/* Dropdown List */}
                                                {model && <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                    <ul className="list-none p-0 m-0">
                                                        <li
                                                            className="py-2 px-3 text-gray-900 cursor-pointer hover:bg-[#ccffe6] hover:text-[#1ed761]"
                                                            onClick={() => handleOptionSelect("hr")}
                                                        >
                                                            Hr
                                                        </li>
                                                        <li
                                                            className="py-2 px-3 text-gray-900 cursor-pointer hover:bg-[#ccffe6] hover:text-[#1ed761]"
                                                            onClick={() => handleOptionSelect("admin")}
                                                        >
                                                            Admin
                                                        </li>
                                                        <li
                                                            className="py-2 px-3 text-gray-900 cursor-pointer hover:bg-[#ccffe6] hover:text-[#1ed761]"
                                                            onClick={() => handleOptionSelect("developer")}
                                                        >
                                                            Developer
                                                        </li>
                                                    </ul>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[24px]">
                                        {renderFields("Emails", emails, setEmails, "Enter email address", "email")}
                                        {renderFields(
                                            "Phone Numbers",
                                            phoneNumbers,
                                            setPhoneNumbers,
                                            "Enter phone number",
                                            "tel"
                                        )}
                                        {renderUrlFields(
                                            "URLs",
                                            urls,
                                            setUrls,
                                            "Enter Url",
                                            "url",
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-[24px] py-[16px] flex gap-[24px] border-t border-t-gray-100 items-center">
                            <div className="flex-grow text-gray-950 text-small font-medium flex justify-end gap-[16px]">
                                <div
                                    className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[15px] py-[7px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                                    onClick={handleCancel}
                                >
                                    <span className="whitespace-nowrap">Cancel</span>
                                </div>
                                <button
                                    type="submit"
                                    className={`inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[16px] py-[8px] 
                        bg-brand-100
                      cursor-pointer`}
                                >
                                    <span className="whitespace-nowrap">Update Password</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoorwayDetailsModel;
