import React, {useEffect, useState, useRef} from 'react';
import {Table, TableProps, Input, InputNumber, Popconfirm, Form, Typography} from 'antd';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import {Rule} from 'rc-field-form/lib/interface';
import {FormInstance} from 'antd/es/form';
import {ColumnsType, ColumnGroupType} from 'antd/es/table';
import {EditableCell} from './EditableCell';

// interface ValidationRules {
//   [s: string]: Rule[];
// }

// interface EditableTableProps<T> {
//   validationRules: ValidationRules;
//   form: FormInstance;
//   columns: any[];
// }
// type EditableTable<T> = TableProps<T> & EditableTableProps<T>;

// function EditableTable<T>({form, columns, ...retProps}: EditableTable<T>) {
//   if (columns) {
//     const mergedColumns = columns.map((col) => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: (record: Payment) => ({
//           record,
//           inputType: col.dataIndex === 'amount' ? 'number' : 'text',
//           dataIndex: col.dataIndex,
//           focusIndex: columns[0].dataIndex,
//           title: col.title,
//           editing: isEditing(record),
//           rules: validationRules[col.dataIndex],
//         }),
//       };
//     });
//   }

//   return (
//     <Form form={form} component={false}>
//       <Table
//         components={{
//           body: {
//             cell: EditableCell,
//           },
//         }}
//         bordered
//         dataSource={data}
//         columns={mergedColumns}
//         rowClassName="editable-row"
//       />
//     </Form>
//   );
// }
