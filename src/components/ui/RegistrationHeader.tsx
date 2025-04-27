import React from "react";

interface RegistrationHeaderProps {
  step: number;
  totalSteps: number;
}

const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({ step, totalSteps }) => {
  const progressPercentage = (step / totalSteps) * 100; // Calculate the line according to the step

  return (
    <div className="w-full bg-white shadow-md p-4">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        
        <h1 className="text-violet-950 text-3xl font-bold">ProjexMVP</h1>
        
        {/* Step x of  y */}
        <span className="text-lg text-gray-700">{`Step ${step} of ${totalSteps}`}</span>
      </div>

      {/* Line of the progress*/}
      <div className="w-full h-2 bg-gray-200 mt-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-950 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default RegistrationHeader;
