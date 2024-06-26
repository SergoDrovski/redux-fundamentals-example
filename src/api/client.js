export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    // debugger
    const response = await fetch(endpoint, config)
    if (response.ok) {
      if(response.status === 204) return null
      data = await response.json();
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: 'POST' })
}

client.patch = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: 'PATCH' })
}

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: 'DELETE' })
}

