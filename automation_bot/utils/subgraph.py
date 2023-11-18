import requests
from web3 import Web3


class Subgraph:
    url = None

    def __init__(self, subgraph_url):
        self.url = subgraph_url

    def make_call(self,query):
        response = requests.post(self.url, json={'query': query})

        if response.status_code > 200:
            response.raise_for_status()
        else:
            return response.json()

    def get_bridges(self):
        query = """ {
            bridges {
                bridgeContract
                id
                name
                rewardsEarned
                savingLimit
                }
            }
          """
        bridges = []
        for rollup in self.make_call(query)["data"]["bridges"]:
            bridges.append({"owner":Web3.to_checksum_address(rollup["id"]),"bridgeAddress":Web3.to_checksum_address(rollup["bridgeContract"])})
        return bridges

    def get_cluster(self,cluster_id):
        query = """ {
              clusters(where: {clusterId: _given_id}) {
                clusterId
                id
                operatorIds
                }
            }
          """.replace("_given_id", str(cluster_id))
        return self.make_call(query)["data"]["clusters"][0]["operatorIds"]


if __name__ == '__main__':
    ss = Subgraph("https://api.studio.thegraph.com/proxy/58809/nexus-sdai/v0.0.2")
    print(ss.get_bridges())
