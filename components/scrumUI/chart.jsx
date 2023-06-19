import React, { useEffect } from "react";
import { Chart, initTE } from "tw-elements";

export default function CustomChart({ type, bgcolor, }) {
  useEffect(() => {
    initTE({ Chart });
  }, []);

  return (
    <div className="mx-auto overflow-hidden">
      {type === 'radar' &&
        <canvas
          data-te-chart="radar"
          data-te-dataset-label="Point"
          data-te-dataset-background-color='rgba(255, 165, 0, 0.2)'
          data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
          data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]" />}
    </div>
  );
}
