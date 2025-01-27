import { Calculator } from '../../shared/calculator/calculator';

const CalculatorPage: React.FC = () => {
  return (
    <>
      <div className="container grid grid-cols-2 p-8 z-10 absolute">
        <div className="container">
          <Calculator />
        </div>
        <div>
          <h1>HOLA MUNDO 2</h1>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
