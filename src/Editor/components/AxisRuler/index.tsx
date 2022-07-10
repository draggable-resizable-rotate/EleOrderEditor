import React, { useMemo, useRef, useState } from 'react';
import { DeleteSvg } from '../../assets/icon';
import { uniqueId } from '../../utils/uniqueId';
import Ruler from './Ruler';
import StyleModule from './style.module.less';
import Draggable from '@draggable-resizable-rotate/react-draggable-pro';
import { ElementRect } from '@draggable-resizable-rotate/graphics';

export interface AxisRulerRef {
  redraw?: () => void;
}

export type AxisRulerRect = Pick<ElementRect, 'left' | 'top' | 'height' | 'width'>;

interface AxisRulerProps {
  outerRect: AxisRulerRect;
  innerRect: AxisRulerRect;
}

enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

interface Line {
  id: string;
  position: number;
  direction: Direction;
}

type LineCollection = {
  [Direction.Horizontal]: Line[];
  [Direction.Vertical]: Line[];
  activeLine?: Line;
};

const AxisRuler: React.FC<AxisRulerProps> = ({ outerRect, innerRect }) => {
  // 参考线
  const [lineCollection, setLineCollection] = useState<LineCollection>({
    [Direction.Horizontal]: [],
    [Direction.Vertical]: [],
  });

  // 动画帧存储
  const timerMoveRef = useRef<any>();

  // 计算对应的 ruler 规则
  const { vRuler, hRuler } = useMemo(() => {
    const startX = outerRect.left - innerRect.left + 20;
    const startY = outerRect.top - innerRect.top + 20;

    return {
      vRuler: {
        id: uniqueId(),
        width: outerRect.height - 20,
        start: startY,
      },
      hRuler: {
        id: uniqueId(),
        width: outerRect.width - 20,
        start: startX,
      },
    };
  }, [innerRect, outerRect]);

  // 鼠标移动 => 显示的 活动参考线
  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: Direction,
  ) {
    // 清除上次的动画帧
    timerMoveRef?.current && cancelAnimationFrame(timerMoveRef?.current);
    // 计算活动参考线的位置
    const position =
      direction === Direction.Horizontal
        ? event.clientX - outerRect.left - 20
        : event.clientY - outerRect.top - 20;
    // 设置活动参考线
    timerMoveRef.current = requestAnimationFrame(() => {
      setLineCollection((config) => ({
        ...config,
        activeLine: {
          id: uniqueId(),
          position,
          direction,
        },
      }));
    });
    // 生成的活动参考线必须放在 当前方法监听的元素内部，不然鼠标停在活动参考线上，就触发了当前元素的 mouseleave
  }

  // 鼠标移出，取消活动参考线
  function handleMouseLeave() {
    // 需要套requestAnimationFrame，因为要保证在move后执行
    requestAnimationFrame(() => {
      setLineCollection((config) => ({
        ...config,
        activeLine: undefined,
      }));
    });
  }

  // 点击之后，添加参考线
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, direction: Direction) {
    if (!outerRect) return;
    const position =
      direction === Direction.Horizontal
        ? event.clientX - outerRect.left - 20
        : event.clientY - outerRect.top - 20;
    setLineCollection((config) => ({
      ...config,
      [direction]: [
        ...config[direction],
        {
          id: uniqueId(),
          position,
        },
      ],
    }));
  }

  // 删除参考线
  function handleDeleteReferenceLine(id: string, direction: Direction) {
    setLineCollection((config) => ({
      ...config,
      [direction]: config[direction].filter((item) => item.id !== id),
    }));
  }

  // 拖动参考线
  function handleDragReferenceLine(id: string, direction: Direction, position: number) {
    setLineCollection((config) => ({
      ...config,
      [direction]: [
        ...config[direction].filter((item) => item.id !== id),
        {
          id,
          position,
        },
      ],
    }));
  }

  return (
    <div className={StyleModule['axis-ruler']}>
      <div className="square"></div>
      <div
        className="h-ruler"
        style={{ height: 20 }}
        onMouseMove={(event) => handleMouseMove(event, Direction.Horizontal)}
        onMouseLeave={handleMouseLeave}
        onClick={(event) => handleClick(event, Direction.Horizontal)}
      >
        <Ruler
          ruler={{
            width: hRuler.width,
            height: 20,
            direction: 'x',
          }}
          id={hRuler.id}
          bar={{
            width: 1,
            stepHight: 10,
            spaceHeight: 20,
            rectColor: '#E7E8E8',
            fontStyle: {
              fontSize: 10,
              color: '#2B2B2B',
            },
          }}
          show={{
            step: 1,
            stepScale: 10,
            start: hRuler.start,
            end: hRuler.width + hRuler.start,
          }}
        />
        {/* x active 线 start */}
        {lineCollection.activeLine?.direction === Direction.Horizontal &&
          (() => {
            const { position } = lineCollection.activeLine;
            return (
              <div
                className="h-active-line"
                style={{
                  height: outerRect?.height,
                  left: position,
                }}
              >
                <span className="active-line-att">{(position + hRuler.start).toFixed(0)}</span>
              </div>
            );
          })()}
        {/* x active 线 end */}
      </div>
      <div
        className="v-ruler"
        onMouseMove={(event) => handleMouseMove(event, Direction.Vertical)}
        onMouseLeave={handleMouseLeave}
        onClick={(event) => handleClick(event, Direction.Vertical)}
      >
        <Ruler
          ruler={{
            width: 20,
            height: vRuler.width,
            direction: 'y',
          }}
          id={vRuler.id}
          bar={{
            width: 1,
            stepHight: 10,
            spaceHeight: 20,
            rectColor: '#E7E8E8',
            fontStyle: {
              fontSize: 10,
              color: '#2B2B2B',
            },
          }}
          show={{
            step: 1,
            stepScale: 10,
            start: vRuler.start,
            end: vRuler.width + vRuler.start,
          }}
        />
        {/* y active 线 start */}
        {lineCollection.activeLine?.direction === Direction.Vertical &&
          (() => {
            const { position } = lineCollection.activeLine;
            return (
              <div
                className="v-active-line"
                style={{
                  width: outerRect?.width,
                  top: position,
                }}
              >
                <span className="active-line-att">{(position + vRuler.start).toFixed(0)}</span>
              </div>
            );
          })()}
        {/* y active 线 end */}
      </div>
      <div className="h-line-box">
        {lineCollection[Direction.Horizontal].map((item) => (
          <Draggable
            key={item.id}
            axis="x"
            bounds="parent"
            position={{
              left: item.position,
              top: 0,
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
              event.nativeEvent.stopPropagation();
            }}
            onMouseMove={(event, delta, position) => {
              handleDragReferenceLine(item.id, Direction.Horizontal, position.left);
            }}
          >
            <div
              className={`${StyleModule['react-draggable']} line`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 1000,
                width: 1,
                height: outerRect?.height as number,
              }}
            >
              <div className="action">
                <span className="line-att">{(item.position + hRuler.start).toFixed(0)}</span>
                <span className="line-delete-box">
                  <DeleteSvg
                    {...{
                      width: 12,
                      height: 12,
                      className: 'line-delete',
                      onClick: () => handleDeleteReferenceLine(item.id, Direction.Horizontal),
                    }}
                  />
                </span>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
      <div className="v-line-box">
        {lineCollection[Direction.Vertical].map((item) => (
          <Draggable
            key={item.id}
            axis="y"
            bounds="parent"
            position={{
              left: 0,
              top: item.position,
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
              event.nativeEvent.stopPropagation();
            }}
            onMouseMove={(event, delta, position) => {
              handleDragReferenceLine(item.id, Direction.Vertical, position.top);
            }}
          >
            <div
              className={`${StyleModule['react-draggable']} line`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 1000,
                height: 1,
                width: outerRect?.width as number,
              }}
            >
              <div className="action">
                <span className="line-att">{(item.position + vRuler.start).toFixed(0)}</span>
                <span className="line-delete-box">
                  <DeleteSvg
                    {...{
                      width: 12,
                      height: 12,
                      className: 'line-delete',
                      onClick: () => handleDeleteReferenceLine(item.id, Direction.Horizontal),
                    }}
                  />
                </span>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default AxisRuler;
