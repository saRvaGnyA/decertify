const networkConfig = {
  31337: {
    name: "hardhat",
  },
  44787: {
    name: "alfajores",
  },
  1337: {
    name: "localhost",
  },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
  networkConfig,
  developmentChains,
}
