import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { ArbitrumAbracadabraCauldronContractPositionFetcher } from './arbitrum/abracadabra.cauldron.contract-position-fetcher';
import { ArbitrumAbracadabraFarmContractPositionFetcher } from './arbitrum/abracadabra.farm.contract-position-fetcher';
import { ArbitrumAbracadabraMspellContractPositionFetcher } from './arbitrum/abracadabra.m-spell.contract-position-fetcher';
import { ArbitrumAbracadabraStakedSpellTokenFetcher } from './arbitrum/abracadabra.staked-spell.token-fetcher';
import { AvalancheAbracadabraCauldronContractPositionFetcher } from './avalanche/abracadabra.cauldron.contract-position-fetcher';
import { AvalancheAbracadabraFarmContractPositionFetcher } from './avalanche/abracadabra.farm.contract-position-fetcher';
import { AvalancheAbracadabraMspellContractPositionFetcher } from './avalanche/abracadabra.m-spell.contract-position-fetcher';
import { AvalancheAbracadabraStakedSpellTokenFetcher } from './avalanche/abracadabra.staked-spell.token-fetcher';
import { BinanceSmartChainAbracadabraCauldronContractPositionFetcher } from './binance-smart-chain/abracadabra.cauldron.contract-position-fetcher';
import { AbracadabraContractFactory } from './contracts';
import { EthereumAbracadabraCauldronContractPositionFetcher } from './ethereum/abracadabra.cauldron.contract-position-fetcher';
import { EthereumAbracadabraFarmContractPositionFetcher } from './ethereum/abracadabra.farm.contract-position-fetcher';
import { EthereumAbracadabraMspellContractPositionFetcher } from './ethereum/abracadabra.m-spell.contract-position-fetcher';
import { EthereumAbracadabraStakedSpellTokenFetcher } from './ethereum/abracadabra.staked-spell.token-fetcher';
import { FantomAbracadabraCauldronContractPositionFetcher } from './fantom/abracadabra.cauldron.contract-position-fetcher';
import { FantomAbracadabraFarmContractPositionFetcher } from './fantom/abracadabra.farm.contract-position-fetcher';
import { FantomAbracadabraMspellContractPositionFetcher } from './fantom/abracadabra.m-spell.contract-position-fetcher';
import { FantomAbracadabraStakedSpellTokenFetcher } from './fantom/abracadabra.staked-spell.token-fetcher';

@Module({
  providers: [
    AbracadabraContractFactory,
    // Arbitrum
    ArbitrumAbracadabraStakedSpellTokenFetcher,
    ArbitrumAbracadabraCauldronContractPositionFetcher,
    ArbitrumAbracadabraFarmContractPositionFetcher,
    ArbitrumAbracadabraMspellContractPositionFetcher,
    // Avalanche
    AvalancheAbracadabraStakedSpellTokenFetcher,
    AvalancheAbracadabraCauldronContractPositionFetcher,
    AvalancheAbracadabraFarmContractPositionFetcher,
    AvalancheAbracadabraMspellContractPositionFetcher,
    // Binance Smart Chain
    BinanceSmartChainAbracadabraCauldronContractPositionFetcher,
    // Ethereum
    EthereumAbracadabraStakedSpellTokenFetcher,
    EthereumAbracadabraCauldronContractPositionFetcher,
    EthereumAbracadabraFarmContractPositionFetcher,
    EthereumAbracadabraMspellContractPositionFetcher,
    // Fantom
    FantomAbracadabraStakedSpellTokenFetcher,
    FantomAbracadabraCauldronContractPositionFetcher,
    FantomAbracadabraFarmContractPositionFetcher,
    FantomAbracadabraMspellContractPositionFetcher,
  ],
})
export class AbracadabraAppModule extends AbstractApp() {}
