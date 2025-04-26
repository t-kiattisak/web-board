interface LoadingDataProps {
  message?: string
}

export const LoadingData = ({ message = "Loading..." }: LoadingDataProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-16 gap-4 text-muted-foreground'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        id='Capa_1'
        width='120'
        height='120'
        fill='#000'
        version='1.1'
        viewBox='0 0 26.349 26.35'
      >
        <circle cx='13.792' cy='3.082' r='3.082'></circle>
        <circle cx='13.792' cy='24.501' r='1.849'></circle>
        <circle cx='6.219' cy='6.218' r='2.774'></circle>
        <circle cx='21.365' cy='21.363' r='1.541'></circle>
        <circle cx='3.082' cy='13.792' r='2.465'></circle>
        <circle cx='24.501' cy='13.791' r='1.232'></circle>
        <path d='M4.694 19.84a2.155 2.155 0 0 0 0 3.05 2.155 2.155 0 0 0 3.05 0 2.155 2.155 0 0 0 0-3.05 2.146 2.146 0 0 0-3.05 0'></path>
        <circle cx='21.364' cy='6.218' r='0.924'></circle>
      </svg>
      <p className='text-center text-2xl'>{message}</p>
    </div>
  )
}
