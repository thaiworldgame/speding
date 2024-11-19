import React from 'react';

interface DisplayProps {
  value: string;
  operation: string;
}

export function Display({ value, operation }: DisplayProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl mb-6 shadow-inner">
      <div className="flex flex-col items-end gap-2">
        {/* Preview/History Display */}
        <div className="text-lg text-gray-500 font-mono h-6">
          $
          {Number(value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>

        {/* Main Display */}
        <div className="flex flex-col items-end w-full">
          <div className="text-6xl font-light text-white font-mono tracking-tight">
            {operation ? (
              <>
                <span>{value}</span>
                <span className="mx-2">{operation}</span>
              </>
            ) : (
              '\u00A0'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
