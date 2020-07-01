import React, {useState} from 'react';
import PluginableComponent from '../core/pluginable-component';
import Template from '../core/template';
import TemplatePlaceholder from '../core/template-placeholder';
import {TableHead, TableCell, TableBody} from '@material-ui/core';
import Getter from '../core/getter';
import TemplateConnector from '../core/template-connector';

const Table = ({children, rows = [], colMetas = []}) => {
  return (
    <PluginableComponent>
      <Template name="root">
        <Getter name="rows" value={rows} />
        <Getter name="colMetas" value={colMetas} />
        <TemplatePlaceholder name="tableHeader" />
        <TemplatePlaceholder name="tableBody" />

        <Template name="tableHeader">
          <TemplateConnector>
            {({colMetas}) => (
              <TableHead>
                {colMetas.map((item) => (
                  <TemplatePlaceholder
                    name="tableCell"
                    param={item}
                  ></TemplatePlaceholder>
                ))}
              </TableHead>
            )}
          </TemplateConnector>
        </Template>

        <Template name="tableBody">
          <TemplateConnector>
            {({rows}) => (
              <TableBody>
                {rows.map((item) => (
                  <TemplatePlaceholder
                    name="tableCell"
                    param={item}
                  ></TemplatePlaceholder>
                ))}
              </TableBody>
            )}
          </TemplateConnector>
        </Template>

        <Template name="tableCell">
          {(param) => <TableCell>{param.name}</TableCell>}
        </Template>
      </Template>
    </PluginableComponent>
  );
};

export default Table;
