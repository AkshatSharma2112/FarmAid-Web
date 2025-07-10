import React from 'react';
import '../component/Solution.css';
import { Link } from 'react-router-dom';

const solutions = [
  { title: "Pest and Disease Diagnosis", icon: "🐛" },
  { title: "Weather Forecasting & Alerts", icon: "🌧️" },
  { title: "Irigation,Crop & Soil Advice", icon: "🌱" },
  { title: "Government Schemes & Subsidies", icon: "📋" },
  { title: "Sustainable Farming Tips", icon: "🌿" },
  { title: "Marketplace for Seeds & Tools", icon: "🛒" },
];

const handleClick = (title) => {
  console.log("Clicked:", title);
  // Perform navigation, open modal, etc.
};

const Solutions = () => {
  return (
    <section className="solutions-section">
      <h2 className="solutions-heading">Solutions We Offer</h2>
      <div className="solutions-grid">
        {solutions.map((sol, idx) => {
          return sol.title === "Irigation,Crop & Soil Advice" ? (
            <Link
              to="/services"
              key={idx}
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="solution-card"
              onClick={() => handleClick(sol.title)}
            >
              <div className="solution-icon">{sol.icon}</div>
              <h3 className="solution-title">{sol.title}</h3>
            </Link>
          ) : (
            <div
              key={idx}
              className="solution-card"
              onClick={() => handleClick(sol.title)}
            >
              <div className="solution-icon">{sol.icon}</div>
              <h3 className="solution-title">{sol.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Solutions;