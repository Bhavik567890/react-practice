/* eslint-disable react/prop-types */
import  { useEffect } from 'react';

export const PlinkoCanvas = ({ paths, onComplete }) => {
  useEffect(() => {
    const canvas = document.getElementById('plinkoCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const drawBall = (x, y, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    };

    const colors = ['#0095DD', '#FF5733', '#33FF57']; 
    const animationIntervals = [];

    paths.forEach((path, index) => {
      const color = colors[index % colors.length];
      let x = canvas.width / 2;
      let y = 50;
      let step = 0;

      const interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        paths?.forEach((_, i) => {
          if (i > index) {
            return;
          }
          let xTemp = canvas?.width / 2;
          let yTemp = 50;
          for (let j = 0; j < (i < index ? paths[i].length : step); j++) {
            xTemp += paths[i][j] === 'right' ? 20 : paths[i][j] === 'left' ? -20 : 0;
            yTemp += 20;
          }
          drawBall(xTemp, yTemp, colors[i % colors.length]);
        });

        if (step < path.length) {
          x += path[step] === 'right' ? 20 : path[step] === 'left' ? -20 : 0;
          y += 20;
          step++;
          return;
        }
        clearInterval(interval);
        onComplete();
      }, 500);

      animationIntervals.push(interval);
    });
 
    return () => {
      animationIntervals.forEach(clearInterval);
    };
  }, [paths, onComplete]);

  return <canvas id="plinkoCanvas" />;
};
