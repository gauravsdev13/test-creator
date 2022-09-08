require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.4',
  networks: {
    polygon: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/SZtmueC-XYH1FQaZyLaL90qjihiGKwnb',
      accounts: ['5061642d8bfd0970f943a54f163cf6862d465975fb31ae0c25b4076799fb0dbb'],
    
    },
  },
};