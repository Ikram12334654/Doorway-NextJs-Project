import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import UserPermissions from "../Component/Models/permissioin";
import UrlEditor from "../Component/Models/urlEdittor";
import DoorwayPanel from "../Component/Models/multipleDoorways";


interface SettingCard {
    id: number;
    title: string;
    actionType: "edit" | "toggle";
    icon: JSX.Element;
}

const OrganizationSetting: React.FC = () => {
    const router = useRouter();
    const [autoResendInvites, setAutoResendInvites] = useState(false)
    const settingsCards: SettingCard[] = [
        {
            id: 1,
            title: "User Permissions",
            actionType: "edit",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon h-5 w-5 text-brand-500"
                >
                    <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z" />
                </svg>
            ),
        },
        {
            id: 2,
            title: "Company URLs",
            actionType: "edit",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon h-5 w-5 text-brand-500"
                >
                    <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z" />
                </svg>
            ),
        },
        {
            id: 3,
            title: "Multiple Doorways",
            actionType: "edit",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon h-5 w-5 text-brand-500"
                >
                    <path d="M20.0834 15.1999L21.2855 15.9212C21.5223 16.0633 21.599 16.3704 21.457 16.6072C21.4147 16.6776 21.3559 16.7365 21.2855 16.7787L12.5145 22.0412C12.1979 22.2313 11.8022 22.2313 11.4856 22.0412L2.71463 16.7787C2.47784 16.6366 2.40106 16.3295 2.54313 16.0927C2.58536 16.0223 2.64425 15.9634 2.71463 15.9212L3.91672 15.1999L12.0001 20.0499L20.0834 15.1999ZM20.0834 10.4999L21.2855 11.2212C21.5223 11.3633 21.599 11.6704 21.457 11.9072C21.4147 11.9776 21.3559 12.0365 21.2855 12.0787L12.0001 17.6499L2.71463 12.0787C2.47784 11.9366 2.40106 11.6295 2.54313 11.3927C2.58536 11.3223 2.64425 11.2634 2.71463 11.2212L3.91672 10.4999L12.0001 15.3499L20.0834 10.4999ZM12.5145 1.30864L21.2855 6.5712C21.5223 6.71327 21.599 7.0204 21.457 7.25719C21.4147 7.32757 21.3559 7.38647 21.2855 7.42869L12.0001 12.9999L2.71463 7.42869C2.47784 7.28662 2.40106 6.97949 2.54313 6.7427C2.58536 6.67232 2.64425 6.61343 2.71463 6.5712L11.4856 1.30864C11.8022 1.11864 12.1979 1.11864 12.5145 1.30864ZM12.0001 3.33233L5.88735 6.99995L12.0001 10.6676L18.1128 6.99995L12.0001 3.33233Z" />
                </svg>
            ),
        },
        {
            id: 4,
            title: "Automatically Resend Invites",
            actionType: "toggle",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon h-5 w-5 text-brand-500"
                >
                    <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" />
                </svg>
            ),
        },
    ];
    const OrganizationData = [
        { name: "Sami Ullah", role: "Admin", email: "sami_ullah71@outlook.com" },
        { name: "Ayesha Khan", role: "Admin", email: "ayesha.khan@example.com" },
        { name: "Ali Raza", role: "Admin", email: "ali.raza@example.com" },
    ];
    const [modal, setModal] = useState<{ id: number | null; isModal: boolean }>({
        id: null,
        isModal: false,
      });
      
    const openModal = (modalId: number) => {
        setModal({ id: modalId, isModal: true });
      };
      
      const closeModal = () => {
        setModal({ id: null, isModal: false });
      };
      
    return (
        <div className="flex flex-col w-full">
            {/* Navbar */}
            <div className="flex justify-center w-full m-auto">
                <PrivateRoutesNavBar />
            </div>

            <div className="px-8 min-md:px-[112px] mt-6 mb-16">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/organization/home")}
                    className="inline-flex items-center rounded-md text-gray-500 hover:text-brand-500 cursor-pointer"
                >
                    <WestIcon fontSize="small" />
                    <span className="ml-1">Back</span>
                </button>
                <div className="flex flex-col min-md:flex-row justify-between items-start min-md:border-b-[1px] border-gray-200 w-full"><div className="text-lg font-semibold pb-[24px]">Organisation Settings</div></div>
                {/* Header Section */}
                <div className="flex mt-[80px] flex-col gap-[70px]">
                    <div className="flex flex-col gap-6">
                        <div className="flex pb-6 border-b border-gray-100">
                            <div className="flex-grow flex flex-col gap-3">
                                <div className="flex gap-3">
                                    <span className="text-base font-semibold text-gray-950">
                                        Admins
                                    </span>
                                    <div className="text-[11px] font-semibold py-1 px-3 rounded-md text-[#4c4c4c] bg-[#BEBEBE] flex items-center">
                                        <span>{`${OrganizationData.length}/3 Admins Created`}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">
                                        Manage admins in your organization
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <button className="inline-flex rounded-md text-sm font-semibold justify-center gap-1.5 px-3 py-1.5 text-white bg-brand-100 cursor-pointer">
                                    Add Admins
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="overflow-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">Name</th>
                                            <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">Role</th>
                                            <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">Email</th>
                                            <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">Quick Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {OrganizationData.length > 0 ? (
                                            OrganizationData.map((admin, index) => (
                                                <tr key={index} className="h-11 hover:bg-brand-50 group cursor-pointer">
                                                    <td className="px-2 truncate text-sm font-medium text-gray-950">
                                                        {admin.name}
                                                    </td>
                                                    <td className="px-2 truncate text-sm text-gray-500">{admin.role}</td>
                                                    <td className="px-2 truncate text-sm text-gray-500">{admin.email}</td>
                                                    <td className="px-2">
                                                        <div className="text-sm text-gray-500 flex gap-3 invisible group-hover:visible">
                                                            <button className="text-gray-500 hover:text-brand-500 font-medium">
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                                    No admins available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex pb-[24px] border-b border-gray-100">
                            <div className="flex-grow flex flex-col gap-[12px]">
                                <div className="flex gap-[12px]">
                                    <span className="text-base font-semibold text-gray-950">
                                        User Settings
                                    </span>
                                </div>
                                <div>
                                    <span className="text-petite font-regular text-gray-500">
                                        Apply company-wide URLs, enable multiple Doorways per user, and permit users to manage fields
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center">{/* Empty on purpose */}</div>
                        </div>

                        {/* Cards Grid */}
                        <div className="flex flex-col min-md:flex-row min-md:flex-wrap gap-[20px]">
                            {settingsCards.map((card) => (
                                <div
                                    key={card.id}
                                    className="rounded-lg p-6 flex flex-col"
                                    style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 12px" }}
                                >
                                    <div className="card-content flex">
                                        <div className="flex flex-row w-full min-md:w-[350px] justify-between">
                                            <div className="flex gap-3">
                                                <div className="rounded-md bg-brand-50 text-brand-700 p-2">
                                                    {card.icon}
                                                </div>
                                                <div className="flex items-center text-petite font-semibold">
                                                    {card.title}
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gray text-petite font-medium cursor-pointer">
                                                {card.actionType === "edit" ? (
                                                    <div className="flex items-center" role="button" onClick={()=>openModal(card.id)}>Edit</div>
                                                ) : (
                                                    // Render a toggle switch for "Automatically Resend Invites"
                                                    <label className="relative inline-flex items-center cursor-pointer outline-none border-none">
                                                        <input
                                                            type="checkbox"
                                                            checked={autoResendInvites}
                                                            onChange={() => setAutoResendInvites(!autoResendInvites)}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4    peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-brand-500 focus:outline-none focus:border-none" />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {modal.id===1 && modal.isModal===true && <UserPermissions onClose={closeModal}/>}
            {modal.id===2 && modal.isModal===true && <UrlEditor onClose={closeModal}/>}
            {modal.id===3 && modal.isModal===true && <DoorwayPanel onClose={closeModal}/>}
        </div>
    );
};

export default OrganizationSetting;
