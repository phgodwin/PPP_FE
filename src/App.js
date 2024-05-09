import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Routing/Home';
import SavingsCalculator from './Routing/SavingsCalculator';
import BudgetPlanner from './Routing/BudgetPlanner';
import SavingTips from './Routing/SavingTips';
import Contact from './Routing/Contact';

function App() {
  return (


    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/savings-calculator" element={<SavingsCalculator />}></Route>
        <Route path="/budget-planner" element={<BudgetPlanner />}></Route>
        <Route path="/saving-tips" element={<SavingTips />} > </Route>
        <Route path="/contact-us" element={<Contact />} > </Route>
        </Routes>
    </Router>
   

  );
}

export default App;
