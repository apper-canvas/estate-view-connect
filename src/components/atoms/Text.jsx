import React from 'react';

const Text = ({ tag = 'p', children, className }) => {
  const Component = tag;
  return (
    <Component className={className}>
      {children}
    </Component>
  );
};

export default Text;