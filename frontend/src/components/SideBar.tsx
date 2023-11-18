import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  TwitterIcon,
  LanguageIcon,
  ExpandMoreIcon,
} from "../../public/Icons/icons"

export const SideBar = () => {
  return (
    <div className="bg-primary text-white relative  font-semibold   min-w-full  w-64  h-[100vh] min-h-full flex-col flex   items-center">
      <div className="flex flex-col mt-5 ml-4">
        <div>
          <Link href={"/"}>
            <Image
              src="/Images/logoWhite.png"
              alt="logo"
              width={70}
              height={70}
              className="  mt-5"
            />
          </Link>
        </div>

        <div className=" ">
          <Link href={"/"}>
            <Image
              src="/Images/nexusText.svg"
              alt="logo"
              width={100}
              height={100}
              className="-ml-2 mt-3 mb-[5rem]"
            />
          </Link>
        </div>
      </div>

      <div className="space-y-6  flex flex-col mt-8 ">
        <Link href={"/Links/Register/form"}>
          <h1 className="text-lg  px-4 py-2 hover:text-primary hover:bg-white ease-in-out duration-300 rounded-md">
            {" "}
            Register Bridge
          </h1>
        </Link>

        <Link href={"/Links/AdminView"}>
          <h1 className="text-lg  px-4 py-2 hover:text-primary hover:bg-white ease-in-out duration-300 rounded-md">
            {" "}
            Admin View
          </h1>
        </Link>
      </div>
      {/* <div className="space-x-4  flex  -ml-5 mt-[5rem] "> */}
      <div className="space-x-4  flex  absolute  bottom-10 left-16 ">
        <div className="hover:scale-125  ease-in-out duration-300">
          <Link href={"https://twitter.com/_Nexus_Network"} target="_blank">
            <TwitterIcon sx={{ fontSize: 30 }} />
          </Link>
        </div>

        <div className="hover:scale-125 scal ease-in-out duration-300">
          <Link href={"https://nexusnetwork.co.in/"} target="_blank">
            <LanguageIcon sx={{ fontSize: 30 }} />
          </Link>
        </div>
        {/* 
        <div className="hover:scale-125  ease-in-out duration-300">
          <Link href={"https://nexusnetwork.co.in/"}>
            <Image
              src={"/Images/discord.svg"}
              alt="discord"
              width={35}
              height={35}
              className=" -mt-2  "
            />
          </Link>
        </div> */}
      </div>
    </div>
  )
}
