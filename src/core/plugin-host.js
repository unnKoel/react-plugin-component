import React, {createContext, useContext} from 'react';

const pluginHost = () => {
  const plugins = [];

  const regist = (plugin) => {};

  const registGetter = (postion, getter) => {};

  const registAction = (postion, action) => {};

  const get = (name, plugin) => {};

  return {
    regist,
    registGetter,
    registAction,
  };
};

const {PluginHostProvider, usePluginHost, withPluginHost} = (() => {
  const PluginHostContext = createContext(pluginHost());

  const PluginHostProvider = PluginHostContext.Provider;

  const usePluginHost = () => {
    return useContext(PluginHostContext);
  };

  const withPluginHost = (Component) => {
    return (props) => {
      <PluginHostContext.Consumer>
        {(pluginHost) => <Component {...props} pluginHost={pluginHost} />}
      </PluginHostContext.Consumer>;
    };
  };

  return {
    PluginHostProvider,
    usePluginHost,
    withPluginHost,
  };
})();

export {PluginHostProvider, usePluginHost, withPluginHost};
