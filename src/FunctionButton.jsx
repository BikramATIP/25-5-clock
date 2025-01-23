import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons'

export default function  FunctionButton({id, className, dispatch, action, firstIcon, secondIcon}) {
  return (
    <button
     id={id}
     className={className}
     action={action}
     onClick={() => dispatch({type: action})}
    >
  <FontAwesomeIcon icon={firstIcon} />
  {secondIcon && <FontAwesomeIcon icon={secondIcon} />}
    </button>
  )
}
