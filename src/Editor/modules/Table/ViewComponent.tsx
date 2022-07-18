import React, { useContext, useRef } from 'react';
import { EditorContext } from '../../index';
import Resizable, { ResizableDelta } from '@draggable-resizable-rotate/react-resizable-pro';
import styleModule from './index.less';
import { TableModuleCol, TableModuleData } from './moduleClass';
import { StoreActionType } from '@/Editor/store/module';

export interface TableViewProps {
  moduleData: TableModuleData;
}
// 需要注意的是，re-resizable 是 记录点击down时的位置， 再记录up对比，所有move的中间过程的值都是相对于 原始的 down 的数据
const TableView: React.FC<TableViewProps> = ({ moduleData }) => {
  const { dispatch } = useContext(EditorContext);

  const moduleDataProps = moduleData.props;
  const { cols, width, height } = moduleDataProps;

  const timeRef = useRef<any>();
  const memoryData = useRef<any>();

  // 通过 colIndex 和 对应数据的变化 进行更新
  function handleCalculateByTd(delta: ResizableDelta, colIndex: number) {
    timeRef.current && cancelAnimationFrame(timeRef.current);

    timeRef.current = requestAnimationFrame(() => {
      // 新的 位置 和 大小
      const { position, size } = delta;
      Object.assign(size, {
        width: size.width,
        height: size.height,
      });

      Object.assign(position, {
        left: position.left,
        top: position.top,
      });
      const memoryProps = memoryData.current;
      const memoryCols = memoryProps.cols as TableModuleCol[];
      // 主要是width的分配不一样
      const newCols = memoryCols.reduce((prev: TableModuleCol[], oldCol, index) => {
        const newCol = { ...oldCol, height: size.height };
        // 上下左右
        if (index === colIndex) {
          newCol.width = size.width;
        }
        prev.push(newCol);
        return prev;
      }, []);

      const newPosition = {
        left: position.left + memoryData.current.left,
        top: position.top + memoryData.current.top,
      };
      const newSize = {
        width: 0,
        height: 0,
      };

      newCols.reduce((prev, current) => {
        Object.assign(prev, {
          height: current.height * rows.length,
          width: prev.width + current.width,
        });
        return prev;
      }, newSize);

      dispatch?.({
        type: StoreActionType.UpdateModuleDataList,
        payload: {
          components: [
            {
              id: moduleData.id,
              props: {
                ...newSize,
                ...newPosition,
                cols: newCols,
              },
            },
          ],
          assign: true,
        },
      });
    });
  }

  function handleCalculateByTable(delta: ResizableDelta) {
    timeRef.current && cancelAnimationFrame(timeRef.current);

    timeRef.current = requestAnimationFrame(() => {
      // 新的 位置 和 大小
      const { position, size } = delta;

      const newPosition = {
        left: position.left + memoryData.current.left,
        top: position.top + memoryData.current.top,
      };

      const changeWidth = size.width - moduleDataProps.width;
      const changeHeight = size.height - moduleDataProps.height;

      const newCols = moduleDataProps.cols.map((col) => {
        const newCol = { ...col };
        newCol.width = col.width + (col.width / moduleDataProps.width) * changeWidth;
        newCol.height = col.height + (col.height / moduleDataProps.height) * changeHeight;
        return newCol;
      });

      dispatch?.({
        type: StoreActionType.UpdateModuleDataList,
        payload: {
          moduleDataList: [
            {
              id: moduleData.id,
              props: {
                ...newPosition,
                ...size,
                cols: newCols,
              },
            },
          ],
          merge: true,
        },
      });
    });
  }

  // 禁止编辑就是打印项，打印项默认只有一行
  const rows = [1, 2];

  if (!cols.length) return null;

  return (
    <Resizable
      minWidth={1}
      minHeight={1}
      position={{
        left: 0,
        top: 0,
      }}
      size={{
        width,
        height,
      }}
      onResizeStart={(event) => {
        event.stopPropagation();
        event.nativeEvent.stopPropagation();
        memoryData.current = { ...moduleDataProps };
      }}
      onResize={(event, direction, delta) => {
        handleCalculateByTable(delta);
      }}
      style={{
        backgroundColor: '#fff',
      }}
      // 强制 Resizable 不动
      transform="translate(0, 0)"
      // 四角拖动
      enable={{
        topRight: true,
        topLeft: true,
        bottomLeft: true,
        bottomRight: true,
      }}
      handleStyles={{
        topRight: {
          zIndex: 999,
        },
        bottomRight: {
          zIndex: 999,
        },
        bottomLeft: {
          zIndex: 999,
        },
        topLeft: {
          zIndex: 999,
        },
      }}
    >
      <table style={{ width, height }} className={styleModule.table}>
        <tbody>
          {rows.map((row, currentRow) => (
            <tr key={currentRow}>
              {cols.map((col: TableModuleCol, currentCol) => {
                const { width, height, alias } = col;
                const trueWidth = width;
                const trueHeight = height;
                const showLeft = currentCol === 0;
                const showTop = currentRow === 0;
                const defaultValue = `第${currentCol + 1}列${currentRow !== 0 ? '数据' : ''}`;
                const defaultAlias = alias && `${alias}${currentRow !== 0 ? '数据' : ''}`;
                const textVal = `${defaultAlias || defaultValue}`;
                return (
                  <td
                    key={currentCol}
                    style={{
                      position: 'relative',
                      padding: 0,
                      zIndex: rows.length - currentRow + cols.length - currentCol,
                    }}
                  >
                    <Resizable
                      // style={{
                      //   borderColor: '#000',
                      //   borderStyle: 'solid',
                      //   borderWidth: `${showTop ? 1 : 0}px 1px 1px ${showLeft ? 1 : 0}px`,
                      // }}
                      // 强制 Resizable 不动
                      transform="translate(0, 0)"
                      position={{
                        left: 0,
                        top: 0,
                      }}
                      size={{
                        width: trueWidth,
                        height: trueHeight,
                      }}
                      minWidth={10}
                      minHeight={10}
                      enable={{
                        top: showTop,
                        right: true,
                        bottom: true,
                        left: showLeft,
                      }}
                      onResizeStart={(event) => {
                        event.stopPropagation();
                        event.nativeEvent.stopPropagation();
                        memoryData.current = { ...moduleDataProps };
                      }}
                      onResize={(event, direction, delta) => {
                        handleCalculateByTd(delta, currentCol);
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                        }}
                        className="text-box"
                      >
                        <span>{textVal}</span>
                      </div>
                    </Resizable>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Resizable>
  );
};

export default TableView;
