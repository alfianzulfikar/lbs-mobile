package id.lbs.app

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.File
import android.os.Process;

class AppExitModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AppExitModule"
    }

    @ReactMethod
    fun exitApp() {
        Process.killProcess(Process.myPid());
    }
}