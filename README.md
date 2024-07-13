A simple app to connect with BLE and send single bytes

since this app uses an EAS build, it cannot work with Expo Go.
in addition, to build this project you must have an active expo account.

Instructions:

1. download the project files and open on VScode.

2. to build, enter: "
   eas login
   eas build:configure (your platform)
   eas build --profile=preview --platform= (your platform) "

3. enjoy

Note: this app only scans for aromatron type devices, this can be changed in the 'useBLE.ts' file 
