import {useEffect, useRef, useLayoutEffect} from 'react';
import {usePluginHost} from './plugin-host';
import {usePositionContext} from './position';
import {EVENT_TEMPLATE_INIT, EVENT_TEMPLATE_UPDATE} from './constants';

let templateId = 0;
const getTemplateId = () => {
  return templateId++;
};

const Template = ({children, name, predicate}) => {
  const likeThis = useRef(null);
  const pluginHost = usePluginHost();
  const getPosition = usePositionContext();

  useLayoutEffect(() => {
    likeThis.current = getTemplateId();

    const template = {
      position: () => getPosition(),
      [`${name}Template`]: {
        id: likeThis.current,
        predicate: (params) => (predicate ? predicate(params) : true),
        render: () => children,
      },
    };

    pluginHost.regist(template);
    pluginHost.broadcast(EVENT_TEMPLATE_INIT, name);
  }, [children, getPosition, name, pluginHost, predicate]);

  useEffect(() => {
    likeThis.current &&
      pluginHost.broadcast(EVENT_TEMPLATE_UPDATE, likeThis.current);
  });

  return null;
};

export default Template;
