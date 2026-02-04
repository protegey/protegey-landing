import dns from 'node:dns'

export default defineNitroPlugin(() => {
    try {
        if (dns.setDefaultResultOrder) {
            dns.setDefaultResultOrder('ipv4first')
            console.log('DNS: Default result order set to ipv4first')
        }
    } catch (e) {
        console.warn('Could not set DNS result order:', e)
    }
})
