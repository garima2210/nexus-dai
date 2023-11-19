import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BridgeRegistered } from "../generated/schema"
import { BridgeRegistered as BridgeRegisteredEvent } from "../generated/Nexus/Nexus"
import { handleBridgeRegistered } from "../src/nexus"
import { createBridgeRegisteredEvent } from "./nexus-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let savingLimit = BigInt.fromI32(234)
    let bridgeContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let newBridgeRegisteredEvent = createBridgeRegisteredEvent(
      name,
      savingLimit,
      bridgeContract,
      owner
    )
    handleBridgeRegistered(newBridgeRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BridgeRegistered created and stored", () => {
    assert.entityCount("BridgeRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BridgeRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "BridgeRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "savingLimit",
      "234"
    )
    assert.fieldEquals(
      "BridgeRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bridgeContract",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BridgeRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
