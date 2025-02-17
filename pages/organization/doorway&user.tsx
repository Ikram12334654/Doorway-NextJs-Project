import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import WestIcon from "@mui/icons-material/West";
import { useRouter } from "next/router";
import React, { useId, useState } from "react";
import UserSidebar from "../Component/Models/useSidebarModel";
import UserProfile from "../Component/Models/useSidebarModel";
interface Doorway {
    name: string;
    type: 'Primary' | 'Secondary';
    status: 'Invited' | 'Not Invited';
  }
  
const DoorwayandUser: React.FC = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("Users");
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [userId, setUserId] = useState(""); // Replace with dynamic userId
    const [doorways, setDoorways] = useState<Doorway[]>([]); // State to hold doorways data

    interface Doorway {
        name: string;
        type: 'Primary' | 'Secondary';
        status: 'Invited' | 'Not Invited';
      }
      
    const [selectedFilters, setSelectedFilters] = useState({
        role: [] as string[],
        twoFAStatus: [] as string[],
        doorways: [] as string[],
    });
    const fetchDoorways = async (userId: string) => {
        //const res = await fetch(`https://api.example.com/doorways?userId=${userId}`);
        //const data = await res.json();
        const doorways: Doorway[] = [
            {
              name: "Sami Ullah",
              type: "Primary",
              status: "Invited",
            },
            {
              name: "sami ullah Ikram",
              type: "Secondary",
              status: "Invited",
            },
            {
              name: "Another User",
              type: "Secondary",
              status: "Not Invited",
            },
          ];
        setDoorways(doorways);
      };
    const users = [
        { name: "Sami Ullah", role: "Administrator", email: "sami_ullah71@outlook.com", doorways: "1", twoFAStatus: "Enabled", id:"1"},
        { name: "Abdullah Mughal", role: "Member", email: "abdullah448836@gmail.com", doorways: "1", twoFAStatus: "Disabled",  id:"2" },
    ];
const [isModalOpen, setIsModalOpen] = React.useState(false);
    const toggleModal = (id:string) => {
        setIsModalOpen(!isModalOpen);
        fetchDoorways(id)
        setUserId(id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // Filter function for search
    const filteredUsers = users.filter((user) => {
        // Filter by search term
        const searchMatch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by selected filters
        const roleMatch = selectedFilters.role.length
            ? selectedFilters.role.includes(user.role)
            : true;
        const twoFAMatch = selectedFilters.twoFAStatus.length
            ? selectedFilters.twoFAStatus.includes(user.twoFAStatus)
            : true;
        const doorwaysMatch = selectedFilters.doorways.length
            ? selectedFilters.doorways.includes(user.doorways)
            : true;

        return searchMatch && roleMatch && twoFAMatch && doorwaysMatch;
    });

    const handleFilterChange = (category: keyof typeof selectedFilters, value: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter((item) => item !== value)
                : [...prev[category], value],
        }));
    };

    return (
        <div className="flex flex-col w-full">
            {/* Navbar */}
            <div className="flex justify-center w-full m-auto">
                <PrivateRoutesNavBar />
            </div>
            <div className="px-8 min-md:px-[112px] mt-6 mb-16">
                <div className="flex flex-col gap-[32px]">
                    <button onClick={() => router.push("/organization/home")} className="inline-flex items-center text-gray-500 hover:text-brand-500">
                        <WestIcon fontSize="small" />
                        <span className="ml-1">Back</span>
                    </button>

                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-gray-100 w-full">
                        {["Doorways", "Users"].map((tab) => (
                            <div
                                key={tab}
                                className={`cursor-pointer pb-5 text-lg font-semibold ${selectedTab === tab ? "text-gray-950 border-b-4 border-themeColor" : "text-gray-500"
                                    }`}
                                onClick={() => setSelectedTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Search & Filter */}
                    {selectedTab==="Users" && <div className="flex flex-col min-md:flex-row items-center gap-4">
                        {/* Search Box */}
                        <div className="w-full min-md:w-[280px] flex items-center focus:border-themeColor  border rounded-md p-2 border-gray-300">
                            <input type="text" placeholder="Start typing to search" className="flex-grow outline-none " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>

                        {/* Filter Button */}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-500 text-white hover:bg-brand-600" onClick={() => setShowFilter(!showFilter)}>
                            <span>Filter ({selectedFilters.role.length + selectedFilters.twoFAStatus.length + selectedFilters.doorways.length})</span>
                        </button>
                    </div>}
                    {showFilter && selectedTab==="Users" &&(
                        <div className="hidden min-md:block w-full border border-gray-100 rounded-[6px] shadow-lg p-4 transition-height">
                            <div className="flex flex-col overflow-hidden">
                                <div className="flex justify-between items-center mb-[24px]">
                                    <span className="text-small font-semibold text-gray-950">Filter</span>
                                    <span className="text-tiny font-regular text-gray-500">
                                        {selectedFilters.role.length + selectedFilters.twoFAStatus.length + selectedFilters.doorways.length} Filters Applied
                                    </span>
                                </div>

                                {/* Filter Sections */}
                                <div className="flex gap-[24px] mb-[24px] min-xl:flex-row flex-col">
                                    {/* Role Filter */}
                                    <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-petite font-regular text-gray-950">Role</span>
                                            <span className="text-tiny font-regular text-gray-500">{selectedFilters.role.length} Selected</span>
                                        </div>
                                        <div className="border-b border-gray-100"></div>
                                        <div className="flex flex-col gap-[12px] overflow-y-scroll max-h-[200px]">
                                            {["Administrator", "Member"].map((role) => (
                                                <label key={role} className="flex gap-[8px] items-center cursor-pointer">
                                                    <input type="checkbox" checked={selectedFilters.role.includes(role)} onChange={() => handleFilterChange("role", role)} className="w-[16px] h-[16px] rounded-[2px] border-gray-100 focus:ring-brand-200" />
                                                    <span className="text-petite font-medium truncate max-w-[200px]">{role}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 2FA Status Filter */}
                                    <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-petite font-regular text-gray-950">2FA Status</span>
                                            <span className="text-tiny font-regular text-gray-500">{selectedFilters.twoFAStatus.length} Selected</span>
                                        </div>
                                        <div className="border-b border-gray-100"></div>
                                        <label className="flex gap-[8px] items-center cursor-pointer">
                                            <input type="checkbox" checked={selectedFilters.twoFAStatus.includes("Disabled")} onChange={() => handleFilterChange("twoFAStatus", "Disabled")} className="w-[16px] h-[16px] rounded-[2px] border-gray-100 focus:ring-brand-200" />
                                            <span className="text-petite font-medium truncate max-w-[200px]">Disabled</span>
                                        </label>
                                    </div>

                                    {/* Doorways Filter */}
                                    <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-petite font-regular text-gray-950"># of Doorways</span>
                                            <span className="text-tiny font-regular text-gray-500">{selectedFilters.doorways.length} Selected</span>
                                        </div>
                                        <div className="border-b border-gray-100"></div>
                                        <label className="flex gap-[8px] items-center cursor-pointer">
                                            <input type="checkbox" checked={selectedFilters.doorways.includes("1")} onChange={() => handleFilterChange("doorways", "1")} className="w-[16px] h-[16px] rounded-[2px] border-gray-100 focus:ring-brand-200" />
                                            <span className="text-petite font-medium truncate max-w-[200px]">1</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-[24px]">
                                    <button className="text-gray-500 hover:text-brand-500" onClick={() => setSelectedFilters({ role: [], twoFAStatus: [], doorways: [] })}>
                                        Clear
                                    </button>
                                    <button className="px-[12px] py-[6px] text-white bg-brand-500 hover:bg-brand-400 rounded-[6px]" onClick={() => setShowFilter(false)}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Table Section */}
                    {selectedTab==="Users" && <div className="overflow-y-auto overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-[1px] border-gray-100">
                                    {["User", "Role", "Account Email", "# of Doorways", "Quick Actions"].map((heading) => (
                                        <th key={heading} className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px] cursor-pointer select-none">
                                            <div className="flex items-center">{heading}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={index} className="h-[44px] cursor-pointer hover:bg-brand-50 group">
                                        <td className="pr-[10px] pl-[10px]">
                                            <span className="min-w-[200px] truncate text-petite font-regular text-gray-500">{user.name}</span>
                                        </td>
                                        <td className="pr-[10px] pl-[10px]">
                                            <span className="text-petite font-light">{user.role}</span>
                                        </td>
                                        <td className="pr-[10px] pl-[10px]">
                                            <span className="text-petite truncate min-w-[100px] font-regular text-gray-500">{user.email}</span>
                                        </td>
                                        <td className="pr-[10px] pl-[10px]">
                                            <span className="min-w-[200px] truncate text-petite font-regular text-gray-500">{user.doorways}</span>
                                        </td>
                                        <td className="pr-[10px] pl-[10px]">
                                            <span className="text-petite font-regular text-gray-500 flex gap-[12px] truncate invisible group-hover:visible">
                                                <div className="inline-flex items-center rounded-[6px] text-mde  justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer" role="button" aria-disabled="false" onClick={()=>toggleModal(user.id)}>
                                                    <span className="whitespace-nowrap">Edit</span>
                                                </div>
                                                <div className="inline-flex items-center rounded-[6px] text-mde  justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer" role="button" aria-disabled="false">
                                                    <span className="whitespace-nowrap">Copy User's Download Link</span>
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
            {isModalOpen && <UserProfile doorways={doorways} userId={userId} onClose={closeModal} />}

        </div>
    );
};

export default DoorwayandUser;
