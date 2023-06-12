'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from "flowbite-react";
import { useState, useEffect } from 'react'
import { Navbar } from "flowbite-react";


export default function Nav() {
	return (
		<Navbar fluid={true} rounded={true}>
			<Navbar
				fluid={true}
				rounded={true}
			>
				<Navbar.Brand href="/">
					<img
						src="assets/images/logo.svg"
						className="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					</span>
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Navbar.Link href="/" active={true}>
						Design Research
					</Navbar.Link>
					<Navbar.Link href="/scrum-values-quiz">
						Scrum Values Quiz
					</Navbar.Link>
				</Navbar.Collapse>
			</Navbar>
		</Navbar>
	)
}
