import logging
import time

from web3 import Web3
# from web3.gas_strategies.rpc import rpc_gas_price_strategy
import requests


class EthNode:
    account = None
    eth_node:Web3 = None
    local = False

    def __init__(self, rpc_url, private_key):
        self.eth_node = Web3(Web3.HTTPProvider(rpc_url))
        # self.eth_node.eth.set_gas_price_strategy(rpc_gas_price_strategy)
        if '127.0.0.1' or 'localhost' in rpc_url:
            # w3.eth.accounts()[0]
            self.local = True
        else:
            pass
        self.account = self.eth_node.eth.account.from_key(
            private_key)

    def make_tx(self, tx):
        tx['from'] = self.account.address
        print(tx)
        tx['nonce'] = self.eth_node.eth.get_transaction_count(
            self.account.address)
        signed_tx = self.eth_node.eth.account.sign_transaction(
            tx, self.account.key)
        tx_hash = self.eth_node.eth.send_raw_transaction(
            signed_tx.rawTransaction)
        tx_receipt = self.eth_node.eth.wait_for_transaction_receipt(tx_hash)
        time.sleep(30)
        if tx_receipt.status == 1:
            logging.info('TX successful')
            return True,tx_hash.hex()
        else:
            logging.info('TX reverted')
            return False, tx_hash.hex()

    def get_balance(self, address):
        return self.eth_node.eth.get_balance(address) / 10 ** 18


