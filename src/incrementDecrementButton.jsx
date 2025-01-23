export default function IncrementDecrementButton({id, className, dispatch, digit}) {
  return (
    <button
     id={id}
     className={className}
     
    >
    {digit}
    </button>
  )
}
