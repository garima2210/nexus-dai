import argparse
import json
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


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="This script is used for triggering the sDAI deposit")
    parser.add_argument("-c", "--config", help="config file to run the script. Refer README.md")
    parser.add_argument("-priv", "--private-key", help="private key for whitelisted nexus bot")
    args = parser.parse_args()
    start_bot(args.config, args.private_key)
