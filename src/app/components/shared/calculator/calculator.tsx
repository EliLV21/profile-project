import { ChangeEvent, MouseEvent, useState } from 'react';
import { BtnCalculator } from './btn-calculator';
import { set } from 'zod';

export const Calculator = () => {
  const [result, setResult] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [typeDigit, setTypeDigit] = useState(false);
  const [nextValue, setNextValue] = useState(0);

  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });

  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'AC'];
  const symbols = ['+', '-', '*', '/', '()', '+/-', '%', '='];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validCharacters = /^[0-9+\-*/()%]+$/;

    if (!validCharacters.test(value)) {
      e.target.value = value.replace(/[^0-9+\-*/()%]/g, '');
    }
  };

  const operationButton = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    const resultElement = document.getElementById('result') as HTMLInputElement;
    const cursorPosition = resultElement.selectionStart || 0;

    switch (value) {
      case 'AC':
        setPrevValue('');
        resultElement.value = '';
        resultElement.disabled = true;
        break;
      case '=':
        setPrevValue(resultElement.value);
        console.log(resultElement.value);

        break;
      case 'C':
        if (cursorPosition > 0) {
          const textBeforeCursor = resultElement.value.substring(0, cursorPosition - 1);
          const textAfterCursor = resultElement.value.substring(cursorPosition);
          resultElement.value = textBeforeCursor + textAfterCursor;
          resultElement.selectionStart = resultElement.selectionEnd = cursorPosition - 1;
          setPrevValue(resultElement.value);
        }
        break;
      case '+/-':
        const textBeforeCursor = resultElement.value.substring(0, cursorPosition);
        const textAfterCursor = resultElement.value.substring(cursorPosition);
        resultElement.value = textBeforeCursor + '-' + textAfterCursor;
        resultElement.selectionStart = resultElement.selectionEnd = cursorPosition + 1;
        break;
      case '=':
        setResult(resultElement.value);
        console.log(prevValue);
        break;
      case '+':
        setResult(resultElement.value);
        console.log(result);
        break;
      default:
        resultElement.value += value;
        setPrevValue(resultElement.value);
    }
  };

  console.log('prevValue', prevValue);

  return (
    <>
      <div className="grid grid-row-3 gap-4">
        <div className="grid grid-cols-4">
          <input
            type="text"
            className="input w-full col-span-3 h-[50px] rounded-lg border"
            id="result"
            onChange={handleInputChange}
          />
          <BtnCalculator key={'C'} num={'C'} disabled={prevValue === ''} resultClick={operationButton} />
        </div>
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-3 w-[250px]">
            {num.map(n => (
              <BtnCalculator
                key={n}
                num={n}
                className={n === 'AC' ? 'col-start-3 col-end-4' : ''}
                resultClick={operationButton}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 items-center justify-center">
            {symbols.map(s => (
              <BtnCalculator key={s} num={s} resultClick={operationButton} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
