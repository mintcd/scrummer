
import ScrumValues from '@app/quiz/scrumvalues/page'
export default function Homepage({ user }) {
  return (
    <div>
      <ScrumValues user={user} />
    </div>
  )
}