import {useEffect, useRef, useReducer} from 'react';
import {usePluginHost} from './plugin-host';
import {
  getAvailableGetters,
  getAvailableActions,
  isTrackedDependenciesChanged,
} from './helper';
import {EVENT_GETTER_UPDADE} from './constants';

const TemplateConnector = ({children}) => {
  const pluginHost = usePluginHost ();
  const prevTrackedDependencies = useRef ({});
  const [, forceUpdate] = useReducer (x => x + 1, 0);

  useEffect (
    () => {
      return pluginHost.subscribe ({
        [EVENT_GETTER_UPDADE]: () => {
          if (
            isTrackedDependenciesChanged (
              pluginHost,
              prevTrackedDependencies.current
            )
          ) {
            forceUpdate ();
          }
        },
      });
    },
    [pluginHost]
  );

  const {getters, trackedDependencies} = getAvailableGetters (pluginHost);
  prevTrackedDependencies.current = trackedDependencies;
  const actions = getAvailableActions (pluginHost);

  return children (getters, actions);
};

export default TemplateConnector;
