import {useEffect, useRef} from 'react';
import {usePluginHost} from './plugin-host';
import {usePositionContext} from './position';
import {
  TYPE_TEMPLATE,
  EVENT_TEMPLATE_INIT,
  EVENT_TEMPLATE_UPDATE,
} from './constants';

let templateId = 0;
const getTemplateId = () => {
  return templateId++;
};

const Template = ({children, name}) => {
  const likeThis = useRef (null);
  const pluginHost = usePluginHost ();
  const getPosition = usePositionContext ();

  useEffect (
    () => {
      likeThis.current = getTemplateId ();

      const template = {
        getPosition,
        name,
        type: TYPE_TEMPLATE,
        id: likeThis.current,
        render: () => children,
      };

      pluginHost.registTemplate (template);
      pluginHost.broadcast (EVENT_TEMPLATE_INIT, name);
    },
    [children, getPosition, name, pluginHost]
  );

  useEffect (() => {
    likeThis.current &&
      pluginHost.broadcast (EVENT_TEMPLATE_UPDATE, likeThis.current);
  });

  return null;
};

export default Template;
