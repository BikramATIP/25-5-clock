export default function IncrementDecrementButton({id, className, dispatch, digit, action}) {
  return (
    <button
     id={id}
     className={className}
     onClick={() => dispatch({type: action})}
    >
    {digit}
    </button>
  )
}
