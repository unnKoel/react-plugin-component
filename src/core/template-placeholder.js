import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef,
} from 'react';
import {EVENT_TEMPLATE_INIT, EVENT_TEMPLATE_UPDATE} from './constants';
import {usePluginHost} from './plugin-host';

const TemplateContext = createContext ({});

const TemplatePlaceholder = ({children: templatePlaceholder, ...props}) => {
  const template = useRef (null);
  const [, forceUpdate] = useReducer (x => x + 1, 0);
  const templateHost = useContext (TemplateContext);
  const pluginHost = usePluginHost ();

  useEffect (
    () => {
      pluginHost.subscribe ({
        [EVENT_TEMPLATE_INIT]: name => {
          props.name === name && forceUpdate ();
        },
        [EVENT_TEMPLATE_UPDATE]: id => {
          template.current && template.current.id === id && forceUpdate ();
        },
      });
    },
    [pluginHost, props.name]
  );

  const findTemplate = props => {
    const {name, param} = props;
    if (name) {
      const templates = pluginHost.collect (name);
      return {
        templates: templates.reverse (),
        param,
      };
    }

    return {
      templates: templateHost.templates (),
      param: param || templateHost.param (),
    };
  };

  const {templates, param} = findTemplate (props);
  template.current = templates[0];
  const restTemplates = templates.slice (1);

  let templateContent = null;
  if (template.current) {
    const {render} = template.current;
    templateContent = render () || null;
    if (templateContent && typeof templateContent === 'function') {
      templateContent = templateContent (param);
    }
  }

  return (
    <TemplateContext.Provider
      value={{
        templates: restTemplates,
        param,
      }}
    >
      {templatePlaceholder
        ? templatePlaceholder (templateContent)
        : templateContent}
    </TemplateContext.Provider>
  );
};

export default TemplatePlaceholder;
