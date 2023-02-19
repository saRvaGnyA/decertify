import React, { useState } from "react";
import { useRouter } from "next/router";
export default function requestObject({ element }) {
  const router = useRouter();
  const data = {
    requestId: element.requestId,
    studentAddress: element.studentAddress,
    organizationAddress: element.organizationAddress,
    title: element.title,
    description: element.description,
    requestType: element.requestType,
    status: element.status.toString(),
    department: element.department,
    cid: element.cid,
    uuid: element.uuid,
  };

  return (
    <tr
      class="border-b dark:border-gray-700 hover:bg-gray-400 clickable"
      onclick="window.location='https://www.google.com/'"
    >
      <th
        scope="row"
        class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {element.requestId}
      </th>
      <td class="px-4 py-3">{element.title}</td>
      <td class="px-4 py-3">{element.description}</td>
      <td class="px-4 py-3">{element.department}</td>
      <td class="px-4 py-3">{element.status.toString()}</td>
      <td class="px-4 py-3 flex items-center justify-end">
        <button
          onClick={() => {
            router.push({ pathname: "/request", query: data });
          }}
          id="apple-imac-27-dropdown-button"
          data-dropdown-toggle="apple-imac-27-dropdown"
          class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
        >
          View
        </button>
        <div
          id="apple-imac-27-dropdown"
          class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            class="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="apple-imac-27-dropdown-button"
          >
            <li>
              <a
                href="#"
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Show
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
          </ul>
          <div class="py-1">
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Delete
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
}
