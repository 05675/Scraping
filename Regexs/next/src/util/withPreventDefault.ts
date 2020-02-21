export const withPreventDefault = <T extends React.SyntheticEvent>(
  eventHandler: React.EventHandler<T>
) => (event: T) => {
  event.preventDefault();
  eventHandler(event);
};

export default withPreventDefault;
