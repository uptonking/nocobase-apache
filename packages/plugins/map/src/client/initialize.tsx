import React from 'react';
import { registerField, registerGroup, useCurrentAppInfo } from '@nocobase/client';
import { generateNTemplate } from './locales';
import './locales';
import { fields } from './fields';
import { useEffect } from 'react';

export const useRegisterInterface = () => {
  const { data } = useCurrentAppInfo() || {};
  useEffect(() => {
    const dialect = data?.database.dialect;
    if (!dialect) return;

    registerGroup(fields[0].group, {
      label: generateNTemplate('Map-based geometry'),
      order: 51,
    });

    fields.forEach((field) => {
      if (Array.isArray(field.dialects)) {
        if (!field.dialects.includes(dialect)) {
          return;
        }
      }
      registerField(field.group, field.title, field);
    });
  }, [data]);
};

export const Initialize: React.FC = (props) => {
  useRegisterInterface();
  return <React.Fragment>{props.children}</React.Fragment>;
};
