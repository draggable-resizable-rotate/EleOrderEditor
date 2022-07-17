import { ClientPoint } from '@draggable-resizable-rotate/react-draggable-pro';
import DraggableProvider, {
  HandleFunMap,
  addUserSelectStyles,
  removeUserSelectStyles,
} from '@draggable-resizable-rotate/react-draggable-provider';
import { ElementRect, ResizableDelta } from '@draggable-resizable-rotate/react-resizable-pro';
import React from 'react';

export type Position = ResizableDelta['position'];
export type Size = ResizableDelta['size'];

export interface DragToSelectContainerMouseHandle {
  onMouseDown: (event: React.MouseEvent, position: Position, size: Size) => any;
  onMouseMove: (event: MouseEvent, position: Position, size: Size) => any;
  onMouseUp: (event: MouseEvent, position: Position, size: Size) => any;
}

export interface DragToSelectContainerProps extends Partial<DragToSelectContainerMouseHandle> {
  children: React.ReactNode;
  selectBoxStyle?: React.CSSProperties;
  nodeRef?: React.RefObject<HTMLElement>;
}

interface DragToSelectContainerState {
  position: Position;
  size: Size;
  dragging: boolean;
}

interface MouseDownCache {
  clientPoint: ClientPoint;
  dragBoxElementRect: ElementRect;
}

class DragToSelectContainer extends React.Component<
  DragToSelectContainerProps,
  DragToSelectContainerState
> {
  // DraggableProvider ReactComponent Ref
  draggableProvider: React.RefObject<DraggableProvider>;
  mouseDownCache: Partial<MouseDownCache>;

  static defaultSize: Size = {
    width: 0,
    height: 0,
  };

  static defaultPosition: Position = {
    left: 0,
    top: 0,
  };

  constructor(props: DragToSelectContainerProps) {
    super(props);
    this.draggableProvider = React.createRef<DraggableProvider>();
    this.mouseDownCache = {};
    this.state = {
      position: { ...DragToSelectContainer.defaultPosition },
      size: { ...DragToSelectContainer.defaultSize },
      dragging: false,
    };
  }

  onMouseDown: HandleFunMap['onMouseDown'] = (event, delta) => {
    const dragBoxElement = this.draggableProvider.current?.elementRef as HTMLElement;
    const dragBoxElementRect = dragBoxElement.getBoundingClientRect();
    this.mouseDownCache.clientPoint = {
      clientX: delta.clientX,
      clientY: delta.clientY,
    };
    this.mouseDownCache.dragBoxElementRect = dragBoxElementRect;
    this.props?.onMouseDown?.(
      event,
      { ...DragToSelectContainer.defaultPosition },
      { ...DragToSelectContainer.defaultSize },
    );
    this.setState({
      dragging: true,
    });
    addUserSelectStyles(dragBoxElement.ownerDocument);
  };

  onMouseMove: HandleFunMap['onMouseMove'] = (event, delta) => {
    const { clientPoint, dragBoxElementRect } = this.mouseDownCache as MouseDownCache;
    // 是否向右拖动
    const bounds = {
      left: 0,
      top: 0,
      right: dragBoxElementRect.width,
      bottom: dragBoxElementRect.height,
    };
    const dragSelectPosition = {
      left: Math.min(delta.clientX, clientPoint.clientX) - dragBoxElementRect.left,
      top: Math.min(delta.clientY, clientPoint.clientY) - dragBoxElementRect.top,
    };
    const validPosition = {
      left: Math.max(bounds.left, dragSelectPosition.left),
      top: Math.max(bounds.top, dragSelectPosition.top),
    };
    const dragSelectSize = {
      width:
        dragSelectPosition.left > 0
          ? Math.abs(delta.clientX - clientPoint.clientX)
          : clientPoint.clientX - dragBoxElementRect.left,
      height:
        dragSelectPosition.top > 0
          ? Math.abs(delta.clientY - clientPoint.clientY)
          : clientPoint.clientY - dragBoxElementRect.top,
    };
    const validSize = {
      width: Math.min(bounds.right - validPosition.left, dragSelectSize.width),
      height: Math.min(bounds.bottom - validPosition.top, dragSelectSize.height),
    };
    this.setState({
      position: validPosition,
      size: validSize,
    });
    this.props?.onMouseMove?.(event, { ...validPosition }, { ...validSize });
  };

  // 重置
  onMouseUp: HandleFunMap['onMouseUp'] = (event) => {
    const dragBoxElement = this.draggableProvider.current?.elementRef as HTMLElement;
    this.props?.onMouseUp?.(event, { ...this.state.position }, { ...this.state.size });
    this.setState({
      position: { ...DragToSelectContainer.defaultPosition },
      size: { ...DragToSelectContainer.defaultSize },
      dragging: false,
    });
    removeUserSelectStyles(dragBoxElement.ownerDocument);
  };

  render() {
    const { props, state } = this;
    const { selectBoxStyle, children, nodeRef } = props;
    const onlyChild = React.Children.only(children) as React.ReactElement;

    return (
      <DraggableProvider
        ref={this.draggableProvider}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        nodeRef={nodeRef}
      >
        {React.cloneElement(
          onlyChild,
          {
            style: {
              ...onlyChild.props.style,
              position: 'relative',
            },
          },
          [
            <div
              key="drag-to-select-box"
              className="drag-to-select-box"
              style={{
                position: 'absolute',
                ...state.position,
                ...state.size,
                zIndex: 999999,
                border: `2px dashed rgba(0, 0, 0, 0.75)`,
                borderWidth: this.state.dragging ? 2 : 0,
                opacity: 0.25,
                borderRadius: 2,
                backgroundColor: '#fff',
                ...selectBoxStyle,
              }}
            ></div>,
            onlyChild.props.children,
          ],
        )}
      </DraggableProvider>
    );
  }
}

export default DragToSelectContainer;
