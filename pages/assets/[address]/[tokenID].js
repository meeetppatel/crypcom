import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAddress, useMarketplace } from '@thirdweb-dev/react'
import { BigNumber } from 'ethers'

import TopNavbarLayout from '../../../layouts/TopNavbarLayout.js'
import NFTImage from '../../../components/NFTDetails/NFTImage'
import NFTSalesInfo from '../../../components/NFTDetails/NFTSalesInfo'
import NFTDetails from '../../../components/NFTDetails/NFTDetails'
import NFTBasicInfo from '../../../components/NFTDetails/NFTBasicInfo'



const NFT = () => {
  const [listing, setListing] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { tokenID } = router.query

  const address = useAddress()
  const marketplace = useMarketplace(
    "0xc6eBee784abADA9e98de65D4A2e621D306931049",
  )

  useEffect(() => {
    getListing()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!address) router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  

  const getListing = async () => {
    try {
      setLoading(true)
      const listing = await marketplace.getListing(BigNumber.from(tokenID))

      setListing(listing)
      setLoading(false)
    } catch (error) { 
      console.error(error)
    }
  }
  
  const buyNFT = async () => {
    try {
      await marketplace.buyoutListing(tokenID, 1)
    } catch (error) {
      console.error(error)
    }
  }
  
  const style = {
    wrapper: `h-[100vh] mx-auto flex max-w-2xl flex-col space-y-4 p-4 dark:bg-[#202226] lg:max-w-none lg:py-8 lg:px-24`,
    nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
    leftContainer: `flex flex-col space-y-4`,
    leftElement: `hidden lg:block`,
    rightContainer: `flex flex-1 flex-col space-y-4`,
    buyoutContainer: `flex-1,`,
  }
  return (
    <TopNavbarLayout>
      <div className = {style.wrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className = {style.nftContainer}>
            <div className = {style.leftContainer}>
              <div className = {style.leftElement}>
                <NFTImage image={listing?.asset?.image} />
              </div>

              <div className = {style.leftElement}>
                <NFTDetails />
              </div>
            </div>

            <div className={style.rightContainer}>
              <NFTBasicInfo name={listing?.asset?.name} />

              <div className = {style.buyoutContainer}>
                <NFTSalesInfo
                  price={listing?.buyoutCurrencyValuePerToken?.displayValue}
                  buyNFT={buyNFT}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TopNavbarLayout>
  )
}

export default NFT