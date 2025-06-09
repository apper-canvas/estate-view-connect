import React from 'react';
import SkeletonCard from '@/components/molecules/SkeletonCard';

const PropertyLoadingState = () => {
    return (
        <div className="space-y-6">
            <div className="animate-pulse space-y-4">
                <div className="h-12 bg-surface-200 rounded-lg"></div>
                <div className="h-10 bg-surface-200 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} index={i} />
                ))}
            </div>
        </div>
    );
};

export default PropertyLoadingState;