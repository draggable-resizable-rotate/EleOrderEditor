import React from 'react';
import Draggable, {
  DraggableMouseHandle,
  DraggableDelta,
} from '@draggable-resizable-rotate/react-draggable-pro';
import Resizable, {
  Enable,
  ResizableProps,
  ResizableDelta,
  ResizableDirection,
} from '@draggable-resizable-rotate/react-resizable-pro';

export type Grid = [number, number];
export type Position = ResizableDelta['position'];
export type Size = ResizableDelta['size'];
type Direction = ResizableDirection;

export type RndResizeStartCallback = (
  e: React.MouseEvent,
  dir: Direction,
  delta: ResizableDelta,
) => void | boolean;

export type RndResizeCallback = (
  e: MouseEvent,
  dir: Direction,
  delta: ResizableDelta,
  position: Position,
) => void;

type State = Record<string, unknown>;

export type ResizeEnable =
  | {
    bottom?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    topLeft?: boolean;
    topRight?: boolean;
  }
  | boolean;

export type HandleClasses = {
  bottom?: string;
  bottomLeft?: string;
  bottomRight?: string;
  left?: string;
  right?: string;
  top?: string;
  topLeft?: string;
  topRight?: string;
};

export type HandleStyles = {
  bottom?: React.CSSProperties;
  bottomLeft?: React.CSSProperties;
  bottomRight?: React.CSSProperties;
  left?: React.CSSProperties;
  right?: React.CSSProperties;
  top?: React.CSSProperties;
  topLeft?: React.CSSProperties;
  topRight?: React.CSSProperties;
};

export type HandleComponent = {
  top?: React.ReactElement<any>;
  right?: React.ReactElement<any>;
  bottom?: React.ReactElement<any>;
  left?: React.ReactElement<any>;
  topRight?: React.ReactElement<any>;
  bottomRight?: React.ReactElement<any>;
  bottomLeft?: React.ReactElement<any>;
  topLeft?: React.ReactElement<any>;
};

export interface Props {
  dragGrid?: Grid;
  position: Position;
  rotate?: number;
  size: Size;
  resizeGrid?: Grid;
  bounds?: ResizableProps['bounds'];
  onResizeStart?: RndResizeStartCallback;
  onResize?: RndResizeCallback;
  onResizeStop?: RndResizeCallback;
  onDragStart?: DraggableMouseHandle['onMouseDown'];
  onDrag?: DraggableMouseHandle['onMouseMove'];
  onDragStop?: DraggableMouseHandle['onMouseUp'];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  enableResizing?: ResizeEnable;
  resizeHandleClasses?: HandleClasses;
  resizeHandleStyles?: HandleStyles;
  resizeHandleWrapperClass?: string;
  resizeHandleWrapperStyle?: React.CSSProperties;
  resizeHandleComponent?: HandleComponent;
  lockAspectRatio?: boolean | number;
  lockAspectRatioExtraWidth?: number;
  lockAspectRatioExtraHeight?: number;
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
  dragAxis?: 'x' | 'y' | 'both' | 'none';
  dragHandleClassName?: string;
  disableDragging?: boolean;
  cancel?: string;
  enableUserSelectHack?: boolean;
  allowAnyClick?: boolean;
  scale?: number;
  [key: string]: any;
}

const resizableStyle = {
  display: 'inline-block' as const,
  position: 'absolute' as const,
  top: 0,
  left: 0,
};

const getEnableResizingByFlag = (flag: boolean): Enable => ({
  bottom: flag,
  bottomLeft: flag,
  bottomRight: flag,
  left: flag,
  right: flag,
  top: flag,
  topLeft: flag,
  topRight: flag,
});

// rnd的关键点在于将两个组件的数据源进行统一，同步两边的state，而不是props
export class Rnd extends React.PureComponent<Props, State> {
  resizableElementRef: React.RefObject<HTMLElement>;
  draggableRef: React.RefObject<Draggable>;
  resizableRef: React.RefObject<Resizable>;

  constructor(props: Props) {
    super(props);
    this.state = {};
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.resizableElementRef = React.createRef<HTMLElement>();
    this.draggableRef = React.createRef<Draggable>();
    this.resizableRef = React.createRef<Resizable>();
  }

  onDragStart(e: React.MouseEvent, delta: DraggableDelta, position: Position) {
    this.props.onDragStart?.(e, delta, position);
    const resizable: Resizable = this.resizableRef.current as Resizable;
    resizable.setState({
      isResizing: true,
      position: { ...this.props.position }
    })
  }

  onDrag(e: MouseEvent, delta: DraggableDelta, position: Position) {
    const needContinue = this.props.onDrag?.(e, delta, position)
    if(!needContinue) return false
    const resizable: Resizable = this.resizableRef.current as Resizable;
    resizable.setState({
      position: { ...position }
    })
    return true;
  }

  onDragStop(e: MouseEvent, delta: DraggableDelta, position: Position) {
    this.props.onDragStop?.(e, delta, position);
    const resizable: Resizable = this.resizableRef.current as Resizable;
    resizable.setState({
      isResizing: false,
    })
  }

  onResizeStart(event: React.MouseEvent, dir: Direction, delta: ResizableDelta) {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    this.props.onResizeStart?.(event, dir, delta);
    const draggable: Draggable = this.draggableRef.current as Draggable;
    draggable.setState({
      dragging: true,
    });
  }

  onResize(e: MouseEvent, direction: Direction, delta: ResizableDelta) {
    const { position } = delta;
    const draggable: Draggable = this.draggableRef.current as Draggable;
    draggable.setState({
      position: JSON.parse(JSON.stringify(position)),
    });
    this.props.onResize?.(e, direction, delta, { ...position });
  }

  onResizeStop(e: MouseEvent, direction: Direction, delta: ResizableDelta) {
    const { position } = delta;
    const draggable: Draggable = this.draggableRef.current as Draggable;
    draggable.setState({
      dragging: false,
    });
    this.props.onResizeStop?.(e, direction, delta, { ...position });
  }

  render() {
    const {
      disableDragging,
      style,
      dragHandleClassName,
      position,
      onMouseUp,
      dragAxis,
      dragGrid,
      bounds,
      enableUserSelectHack,
      cancel,
      children,
      onResizeStart,
      onResize,
      onResizeStop,
      onDragStart,
      onDrag,
      onDragStop,
      resizeHandleStyles,
      resizeHandleClasses,
      resizeHandleComponent,
      enableResizing,
      resizeGrid,
      resizeHandleWrapperClass,
      resizeHandleWrapperStyle,
      scale,
      allowAnyClick,
      size,
      rotate,
      ...resizableProps
    } = this.props;

    const cursorStyle =  disableDragging || dragHandleClassName ? { cursor: 'auto' } : { cursor: 'move' };
    const innerStyle = {
      ...resizableStyle,
      ...cursorStyle,
      ...style,
    };

    return (
      <Draggable
        handle={dragHandleClassName ? `.${dragHandleClassName}` : undefined}
        onMouseDown={this.onDragStart}
        onMouseUp={this.onDragStop}
        onMouseMove={this.onDrag}
        axis={dragAxis}
        grid={dragGrid}
        bounds={this.props.bounds}
        position={position}
        nodeRef={this.resizableElementRef}
        scale={scale}
        ref={this.draggableRef}
        rotate={rotate}
      >
        <Resizable
          {...resizableProps}
          bounds={this.props.bounds}
          position={position}
          size={size}
          rotate={rotate}
          enable={
            typeof enableResizing === 'boolean'
              ? getEnableResizingByFlag(enableResizing)
              : enableResizing
          }
          onResizeStart={this.onResizeStart}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          style={innerStyle}
          minWidth={this.props.minWidth}
          minHeight={this.props.minHeight}
          maxWidth={this.props.maxWidth}
          maxHeight={this.props.maxHeight}
          grid={resizeGrid}
          handleWrapperClass={resizeHandleWrapperClass}
          handleWrapperStyle={resizeHandleWrapperStyle}
          lockAspectRatio={this.props.lockAspectRatio}
          handleStyles={resizeHandleStyles}
          handleClasses={resizeHandleClasses}
          handleComponent={resizeHandleComponent}
          scale={scale}
          ref={(resizableInstance) => {
            Object.assign(this.resizableElementRef, {
              current: resizableInstance?.resizableRef.current,
            });
            Object.assign(this.resizableRef, {
              current: resizableInstance,
            });
          }}
        >
          {children}
        </Resizable>
      </Draggable>
    );
  }
}
