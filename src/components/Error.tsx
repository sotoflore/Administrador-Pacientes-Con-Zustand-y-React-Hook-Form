import { ReactNode } from "react"

type ErrorProps = {
    children: ReactNode
}

export const Error = ({children} : ErrorProps) => {
    return (
        <p className="my-2 text-red-600 font-bold text-sm">
            {children}
        </p>
    )
}
