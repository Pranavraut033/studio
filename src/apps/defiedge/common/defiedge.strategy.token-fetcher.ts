// import { Inject } from '@nestjs/common';
// import axios from 'axios';
// import { BigNumber } from 'ethers';
// import { formatEther, parseEther } from 'ethers/lib/utils';
// import _ from 'lodash';

// import { IAppToolkit, APP_TOOLKIT } from '~app-toolkit/app-toolkit.interface';
// import { Register } from '~app-toolkit/decorators';
// import {
//   buildDollarDisplayItem,
//   buildPercentageDisplayItem,
// } from '~app-toolkit/helpers/presentation/display-item.present';
// import { getImagesFromToken } from '~app-toolkit/helpers/presentation/image.present';
// import { ContractType } from '~position/contract.interface';
// import { WithMetaType } from '~position/display.interface';
// import { PositionFetcher } from '~position/position-fetcher.interface';
// import { AppTokenPosition, Token } from '~position/position.interface';
// import { AppTokenTemplatePositionFetcher } from '~position/template/app-token.template.position-fetcher';
// import { Network } from '~types';

// import { DefiEdgeContractFactory } from '../contracts';
// import { DEFI_EDGE_DEFINITION } from '../defiedge.definition';
// import { Strategy } from '../types/defiedge.types';

// const appId = DEFI_EDGE_DEFINITION.id;
// const groupId = DEFI_EDGE_DEFINITION.groups.strategy.id;

// const baseUrl = 'http://localhost:3005';

// const promises: Record<string, Promise<number> | undefined> = {};

// function getTokenPrice(symbol: string): Promise<number> {
//   let promise = promises[symbol];

//   if (promise) return promise;

//   promise = axios
//     .get<{ USD: number }>(`${baseUrl}/${symbol}/price`)
//     .then(({ data }) => data.USD)
//     .catch(() => 0)
//     .finally(() => setTimeout(() => delete promises[symbol], 15000));

//   return promise;
// }

// export function expandTo18Decimals(value: BigNumber, decimals?: number): BigNumber {
//   return value.mul(BigNumber.from(10).pow(BigNumber.from(18).sub(BigNumber.from(decimals ?? 0))));
// }

// export type StrategyTokenDataProps = {
//   sinceInception: number;
//   sharePrice: number;
//   aum: number;
// };

// export type SupportedNetwork = Network.POLYGON_MAINNET|Network.ARBITRUM_MAINNET|Network.ETHEREUM_MAINNET|Network.OPTIMISM_MAINNET;

// export abstract class DefiEdgeStrategyTokenFetcher implements AppTokenTemplatePositionFetcher<DefiEdgeContractFactory, AppTokenPosition> {
//   abstract network: SupportedNetwork;

//   constructor(
//     @Inject(APP_TOOLKIT) private readonly appToolkit: IAppToolkit,
//     @Inject(DefiEdgeContractFactory) private readonly defiEdgeContractFactory: DefiEdgeContractFactory,
//   ) {}

//   async getPositions() {
//     const endpoint = `${baseUrl}/${this.network}/strategies`;
//     const multicall = this.appToolkit.getMulticall(this.network);

//     const strategies = await axios.get<Strategy[]>(endpoint).then(({ data }) => data);

//     const baseTokenAddressToDetails = await this.appToolkit.getBaseTokenPrices(this.network).then(baseTokens => {
//       return _.keyBy(baseTokens, e => e.address.toLowerCase());
//     });

//     const appTokens = await Promise.all(
//       strategies.map(async strategy => {
//         const erc20Contract = this.defiEdgeContractFactory.erc20({ address: strategy.address, this.network });
//         const strategyContract = this.defiEdgeContractFactory.strategy({ address: strategy.address, network });

//         const [decimals, totalSupply, aumWithFee, [token0, token1]] = await Promise.all([
//           multicall.wrap(erc20Contract).decimals(),
//           multicall.wrap(erc20Contract).totalSupply(),
//           multicall.wrap(strategyContract).callStatic.getAUMWithFees(false),
//           Promise.all(
//             [strategy.token0, strategy.token1].map(async (t): Promise<WithMetaType<Token>> => {
//               const baseToken = baseTokenAddressToDetails[t.id.toLowerCase()];
//               const price = baseToken?.price ? baseToken.price : await getTokenPrice(t.symbol);

//               return {
//                 address: t.id,
//                 decimals: +t.decimals,
//                 network,
//                 type: ContractType.BASE_TOKEN,
//                 price: price ?? 0,
//                 symbol: t.symbol,
//               };
//             }),
//           ),
//         ]);

//         const { amount0, amount1 } = aumWithFee;
//         const tokens = [token0, token1];

//         const supply = Number(totalSupply) / 10 ** decimals;

//         let sharePrice = 100;
//         let aum = 0;
//         if (token0.price && token1.price && totalSupply.gt(BigNumber.from(0))) {
//           try {
//             const t0Price = parseEther(token0.price.toString());
//             const t1Price = parseEther(token1.price.toString());

//             const aumBN = expandTo18Decimals(amount0, +token0.decimals)
//               .mul(t0Price)
//               .add(expandTo18Decimals(amount1, +token1.decimals).mul(t1Price));

//             sharePrice = +Number(+formatEther(aumBN.div(totalSupply))).toFixed(8) || 100;
//             aum = +formatEther(aumBN) / 1e18;
//           } catch {
//             //
//           }
//         }

//         const appToken: AppTokenPosition<StrategyTokenDataProps> = {
//           type: ContractType.APP_TOKEN,
//           address: strategy.address,
//           appId,
//           tokens,
//           decimals,
//           groupId,
//           network,
//           supply,
//           symbol: strategy.title,
//           pricePerShare: sharePrice,
//           price: supply ? sharePrice * supply : 0,
//           dataProps: {
//             aum,
//             sharePrice,
//             sinceInception: sharePrice - 100,
//           },
//           displayProps: {
//             label: strategy.subTitle || strategy.title,
//             secondaryLabel: strategy.subTitle ? undefined : strategy.title,
//             statsItems: [
//               {
//                 label: 'AUM',
//                 value: buildDollarDisplayItem(aum),
//               },
//               {
//                 label: 'Since inception',
//                 value: buildPercentageDisplayItem(sharePrice - 100),
//               },
//             ],
//             images: tokens.map(getImagesFromToken).flat(),
//           },
//         };

//         return appToken;
//       }),
//     );

//     return appTokens;
//   }
// }
