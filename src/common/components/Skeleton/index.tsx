import React from 'react';
import LoadingSkeleton, { SkeletonProps as LoadingSkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Skeleton: React.FunctionComponent<LoadingSkeletonProps> = ({ baseColor, highlightColor, ...rest }) => {
  const isDark = true;
  if (isDark) {
    baseColor = '#1C1D25';
    highlightColor = '#2A2B39';
  }
  return <LoadingSkeleton {...rest} baseColor={baseColor!} highlightColor={highlightColor!} />;
};

export default Skeleton;
