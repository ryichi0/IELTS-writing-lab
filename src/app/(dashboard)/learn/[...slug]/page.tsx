import React from 'react'

async function page({params}:any) {
  const {...slug} = await params
  console.log(slug)
  return (
    <div>page</div>
  )
}

export default page