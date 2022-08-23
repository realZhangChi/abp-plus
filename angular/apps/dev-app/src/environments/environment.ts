import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  hmr: false,
  application: {
    baseUrl,
    name: 'DevApp',
    logoUrl: 'https://ng.ant.design/assets/img/logo.svg',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44372/',
    clientId: 'DevApp_App',
    scope: 'offline_access DevApp',
    responseType: 'code',
    redirectUri: baseUrl,
  },
  apis: {
    default: {
      url: 'https://localhost:44372',
      rootNamespace: 'DevApp',
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
