import React from 'react';
import PluginableComponent from '../core/pluginable-component';
import Template from '../core/template';

const Table = ({children}) => {
  return (
    <PluginableComponent>
      <Template name="root">
        {() => {
          return <div>hello world!</div>;
        }}
      </Template>
    </PluginableComponent>
  );
};

export default Table;
