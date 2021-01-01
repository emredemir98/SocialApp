import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

class UserPermissions {
    getCameraPermission = async () => {
        if (Contants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status != "granted") {
                alert("Kamerayı açmak için izine ihtiyacımız var");
            }
        }

    };
}


export default new UserPermissions();
