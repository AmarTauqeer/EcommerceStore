'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactChild,ReactFragment, ReactPortal} from "react";

type DataType = {
    token: string,
    cartCount:number,
}
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type Props = {
  children: ReactNode
}

interface ContextProps {
    token: string,
    setToken: Dispatch<SetStateAction<string>>
    cartCount: number,
    setCartCount: Dispatch<SetStateAction<number>>
}

const GlobalContext = createContext<ContextProps>({
    token: '',
    setToken: (): string => '',
    cartCount:0,
    setCartCount:():number=>0,
})

export const GlobalContextProvider = ({ children }:Props) => {
    const [token, setToken] = useState('');
    const [cartCount, setCartCount] = useState(0);

    return (
        <GlobalContext.Provider value={{ token, setToken, cartCount, setCartCount }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);