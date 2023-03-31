import { observer, useField, useFieldSchema } from '@formily/react';
import React, { createContext, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RemoteSchemaComponent, useDesignable } from '@nocobase/client';
import { useSchemaTemplateManager } from './SchemaTemplateManagerProvider';

const BlockTemplateContext = createContext<any>({});

export const useBlockTemplateContext = () => {
  return useContext(BlockTemplateContext);
};

export const BlockTemplate = observer((props: any) => {
  const { templateId } = props;
  const { getTemplateById } = useSchemaTemplateManager();
  const field = useField();
  const fieldSchema = useFieldSchema();
  const { dn } = useDesignable();
  const { t } = useTranslation();
  const template = useMemo(() => getTemplateById(templateId), [templateId]);
  return template ? (
    <BlockTemplateContext.Provider value={{ dn, field, fieldSchema, template }}>
      <RemoteSchemaComponent noForm uid={template?.uid} />
    </BlockTemplateContext.Provider>
  ) : null;
});
