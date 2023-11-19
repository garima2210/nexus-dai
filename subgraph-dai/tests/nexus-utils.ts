import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { BridgeRegistered, SavingLimitChaged } from "../generated/Nexus/Nexus"

export function createBridgeRegisteredEvent(
  name: string,
  savingLimit: BigInt,
  bridgeContract: Address,
  owner: Address
): BridgeRegistered {
  let bridgeRegisteredEvent = changetype<BridgeRegistered>(newMockEvent())

  bridgeRegisteredEvent.parameters = new Array()

  bridgeRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  bridgeRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "savingLimit",
      ethereum.Value.fromUnsignedBigInt(savingLimit)
    )
  )
  bridgeRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "bridgeContract",
      ethereum.Value.fromAddress(bridgeContract)
    )
  )
  bridgeRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return bridgeRegisteredEvent
}

export function createSavingLimitChagedEvent(
  owner: Address,
  newLimit: BigInt
): SavingLimitChaged {
  let savingLimitChagedEvent = changetype<SavingLimitChaged>(newMockEvent())

  savingLimitChagedEvent.parameters = new Array()

  savingLimitChagedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  savingLimitChagedEvent.parameters.push(
    new ethereum.EventParam(
      "newLimit",
      ethereum.Value.fromUnsignedBigInt(newLimit)
    )
  )

  return savingLimitChagedEvent
}
