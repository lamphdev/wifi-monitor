export const environment = {
  production: true,
  mqttConfig: {
    hostname: 'vhtont.sytes.net',
    port: 1883,
    protocol: 'ws',
    path: ''
  },
  mqttTopic: {
    GET_AP: 'vht/mesh/demo',
    GET_DEVICE: 'vht/mesh/demo'
  }
};
