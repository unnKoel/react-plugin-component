import {useEffect, useRef} from 'react';
import {usePluginHost} from './plugin-host';
import {usePositionContext} from './position';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from './helper';

const Getter = ({name, value, computed}) => {
  const pluginHost = usePluginHost ();
  const getPosition = usePositionContext ();
  const lastComputed = useRef (undefined);
  const lastTrackedDependencies = useRef ({});
  const lastResult = useRef (undefined);

  useEffect (
    () => {
      const getter = {
        position: () => getPosition (),
        [`${name}Getter`]: original => {
          if (computed === undefined) return value;

          const getGetterValue = getterName =>
            getterName === name
              ? original
              : pluginHost.get (`${getterName}Getter`, getter);

          if (
            computed === lastComputed.current &&
            !isTrackedDependenciesChanged (
              pluginHost,
              lastTrackedDependencies.current,
              getGetterValue
            )
          ) {
            return lastResult.current;
          }

          const {getters, trackedDependencies} = getAvailableGetters (
            pluginHost,
            getGetterValue
          );
          const actions = getAvailableActions (pluginHost);

          lastComputed.current = computed;
          lastTrackedDependencies.current = trackedDependencies;
          lastResult.current = computed (getters, actions);
          return lastResult.current;
        },
      };

      pluginHost.regist (getter);

      return () => pluginHost.unregist (getter);
    },
    [computed, getPosition, name, pluginHost, value]
  );

  return null;
};

export default Getter;
