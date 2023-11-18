"use client"

import Image from "next/image"
import { StyledButton1, StyledButton2 } from "@/components/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import CssTextField from "@/components/TextField"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import anime from "animejs/lib/anime.es.js"
import Box from "@mui/material/Box"
import { InputAdornment } from "@mui/material"
import PercentIcon from "@mui/icons-material/Percent"
import MenuItem from "@mui/material/MenuItem"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme/theme"
import { connectNexus } from "@/utils/connectContract"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import InputLabel from "@mui/material/InputLabel"
import IconButton from "@mui/material/IconButton"
import Alert from "@mui/material/Alert"
import CloseIcon from "@mui/icons-material/Close"
import FormControl from "@mui/material/FormControl"
import Snackbar from "@mui/material/Snackbar"
import { useRouter, useParams } from "next/navigation"
import { ClusterTable } from "@/components/Table"

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()

  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const elementsWalletRef = useRef<(HTMLDivElement | null)[]>([])

  const [aleartErrorOpen, setaleartErrorOpen] = useState(false)
  const [aleartPendingOpen, setaleartPendingOpen] = useState(false)
  const [aleartSucceessOpen, setaleartSucceessOpen] = useState(false)

  const [name, setname] = useState("")
  const [savingLimit, setsavingLimit] = useState(0.01)

  const router = useRouter()

  const [bridgeAddress, setbridgeAddress] = useState(``)

  const handlaleartErrorclose = () => {
    setaleartErrorOpen(false)
  }
  const handlename = (e: any) => {
    setname(e.target.value)
  }
  const handlaleartPendingclose = () => {
    setaleartPendingOpen(false)
  }
  const handlaleartSuccessclose = () => {
    setaleartSucceessOpen(false)
  }
  const handlebridgeAddress = (e: any) => {
    setbridgeAddress(e.target.value)
  }
  const handlesavingLimit = (e: any) => {
    if (
      e.target.value === "" ||
      (parseFloat(e.target.value) >= 0 && parseFloat(e.target.value) <= 100)
    ) {
      setsavingLimit(e.target.value)
      console.log(" setsavingLimit", e.target.value)
    } else {
      console.log("incorrect staking value", e.target.value)
    }
  }

  async function handleSubmit2(event: any) {
    console.log("confirm button clicked")
    event.preventDefault()
    //Handle staking persentage conversion
    const nexusContract = await connectNexus()
    const addressbridgeContract = bridgeAddress

    const SavingLimit = Number(savingLimit) * 100
    console.log("addressbridgeContract", addressbridgeContract)
    console.log("savingLimit", SavingLimit)

    try {
      if (nexusContract) {
        const txn1 = await nexusContract.registerBridge(
          name,
          SavingLimit,
          addressbridgeContract,

          { gasLimit: 2200000 }
        )
        setaleartPendingOpen(true)
        await txn1.wait()
        handlaleartPendingclose()
        setaleartSucceessOpen(true)
        console.log("Minting...", txn1.hash)

        console.log("Minted -- ", txn1.hash)

        router.push(`/Links/AdminView`)
      }
    } catch (e) {
      console.log("error :" + e)
      handlaleartPendingclose()
      setaleartErrorOpen(true)
    }
  }

  useEffect(() => {
    if (
      elementsWalletRef.current &&
      elementsWalletRef.current.length > 0 &&
      elementsWalletRef
    ) {
      const targets = elementsWalletRef.current.filter(element => element)
      anime.timeline({ loop: false }).add({
        targets: targets,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(250, { easing: "easeOutSine" }),
      })
    }
  }, [isConnected])
  useEffect(() => {
    if (elementsRef.current) {
      const targets = elementsRef.current.filter(element => element)
      anime.timeline({ loop: false }).add({
        targets: targets,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(250, { easing: "easeOutSine" }),
      })
    }
  }, [])
  return (
    <div className="  flex flex-col items-center justify-center    w-[83vw] container mx-auto">
      {isConnected ? (
        <>
          <div
            className=" absolute top-5 right-5 opacity-0"
            ref={el => (elementsWalletRef.current[0] = el)}
          >
            <ConnectButton />
          </div>
          <div className="h-[100vh] flex   justify-center items-center">
            {aleartErrorOpen && (
              <>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={handlaleartErrorclose}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ position: "absolute", top: "1.5rem" }}
                >
                  Transaction Failed
                </Alert>
              </>
            )}

            {aleartSucceessOpen && (
              <>
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={handlaleartSuccessclose}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ position: "absolute", top: "1.5rem" }}
                >
                  Transaction Successfull
                </Alert>
              </>
            )}

            {aleartPendingOpen && (
              <>
                <Alert
                  severity="warning"
                  sx={{ position: "absolute", top: "1.5rem" }}
                >
                  Transaction pending
                </Alert>
              </>
            )}

            <div
              className="border-[3px] border-black  h-[30rem] flex-col flex      opacity-0  rounded-[2rem] px-12 py-5"
              ref={el => (elementsWalletRef.current[2] = el)}
            >
              <h1
                className="text-3xl font-black  opacity-0 text-black"
                ref={el => (elementsWalletRef.current[3] = el)}
              >
                Set Bridge Parameters
              </h1>
              <div
                className=" flex-col flex mt-5 "
                ref={el => (elementsWalletRef.current[4] = el)}
              >
                <CssTextField
                  label="Name"
                  variant="outlined"
                  type="text"
                  value={name}
                  onChange={handlename}
                />
                <p>Bridge Name</p>
              </div>

              <div
                className=" flex-col flex mt-5  opacity-0"
                ref={el => (elementsWalletRef.current[5] = el)}
              >
                <CssTextField
                  label="Address"
                  variant="outlined"
                  type="text"
                  value={bridgeAddress}
                  onChange={handlebridgeAddress}
                />
                <p>Bridge Contract Address</p>
              </div>
              <div
                className=" flex-col flex mt-5 "
                ref={el => (elementsWalletRef.current[6] = el)}
              >
                <CssTextField
                  label="Percentage"
                  variant="outlined"
                  type="number"
                  value={savingLimit}
                  onChange={handlesavingLimit}
                  InputProps={{
                    ...{},
                    inputProps: {
                      inputMode: "numeric",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <p>Saving Limit</p>
              </div>

              <div
                className=" flex justify-center mt-6"
                ref={el => (elementsWalletRef.current[8] = el)}
              >
                <div onClick={handleSubmit2}>
                  <StyledButton2
                    backgroundColor="white"
                    hoverColor="white"
                    color="#171515"
                    AfterBackground="#171515"
                    width="14rem"
                  >
                    Register Bridge
                  </StyledButton2>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="  flex flex-col w-full items-center justify-center mt-12">
            <h1
              className="text-[2.5rem] font-black "
              ref={el => (elementsRef.current[0] = el)}
            >
              Register Your Bridge{" "}
            </h1>
            <h1
              className="text-lg font-light mt-4"
              ref={el => (elementsRef.current[1] = el)}
            >
              connect your wallet to get started{" "}
            </h1>
          </div>

          <div ref={el => (elementsRef.current[2] = el)} className=" ">
            <Image
              src={"/Images/MetamaskLogo.svg"}
              width={200}
              height={200}
              alt="metamask logo"
              className="mt-8 mb-8"
            />
          </div>

          <div ref={el => (elementsRef.current[3] = el)} className="">
            <ConnectButton />
          </div>
        </>
      )}
    </div>
  )
}
