'use client'
import React, { FunctionComponent } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useGlobalContext } from '../Context/store'
import { useRouter } from 'next/navigation'

type Props = {
    customToken: string,
    user:number
}

const UserDropdown: FunctionComponent<Props> = ({ customToken, user }) => {
    const { setToken } = useGlobalContext();
    const router = useRouter();
    const handleSignout = (e: React.MouseEvent<HTMLElement>) => {
        setToken("");
        router.push("/");

    }

    const handleSetting = (e: React.MouseEvent<HTMLElement>) => {
        router.push(`/user?token=${customToken}`);

    }

    const handleResetPassword = (e: React.MouseEvent<HTMLElement>) => {
        router.push(`/user/reset-password?token=${customToken}`);

    }

    const handleAdminPanel = (e: React.MouseEvent<HTMLElement>) => {
        setToken("");
        router.push(`/orders?customToken=${customToken}&userId=${user}`);

    }
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-[0.5px] text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Options
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <button
                            type='button'
                            onClick={handleSetting}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Profile
                        </button>
                    </MenuItem>
                    <MenuItem>
                    <button
                                type='button'
                                onClick={handleAdminPanel}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                               Admin Area
                            </button>
                    </MenuItem>
                    
                    <form>
                        <MenuItem>
                            <button
                                type='button'
                                onClick={handleSignout}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                                Sign out
                            </button>
                        </MenuItem>
                    </form>
                </div>
            </MenuItems>
        </Menu>
    )
}

export default UserDropdown
