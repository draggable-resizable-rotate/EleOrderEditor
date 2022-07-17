import React, { useCallback, useContext } from 'react';
import { EditorContext } from '../../index';
import { StoreActionType } from '../../store/module';
import { arrowUpIcon, DeleteSvg } from '../../assets/icon';
import StyleModule from './index.module.less';
import { Tooltip } from 'antd';
import { TooltipConfig } from '../../config';

const ModuleOption = () => {
  const { storeState, dispatch, moduleDataIdsOrderByZIndex, moduleDatas } =
    useContext(EditorContext);
  // 获取当前的module根据zIndex排序的id集合

  const { selectModuleDataIds = [], moduleDatasMap } = storeState;

  // 降低所有组件层级
  const getNewZIndexOrderArr = useCallback(() => {
    // 根据已经排序好的ids 获取对应的的 zIndex
    const zIndexOrderArr: number[] = moduleDataIdsOrderByZIndex.map(
      (moduleDataId) => moduleDatasMap[moduleDataId].props.zIndex,
    );
    // 整体降低 zIndexOrderArr 的数值，防止zIndex过高
    const toSubNumber = zIndexOrderArr[0];
    if (toSubNumber >= 2) {
      zIndexOrderArr.forEach((zIndex, index) => {
        zIndexOrderArr[index] = zIndex - toSubNumber + 1;
      });
    }
    return zIndexOrderArr;
  }, [moduleDataIdsOrderByZIndex, moduleDatasMap]);

  // 批量更新 modules 的层级
  // 固定有序的zIndex 数据，重排 componentIds
  const handleUpdateModulesZIndex = useCallback(
    (type: 'up' | 'down') => {
      // 本身没有元素直接返回
      if (moduleDataIdsOrderByZIndex.length === 0) return;
      // 复制一份，不在原来的上面改
      const moduleDataIdsNeedOrder = [...moduleDataIdsOrderByZIndex];
      const selecttModuleDataIdsOrder = [...selectModuleDataIds];
      // 对选中的module的id排序
      selecttModuleDataIdsOrder.sort((firstId, secondId) => {
        const firstIdIndex = moduleDataIdsNeedOrder.indexOf(firstId);
        const secondIdIndex = moduleDataIdsNeedOrder.indexOf(secondId);
        return firstIdIndex - secondIdIndex;
      });
      // 是否需要交换
      if (
        selectModuleDataIds.length !== moduleDataIdsNeedOrder.length ||
        selectModuleDataIds.length !== 0
      ) {
        switch (type) {
          case 'up': {
            // selecttModuleDataIdsOrder 从右边开始换位置
            selecttModuleDataIdsOrder.reverse();
            selecttModuleDataIdsOrder.forEach((currentId) => {
              // 找到当前 id 在已经排好序的ids里的位置
              const currentIdIndex = moduleDataIdsNeedOrder.indexOf(currentId);
              const nextIndex = currentIdIndex + 1;
              // 最上层，已经无法再上一层
              if (nextIndex >= moduleDataIdsNeedOrder.length) return;
              const nextId = moduleDataIdsNeedOrder[nextIndex];
              // 选择元素不允许相互交换
              if (selecttModuleDataIdsOrder.includes(nextId)) return;
              // 交换 ids 顺序
              moduleDataIdsNeedOrder[currentIdIndex] = nextId;
              moduleDataIdsNeedOrder[nextIndex] = currentId;
            });
            break;
          }
          case 'down': {
            selecttModuleDataIdsOrder.forEach((currentId) => {
              // 找到当前 id 在已经排好序的ids里的位置
              const currentIdIndex = moduleDataIdsNeedOrder.indexOf(currentId);
              const lastIndex = currentIdIndex - 1;
              // 最下层，已经无法再上一层
              if (lastIndex < 0) return;
              const lastId = moduleDataIdsNeedOrder[lastIndex];
              // 选择元素不允许相互交换
              if (selecttModuleDataIdsOrder.includes(lastId)) return;
              // lastComponentId 给当前的
              moduleDataIdsNeedOrder[currentIdIndex] = lastId;
              moduleDataIdsNeedOrder[lastIndex] = currentId;
            });
            break;
          }
        }
      }

      // 整体降低 zIndexOrderArr 的数值，防止zIndex过高
      const zIndexOrderArr = getNewZIndexOrderArr();
      dispatch({
        type: StoreActionType.UpdateModuleDatas,
        payload: {
          moduleDatas: moduleDataIdsNeedOrder.map((moduleDataId, index) => ({
            id: moduleDataId,
            props: {
              zIndex: zIndexOrderArr[index],
            },
          })),
          merge: true,
        },
      });
    },
    [dispatch, getNewZIndexOrderArr, moduleDataIdsOrderByZIndex, selectModuleDataIds],
  );

  function deleteModule() {
    // 整体降低 zIndexOrderArr 的数值，防止zIndex过高
    const zIndexOrderArr = getNewZIndexOrderArr();
    dispatch({
      type: StoreActionType.UpdateModuleDatas,
      payload: {
        moduleDatas: moduleDataIdsOrderByZIndex.map((moduleDataId, index) => ({
          id: moduleDataId,
          props: {
            zIndex: zIndexOrderArr[index],
          },
        })),
        merge: true,
      },
    });
    // 再删除所有选中组件
    dispatch({
      type: StoreActionType.DeleteModuleDatas,
      payload: {
        moduleDataIds: selectModuleDataIds,
      },
    });
  }
  let needUp = true;
  let needDown = true;
  if (selectModuleDataIds.length === moduleDatas.length) {
    needUp = false;
    needDown = false;
  } else if (selectModuleDataIds.length === 1) {
    if (
      selectModuleDataIds[0] === moduleDataIdsOrderByZIndex[moduleDataIdsOrderByZIndex.length - 1]
    ) {
      needUp = false;
    }
    if (selectModuleDataIds[0] === moduleDataIdsOrderByZIndex[0]) {
      needDown = false;
    }
  }

  return (
    <div
      className={StyleModule['module-option']}
      style={{ display: selectModuleDataIds?.length ? 'flex' : 'none' }}
    >
      <Tooltip title="上移" placement="right" {...TooltipConfig}>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopPropagation();
            handleUpdateModulesZIndex('up');
          }}
          style={{
            // eslint-disable-next-line no-nested-ternary
            opacity: needUp ? 1 : 0.5,
            cursor: needUp ? 'pointer' : 'not-allowed',
          }}
        >
          {arrowUpIcon}
        </div>
      </Tooltip>

      <Tooltip title="下移" placement="right" {...TooltipConfig}>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopPropagation();
            handleUpdateModulesZIndex('down');
          }}
          style={{
            // eslint-disable-next-line no-nested-ternary
            opacity: needDown ? 1 : 0.5,
            cursor: needDown ? 'pointer' : 'not-allowed',
          }}
        >
          {arrowUpIcon}
        </div>
      </Tooltip>

      <Tooltip title="删除" placement="right" {...TooltipConfig}>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopPropagation();
            deleteModule();
          }}
        >
          <DeleteSvg />
        </div>
      </Tooltip>
    </div>
  );
};

export default React.memo(ModuleOption);
