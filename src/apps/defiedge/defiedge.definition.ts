import { Register } from '~app-toolkit/decorators';
import { appDefinition, AppDefinition } from '~app/app.definition';
import { AppAction, AppTag, GroupType } from '~app/app.interface';
import { Network } from '~types/network.interface';

export const DEFI_EDGE_DEFINITION = appDefinition({
  id: 'defiedge',
  name: 'DefiEdge',
  description: 'Permissionless Liquidity Management on Uniswap V3',
  url: 'https://app.defiedge.io/',
  groups: {
    strategy: {
      id: 'strategy',
      type: GroupType.TOKEN,
      label: 'Strategies',
    },
  },

  tags: [
    AppTag.ASSET_MANAGEMENT,
    AppTag.FUND_MANAGER,
    AppTag.LIQUIDITY_POOL,
    AppTag.LIQUID_STAKING,
    AppTag.LIMIT_ORDER,
  ],

  keywords: [],
  links: {},

  supportedNetworks: {
    [Network.ETHEREUM_MAINNET]: [AppAction.VIEW],
    [Network.POLYGON_MAINNET]: [AppAction.VIEW],
    [Network.OPTIMISM_MAINNET]: [AppAction.VIEW],
    [Network.ARBITRUM_MAINNET]: [AppAction.VIEW],
  },

  primaryColor: '#3f1df0',
});

@Register.AppDefinition(DEFI_EDGE_DEFINITION.id)
export class DefiEdgeAppDefinition extends AppDefinition {
  constructor() {
    super(DEFI_EDGE_DEFINITION);
  }
}

export default DEFI_EDGE_DEFINITION;
