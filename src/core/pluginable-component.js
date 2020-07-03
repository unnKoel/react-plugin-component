import React from 'react';
import Position from './position';
import TemplatePlaceholder from './template-placeholder';
import {PluginHostProvider} from './plugin-host';

const PluginableComponent = ({children}) => {
  return (
    <PluginHostProvider>
      <Position>{children}</Position>
      <TemplatePlaceholder name="root" />
    </PluginHostProvider>
  );
};

export default PluginableComponent;
