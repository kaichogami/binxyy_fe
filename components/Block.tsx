import React from 'react';

interface BlockProps {
  components: React.ReactNode[];
}

const Block: React.FC<BlockProps> = ({ components }) => {
  return (
    <div className="space-y-4">
      {components.map((Component, index) => (
        <div key={index} className="p-4 bg-white rounded shadow">
          {Component}
        </div>
      ))}
    </div>
  );
};

export default Block;
