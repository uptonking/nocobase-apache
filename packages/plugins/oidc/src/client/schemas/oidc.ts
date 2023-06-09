import { ISchema } from '@formily/react';
import { useActionContext, useRequest } from '@nocobase/client';
import { IDTOKEN_SIGN_ALG } from '../../server/shared/types';

const collection = {
  name: 'oidcProviders',
  fields: [
    {
      type: 'string',
      name: 'title',
      interface: 'input',
      uiSchema: {
        title: '{{t("Provider name")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'clientId',
      interface: 'input',
      uiSchema: {
        title: '{{t("Client id")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'clientSecret',
      interface: 'input',
      uiSchema: {
        title: '{{t("Client secret")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'issuer',
      interface: 'input',
      uiSchema: {
        title: '{{t("Issuer")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'openidConfiguration',
      interface: 'input',
      uiSchema: {
        title: '{{t("Openid configuration")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'authorizeUrl',
      interface: 'input',
      uiSchema: {
        title: '{{t("Authorization endpoint")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'tokenUrl',
      interface: 'input',
      uiSchema: {
        title: '{{t("Access token endpoint")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'jwksUrl',
      interface: 'input',
      uiSchema: {
        title: '{{t("JWKS endpoint")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'userinfoUrl',
      interface: 'input',
      uiSchema: {
        title: '{{t("Userinfo endpoint")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'logoutUrl',
      interface: 'input',
      uiSchema: {
        title: '{{t("Logout endpoint")}}',
        type: 'string',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'idTokenSignAlg',
      interface: 'select',
      uiSchema: {
        title: '{{ t("Id token sign alg") }}',
        type: 'string',
        'x-component': 'Select',
        'x-component-props': {
          showSearch: false,
          filterSort: false,
          options: [
            {
              label: IDTOKEN_SIGN_ALG.RS256,
              value: IDTOKEN_SIGN_ALG.RS256,
            },
            {
              label: IDTOKEN_SIGN_ALG.HS256,
              value: IDTOKEN_SIGN_ALG.HS256,
            },
          ],
        },
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'redirectUrl',
      interface: 'input',
      uiSchema: {
        title: '{{t("Redirect url")}}',
        type: 'string',
        'x-component': 'RedirectURLInput',
      } as ISchema,
    },
    {
      type: 'boolean',
      name: 'enabled',
      interface: 'boolean',
      uiSchema: {
        title: '{{t("Enable")}}',
        type: 'boolean',
        'x-component': 'Checkbox',
      } as ISchema,
    },
  ],
};

export const formProperties = {
  title: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
    description: '{{t("Sign in button name, which will be displayed on the sign in page")}}',
  },
  clientId: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  clientSecret: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  issuer: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  openidConfiguration: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  authorizeUrl: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  tokenUrl: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  jwksUrl: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  userinfoUrl: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  logoutUrl: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  idTokenSignAlg: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  redirectUrl: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
  },
  enabled: {
    'x-component': 'CollectionField',
    'x-decorator': 'FormItem',
    title: '',
    'x-content': '{{t("Enable")}}',
  },
};

export const oidcSchema: ISchema = {
  type: 'object',
  properties: {
    block1: {
      type: 'void',
      'x-decorator': 'ResourceActionProvider',
      'x-decorator-props': {
        collection,
        resourceName: 'oidcProviders',
        request: {
          resource: 'oidcProviders',
          action: 'list',
          params: {
            pageSize: 50,
            sort: ['id'],
            appends: [],
          },
        },
      },
      'x-component': 'CollectionProvider',
      'x-component-props': {
        collection,
      },
      properties: {
        actions: {
          type: 'void',
          'x-component': 'ActionBar',
          'x-component-props': {
            style: {
              marginBottom: 16,
            },
          },
          properties: {
            delete: {
              type: 'void',
              title: '{{ t("Delete") }}',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ cm.useBulkDestroyAction }}',
                confirm: {
                  title: "{{t('Delete provider')}}",
                  content: "{{t('Are you sure you want to delete it?')}}",
                },
              },
            },
            create: {
              type: 'void',
              title: '{{t("Add provider")}}',
              'x-component': 'Action',
              'x-component-props': {
                type: 'primary',
              },
              properties: {
                drawer: {
                  type: 'void',
                  'x-component': 'Action.Drawer',
                  'x-decorator': 'Form',
                  'x-decorator-props': {
                    useValues(options) {
                      const ctx = useActionContext();
                      // 初始化数据
                      return useRequest(
                        () =>
                          Promise.resolve({
                            data: {
                              enable: true,
                              idTokenSignAlg: IDTOKEN_SIGN_ALG.RS256,
                            },
                          }),
                        { ...options, refreshDeps: [ctx.visible] },
                      );
                    },
                  },
                  title: '{{t("Add provider")}}',
                  properties: {
                    ...formProperties,
                    footer: {
                      type: 'void',
                      'x-component': 'Action.Drawer.Footer',
                      properties: {
                        cancel: {
                          title: '{{t("Cancel")}}',
                          'x-component': 'Action',
                          'x-component-props': {
                            useAction: '{{ cm.useCancelAction }}',
                          },
                        },
                        submit: {
                          title: '{{t("Submit")}}',
                          'x-component': 'Action',
                          'x-component-props': {
                            type: 'primary',
                            useAction: '{{ cm.useCreateAction }}',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        table: {
          type: 'void',
          'x-uid': 'input',
          'x-component': 'Table.Void',
          'x-component-props': {
            rowKey: 'id',
            rowSelection: {
              type: 'checkbox',
            },
            useDataSource: '{{ cm.useDataSourceFromRAC }}',
          },
          properties: {
            column1: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                title: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            column2: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                redirectUrl: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            column3: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                enabled: {
                  type: 'boolean',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            column4: {
              type: 'void',
              title: '{{t("Actions")}}',
              'x-component': 'Table.Column',
              properties: {
                actions: {
                  type: 'void',
                  'x-component': 'Space',
                  'x-component-props': {
                    split: '|',
                  },
                  properties: {
                    update: {
                      type: 'void',
                      title: '{{t("Edit")}}',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        type: 'primary',
                      },
                      properties: {
                        drawer: {
                          type: 'void',
                          'x-component': 'Action.Drawer',
                          'x-decorator': 'Form',
                          'x-decorator-props': {
                            useValues: '{{ cm.useValuesFromRecord }}',
                          },
                          title: '{{t("Edit provider")}}',
                          properties: {
                            ...formProperties,
                            footer: {
                              type: 'void',
                              'x-component': 'Action.Drawer.Footer',
                              properties: {
                                cancel: {
                                  title: '{{t("Cancel")}}',
                                  'x-component': 'Action',
                                  'x-component-props': {
                                    useAction: '{{ cm.useCancelAction }}',
                                  },
                                },
                                submit: {
                                  title: '{{t("Submit")}}',
                                  'x-component': 'Action',
                                  'x-component-props': {
                                    type: 'primary',
                                    useAction: '{{ cm.useUpdateAction }}',
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    delete: {
                      type: 'void',
                      title: '{{ t("Delete") }}',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        confirm: {
                          title: "{{t('Delete role')}}",
                          content: "{{t('Are you sure you want to delete it?')}}",
                        },
                        useAction: '{{cm.useDestroyAction}}',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
