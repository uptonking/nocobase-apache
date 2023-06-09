import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { RemoteSchemaComponent } from '@nocobase/client';

export function RouteSchemaComponent(props: any) {
  const match = useRouteMatch<any>();
  return <RemoteSchemaComponent onlyRenderProperties uid={match.params.name} />;
}
