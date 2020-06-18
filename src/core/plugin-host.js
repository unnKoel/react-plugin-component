import React, {createContext, useContext} from 'react';
import {compareArray} from './utils';

const getPluginPosition = (getPostion) => () => {
  const postion = getPosition();
  return postion.slice(0, postion.length - 1);
};

const pluginHost = () => {
  const plugins = [];
  const subscriptions = new Set();

  const _insertPlugin = (plugins, newPlugin) => {
    let insertIndex = plugins.findIndex(
      (item) => compareArray(newPlugin.getPosition(), item.getPosition()) <= 0
    );

    insertIndex = insertIndex < 0 ? plugins.length : insertIndex;
    const isExist =
      insertIndex >= 0 &&
      insertIndex < plugins.length &&
      compareArray(
        newPlugin.getPosition(),
        plugins[insertIndex].getPosition()
      ) === 0;

    plugins.splice(insertIndex, isExist ? 0 : 1, newPlugin);
  };

  const regist = (plugin) => {
    _insertPlugin(plugin);
  };

  const unregist = (removedPlugin) => {
    const itemIndex = plugins.indexOf(removedPlugin);
    plugins.splice(itemIndex, 1);
  };

  const registGetter = (getter) => {};

  const registAction = (action) => {};

  const registTemplate = (template) => {
    const {getPosition: getTemplatePosition} = template;
    regist({
      ...template,
      getPluginPostion: getPluginPosition(getTemplatePosition),
    });
  };

  const get = (name, type, plugin) => {
    plugins.filter((item) => item.name === name && item.type === type);
  };

  const subscribe = (subscription) => {
    subscriptions.add(subscription);

    return () => {
      subscriptions.delete(subscription);
    };
  };

  const broadcast = (event, message) => {
    this.subscriptions.forEach(
      (subscription) => subscription[event] && subscription[event](message)
    );
  };

  return {
    regist,
    unregist,
    registGetter,
    registAction,
    registTemplate,
    subscribe,
    broadcast,
    get,
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
