
const getDevices = () => {

    return new Promise(async(resolve,reject) => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(device => device.kind === 'videoinput')
        const audioInputDevices = devices.filter(device => device.kind === 'audioinput')
        const audioOutputDevices = devices.filter(device => device.kind === 'audiooutput')

        resolve({
            videoDevices,
            audioInputDevices,
            audioOutputDevices
        })

    })


}

export default  getDevices