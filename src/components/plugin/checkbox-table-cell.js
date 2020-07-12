import React from 'react';
import Plugin from '../../core/plugin';
import {Checkbox, TableCell} from '@material-ui/core';
import Template from '../../core/template';
import {DataType} from '../table';
import Action from '../../core/action';
import TemplateConnector from '../../core/template-connector';

const CheckboxTableCell = () => {
  return (
    <Plugin>
      <Template name="tableCell" predicate={({type}) => type === DataType}>
        {(param) => {
          return (
            <TableCell>
              <Checkbox></Checkbox>
              {param.data}
            </TableCell>
          );
        }}
      </Template>
    </Plugin>
  );
};

export default CheckboxTableCell;
