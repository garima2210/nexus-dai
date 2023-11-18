"use client"
// 13.5.4
// 13.4.16

import Image from "next/image"
import { StyledButton1, StyledButton2 } from "@/components/button"
import Link from "next/link"
import { useRef, useEffect } from "react"
import anime from "animejs/lib/anime.es.js"

export default function Home() {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (elementsRef.current) {
      anime.timeline({ loop: false }).add({
        targets: elementsRef.current,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(250, { easing: "easeOutSine" }),
      })
    }
  }, [])
  return (
    <div className="  flex flex-col items-center justify-center space-y-12  w-[83vw] container mx-auto">
      <div className="  flex flex-col w-full items-center justify-center mt-6">
        <h1
          className="text-[3.3rem] font-black  opacity-0"
          ref={el => (elementsRef.current[0] = el)}
        >
          Nexus Network
        </h1>
        <p
          className="text-lg opacity-0"
          ref={el => (elementsRef.current[1] = el)}
        >
          Welcome to Nexus Network Bridge
        </p>{" "}
      </div>

      <div
        className="w-full max-w-screen-lg mx-auto flex items-center justify-center  opacity-0"
        ref={el => (elementsRef.current[3] = el)}
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/WeCImlAqAdQ?si=wlnGa08QSMBMFkVa"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <Link href={"/Links/Register/form"}>
        <div ref={el => (elementsRef.current[4] = el)} className="opacity-0">
          {/* <StyledButton1 borderColor="#1C1B19" backgroundColor="#1C1B19">
            Register Bridge
          </StyledButton1> */}
          <StyledButton2
            backgroundColor="white"
            hoverColor="white"
            color="#171515"
            AfterBackground="#171515"
            width="12rem"
          >
            Register Bridge
          </StyledButton2>{" "}
        </div>
      </Link>
    </div>
  )
}
