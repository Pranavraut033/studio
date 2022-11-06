import { Register } from '~app-toolkit/decorators';
import { AbstractApp } from '~app/app.dynamic-module';

import { DefiEdgeContractFactory } from './contracts';
import { DefiEdgeAppDefinition, DEFI_EDGE_DEFINITION } from './defiedge.definition';
import { EthereumDefiEdgeStrategyTokenFetcher } from './ethereum/defiedge.strategy.token-fetcher';
import { PolygonDefiEdgeStrategyTokenFetcher } from './polygon/defiedge.strategy.token-fetcher';

@Register.AppModule({
  appId: DEFI_EDGE_DEFINITION.id,
  providers: [
    DefiEdgeAppDefinition,
    DefiEdgeContractFactory,
    EthereumDefiEdgeStrategyTokenFetcher,
    PolygonDefiEdgeStrategyTokenFetcher,
  ],
})
export class DefiEdgeAppModule extends AbstractApp() {}
