import LoadingSpinner from "@/assets/LoadingSpinner";
import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import { RootState } from "@/redux/store";
import SearchIcon from "@mui/icons-material/Search";
import WestIcon from "@mui/icons-material/West";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const OrganizationDesign: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [designs, setDesigns] = useState([
    {
      _id: state.design._id,
      name: "Default Design",
      backgroundColor: "",
      logoImage: "",
      stripImage: "",
    },
  ]);

  const filteredDesigns = designs.filter((design: any) =>
    design.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full m-auto">
        <PrivateRoutesNavBar />
      </div>
      <div className="flex flex-col items-start gap-4 mb-6 px-8 min-md:px-[112px] mt-6 mb-16">
        <button
          onClick={() => router.push("/home")}
          className="inline-flex items-center rounded-md text-gray-500 hover:text-brand-500 cursor-pointer"
        >
          <WestIcon fontSize="small" />
          <span className="ml-1">Back</span>
        </button>
        <div className="flex pb-6 border-b border-gray-200 justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <span className="text-lg font-semibold text-gray-950">
              Design Templates
            </span>
            <span className="px-2 py-1 bg-gray-50 border-gray-100 text-gray-500 border text-sm font-medium rounded">
              {designs.length}/5 Design Templates Created
            </span>
          </div>
          <button className="px-4 py-2 text-white bg-brand-100 hover:bg-brand-500 rounded-md text-sm font-semibold">
            New Design Template
          </button>
        </div>
        <div className="w-full min-md:w-72 mt-4">
          <div className="flex items-center border rounded-md border-gray-200 bg-white focus-within:border-brand p-2">
            <SearchIcon fontSize="small" className="text-gray-500" />
            <input
              className="w-full bg-transparent outline-none px-3 py-1 text-gray-950 placeholder-gray-300"
              placeholder="Start typing to search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-auto mt-4 w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-700 text-sm font-medium">
                <th className="py-3 px-3">Design Template Name</th>
                <th className="py-3 px-3">Default</th>
                <th className="py-3 px-3">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <tr>
                    <td colSpan={4}>
                      <div className="py-4 w-full flex justify-center">
                        <LoadingSpinner />
                      </div>
                    </td>
                  </tr>
                </>
              ) : filteredDesigns.length > 0 ? (
                filteredDesigns.map((design, index): any => (
                  <tr
                    key={index}
                    className="h-11 cursor-pointer hover:bg-brand-50 group"
                    onClick={() => {}}
                  >
                    <td className="py-2 px-3 text-gray-900">{design.name}</td>
                    <td className="py-2 px-3">
                      {design._id === state.design._id && (
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="text-themeColor"
                        >
                          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-0.997-6 7.071-7.071-1.414-1.415-5.657 5.657-2.828-2.829-1.415 1.415L11.003 16Z"></path>
                        </svg>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-sm text-gray-500 flex gap-3 invisible group-hover:visible">
                        <button
                          className="inline-flex items-center rounded-md text-gray-500 hover:text-brand-500 cursor-pointer"
                          onClick={() =>
                            router.push({
                              pathname: "/editDesign",
                              query: {
                                _id: design?._id,
                                name: design?.name,
                                color: design?.backgroundColor,
                                logoUrl: design?.logoImage,
                                stripUrl: design?.stripImage,
                              },
                            })
                          }
                        >
                          Edit
                        </button>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDesign;
