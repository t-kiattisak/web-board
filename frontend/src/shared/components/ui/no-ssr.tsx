"use client"
import dynamic from "next/dynamic"
import { Fragment, PropsWithChildren } from "react"

const NoSSR = (props: PropsWithChildren) => (
  <Fragment>{props.children}</Fragment>
)
export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
})
