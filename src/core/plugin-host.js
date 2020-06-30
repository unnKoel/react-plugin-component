import React, {createContext, useContext} from 'react';
import {compareArray} from './utils';

const pluginHost = () => {
  const plugins = [];
  const gettersCache = {};
  const knownKeysCache = {};
  const subscriptions = new Set ();

  const _insertPlugin = newPlugin => {
    let insertIndex = plugins.findIndex (
      item => compareArray (newPlugin.getPosition (), item.getPosition ()) <= 0
    );

    insertIndex = insertIndex < 0 ? plugins.length : insertIndex;
    const isExist =
      insertIndex >= 0 &&
      insertIndex < plugins.length &&
      compareArray (
        newPlugin.getPosition (),
        plugins[insertIndex].getPosition ()
      ) === 0;

    plugins.splice (insertIndex, isExist ? 0 : 1, newPlugin);
  };

  const regist = plugin => {
    _insertPlugin (plugin);
  };

  const unregist = removedPlugin => {
    const itemIndex = plugins.indexOf (removedPlugin);
    plugins.splice (itemIndex, 1);
  };

  const knownKeys = postfix => {
    if (!knownKeysCache[postfix]) {
      knownKeysCache[postfix] = Array.from (
        plugins
          .map (plugin => Object.keys (plugin))
          .map (keys => keys.filter (key => key.endsWith (postfix))[0])
          .filter (key => !!key)
          .reduce ((acc, key) => acc.add (key), new Set ())
      ).map (key => key.replace (postfix, ''));
    }
    return knownKeysCache[postfix];
  };

  const collect = (key, upTo) => {
    if (!gettersCache[key] || !gettersCache[key].length) {
      gettersCache[key] = plugins
        .map (plugin => plugin[key])
        .filter (plugin => !!plugin);
    }
    if (!upTo) return gettersCache[key];

    const upToIndex = plugins.indexOf (upTo);
    return gettersCache[key].filter (getter => {
      const pluginIndex = plugins.findIndex (plugin => plugin[key] === getter);
      return pluginIndex < upToIndex;
    });
  };

  const get = (key, upTo) => {
    const plugins = collect (key, upTo);

    if (!plugins.length) return undefined;

    let result = plugins[0] ();
    plugins.slice (1).forEach (plugin => {
      result = plugin (result);
    });

    return result;
  };

  const subscribe = subscription => {
    subscriptions.add (subscription);

    return () => {
      subscriptions.delete (subscription);
    };
  };

  const broadcast = (event, message) => {
    subscriptions.forEach (
      subscription => subscription[event] && subscription[event] (message)
    );
  };

  return {
    regist,
    unregist,
    subscribe,
    broadcast,
    collect,
    get,
    knownKeys,
  };
};

const {PluginHostProvider, usePluginHost, withPluginHost} = (() => {
  const PluginHostContext = createContext ();

  const PluginHostProvider = ({children}) => (
    <PluginHostContext.Provider value={pluginHost ()}>
      {children}
    </PluginHostContext.Provider>
  );

  const usePluginHost = () => {
    return useContext (PluginHostContext);
  };

  const withPluginHost = Component => {
    return props => (
      <PluginHostContext.Consumer>
        {pluginHost => <Component {...props} pluginHost={pluginHost} />}
      </PluginHostContext.Consumer>
    );
  };

  return {
    PluginHostProvider,
    usePluginHost,
    withPluginHost,
  };
}) ();

export {PluginHostProvider, usePluginHost, withPluginHost};
