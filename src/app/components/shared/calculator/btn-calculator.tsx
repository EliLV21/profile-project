import {
  Asterisk,
  AsteriskIcon,
  CircleX,
  CircleXIcon,
  DeleteIcon,
  DiffIcon,
  Divide,
  DivideIcon,
  EqualIcon,
  MinusIcon,
  ParenthesesIcon,
  Percent,
  PercentIcon,
  PlusIcon,
} from 'lucide-react';

interface CalculatorProps {
  resultClick: React.MouseEventHandler<HTMLButtonElement>;
  num: number | string;
  className?: string;
  disabled?: boolean;
}

export const BtnCalculator: React.FC<CalculatorProps> = ({ resultClick, num, className, disabled }) => (
  <button
    key={num}
    value={num}
    disabled={disabled}
    onClick={resultClick}
    className={`btn btn-primary px-2 h-[50px] w-[75px] flex justify-center items-center rounded-lg border mb-2 ml-2 ${className} ${
      disabled ? 'bg-neutral-300 bg-opacity-500' : ''
    }`}
  >
    {num === 'C' ? (
      <DeleteIcon size={24} />
    ) : num === '+' ? (
      <PlusIcon size={24} />
    ) : num === '+/-' ? (
      <DiffIcon size={24} />
    ) : num === '=' ? (
      <EqualIcon size={24} />
    ) : num === '*' ? (
      <AsteriskIcon size={24} />
    ) : num === '/' ? (
      <DivideIcon size={24} />
    ) : num === '-' ? (
      <MinusIcon size={24} />
    ) : num === '()' ? (
      <ParenthesesIcon size={24} />
    ) : num === 'AC' ? (
      <CircleXIcon size={24} />
    ) : num === '%' ? (
      <PercentIcon size={24} />
    ) : (
      num
    )}
  </button>
);
