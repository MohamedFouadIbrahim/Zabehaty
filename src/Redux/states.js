import { useSelector } from 'react-redux';

export const getCurrentApplicationState = (state) => {
    const currentState = useSelector(applicationState => applicationState[state])
    return currentState
}