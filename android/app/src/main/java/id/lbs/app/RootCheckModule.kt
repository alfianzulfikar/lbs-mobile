package id.lbs.app

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.scottyab.rootbeer.RootBeer

class RootCheckModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RootCheckModule"
    }

    @ReactMethod
    fun isDeviceRooted(promise: Promise) {
        try {
            val rootBeer = RootBeer(reactApplicationContext)
            val isRooted = rootBeer.isRooted()
            promise.resolve(isRooted)
        } catch (e: Exception) {
            promise.reject("ROOT_CHECK_ERROR", e.message)
        }
    }
}
