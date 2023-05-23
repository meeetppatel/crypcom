import Image from 'next/image'

const style = {
  wrapper: `flex cursor-pointer items-center space-x-3`,
  svgText: `h-14 w-24 fill-[#04111D] pt-1 dark:fill-white`,
}

const Logo = () => {
  return (
    <div className='flex cursor-pointer items-center space-x-3'>
      <Image src='/logo.png' width={40} height={40} />
      <div className='ml-4 pt-3'>
      <Image src='/CRYPCOM.svg' width={110} height={50}/>  
      </div>
    </div>
    )
}

export default Logo
