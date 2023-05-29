import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';
import { FC } from 'react';

interface SliderBeautyProps {
  /** Giá trị default đầu vào của thanh trượt */
  defaultValue?: number;
  /** Giá trị đầu vào của thanh trượt */
  value?: number;
  /** Sự kiện onChange */
  onChange?: (value: number) => void;
}

export const SliderBeauty: FC<SliderBeautyProps> = ({ defaultValue, onChange, value }) => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: '10px',
      }}
    >
      <div css={{ width: '80%' }}>
        <Slider
          min={0}
          max={1000}
          value={value}
          defaultValue={defaultValue}
          onChange={val => {
            if (typeof val === 'number') {
              onChange?.(val);
            }
          }}
        />
      </div>
      <div>{value}</div>
    </div>
  );
};
