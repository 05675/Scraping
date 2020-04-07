export const withPreventDefault = <T extends React.SyntheticEvent>(
  eventHandler: (event: T) => Promise<void>
) => (event: T) => {
  event.preventDefault();
  eventHandler(event);
};
