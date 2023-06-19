'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import UINavigation from '@components/scrumUI/UInav'

export default function Page({ params }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white flex flex-col items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-4">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">

          <div>
            <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Scrum Values Quiz UIs
            </h1>

            <p className="mt-6 text-justify text-lg leading-8 text-gray-600">
              In general, the UIs contain the Introduction, Question, Chart and Result (Advice) components
            </p>

            {/* <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              <li>
                At least 10 characters (and up to 100 characters)
              </li>
              <li>
                At least one lowercase character
              </li>
              <li>
                Inclusion of at least one special character, e.g., ! @ # ?
              </li>
            </ul> */}

          </div>
        </div>
      </div>
      <UINavigation />

    </div >
  )
}