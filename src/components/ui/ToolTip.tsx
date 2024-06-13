import React, { ReactElement } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/animations/shift-away.css';

interface IProps {
  children: ReactElement;
  content: ReactElement;
}

export const ToolTip = ({ children, content }: IProps) => {
  return (
    <Tippy theme='translucent' content={content} animation="shift-away">
      { children }
    </Tippy>
  )
}

export default ToolTip;