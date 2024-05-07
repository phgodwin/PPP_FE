import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
  
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/savings-calculator" component={SavingsCalculator} />
        <Route path="/budget-planner" component={BudgetPlanner} />
        <Route path="/money-saving-tips" component={MoneySavingTips} />
      </Routes>
    </Router>

  );
}

export default App;
