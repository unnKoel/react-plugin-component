import React, {useEffect} from 'react';
import {TYPE_TEMPLATE} from './constants';
import {usePluginHost} from './plugin-host';

const TemplatePlaceholder = ({children, name, param}) => {
  const pluginHost = usePluginHost();

  const findTemplate = (param, name) => {
    const templates = pluginHost.get(name, TYPE_TEMPLATE);
    
  };

  const {template, param} = findTemplate(param, name);
};

export default TemplatePlaceholder;
