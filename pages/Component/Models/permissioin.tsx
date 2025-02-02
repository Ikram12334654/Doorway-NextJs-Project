import React, { useState } from "react";

interface Permission {
    id: string;
    label: string;
}

interface CloseModelProps {
    onClose: () => void;
}

const permissions: Permission[] = [
    { id: "prefix", label: "Prefix" },
    { id: "suffix", label: "Suffix" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "company", label: "Company" },
    { id: "department", label: "Department" },
    { id: "licenseNumber", label: "Licence Number" },
    { id: "jobTitle", label: "Job Title" },
    { id: "phoneNumber", label: "Phone Number" },
    { id: "emails", label: "Emails" },
    { id: "urls", label: "URLs" },
    { id: "addresses", label: "Addresses" },
];

const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({
    enabled,
    onToggle,
}) => (
    <div
        className={`transition-all w-[45px] p-[5px] flex items-center justify-between rounded-[60px] cursor-pointer bg-white ${enabled ? "bg-green-100" : "bg-red-100"
            }`}
        onClick={onToggle}
    >
        {/* Lock / Unlock Icon */}
        {enabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-[12px] h-[11px] fill-green-700">
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"></path>
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-[12px] h-[11px] fill-red-700">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"></path>
            </svg>
        )}

        {/* Toggle Indicator */}
        <div className={`w-[15px] h-[15px] rounded-full transition ${enabled ? "bg-green-300" : "bg-red-300"}`} />
    </div>
);

const UserPermissions: React.FC<CloseModelProps> = ({ onClose }) => {
    const [permissionsState, setPermissionsState] = useState<Record<string, boolean>>({});

    const handleCancel = () => {
        onClose();
    };

    const togglePermission = (id: string) => {
        setPermissionsState((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden h-full">
                <div className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full">
                    <div className="relative w-screen max-w-md h-screen bg-white shadow-xl p-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">User Permissions</h3>
                            <button className="appearance-none outline-none" onClick={handleCancel}>
                                <span className="sr-only">Close panel</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="bg-gray-100 text-black text-sm text-center p-3 rounded my-4">
                            Give users permission to edit selected fields themselves.
                        </div>

                        <div className="space-y-2">
                            {permissions.map(({ id, label }) => (
                                <div
                                    key={id}
                                    className={`flex justify-between items-center p-2 rounded transition ${permissionsState[id] ? "bg-green-100" : "bg-gray-50"
                                        }`}
                                >
                                    <span className="text-sm">{label}</span>
                                    <ToggleSwitch enabled={permissionsState[id] || false} onToggle={() => togglePermission(id)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPermissions;
