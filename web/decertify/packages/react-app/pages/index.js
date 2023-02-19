import React from "react";
import { useRouter } from "next/router";
import { useCelo } from "@celo/react-celo";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { address } = useCelo();
  return (
    <div>
      <div class="py-8 px-4 mx-auto max-w-screen-xl max-h-screen text-center lg:py-16 lg:px-12">
        <h1 class="mb-4 text-9xl font-extrabold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:text-5xl lg:text-8xl dark:text-white">
          Decentralized Certification.
        </h1>
        <p class="mb-8 text-8xl font-normal text-gray-500 lg:text-4xl sm:text-2xl dark:text-gray-400">
          Protect, Verify and Secure your certificates with the power of
          BlockChain.
        </p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 justify-center items-center sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            class="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 inline-flex py-3 px-5 text-base font-lg text-center text-slate-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <p class="font-bold text-lg">Dashboard</p>
          </button>
          {!address ? (
            <div></div>
          ) : (
            <button
              onClick={() => {
                router.push("/orgRegister");
              }}
              class="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 inline-flex py-3 px-5 text-base font-lg text-center text-slate-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <p class="font-bold text-lg">Register</p>
            </button>
          )}
        </div>

        <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span class="font-semibold text-gray-400 uppercase text-3xl">
            How it Works
          </span>
          <div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between"></div>
        </div>
        <div className="flex-1 justify-ceneter items-center">
        <Image className="relative left-64" src="/flowchart.svg" width="700" height="100" alt="Flowchart " />
        </div>


      </div>
    </div>
  );
}
