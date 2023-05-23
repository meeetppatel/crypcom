import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'//Used to change theme day/night


function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId = {ChainId.Mumbai} //here they used Rinkeby instead of mumbai
      chainRpc={{
        [ChainId.Mumbai]:'https://polygon-mumbai.infura.io/v3/9506ddf80e3d4a91a8312c54b42b9f31'
        
      }} //This mainnet.infura.io link is for timepass as we need to add another legit test net link which we will discuss later
    >
      <ThemeProvider enableSystem={true} attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </ThirdwebProvider> 
    )
}

export default MyApp
