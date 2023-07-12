
import ScrumValues from '@components/quiz'
export default function Homepage({ user }) {
  return (
    <div className='text-sm text-gray-600 text-center'>
      <div className='flex-grow pt-8'>
        Welcome {user.username} <br />
        Homepage is being developed... <br />
        Please spend a minute retaking the quiz.
      </div>
      <ScrumValues username={user.username} />
    </div>
  )
}