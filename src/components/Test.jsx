import React from 'react';
import '../index.css';

const Test = () => {
  return (
    <div>
      <div className="border-solid border-4 border-black p-4 m-4 animate-spin">Solid Border with Spin</div>
      <div className="border-dotted border-4 border-black p-4 m-4 animate-ping">Dotted Border with Ping</div>
      <div className="border-dashed border-4 border-black p-4 m-4 animate-pulse">Dashed Border with Pulse</div>
      <div className="border-double border-4 border-black p-4 m-4 animate-bounce">Double Border with Bounce</div>
      <div className="border-none p-4 m-4">No Border</div>
      <div className="border-hidden p-4 m-4">Hidden Border</div>
      <div className="border-4 border-green-500 p-4 m-4 rounded-lg">Rounded Border</div>
      <div className="border-4 border-red-500 p-4 m-4 border-opacity-50">Border with Opacity</div>
      <div className="border-4 border-blue-500 p-4 m-4 border-dashed border-t-8">Top Border</div>
      <div className="border-4 border-yellow-500 p-4 m-4 border-dotted border-b-8">Bottom Border</div>
      <div className="p-4 m-4 border-4 border-double border-green-500 animate-blink">
        <h2 className="text-xl font-bold">Animated Border</h2>
        <p>This is a division element with an animated border.</p>
      </div>
      <div className="p-4 m-4 border-4 border-double border-green-500 animate-wiggle">
        <h2 className="text-xl font-bold">Wiggling Border</h2>
        <p>This is a division element with a wiggling border.</p>
      </div>
    </div>
  );
};

export default Test;