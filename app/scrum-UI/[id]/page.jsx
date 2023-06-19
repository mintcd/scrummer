'use client'
// Components
import UI1 from '@app/scrum-UI/[id]/1'
import UI2 from '@app/scrum-UI/[id]/2'
import UI3 from '@app/scrum-UI/[id]/3'
import UINavigation from '@components/scrumUI/UInav'



export default function Page({ params }) {
  return (
    <div className='flex flex-col item-center text-center'>
      {params.id == 1 && <UI1 />}
      {params.id == 2 && <UI2 />}
      {params.id == 3 && <UI3 />}
      <UINavigation />
    </div>
  )
}