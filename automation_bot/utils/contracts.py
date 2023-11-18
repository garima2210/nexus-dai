from eth_typing import ChecksumAddress
from web3 import Web3
from web3.contract import Contract


class BaseContract:
    contract: Contract = None

    def __init__(self, web3: Web3, contract_address: ChecksumAddress, contract_abi):
        self.contract = web3.eth.contract(contract_address, abi=contract_abi)


class NexusContract(BaseContract):

    def rebalance_DAI(self, ownerAddress: ChecksumAddress):
        return self.contract.functions.rebalanceDAI(ownerAddress).build_transaction(
            {"gasPrice": Web3.to_wei("2", "gwei"), "gas": 1000000})


class sDAIBridge(BaseContract):
    def get_dai_deposited(self):
        return self.contract.functions.DAIDeposited().call()


class DAIContract(BaseContract):

    def balance_of(self, address: ChecksumAddress):
        return self.contract.functions.balanceOf(address).call()
