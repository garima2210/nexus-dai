"use client"

import Image from "next/image"
import { StyledButton1, StyledButton2 } from "@/components/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import anime from "animejs/lib/anime.es.js"
import CssTextField from "@/components/TextField"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { AdminTable } from "@/components/Table"
import { connectNexus } from "@/utils/connectContract"
import Snackbar from "@mui/material/Snackbar"
import FormControl from "@mui/material/FormControl"
import { useRouter, useParams } from "next/navigation"

import { useQuery } from "@apollo/client/react"
import tableStyles from "../../../styles/Table.module.css"
import { gql } from "@apollo/client"
import loadingStyles from "../../../styles/loading.module.css"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import CloseIcon from "@mui/icons-material/Close"
import { InputAdornment } from "@mui/material"
import PercentIcon from "@mui/icons-material/Percent"

export default function Home() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()

  const [bridgeRegistered, setbridgeRegistered] = useState(true)
  const router = useRouter()

  const [aleartErrorOpen, setaleartErrorOpen] = useState(false)
  const [aleartPendingOpen, setaleartPendingOpen] = useState(false)
  const [aleartSucceessOpen, setaleartSucceessOpen] = useState(false)
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])

  const elementsWalletRef = useRef<(HTMLDivElement | null)[]>([])
  const elementsRef2 = useRef<(HTMLDivElement | null)[]>([])
  const elementsWalletRef2 = useRef<(HTMLDivElement | null)[]>([])
  const handlaleartErrorclose = () => {
    setaleartErrorOpen(false)
  }

  const handlaleartPendingclose = () => {
    setaleartPendingOpen(false)
  }
  const handlaleartSuccessclose = () => {
    setaleartSucceessOpen(false)
  }
  console.log("Admin address ", address)
  const { loading, error, data } = useQuery(gql`
    {
      bridges(where: {id: "${address}"})
  {
    bridgeContract
    id
    name
    rewardsEarned
    savingLimit
  } 
    }
  `)
  const [savingLimit, setsavingLimit] = useState(null)
  if (loading) {
    //setsavingLimit(data.bridges.savingLimit)
    console.log("user data", data)
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

  async function handleSubmitSaving(event: any) {
    console.log("confirm button clicked")
    event.preventDefault()

    const nexusContract = await connectNexus()

    try {
      if (nexusContract) {
        const txn = await nexusContract.changeSavingLimit(
          Number(savingLimit) * 100,
          { gasLimit: 2200000 }
        )
        setaleartPendingOpen(true)
        await txn.wait()
        handlaleartPendingclose()
        setaleartSucceessOpen(true)
        console.log("Transaction succeeded:", txn.hash)
        console.log("Minting...", txn.hash)

        console.log("Minted -- ", txn.hash)
        router.refresh()
        setsavingLimit(savingLimit)
      }
    } catch (e) {
      console.error("Transaction failed:", e)
      handlaleartPendingclose()
      setaleartErrorOpen(true)
    }
  }

  async function handleSubmitClaim(event: any) {
    console.log("confirm button clicked")
    event.preventDefault()

    const nexusContract = await connectNexus()

    try {
      if (nexusContract) {
        const txn = await nexusContract.claimRewards({ gasLimit: 2200000 })
        setaleartPendingOpen(true)
        await txn.wait()
        handlaleartPendingclose()
        setaleartSucceessOpen(true)
        console.log("Transaction succeeded:", txn.hash)
        console.log("Minting...", txn.hash)

        console.log("Minted -- ", txn.hash)
        router.refresh()
        setsavingLimit(savingLimit)
      }
    } catch (e) {
      console.error("Transaction failed:", e)
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
  }, [isConnected, bridgeRegistered])

  useEffect(() => {
    if (
      elementsWalletRef2.current &&
      elementsWalletRef2.current.length > 0 &&
      elementsWalletRef2
    ) {
      const targets = elementsWalletRef2.current.filter(element => element)
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
    <div className="  flex flex-col items-center justify-center   w-[83vw] container mx-auto">
      {isConnected === false && (
        <>
          <div className="  flex flex-col w-full items-center justify-center mt-12">
            <h1
              className="text-[2.5rem] font-black  "
              ref={el => (elementsRef.current[0] = el)}
            >
              Admin Page{" "}
            </h1>
            <h1
              className="text-lg font-light mt-4 "
              ref={el => (elementsRef.current[1] = el)}
            >
              connect your wallet to get started{" "}
            </h1>
          </div>

          <div ref={el => (elementsRef.current[2] = el)} className="">
            <Image
              src={"/Images/MetamaskLogo.svg"}
              width={200}
              height={200}
              alt="metamask logo"
              className="mt-8 mb-8"
            />
          </div>

          <div ref={el => (elementsRef.current[3] = el)} className=" ">
            <ConnectButton />
          </div>
        </>
      )}
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
            sx={{ position: "absolute", top: "0.5rem" }}
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
            sx={{ position: "absolute", top: "0.5rem" }}
          >
            Transaction Successfull
          </Alert>
        </>
      )}

      {aleartPendingOpen && (
        <>
          <Alert
            severity="warning"
            sx={{ position: "absolute", top: "0.5rem" }}
          >
            Transaction pending
          </Alert>
        </>
      )}

      {isConnected && data ? (
        <>
          <div
            className=" absolute top-5 right-5 "
            ref={el => (elementsWalletRef.current[0] = el)}
          >
            <ConnectButton />
          </div>

          <div className="    flex flex-col w-full  items-center    justify-center mt-12">
            <h1
              className="text-[2.5rem] font-black  "
              ref={el => (elementsWalletRef.current[1] = el)}
            >
              Admin Dashboard{" "}
            </h1>
            <div className="flex space-x-16   mt-6">
              <div
                className="flex-col"
                ref={el => (elementsWalletRef.current[2] = el)}
              >
                <div className=" flex-col flex mt-5  ">
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
                  <p>saving Limit</p>
                </div>
                <div
                  className="flex justify-center items-center   "
                  onClick={handleSubmitSaving}
                >
                  <StyledButton2
                    backgroundColor="white"
                    hoverColor="white"
                    color="#171515"
                    AfterBackground="#171515"
                    width="6rem"
                  >
                    Change
                  </StyledButton2>{" "}
                </div>
              </div>
            </div>

            <div
              className="mt-12"
              ref={el => (elementsWalletRef.current[3] = el)}
            >
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th className={tableStyles.th}>Bridge Contract</th>

                    <th className={tableStyles.th}>Name</th>
                    <th className={tableStyles.th}>Rewards Earned</th>
                    <th className={tableStyles.th}>Saving Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bridges.map((bridges: any, index: number) => (
                    <tr key={index}>
                      <td className={tableStyles.td}>
                        {bridges.bridgeContract}
                      </td>
                      <td className={tableStyles.td}>
                        {bridges.name || "N/A"}
                      </td>

                      <td className={tableStyles.td}>
                        {bridges.rewardsEarned}
                      </td>

                      <td className={tableStyles.td}>
                        {bridges.savingLimit / 100}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="mt-12"
              ref={el => (elementsWalletRef.current[4] = el)}
            >
              <StyledButton2
                onClick={handleSubmitClaim}
                backgroundColor="white"
                hoverColor="white"
                color="#171515"
                AfterBackground="#171515"
                width="9rem"
              >
                Claim Reward
              </StyledButton2>{" "}
            </div>
          </div>
        </>
      ) : (
        <>
          {isConnected && (
            <>
              <div className=" w-[82vw] flex h-[100vh] flex-col  justify-center items-center">
                <div>
                  {" "}
                  <div className={loadingStyles.loader}>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__bar}></div>
                    <div className={loadingStyles.loader__ball}></div>
                  </div>
                </div>

                <div className="text-3xl text-black mt-3">Loading</div>
              </div>
            </>
          )}
        </>
      )}

      {/* {isConnected && data === undefined && (
        <>
          <div
            className=" absolute top-5 right-5 "
            ref={el => (elementsWalletRef2.current[0] = el)}
          >
            <ConnectButton />
          </div>

          <div className="  flex flex-col w-full items-center justify-center mt-[6rem] space-y-8">
            <h1
              className="text-5xl font-black  "
              ref={el => (elementsWalletRef2.current[1] = el)}
            >
              No Bridge registered
            </h1>
            <h1
              className="text-lg font-light mt-4 "
              ref={el => (elementsWalletRef2.current[2] = el)}
            >
              register Bridge to get started
            </h1>
          </div>

          <div ref={el => (elementsWalletRef2.current[3] = el)} className="">
            <Image
              src={"/Images/bridge.svg"}
              width={350}
              height={350}
              alt="Rollup image"
              className="mt-8 mb-8"
            />
          </div>

          <div ref={el => (elementsWalletRef2.current[4] = el)} className=" ">
            <Link href={"/Links/Register/form"}>
              <div className=" ">
                <StyledButton1 borderColor="#0375C9" backgroundColor="#0375C9">
                  Register Bridge
                </StyledButton1>
              </div>
            </Link>
          </div>
        </>
      )} */}
    </div>
  )
}
