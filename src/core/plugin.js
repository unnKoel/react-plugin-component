import React from 'react';
import Position from './position';
import {usePluginHost} from './plugin-host';
import {usePositionContext} from './position';
import {TYPE_PLUGIN} from './constants';

const Plugin = ({children, name}) => {
  const pluginHost = usePluginHost();
  const getPosition = usePositionContext();

  useEffect(() => {
    const plugin = {
      getPosition,
      name,
      type: TYPE_PLUGIN,
    };

    pluginHost.regist(plugin);

    return () => {
      pluginHost.unregist(plugin);
    };
  }, []);

  return <Position>{children}</Position>;
};

export default Plugin;
