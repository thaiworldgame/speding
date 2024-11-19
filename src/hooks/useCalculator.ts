import { useState } from 'react';

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [firstOperand, setFirstOperand] = useState('');
  const [operation, setOperation] = useState('');
  const [preview, setPreview] = useState('');

  const calculatePreview = (first: string, second: string, op: string): string => {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);
    
    switch (op) {
      case '+': return (num1 + num2).toString();
      case '-': return (num1 - num2).toString();
      case '*': return (num1 * num2).toString();
      case '/': return num2 !== 0 ? (num1 / num2).toString() : 'Error';
      case '%': return ((num1 * num2) / 100).toString();
      default: return second;
    }
  };

  const handleNumber = (num: string) => {
    if (waitingForSecondOperand) {
      setDisplay(num);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(prev => {
        if (prev === '0' && num !== '.') return num;
        if (prev.includes('.') && num === '.') return prev;
        return prev + num;
      });
    }

    if (operation && firstOperand) {
      const result = calculatePreview(firstOperand, display + num, operation);
      setPreview(result);
    }
  };

  const handleOperation = (op: string) => {
    if (operation && !waitingForSecondOperand) {
      calculateResult();
    } else {
      setFirstOperand(display);
      setOperation(op);
      setWaitingForSecondOperand(true);
    }
  };

  const calculateResult = () => {
    if (!operation || !firstOperand) return;

    const first = parseFloat(firstOperand);
    const second = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        if (second === 0) {
          setDisplay('Error');
          setOperation('');
          setFirstOperand('');
          setPreview('');
          return;
        }
        result = first / second;
        break;
      case '%':
        result = first * (second / 100);
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setOperation('');
    setFirstOperand('');
    setPreview('');
    setWaitingForSecondOperand(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation('');
    setFirstOperand('');
    setWaitingForSecondOperand(false);
    setPreview('');
  };

  return {
    display,
    operation,
    preview,
    handleNumber,
    handleOperation,
    calculateResult,
    handleClear,
  };
}