import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
  Checkbox
} from '@nextui-org/react';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon'
import { EyeIcon } from './EyeIcon'

const statusColorMap: Record<string, ChipProps['color']>  = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};


interface IColumn {
  uid: string;
  name: string;
}

interface IData {
  [ key: string ]: any;
}

interface ICrudTableProps {
  columns: IColumn[];
  data: IData[];
  onClickView?: ( id : string ) => void;
  onClickEdit?: ( id : string ) => void;
  onToggleStatus?: ( id : string ) => void;
}

export const CrudTable = ( { columns, data, onClickEdit, onClickView, onToggleStatus } : ICrudTableProps ) => {
  type TData = typeof data[ 0 ];
  const renderCell = React.useCallback( ( data: TData, columnKey: React.Key ) => {
    const cellValue = data[ columnKey as keyof TData ];

    switch (columnKey) {
      case "isActive":
        return (
          <Chip className="capitalize" color={ statusColorMap[ ( data.isActive ) ? 'active' : 'paused' ] } size="sm" variant="flat">
            { ( cellValue ) ? 'Activo' : 'Inactivo' }
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver detalles">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={ () => onClickView && onClickView( data.id ) }
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Editar">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={ () => onClickEdit && onClickEdit( data.id ) }
              >
                <EditIcon />
              </span>
            </Tooltip>
            {
              ( data.isActive ) ? (
                <Tooltip color="danger" content="Desactivar">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={ () => onToggleStatus && onToggleStatus( data.id ) }
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip color={ statusColorMap[ data.isActive ? 'active' : 'paused' ] } content="Activar">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" >
                    <Checkbox color="success"
                        onChange={ () => onToggleStatus && onToggleStatus( data.id ) }
                      ></Checkbox>
                  </span>
                </Tooltip>
              )
            }
          </div>
        );
      default:
        return cellValue;
    }
  }, [] );

  return (
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        { ( column ) => (
          <TableColumn key={ column.uid } align={ column.uid === "actions" ? "center" : "start" } className="px-8 py-4">
            { column.name }
          </TableColumn>
        ) }
      </TableHeader>
      <TableBody items={ data }>
        { ( item ) => (
          <TableRow key={ item.id } className="p-8">
            { ( columnKey ) => <TableCell className="px-8 py-8">{ renderCell( item, columnKey ) }</TableCell> }
          </TableRow>
        ) }
      </TableBody>
    </Table>
  );
}
