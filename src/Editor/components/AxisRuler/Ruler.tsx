import React from 'react';
import type { CSSProperties } from 'react';

/**
 * show.start、show.end决定那个位置是0
 */
export interface RulerProps {
  id: string;
  ruler: {
    width: number;
    height: number;
    direction: 'x' | 'y';
  };
  bar: {
    width: number;
    stepHight: number;
    spaceHeight: number;
    rectColor: string;
    fontStyle: CSSProperties;
  };
  show: {
    step: number; // 基础换算单位
    stepScale: number; // step的缩放
    start: number; // 多少 start px
    end: number; // 多少 end px
  };
}

const Ruler: React.FC<RulerProps> = (props) => {
  const { ruler, bar, show } = props;

  const { step, stepScale, start, end } = show;
  const { width: barWidth, spaceHeight: barSpaceHeight, rectColor, stepHight: barStepHeight } = bar;

  // 真正的间隔距离
  const scaleStep = step * stepScale;
  // 从开始画，多余的间隔距离
  const startSize = start % scaleStep;
  const endSize = end % scaleStep;
  // 计算到底能画多少个 刻度
  const drawStart = (start - startSize) / scaleStep;
  const drawEnd = (end - endSize) / scaleStep;
  const drawLength = drawEnd - drawStart + 1;
  const drawArr = new Array(drawLength).fill(0).map((value, index) => index);

  return (
    <div
      id={`rule-svg-${props.id}`}
      style={{ width: ruler.width, height: ruler.height, overflow: 'hidden' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={ruler.width}
        height={ruler.height}
        viewBox={`0 0 ${ruler.width} ${ruler.height}`}
      >
        {(() => {
          switch (ruler.direction) {
            case 'x': {
              // 长刻度
              const barSpaceY = ruler.height - barSpaceHeight - 1;
              // 短刻度
              const baStepY = ruler.height - barStepHeight - 1;
              return drawArr.map((lineIndex) => {
                const dragLineX = Math.abs(startSize) + lineIndex * scaleStep;
                if ((drawStart + lineIndex) % 10 === 0) {
                  return (
                    <React.Fragment key={lineIndex}>
                      <rect
                        width={barWidth}
                        height={barSpaceHeight}
                        x={dragLineX}
                        y={barSpaceY}
                        style={{ fill: rectColor }}
                      />
                      <text
                        x={dragLineX + show.step + 2}
                        y={parseInt(String(bar.fontStyle.fontSize), 10)}
                        style={bar.fontStyle}
                      >
                        {(drawStart + lineIndex) * show.stepScale}
                      </text>
                    </React.Fragment>
                  );
                }
                return (
                  <rect
                    key={lineIndex}
                    width={barWidth}
                    height={barStepHeight}
                    x={dragLineX}
                    y={baStepY}
                    style={{ fill: rectColor }}
                  />
                );
              });
            }
            case 'y': {
              // 长刻度
              const barSpaceX = ruler.width - barSpaceHeight - 1;
              // 短刻度
              const baStepX = ruler.width - barStepHeight - 1;
              return drawArr.map((lineIndex) => {
                const dragLineY = Math.abs(startSize) + lineIndex * scaleStep;
                if ((drawStart + lineIndex) % 10 === 0) {
                  return (
                    <React.Fragment key={lineIndex}>
                      <rect
                        width={barSpaceHeight}
                        height={barWidth}
                        x={barSpaceX}
                        y={dragLineY}
                        style={{ fill: rectColor }}
                      />
                      <text
                        x={parseInt(String(bar.fontStyle.fontSize), 10)}
                        y={dragLineY - show.step - 2}
                        style={bar.fontStyle}
                        transform={`rotate(-90, ${parseInt(String(bar.fontStyle.fontSize), 10)}, ${
                          dragLineY - show.step - 2
                        })`}
                      >
                        {(drawStart + lineIndex) * show.stepScale}
                      </text>
                    </React.Fragment>
                  );
                }
                return (
                  <rect
                    key={lineIndex}
                    width={barStepHeight}
                    height={barWidth}
                    x={baStepX}
                    y={dragLineY}
                    style={{ fill: rectColor }}
                  />
                );
              });
            }
          }
        })()}
      </svg>
    </div>
  );
};

export default React.memo(Ruler, (prevProps, nextProps) => prevProps.id === nextProps.id);
