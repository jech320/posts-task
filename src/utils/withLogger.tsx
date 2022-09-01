interface LogProps {
  componentName?: string;
}

type FunctionComponent<T> = (props: T) => React.ReactElement;

const withLogger = <T extends {}>(Component: FunctionComponent<T>, componentName: string) => {
  const WrappedComponent = (props: T & LogProps) => {
    const message = `Hello from ${componentName}`;

    return <Component logProps={{ message }} {...props} />;
  };

  return WrappedComponent;
};

export { withLogger };
