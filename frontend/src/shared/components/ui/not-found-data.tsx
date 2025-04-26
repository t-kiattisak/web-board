interface NotFoundDataProps {
  message?: string
}

export default function NotFoundData({
  message = "No data found.",
}: NotFoundDataProps) {
  return (
    <div className='flex flex-col items-center justify-center py-16 gap-4 text-muted-foreground'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='120'
        height='120'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          stroke='#1C274C'
          strokeLinecap='round'
          strokeWidth='1.5'
          d='m10.5 15 3-3m0 3-3-3M22 11.798c0-2.632 0-3.949-.77-4.804a3 3 0 0 0-.224-.225C20.151 6 18.834 6 16.202 6h-.374c-1.153 0-1.73 0-2.268-.153a4 4 0 0 1-.848-.352C12.224 5.224 11.816 4.815 11 4l-.55-.55c-.274-.274-.41-.41-.554-.53a4 4 0 0 0-2.18-.903C7.53 2 7.336 2 6.95 2c-.883 0-1.324 0-1.692.07A4 4 0 0 0 2.07 5.257C2 5.626 2 6.068 2 6.95M21.991 16c-.036 2.48-.22 3.885-1.163 4.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-3'
        ></path>
      </svg>
      <p className='text-center text-2xl'>{message}</p>
    </div>
  )
}
