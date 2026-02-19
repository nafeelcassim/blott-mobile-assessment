export type PinInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  isDisabled?: boolean;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
};
