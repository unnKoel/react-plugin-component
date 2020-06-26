import {useEffect} from 'react';
import {usePluginHost} from './plugin-host';
import {usePositionContext} from './position';
import {getAvailableGetters, getAvailableActions} from './helper';

const Action = ({name, action}) => {
  const pluginHost = usePluginHost ();
  const getPosition = usePositionContext ();

  useEffect (
    () => {
      const action = {
        position: () => getPosition (),
        [`${name}Action`]: params => {
          const {getters} = getAvailableGetters (pluginHost, getterName =>
            pluginHost.get (`${getterName}Getter`, action)
          );
          let nextParams = params;
          const actions = getAvailableActions (
            pluginHost,
            actionName =>
              actionName === name
                ? newParams => {
                    nextParams = newParams;
                  }
                : pluginHost
                    .collect (`${actionName}Action`, action)
                    .slice ()
                    .reverse ()[0]
          );
          action (params, getters, actions);
          const nextAction = pluginHost
            .collect (`${name}Action`, action)
            .slice ()
            .reverse ()[0];
          if (nextAction) {
            nextAction (nextParams);
          }
        },
      };

      pluginHost.regist (action);

      return () => pluginHost.unregist (action);
    },
    [getPosition, name, pluginHost]
  );
};

export default Action;
