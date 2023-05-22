async function generateCarbon(options) {
    const res = await fetch('https://carbonara.solopov.dev/api/cook', { method: 'post', body: JSON.stringify({ code: options }), headers: {'Content-Type': 'application/json'} })
    if (res.status !== 200) return {
        status: res.status,
        statusText: res.statusText
    }
    const buff = Buffer.from(await res.arrayBuffer())
    return {
        status: res.status,
        statusText: res.statusText,
        result: buff
    }
}

//DARI FATUR https://github.com/Ftwrr/
