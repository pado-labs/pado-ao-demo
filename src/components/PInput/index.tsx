import React, { useState, useRef, useMemo, memo } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import "./index.scss";

interface PInputProps {
  onChange: (val: string) => void;
  onFocus?: () => void;
  type?: "text" | "password";
  placeholder?: string;
  label?: string;
  value?: string;
  errorTip?: any;
  helpTip?: any;
  disabled?: boolean;
  prefix?: any;
  className?: string;

  align?: string;
  copiable?: boolean;
  onSearch?: (val: string) => void;
  tooltip?: any;
}

const PInput: React.FC<PInputProps> = memo(
  ({
    onChange,
    onFocus,
    type = "text",
    placeholder = "",
    onSearch,
    label,
    value,
    errorTip,
    helpTip,
    disabled = false,

    prefix,
    className,
    align = "vertical",
  }) => {
    const inputEl = useRef<any>(null);
    // const [val, setVal] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const visible = useMemo(() => {
      return type === "password";
    }, [type]);
    const formatCN = useMemo(() => {
      let cN = "PInputWrapper";
      if (disabled) {
        cN += " disabled";
      }
      if (!!errorTip) {
        cN += " error";
      }
      if (align) {
        cN += ` ${align}`;
      }
      if (className) {
        cN += ` ${className}`;
      }
      return cN;
    }, [disabled, errorTip, className, align]);
    const activeType = useMemo(() => {
      if (visible) {
        return open ? "text" : "password";
      } else {
        return type;
      }
    }, [open, visible, type]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const formatVal = e.target.value.trim();
      onChange(formatVal);
    };

    const handleFocus = () => {
      if (onFocus) {
        onFocus();
      }
    };
    // const handleCopy = () => {
    //   navigator.clipboard.writeText(inputEl.current?.value);
    //   setCopied(true);
    //   setTimeout(() => {
    //     setCopied(false);
    //   }, 2000);
    // };
    const handleLookPwd = () => {
      setOpen((open) => !open);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        const formatVal = (e.target as HTMLInputElement).value.trim();
        onSearch && onSearch(formatVal);
      }
    };

    // useEffect(() => {
    //   if (value !== null && value !== undefined) {
    //     setVal(value);
    //   }
    // }, [value]);
    return (
      <div className={formatCN}>
        {label && (
          <label>
            <span>{label}</span>
          </label>
        )}
        <div className="inputWrapper">
          {prefix}
          <input
            className="pInput"
            ref={inputEl}
            type={activeType}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
          />
          {/* {copiable && (
            <i
              className={
                copied
                  ? 'iconfont icon-iconCompleted'
                  : 'iconfont icon-iconCCCopy'
              }
              onClick={handleCopy}
            ></i>
          )} */}
          {visible && (
            <i
              className={
                activeType === "password"
                  ? "iconfont icon-EyeClose"
                  : "iconfont icon-EyeOpen"
              }
              onClick={handleLookPwd}
            ></i>
          )}
        </div>
        {errorTip && <div className="tip error">{errorTip}</div>}
        {helpTip && <div className="tip help">{helpTip}</div>}
      </div>
    );
  }
);

export default PInput;
