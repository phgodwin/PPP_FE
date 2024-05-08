import React from 'react';
import '../Routing/SavingTips.css';
import '../index.css';
import '../App.css';

const SavingTips = () => {
  const tips = [
    { 
      text: "Save a portion of your income every month.", 
      link: "#save-income", 
      relatedText: "Consider setting up a separate savings account specifically for this purpose. Even a small amount saved consistently can add up over time." 
    },
    { 
      text: "Cut back on non-essential expenses.", 
      link: "#cut-expenses", 
      relatedText: "Review your monthly expenses and identify areas where you can cut back. This could include dining out less frequently, cancelling unused subscriptions, or finding cheaper alternatives for common purchases." 
    },
    { 
      text: "Cook at home instead of eating out.", 
      link: "#cook-home", 
      relatedText: "Not only is cooking at home typically cheaper, but it also allows you to have more control over the ingredients you use and can lead to healthier eating habits." 
    },
    { 
      text: "Buy in bulk to save money in the long run.", 
      link: "#buy-bulk", 
      relatedText: "When purchasing items like groceries or household goods, buying in bulk can often result in significant savings per unit. Just make sure you have enough storage space and that the items won't expire before you can use them." 
    },
    // ...rest of the tips
  ];

  return (
    <div className="container">
      <h1 id="title" className="header">Money Savings Tips</h1>
      <ul className="list">
        {tips.map((tip, index) => (
          <li key={index} className="list-item">
            <a href={tip.link} className="link">{tip.text}</a>
            <p className="related-text">{tip.relatedText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingTips;