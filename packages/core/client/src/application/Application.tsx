import { Spin } from 'antd';
import { i18n as i18next } from 'i18next';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { ACLProvider, ACLShortcut } from '../acl';
import { AntdConfigProvider } from '../antd-config-provider';
import { APIClient, APIClientProvider } from '../api-client';
import { BlockSchemaComponentProvider } from '../block-provider';
import { CollectionManagerShortcut } from '../collection-manager';
import { RemoteDocumentTitleProvider } from '../document-title';
import { i18n } from '../i18n';
import { PluginManagerProvider } from '../plugin-manager';
import PMProvider, { PluginManagerLink, SettingsCenterDropdown } from '../pm';
import {
  AdminLayout,
  AuthLayout,
  RemoteRouteSwitchProvider,
  RouteSchemaComponent,
  RouteSwitch,
  useRoutes,
} from '../route-switch';
import {
  AntdSchemaComponentProvider,
  DesignableSwitch,
  MenuItemInitializers,
  SchemaComponentProvider,
} from '../schema-component';
import { SchemaInitializerProvider } from '../schema-initializer';
import { BlockTemplateDetails, BlockTemplatePage, SchemaTemplateShortcut } from '../schema-templates';
import { SystemSettingsProvider, SystemSettingsShortcut } from '../system-settings';
import { SigninPage, SignupPage } from '../user';
import { SigninPageExtensionProvider } from '../user/SigninPageExtension';
import { compose } from './compose';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
export interface ApplicationOptions {
  apiClient?: any;
  i18n?: any;
  plugins?: any[];
  dynamicImport?: any;
}

export const getCurrentTimezone = () => {
  const timezoneOffset = new Date().getTimezoneOffset() / -60;
  const timezone = String(timezoneOffset).padStart(2, '0') + ':00';
  return (timezoneOffset > 0 ? '+' : '-') + timezone;
};

export type PluginCallback = () => Promise<any>;

const App = React.memo((props: any) => {
  const C = compose(...props.providers)(() => {
    const routes = useRoutes();
    // console.log(';; routes ', routes)
    return (
      // <div>
      <RouteSwitch routes={routes} />
      // </div>
    );
  });

  return (
    <Router>
      <C />
    </Router>
  );
});

export class Application {
  providers = [];
  mainComponent = null;
  apiClient: APIClient;
  i18n: i18next;
  plugins: PluginCallback[] = [];
  options: ApplicationOptions;

  constructor(options: ApplicationOptions) {
    this.options = options;
    this.apiClient = new APIClient({
      baseURL: process.env.API_BASE_URL,
      headers: {
        'X-Hostname': window?.location?.hostname,
        'X-Timezone': getCurrentTimezone(),
      },
      ...options.apiClient,
    });
    this.i18n = options.i18n || i18n;
    this.use(APIClientProvider, { apiClient: this.apiClient });
    this.use(I18nextProvider, { i18n: this.i18n });
    this.use(AntdConfigProvider, { remoteLocale: true });
    this.use(RemoteRouteSwitchProvider, {
      components: {
        AuthLayout,
        AdminLayout,
        RouteSchemaComponent,
        SigninPage,
        SignupPage,
        BlockTemplatePage,
        BlockTemplateDetails,
      },
    });
    this.use(SystemSettingsProvider);
    this.use(PluginManagerProvider, {
      components: {
        ACLShortcut,
        DesignableSwitch,
        CollectionManagerShortcut,
        SystemSettingsShortcut,
        SchemaTemplateShortcut,
        PluginManagerLink,
        SettingsCenterDropdown,
      },
    });
    this.use(SchemaComponentProvider, { components: { Link, NavLink } });
    this.use(SchemaInitializerProvider, {
      initializers: {
        MenuItemInitializers,
      },
    });
    this.use(BlockSchemaComponentProvider);
    this.use(AntdSchemaComponentProvider);
    this.use(SigninPageExtensionProvider);
    this.use(ACLProvider);
    this.use(RemoteDocumentTitleProvider);
    this.use(PMProvider);
  }

  use(component, props?: any) {
    this.providers.push(props ? [component, props] : component);
  }

  main(mainComponent: any) {
    this.mainComponent = mainComponent;
  }

  /**
   * TODO
   */
  plugin(plugin: PluginCallback) {
    this.plugins.push(plugin);
  }

  render() {
    return (props: any) => {
      const { plugins = [], dynamicImport } = this.options;
      const [loading, setLoading] = useState(false);
      useEffect(() => {
        setLoading(true);
        (async () => {
          const res = await this.apiClient.request({ url: 'app:getPlugins' });
          if (Array.isArray(res.data?.data)) {
            plugins.push(...res.data.data);
          }
          for (const plugin of plugins) {
            const pluginModule = await dynamicImport(plugin);
            this.use(pluginModule.default);
          }
          setLoading(false);
        })();
      }, []);
      if (loading) {
        return <Spin />;
      }
      return <App providers={this.providers} />;
    };
  }
}
