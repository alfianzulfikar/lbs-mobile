package id.lbs.app

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

class SSLPinningFactory : OkHttpClientFactory {
    companion object {
        private const val hostname = "uda-api.lbs.id"
        private val sha256Keys = listOf(
            "sha256/LP3efNXqHS5/DY+m00YV2NffEJNbUVh8CElNv83oAKI=",
            "sha256/bdrBhpj38ffhxpubzkINl0rG+UyossdhcBYj+Zx2fcc="
        )
    }
    override fun createNewNetworkModuleClient(): OkHttpClient {
        val certificatePinnerBuilder = CertificatePinner.Builder()
        for (key in sha256Keys) {
            certificatePinnerBuilder.add(hostname, key)
        }
        val certificatePinner = certificatePinnerBuilder.build()
        val clientBuilder = OkHttpClientProvider.createClientBuilder()
        return clientBuilder.certificatePinner(certificatePinner).build()
    }
}
