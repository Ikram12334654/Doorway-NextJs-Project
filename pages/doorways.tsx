import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import AddNewDoorwayModel from "@/component/Models/AddNewDoorway";
import DoorwayDetailsModel from "@/component/Models/DoorwayDetailsModel";
import UserProfile from "@/component/Models/useSidebarModel";
import WestIcon from "@mui/icons-material/West";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Doorway {
  id: number;
  name: string;
  type: "Primary" | "Secondary";
  status: "Invited" | "Not Invited";
  doorwayName: string;
  jobTitle: string;
  design: string;
}

const Doorways: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Users");
  const [searchTerm, setSearchTerm] = useState("");
  const [addDoorways, setAddDoorways] = useState(false);
  const [editDoorway, setEditDoorway] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFilterDoorway, setShowFilterDoorway] = useState(false);
  const [userId, setUserId] = useState("");
  const [doorways, setDoorways] = useState<Doorway[]>([
    {
      id: 1,
      name: "Sami Ullah",
      type: "Primary",
      status: "Invited",
      doorwayName: "second Doorway",
      jobTitle: "CEO",
      design: "Default",
    },
    {
      id: 2,
      name: "sami ullah Ikram",
      type: "Secondary",
      status: "Not Invited",
      doorwayName: "second Doorway",
      jobTitle: "Developer",
      design: "1",
    },
  ]);
  const [selectedList, setSelectedList] = useState<Doorway[]>([]);

  const handleCheckboxChange = (doorway: Doorway, isChecked: boolean) => {
    if (isChecked) {
      setSelectedList((prev) => [...prev, doorway]);
    } else {
      setSelectedList((prev) =>
        prev.filter((item) => item.name !== doorway.name)
      );
    }
  };
  const doorwayFilterOptions = {
    downloadStatus: ["Invited", "Removed"],
    designTemplate: ["Default"],
  };
  const [selectedFiltersDoorway, setSelectedFiltersDoorway] = useState({
    downloadStatus: [] as string[],
    designTemplate: [] as string[],
  });
  const handleDoorwayFilterChange = (
    category: keyof typeof selectedFiltersDoorway,
    value: string
  ) => {
    setSelectedFiltersDoorway((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };
  const handleClearDoorwayFilters = () => {
    setSelectedFiltersDoorway({
      downloadStatus: [],
      designTemplate: [],
    });
  };

  const [selectedFilters, setSelectedFilters] = useState({
    role: [] as string[],
    twoFAStatus: [] as string[],
    doorways: [] as string[],
  });
  const isAllSelected =
    doorways.length > 0 && selectedList.length === doorways.length;

  const handleSelectAllChange = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedList(doorways);
    } else {
      setSelectedList([]);
    }
  };
  const fetchDoorways = async (userId: string) => {
    const doorway: Doorway[] = [
      {
        id: 1,
        name: "Sami Ullah",
        type: "Primary",
        status: "Invited",
        doorwayName: "second Doorway",
        jobTitle: "CEO",
        design: "Default",
      },
      {
        id: 2,
        name: "sami ullah Ikram",
        type: "Secondary",
        status: "Invited",
        doorwayName: "second Doorway",
        jobTitle: "Developer",
        design: "1",
      },
    ];
    setDoorways(doorway);
  };
  const users = [
    {
      name: "Sami Ullah",
      role: "Administrator",
      email: "sami_ullah71@outlook.com",
      doorways: "1",
      twoFAStatus: "Enabled",
      id: "1",
    },
    {
      name: "Abdullah Mughal",
      role: "Member",
      email: "abdullah448836@gmail.com",
      doorways: "1",
      twoFAStatus: "Disabled",
      id: "2",
    },
  ];
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = (id: string) => {
    setIsModalOpen(!isModalOpen);
    fetchDoorways(id);
    setUserId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalDoorway = () => {
    setAddDoorways(false);
  };
  const closeModalEditDoorway = () => {
    setEditDoorway(false);
  };

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

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

  const filteredDoorways = doorways.filter((doorway) => {
    const searchMatch = doorway.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const downloadStatus = selectedFiltersDoorway.downloadStatus.length
      ? selectedFiltersDoorway.downloadStatus.includes(doorway.status)
      : true;

    const designTemplate = selectedFiltersDoorway.designTemplate.length
      ? selectedFiltersDoorway.designTemplate.includes(doorway.design)
      : true;

    return searchMatch && downloadStatus && designTemplate;
  });

  const handleFilterChange = (
    category: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full m-auto">
        <PrivateRoutesNavBar />
      </div>
      <div className="px-8 min-md:px-[112px] mt-6 mb-16">
        <div className="flex flex-col gap-[32px]">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-500 hover:text-brand-500"
          >
            <WestIcon fontSize="small" />
            <span className="ml-1">Back</span>
          </button>

          <div className="flex flex-col min-md:flex-row justify-between items-center min-md:border-b-[1px] border-gray-100 w-full">
            <div className="flex gap-[32px]">
              {["Doorways", "Users"].map((tab) => (
                <div
                  key={tab}
                  className={`cursor-pointer pb-5 text-lg font-semibold ${
                    selectedTab === tab
                      ? "text-gray-950 border-b-4 border-themeColor"
                      : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            {selectedTab === "Doorways" && (
              <div className="min-md:p-0 pt-[32px] flex gap-[24px] min-md:items-center w-full justify-center min-md:w-fit">
                <div className="hidden min-lg:flex gap-[24px]">
                  <div
                    className="inline-flex items-center rounded-[6px] text-petite font-medium justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                    role="button"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="remixicon w-5 h-5"
                    >
                      <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
                    </svg>
                    <span className="whitespace-nowrap">
                      Download Full List
                    </span>
                  </div>

                  <div
                    className="inline-flex items-center rounded-[6px] text-gray font-medium justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                    role="button"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="remixicon w-5 h-5"
                    >
                      <path d="M13 10V14H19V10H13ZM11 10H5V14H11V10ZM13 19H19V16H13V19ZM11 19V16H5V19H11ZM13 5V8H19V5H13ZM11 5H5V8H11V5ZM4 3H20C20.5523 3 21 3 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3 4 4 3Z"></path>
                    </svg>
                    <span className="whitespace-nowrap">Bulk Manage</span>
                  </div>
                </div>
                <div
                  className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[16px] py-[8px] focus:border-[2px] text-white bg-brand-500 hover:bg-brand-400 focus:border-brand-200 cursor-pointer"
                  role="button"
                  onClick={() => {
                    setAddDoorways(true);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="remixicon w-[20px] h-[20px]"
                  >
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                  </svg>
                  <span className="whitespace-nowrap">New Doorway</span>
                </div>
              </div>
            )}
          </div>
          {selectedTab === "Doorways" && (
            <div>
              <div className="flex flex-col gap-[16px]">
                <div className="min-md:flex items-center">
                  <div className="flex flex-col min-md:flex-row items-center gap-4">
                    <div className="w-full min-md:w-[280px] flex items-center focus:border-themeColor  border rounded-md p-2 border-gray-300">
                      <input
                        type="text"
                        placeholder="Search by name "
                        className="flex-grow outline-none "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-500 text-white hover:bg-brand-600"
                      onClick={() => setShowFilterDoorway(!showFilterDoorway)}
                    >
                      <span>
                        Filter (
                        {selectedFiltersDoorway.designTemplate.length +
                          selectedFiltersDoorway.downloadStatus.length}
                        )
                      </span>
                    </button>
                  </div>
                  <div className="hidden min-lg:flex flex-grow justify-end gap-[24px]">
                    <div className="flex items-center relative">
                      <button
                        className="inline-flex items-center rounded-[6px] text-petite font-medium justify-center gap-[6px] text-gray-300 cursor-default"
                        aria-disabled="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="remixicon w-5 h-5"
                        >
                          <path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path>
                        </svg>
                        <span className="whitespace-nowrap">
                          Update Design Template
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center relative">
                      <button
                        className="inline-flex items-center rounded-[6px] text-petite font-medium justify-center gap-[6px] text-gray-300 cursor-default"
                        aria-disabled="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="remixicon w-5 h-5"
                        >
                          <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
                        </svg>
                        <span className="whitespace-nowrap">
                          Download Selected List
                        </span>
                      </button>
                    </div>

                    <button
                      className="inline-flex items-center rounded-[6px] text-petite font-medium justify-center gap-[6px] text-gray-300 cursor-default"
                      aria-disabled="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="remixicon w-5 h-5"
                      >
                        <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"></path>
                      </svg>
                      <span className="whitespace-nowrap">
                        Resend Email Invite
                      </span>
                    </button>
                  </div>
                </div>
                {showFilterDoorway && (
                  <div className="hidden min-md:block w-full border border-gray-100 rounded-[6px] shadow-lg p-4 transition-height">
                    <div className="flex flex-col overflow-hidden">
                      <div className="flex justify-between items-center mb-[24px]">
                        <span className="text-small font-semibold text-gray-950">
                          Doorway Filter
                        </span>
                        <span className="text-tiny font-regular text-gray-500">
                          {selectedFiltersDoorway.downloadStatus.length +
                            selectedFiltersDoorway.designTemplate.length}{" "}
                          Filters Applied
                        </span>
                      </div>
                      <div className="flex gap-[24px] mb-[24px] min-xl:flex-row flex-col">
                        <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                          <div className="flex justify-between items-center">
                            <span className="text-petite font-regular text-gray-950">
                              Download Status
                            </span>
                            <span className="text-tiny font-regular text-gray-500">
                              {selectedFiltersDoorway.downloadStatus.length}{" "}
                              Selected
                            </span>
                          </div>
                          <div className="border-b border-gray-100"></div>
                          {doorwayFilterOptions.downloadStatus.map((status) => (
                            <label
                              key={status}
                              className="flex gap-[8px] items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedFiltersDoorway.downloadStatus.includes(
                                  status
                                )}
                                onChange={() =>
                                  handleDoorwayFilterChange(
                                    "downloadStatus",
                                    status
                                  )
                                }
                                className="w-[16px] h-[16px] rounded-[2px] border-gray-100 focus:ring-brand-200"
                              />
                              <span className="text-petite font-medium truncate max-w-[200px]">
                                {status}
                              </span>
                            </label>
                          ))}
                        </div>
                        <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                          <div className="flex justify-between items-center">
                            <span className="text-petite font-regular text-gray-950">
                              Design Template
                            </span>
                            <span className="text-tiny font-regular text-gray-500">
                              {selectedFiltersDoorway.designTemplate.length}{" "}
                              Selected
                            </span>
                          </div>
                          <div className="border-b border-gray-100"></div>
                          {doorwayFilterOptions.designTemplate.map((status) => (
                            <label
                              key={status}
                              className="flex gap-[8px] items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedFiltersDoorway.designTemplate.includes(
                                  status
                                )}
                                onChange={() =>
                                  handleDoorwayFilterChange(
                                    "designTemplate",
                                    status
                                  )
                                }
                                className="w-[16px] h-[16px] rounded-[2px] border-gray-100 focus:ring-brand-200"
                              />
                              <span className="text-petite font-medium truncate max-w-[200px]">
                                {status}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-[24px]">
                        <button
                          className="text-gray-500 hover:text-brand-500"
                          onClick={handleClearDoorwayFilters}
                        >
                          Clear
                        </button>
                        <button
                          className="px-[12px] py-[6px] text-white bg-brand-500 hover:bg-brand-400 rounded-[6px]"
                          onClick={() => setShowFilterDoorway(false)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {selectedTab === "Doorways" && (
                  <div className="overflow-y-auto overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-[1px] border-gray-100">
                          <th className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px]">
                            <div className="flex items-center">
                              <div className="pl-[12px]">
                                <input
                                  type="checkbox"
                                  checked={isAllSelected}
                                  onChange={(e) =>
                                    handleSelectAllChange(e.target.checked)
                                  }
                                  className="border w-[16px] h-[16px] rounded-[2px] outline-none focus:!outline-none text-brand border-gray-100 hover:bg-gray-50 cursor-pointer focus:border-brand-200 active:ring-0 ring-0 focus:ring-1 focus:ring-offset-0 focus:ring-brand-200"
                                />
                              </div>
                            </div>
                          </th>
                          <th className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px] cursor-pointer select-none">
                            <div className="flex items-center">User</div>
                          </th>
                          <th className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px] cursor-pointer select-none">
                            <div className="flex items-center">Identifier</div>
                          </th>
                          <th className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px] cursor-pointer select-none">
                            <div className="flex items-center">
                              Doorway Name
                            </div>
                          </th>
                          <th className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px] cursor-pointer select-none">
                            <div className="flex items-center">Job Title</div>
                          </th>
                          <th className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px] cursor-pointer select-none">
                            <div className="flex items-center">
                              Download Status
                              <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="remixicon h-[15px]"
                              >
                                <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
                              </svg>
                            </div>
                          </th>
                          <th className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px]">
                            <div className="flex items-center">
                              Quick Actions
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDoorways.map((doorway, index) => (
                          <tr
                            key={index}
                            className="h-[44px] cursor-pointer hover:bg-brand-50 group"
                          >
                            <td className="pr-[10px] pl-[10px]">
                              <div className="pl-[12px]">
                                <input
                                  type="checkbox"
                                  checked={selectedList.some(
                                    (item) => item.id === doorway.id
                                  )}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      doorway,
                                      e.target.checked
                                    )
                                  }
                                  className="border w-[16px] h-[16px] rounded-[2px] outline-none focus:!outline-none  text-brand border-gray-100 hover:bg-gray-50 cursor-pointer focus:border-brand-200 active:ring-0 ring-0 focus:ring-1 focus:ring-offset-0 focus:bg-brand-500 focus:ring-brand-200"
                                />
                              </div>
                            </td>
                            <td className="pr-[10px] pl-[10px]">
                              <span className="min-w-[200px] truncate text-petite font-regular text-gray-500">
                                {doorway.name}
                              </span>
                            </td>
                            <td className="pr-[10px] pl-[10px]">
                              <span
                                className={`px-[8px] py-[4px] ${
                                  doorway.type === "Primary"
                                    ? "bg-brand-50 border-brand-100 text-brand-500"
                                    : "bg-gray-50 border-gray-100 text-gray-500"
                                } border-[1px] text-tiny font-medium rounded-[4px] truncate`}
                              >
                                {doorway.type}
                              </span>
                            </td>
                            <td className="pr-[10px] pl-[10px]">
                              <span className="text-petite truncate min-w-[100px] font-regular text-gray-500">
                                {doorway.doorwayName}
                              </span>
                            </td>
                            <td className="pr-[10px] pl-[10px]">
                              <span className="text-petite truncate min-w-[100px] font-regular text-gray-500">
                                {doorway.jobTitle}
                              </span>
                            </td>
                            <td className="pr-[10px] pl-[10px]">
                              <div className="text-tiny font-regular flex items-center gap-[4px] text-gray-500 truncate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="5"
                                    className={`${
                                      doorway.status === "Invited"
                                        ? "fill-yellow-700 stroke-yellow-100"
                                        : "fill-red-600 stroke-red-100"
                                    }`}
                                    strokeWidth="4"
                                  ></circle>
                                </svg>
                                {doorway.status}
                              </div>
                            </td>
                            <td className="pr-[10px] pl-[10px]">
                              <span className="text-petite font-regular text-gray-500 flex gap-[12px] truncate invisible group-hover:visible">
                                <div
                                  className="inline-flex items-center rounded-[6px] text-petite font-regular justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                                  role="button"
                                  aria-disabled="false"
                                  onClick={() => {
                                    setEditDoorway(true);
                                  }}
                                >
                                  <span className="whitespace-nowrap">
                                    Edit
                                  </span>
                                </div>
                                <div
                                  className="inline-flex items-center rounded-[6px] text-petite font-regular justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                                  role="button"
                                  aria-disabled="false"
                                >
                                  <span className="whitespace-nowrap">
                                    Resend Doorway
                                  </span>
                                </div>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          {selectedTab === "Users" && (
            <div className="flex flex-col min-md:flex-row items-center gap-4">
              <div className="w-full min-md:w-[280px] flex items-center focus:border-themeColor  border rounded-md p-2 border-gray-300">
                <input
                  type="text"
                  placeholder="Start typing to search"
                  className="flex-grow outline-none "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-500 text-white hover:bg-brand-600"
                onClick={() => setShowFilter(!showFilter)}
              >
                <span>
                  Filter (
                  {selectedFilters.role.length +
                    selectedFilters.twoFAStatus.length +
                    selectedFilters.doorways.length}
                  )
                </span>
              </button>
            </div>
          )}
          {showFilter && selectedTab === "Users" && (
            <div className="hidden min-md:block w-full border border-gray-100 rounded-[6px] shadow-lg p-4 transition-height">
              <div className="flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-[24px]">
                  <span className="text-small font-semibold text-gray-950">
                    Filter
                  </span>
                  <span className="text-tiny font-regular text-gray-500">
                    {selectedFilters.role.length +
                      selectedFilters.twoFAStatus.length +
                      selectedFilters.doorways.length}{" "}
                    Filters Applied
                  </span>
                </div>
                <div className="flex gap-[24px] mb-[24px] min-xl:flex-row flex-col">
                  <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                    <div className="flex justify-between items-center">
                      <span className="text-petite font-regular text-gray-950">
                        Role
                      </span>
                      <span className="text-tiny font-regular text-gray-500">
                        {selectedFilters.role.length} Selected
                      </span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex flex-col gap-[12px] overflow-y-scroll max-h-[200px]">
                      {["Administrator", "Member"].map((role) => (
                        <label
                          key={role}
                          className="flex gap-[8px] items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFilters.role.includes(role)}
                            onChange={() => handleFilterChange("role", role)}
                            className="w-[16px] h-[16px] rounded-[2px] focus:bg-brand-500 border-gray-100 focus:ring-brand-200"
                          />
                          <span className="text-petite font-medium truncate max-w-[200px]">
                            {role}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                    <div className="flex justify-between items-center">
                      <span className="text-petite font-regular text-gray-950">
                        2FA Status
                      </span>
                      <span className="text-tiny font-regular text-gray-500">
                        {selectedFilters.twoFAStatus.length} Selected
                      </span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <label className="flex gap-[8px] items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.twoFAStatus.includes(
                          "Disabled"
                        )}
                        onChange={() =>
                          handleFilterChange("twoFAStatus", "Disabled")
                        }
                        className="w-[16px] h-[16px] rounded-[2px] border-gray-100 focus:ring-brand-200"
                      />
                      <span className="text-petite font-medium truncate max-w-[200px]">
                        Disabled
                      </span>
                    </label>
                  </div>
                  <div className="w-full border border-gray-100 rounded-[6px] p-[16px] flex flex-col gap-[12px]">
                    <div className="flex justify-between items-center">
                      <span className="text-petite font-regular text-gray-950">
                        # of Doorways
                      </span>
                      <span className="text-tiny font-regular text-gray-500">
                        {selectedFilters.doorways.length} Selected
                      </span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <label className="flex gap-[8px] items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.doorways.includes("1")}
                        onChange={() => handleFilterChange("doorways", "1")}
                        className="w-[16px] h-[16px] rounded-[2px] border-gray-100 focus:ring-brand-200"
                      />
                      <span className="text-petite font-medium truncate max-w-[200px]">
                        1
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-[24px]">
                  <button
                    className="text-gray-500 hover:text-brand-500"
                    onClick={() =>
                      setSelectedFilters({
                        role: [],
                        twoFAStatus: [],
                        doorways: [],
                      })
                    }
                  >
                    Clear
                  </button>
                  <button
                    className="px-[12px] py-[6px] text-white bg-brand-500 hover:bg-brand-400 rounded-[6px]"
                    onClick={() => setShowFilter(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedTab === "Users" && (
            <div className="overflow-y-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-[1px] border-gray-100">
                    {[
                      "User",
                      "Role",
                      "Account Email",
                      "# of Doorways",
                      "Quick Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="py-[12px] text-left text-gray-700 text-petite font-medium pr-[10px] pl-[10px] cursor-pointer select-none"
                      >
                        <div className="flex items-center">{heading}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="h-[44px] cursor-pointer hover:bg-brand-50 group"
                    >
                      <td className="pr-[10px] pl-[10px]">
                        <span className="min-w-[200px] truncate text-petite font-regular text-gray-500">
                          {user.name}
                        </span>
                      </td>
                      <td className="pr-[10px] pl-[10px]">
                        <span className="text-petite font-light">
                          {user.role}
                        </span>
                      </td>
                      <td className="pr-[10px] pl-[10px]">
                        <span className="text-petite truncate min-w-[100px] font-regular text-gray-500">
                          {user.email}
                        </span>
                      </td>
                      <td className="pr-[10px] pl-[10px]">
                        <span className="min-w-[200px] truncate text-petite font-regular text-gray-500">
                          {user.doorways}
                        </span>
                      </td>
                      <td className="pr-[10px] pl-[10px]">
                        <span className="text-petite font-regular text-gray-500 flex gap-[12px] truncate invisible group-hover:visible">
                          <div
                            className="inline-flex items-center rounded-[6px] text-mde  justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                            role="button"
                            aria-disabled="false"
                            onClick={() => toggleModal(user.id)}
                          >
                            <span className="whitespace-nowrap">Edit</span>
                          </div>
                          <div
                            className="inline-flex items-center rounded-[6px] text-mde  justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                            role="button"
                            aria-disabled="false"
                          >
                            <span className="whitespace-nowrap">
                              Copy User's Download Link
                            </span>
                          </div>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <UserProfile doorways={doorways} userId={userId} onClose={closeModal} />
      )}
      {addDoorways && <AddNewDoorwayModel onClose={closeModalDoorway} />}
      {editDoorway && (
        <DoorwayDetailsModel onClose={closeModalEditDoorway} extra={true} />
      )}
    </div>
  );
};

export default Doorways;
