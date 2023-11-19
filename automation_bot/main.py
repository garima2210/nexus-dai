import argparse
import json
import time
from collections import namedtuple

from utils.subgraph import Subgraph
from utils.EthConnector import EthNode
from utils.contracts import DAIContract, NexusContract, sDAIBridge


def read_file(file_path, as_dict=False):
    """
    This is used to read params from json file and convert them to python Namespaces
    :param file_path: takes the json filepath
    :returns: it returns data in form of python Namespace
    """
    with open(file_path, "r") as file:
        if as_dict:
            data = json.load(file)
        else:
            data = json.load(file, object_hook=lambda d: namedtuple(
                'X', d.keys())(*d.values()))
    return data


def start_bot(config_file_path, priv_key):
    """

    :return:
    """
    config = read_file(config_file_path)
    eth_node = EthNode(config.eth_rpc, priv_key)
    while True:
        abi_dai = read_file(config.contracts.dai.abi, as_dict=True)["abi"]
        abi_nexus = read_file(config.contracts.nexus.abi, as_dict=True)["abi"]
        abi_bridge = read_file(config.contracts.bridge.abi, as_dict=True)["abi"]
        DAI = DAIContract(eth_node.eth_node, config.contracts.dai.address, abi_dai)
        nexus = NexusContract(eth_node.eth_node, config.contracts.nexus.address, abi_nexus)
        graph = Subgraph(config.subgraph_rpc)
        bridges = graph.get_bridges()
        print("getting all the bridges from subgraph")
        for bridge in bridges:
            bridgeContract = sDAIBridge(eth_node.eth_node, bridge["bridgeAddress"], abi_bridge)
            print("checking bridge saving percentage for:")
            print(bridge["bridgeAddress"])
            dai_deposited = bridgeContract.get_dai_deposited()
            dai_present = DAI.balance_of(bridge["bridgeAddress"])
            saving_percent = int((dai_deposited * 10000) / (dai_present + dai_deposited))
            if saving_percent > int(bridge["savingLimit"]):
                print("withdrawing from sdai contract")
                tx = nexus.rebalance_DAI(bridge["owner"])
                eth_node.make_tx(tx)
            elif saving_percent < int(bridge["savingLimit"]):
                print("depositing in sdai contract")
                tx = nexus.rebalance_DAI(bridge["owner"])
                eth_node.make_tx(tx)
        print("sleeping for 1000 seconds")
        time.sleep(1000)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="This script is used for triggering the sDAI deposit")
    parser.add_argument("-c", "--config", help="config file to run the script. Refer README.md")
    parser.add_argument("-priv", "--private-key", help="private key for whitelisted nexus bot")
    args = parser.parse_args()
    print("starting the bot for sDAI bridges")
    start_bot(args.config, args.private_key)
