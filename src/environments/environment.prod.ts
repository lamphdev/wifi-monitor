export const environment = {
  production: true,
  mqttConfig: {
    hostname: 'vhtont.sytes.net',
    port: 1883,
    protocol: 'ws',
    path: ''
  },
  mqttTimeOut: 15000,
  timoutMessage: 'Device is not responding, please try again later',
  mqttTopic: {
    GET_AP: 'vht/mesh/demo',
    GET_DEVICE: 'vht/mesh/demo'
  }
};
