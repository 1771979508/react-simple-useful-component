import React, {
  FC,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  useEffect,
  useRef,
  DOMAttributes,
} from 'react';

interface ButtonPropsBase extends DOMAttributes<MouseEvent> {
  // 类名
  className?: string;
  // 按钮文本
  text: string;
  // 按钮是否失效
  disabled?: boolean;
  // 是否设置为危险按钮
  danger?: boolean;
  // 跳转链接,存在此属性即代表该button是一个a标签
  href?: string;
  // a标签的target属性，值在href存在的时候生效
  target?: string;
  // 按钮图标
  icon?: React.ReactNode;
  // 按钮大小
  size?: 'large' | 'middle' | 'small';
  // 按钮是否正在加载中
  loading?: boolean;
  // 按钮形状
  shape?: 'circle' | 'round';
  // 按钮类型
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  // 回调函数
  onClick?: () => void | undefined;
}

// type NativeButtonProps = ButtonHTMLAttributes<HTMLElement> & ButtonPropsBase;
// type AnchorButtonProps = ButtonPropsBase & AnchorHTMLAttributes<HTMLElement>;

// export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<ButtonPropsBase> = (props: ButtonPropsBase) => {
  const {
    text,
    disabled,
    danger,
    icon,
    size,
    loading,
    shape,
    type,
    href,
    target,
    onClick,
    children,
  } = props;
  const eleRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  useEffect(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  if (href || type === 'link') {
    return (
      <React.Fragment>
        <a href={href} target={target} ref={eleRef}>
          {children}
        </a>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <button ref={eleRef}>
        {text}
        {children}
      </button>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: '确定',
  disabled: false,
  danger: false,
  size: 'small',
  loading: false,
  shape: 'round',
  href: '/',
  type: 'primary',
};

export default Button;
