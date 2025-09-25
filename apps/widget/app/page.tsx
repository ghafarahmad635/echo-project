'use client'

import WidgetView from "@/modules/widget/ui/views/widget-view";
import { use } from "react";

interface Props{
  searchParams: Promise<{
    orgId: string
  }>
}
export default  function Page({searchParams}:Props) {

  const { orgId } =  use(searchParams);

  return (
   <WidgetView orgId={orgId} />
  )
}
