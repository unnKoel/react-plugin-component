import React, {useEffect} from 'react';
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
  const pluginHost = usePluginHost();
  const getPosition = usePositionContext();

  useEffect(() => {
    const template = {
      name,
      type: TYPE_TEMPLATE,
      getPosition,
      id: getTemplateId(),
      render: () => children,
    };

    pluginHost.registTemplate(template);
    pluginHost.broadcast(EVENT_TEMPLATE_INIT, name);
  }, []);

  useEffect(() => {
    pluginHost.broadcast(EVENT_TEMPLATE_UPDATE, id);
  });

  return null;
};

export default Template;
