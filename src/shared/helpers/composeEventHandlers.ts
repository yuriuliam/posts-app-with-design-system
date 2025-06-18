const composeEventHandlers = <TEvent extends React.SyntheticEvent>(
  originalEventHandler?: React.EventHandler<TEvent>,
  ourEventHandler?: React.EventHandler<TEvent>,
  { checkForDefaultPrevented = true } = {},
) => {
  const handleEvent = (event: TEvent) => {
    originalEventHandler?.(event)

    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event)
    }
  }

  return handleEvent
}

export { composeEventHandlers }
