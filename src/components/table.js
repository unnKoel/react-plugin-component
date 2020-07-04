import React, {useState} from 'react';
import PluginableComponent from '../core/pluginable-component';
import Template from '../core/template';
import Position from '../core/position';
import TemplatePlaceholder from '../core/template-placeholder';
import {TableHead, TableCell, TableBody} from '@material-ui/core';

import Getter from '../core/getter';
import TemplateConnector from '../core/template-connector';

const DataType = Symbol('data');

const Table = ({children, rows = [], colMetas = []}) => {
  return (
    <PluginableComponent>
      <Template name="root">
        <Position>
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
              {({rows, colMetas}) => {
                return (
                  <TableBody>
                    {rows.map((row) =>
                      colMetas.map((colMeta) => (
                        <TemplatePlaceholder
                          name="tableCell"
                          param={{data: row[colMeta.field], type: DataType}}
                        ></TemplatePlaceholder>
                      ))
                    )}
                  </TableBody>
                );
              }}
            </TemplateConnector>
          </Template>

          <Template name="tableCell">
            {(param) => <TableCell>{param.name}</TableCell>}
          </Template>

          <Template name="tableCell" predicate={({type}) => type === DataType}>
            {(param) => {
              return <TableCell>{param.data}</TableCell>;
            }}
          </Template>
        </Position>
      </Template>
    </PluginableComponent>
  );
};

export default Table;
