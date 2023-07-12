
import ScrumValues from '@components/quiz'
export default function Homepage({ user }) {
  return (
    <div className='text-sm text-gray-600 text-center'>
      <div className='flex-grow pt-8'> Welcome {user} <br /> Homepage is being developed... <br /> Please spend a minute redoing the quiz. </div>
      <ScrumValues />
    </div>
  )
}