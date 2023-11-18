//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import {sDAIBridge} from "./sDAIBridge.sol";
contract Nexus {
    struct Bridge{
        address bridgeContract;
        uint256 savingLimit;
    }
    address public immutable bot;
    mapping(address=>Bridge) public integratedBridges;
    event BridgeRegistered(string name, uint256 savingLimit, address bridgeContract, address owner);
    event SavingLimitChaged(address owner, uint256 newLimit);
    error NotBot();
    error BridgeAlreadyIntegrated();
    error BridgeNotIntegrated();
    error ChangesNotMade();

    modifier onlybot(){
        if (msg.sender!=bot) revert NotBot();
        _;
    }

    constructor(address botAddress) {
        bot = botAddress;
    }

    function registerBridge(string calldata name, uint256 savingLimit, address bridgeContract) external {
        if(integratedBridges[msg.sender].savingLimit>0) revert BridgeAlreadyIntegrated();
        if(sDAIBridge(bridgeContract).Nexus()!=address(this)) revert ChangesNotMade();
        integratedBridges[msg.sender] = Bridge(bridgeContract,savingLimit);
        sDAIBridge(bridgeContract).initiateSavings(savingLimit);
        emit BridgeRegistered(name,savingLimit,bridgeContract,msg.sender);
    }

    function changeSavingLimit(uint256 newsavingLimit) external {
        if(integratedBridges[msg.sender].bridgeContract == address(0)) revert BridgeNotIntegrated();
        emit SavingLimitChaged(msg.sender,newsavingLimit);
        integratedBridges[msg.sender].savingLimit = newsavingLimit;
    }

    function rebalanceDAI(address ownerAddress)external onlybot(){
        sDAIBridge(integratedBridges[ownerAddress].bridgeContract).changeSavingDAI(integratedBridges[ownerAddress].savingLimit);
    }

}
