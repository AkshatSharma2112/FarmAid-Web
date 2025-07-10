import React, { useState } from "react";
import "./CropInfo.css";
import img1 from "../assets/img1.jpg";

const cropData = [
  {
    name: "Rice",
    soil: "Alluvial Soil",
    waterSupply: 1100,
    extraDetails: `Rice requires continuous submergence of around 5 cm (50 mm) of standing water.
    The typical water supply requirement is approximately 1100-1250 mm throughout the growing season.
    Factors affecting irrigation include soil type, rainfall, irrigation efficiency, and climate conditions.`,
  },
  {
    name: "Wheat",
    soil: "Loamy Soil",
    waterSupply: 450,
    extraDetails: `Wheat requires moderate irrigation, typically every 7-10 days.
    Ideal soil conditions include well-drained loamy soil with good organic matter.
    Water supply needs vary based on temperature, soil moisture, and growth stage.`,
  },
  {
    name: "Maize",
    soil: "Loamy Soil",
    waterSupply: 500,
    extraDetails: `Maize thrives in warm climates with well-drained soil.
    Requires regular irrigation, especially during flowering and grain-filling stages.
    Water requirement ranges from 500-700 mm per acre, depending on climate.`,
  },
  {
    name: "Sugarcane",
    soil: "Clayey Soil",
    waterSupply: 1500,
    extraDetails: `Sugarcane is a high-water-consuming crop requiring 1500-2500 mm per acre.
    Frequent irrigation ensures optimal growth and sugar content development.
    Requires deep soil with high moisture retention and good drainage.`,
  },
  {
    name: "Cotton",
    soil: "Black Soil",
    waterSupply: 700,
    extraDetails: `Cotton grows best in black soil with a water supply of 700-1200 mm per acre.
    Irrigation should be provided at regular intervals to ensure fiber quality.
    Drought-resistant but benefits from consistent moisture during flowering.`,
  },
  {
    name: "Groundnut",
    soil: "Sandy Loam",
    waterSupply: 500,
    extraDetails: `Groundnut requires sandy loam soil with good drainage.
    Water supply should be around 500-550 mm per acre.
    Sensitive to excessive moisture, so irrigation must be managed carefully.`,
  },
  {
    name: "Mustard",
    soil: "Loamy Soil",
    waterSupply: 350,
    extraDetails: `Mustard thrives in cool climates and requires minimal water.
    Ideal soil type is loamy with moderate organic content.
    Water requirement ranges from 350-500 mm per acre, with irrigation provided every 12-15 days.`,
  },
  {
    name: "Vegetables",
    soil: "Well-drained Soil",
    waterSupply: 400,
    extraDetails: `Vegetables need consistent watering based on type and growth stage.
    Well-drained soil with high fertility is optimal.
    Water supply ranges from 400-600 mm per acre, with irrigation every 5-7 days.`,
  },
];

function CropInfo() {
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCrop = cropData.find(
      (c) => c.name.toLowerCase() === crop.toLowerCase()
    );
    if (selectedCrop && area > 0) {
      const totalWaterNeeded = (
        selectedCrop.waterSupply * parseFloat(area)
      ).toFixed(2);

      setResult({
        name: selectedCrop.name,
        soil: selectedCrop.soil,
        waterSupplyPerAcre: `${selectedCrop.waterSupply} mm`,
        totalWaterNeeded: `${totalWaterNeeded} mm for ${area} acres`,
        extraDetails: selectedCrop.extraDetails,
      });
    } else {
      setResult(null);
    }
  };

  const handleReset = () => {
    setCrop("");
    setArea("");
    setResult(null);
  };

  return (
    <section className="cropsec">
      <h1>Crop Water Supply Information</h1>
      <div className="card">
          <form onSubmit={handleSubmit}>
            <label className="name">
              Crop Name :
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                required
              >
                <option>Choose...</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
                <option value="Wheat">Wheat</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Cotton">Cotton</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Mustard">Mustard</option>
                <option value="Vegetables">Vegetables</option>
              </select>
            </label>
            <label className="area">
              Field Area (in Acres): <br />
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </label>
            <button type="submit">Get Details</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </form>
        
      </div>

      {result && (
        <div className="results">
          <h3>Results</h3>
          <p>
            <strong>Crop:</strong> {result.name}
          </p>
          <p>
            <strong>Recommended Soil Type:</strong> {result.soil}
          </p>
          <p>
            <strong>Water Supply per Acre:</strong> {result.waterSupplyPerAcre}
          </p>
          <p>
            <strong>Total Water Needed:</strong> {result.totalWaterNeeded}
          </p>
          <div>
            {result.extraDetails && (
              <p>
                <strong>Additional Info:</strong> {result.extraDetails}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default CropInfo;
