import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  hmr: false,
  application: {
    baseUrl,
    name: 'AbpNgAntDesign',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44383/',
    clientId: 'AbpNgAntDesign_App',
    scope: 'offline_access AbpNgAntDesign',
    responseType: 'code',
    redirectUri: baseUrl,
  },
  apis: {
    default: {
      url: 'https://localhost:44383',
      rootNamespace: 'AbpNgAntDesign',
    },
    AbpAccount: {
      rootNamespace: 'Volo.Abp',
    },
    AbpFeatureManagement: {
      rootNamespace: 'Volo.Abp',
    },
    AbpPermissionManagement: {
      rootNamespace: 'Volo.Abp.PermissionManagement',
    },
    AbpTenantManagement: {
      rootNamespace: 'Volo.Abp.TenantManagement',
    },
    AbpIdentity: {
      rootNamespace: 'Volo.Abp',
    },
    SettingManagement: {
      rootNamespace: 'Volo.Abp.SettingManagement',
    },
  },
} as Environment;
