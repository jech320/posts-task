import { ComponentType } from 'react';

interface LogProps {
  componentName?: string;
}

const withLogger = <T extends {}>(Component: ComponentType<T>) => {
  const WrappedComponent = (props: T & LogProps) => {
    const message = `Hello from ${props.componentName}`;

    return <Component logProps={{ message }} {...props} />;
  };

  return WrappedComponent;
};

export { withLogger };
