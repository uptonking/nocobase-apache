import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  SettingsCenterProvider,
} from '@nocobase/client';
import { Card } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HelloDesigner } from './HelloDesigner';

export const HelloBlockInitializer = (props) => {
  const { insert } = props;
  const { t } = useTranslation();
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<TableOutlined />}
      onClick={() => {
        insert({
          type: 'void',
          'x-component': 'CardItem',
          'x-designer': 'HelloDesigner',
          properties: {
            hello: {
              type: 'void',
              'x-component': 'div',
              'x-content': 'Hello World',
            },
          },
        });
      }}
      title={t('Hello block')}
    />
  );
};

export default React.memo((props) => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;
  children.push({
    key: 'hello',
    type: 'item',
    title: '{{t("Hello block")}}',
    component: 'HelloBlockInitializer',
  });
  return (
    <SettingsCenterProvider
      settings={{
        'sample-hello': {
          title: 'Hello',
          icon: 'ApiOutlined',
          tabs: {
            tab1: {
              title: 'Hello tab',
              component: () => <Card bordered={false}>Hello Settings</Card>,
            },
          },
        },
      }}
    >
      <SchemaComponentOptions components={{ HelloDesigner, HelloBlockInitializer }}>
        <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
      </SchemaComponentOptions>
    </SettingsCenterProvider>
  );
});
