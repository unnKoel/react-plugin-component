import React, {useEffect} from 'react';
import Position from './position';
import {usePluginHost} from './plugin-host';
import {usePositionContext} from './position';

const Plugin = ({children, name}) => {
  const pluginHost = usePluginHost ();
  const getPosition = usePositionContext ();

  useEffect (
    () => {
      const plugin = {
        position: () => getPosition (),
        name,
      };

      pluginHost.regist (plugin);

      return () => {
        pluginHost.unregist (plugin);
      };
    },
    [getPosition, name, pluginHost]
  );

  return <Position>{children}</Position>;
};

export default Plugin;
