import LoadingSpinner from "@/assets/LoadingSpinner";
import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import WestIcon from "@mui/icons-material/West";
import { useRouter } from "next/router";
import React, { useState } from "react";

const OrganizationSetting: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full m-auto">
        <PrivateRoutesNavBar />
      </div>
      <div className="px-8 min-md:px-[112px] mt-6 mb-16">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center rounded-md text-gray-500 hover:text-brand-500 cursor-pointer"
        >
          <WestIcon fontSize="small" />
          <span className="ml-1">Back</span>
        </button>
        <div className="flex flex-col min-md:flex-row justify-between items-start min-md:border-b-[1px] border-gray-200 w-full">
          <div className="text-lg font-semibold pb-[24px]">Login Activity</div>
        </div>
        <div className="flex mt-[80px] flex-col gap-[70px]">
          <div className="flex flex-col gap-6">
            <div className="flex pb-6 border-b border-gray-100">
              <div className="flex-grow flex flex-col gap-3">
                <div>
                  <span className="text-sm text-gray-500">
                    Manage logged In sessions
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">
                        Name
                      </th>
                      <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">
                        Role
                      </th>
                      <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">
                        Email
                      </th>
                      <th className="py-3 text-left text-gray-700 text-sm font-medium px-2">
                        Quick Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={3}>
                          <div className="py-4 w-full flex justify-center">
                            <LoadingSpinner />
                          </div>
                        </td>
                      </tr>
                    ) : sessions.length > 0 ? (
                      sessions.map((session: any, index) => (
                        <tr
                          key={index}
                          className="h-11 hover:bg-brand-50 group cursor-pointer"
                        >
                          <td className="px-2 truncate text-sm font-medium text-gray-950">
                            {session?.firstName + " " + session?.lastName}
                          </td>
                          <td className="px-2 truncate text-sm text-gray-500">
                            Admin
                          </td>
                          <td className="px-2 truncate text-sm text-gray-500">
                            {session?.email}
                          </td>
                          <td className="px-2">
                            <div className="text-sm text-gray-500 flex gap-3 invisible group-hover:visible">
                              <button
                                onClick={() => {}}
                                className="text-gray-500 hover:text-brand-500 font-medium"
                              >
                                Logout
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSetting;
