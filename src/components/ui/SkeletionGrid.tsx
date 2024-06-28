import React from 'react';

interface SkeletonGridProps {
  items?: any[];
  count?: number;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({ items, count = 6 }) => {
  // Set items length by count
  items = items || Array.from({ length: count });

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-24 my-6'>
      {items.map((item, i) => (
        <div
          className='rounded-md bg-slate-50 dark:bg-slate-700 h-full p-6 shadow-base'
          key={i}
        >
          <div className='animate-pulse'>
            <header className='flex justify-between items-center space-x-6'>
              <div className='flex-1 flex items-center space-x-4'>
                <div className='flex-none flex space-x-2 items-center'>
                  <div className='h-10 w-10 rounded bg-slate-300 dark:bg-slate-500'></div>
                </div>
                <div className='flex-1 bg-slate-300 dark:bg-slate-500 h-2 rounded-full'></div>
              </div>
              <div className='flex-none'>
                <div className='h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-500'></div>
              </div>
            </header>
            <div className='py-6 space-y-2'>
              <div className='h-[6px] bg-slate-300 dark:bg-slate-500'></div>
              <div className='h-[6px] bg-slate-300 dark:bg-slate-500'></div>
              <div className='h-[6px] bg-slate-300 dark:bg-slate-500'></div>
            </div>
            
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
