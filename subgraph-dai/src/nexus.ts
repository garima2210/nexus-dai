import { BigInt } from "@graphprotocol/graph-ts"
import {
  BridgeRegistered as BridgeRegisteredEvent,
  SavingLimitChaged as SavingLimitChagedEvent,
  TotalRewardsClaimed as TotalRewardsClaimedEvent
} from "../generated/Nexus/Nexus"
import { Bridge, SavingLimitChaged } from "../generated/schema"

export function handleBridgeRegistered(event: BridgeRegisteredEvent): void {
  let entity = new Bridge(event.params.owner)
  entity.name = event.params.name
  entity.savingLimit = event.params.savingLimit
  entity.bridgeContract = event.params.bridgeContract
  entity.rewardsEarned = new BigInt(0)
  entity.save()
}

export function handleSavingLimitChaged(event: SavingLimitChagedEvent): void {
  let entity = new SavingLimitChaged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let bridge = Bridge.load(event.params.owner)
  if (bridge !=null){

    entity.owner = event.params.owner
    entity.oldLimit = bridge.savingLimit
    entity.newLimit = event.params.newLimit
    entity.save()
    bridge.savingLimit = event.params.newLimit
    bridge.save()
  }
}

export function handleTotalRewardsClaimed(event: TotalRewardsClaimedEvent): void{
  let bridge = Bridge.load(event.params.owner)
  if (bridge !=null){
    bridge.rewardsEarned = event.params.amount
    bridge.save()
  }
}