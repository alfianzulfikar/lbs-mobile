package id.lbs.app

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.File

class FileCheckModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "FileCheckModule"
    }

    @ReactMethod
    fun doesFileExist(filePath: String, promise: Promise) {
        try {
            val file = File(filePath)
            promise.resolve(file.exists())
        } catch (e: Exception) {
            promise.reject("FILE_CHECK_ERROR", e)
        }
    }
}