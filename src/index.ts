declare interface Options {
  clientId: string

  allowSignup?: boolean
  login?: string
  scopes?: string | string[]
  redirectUrl?: string
}

export interface Result {
  allowSignup: boolean,
  clientId: string,
  login: string | null,
  redirectUrl: string | null,
  scopes: string[],
  state: string,
  url: string
}

const BASE_URL = 'https://github.com/login/oauth/authorize'

export default function login (options: Options): Result {
  const scopesNormalized = typeof options.scopes === 'string'
    ? options.scopes.split(/[,\s]+/).filter(Boolean)
    : Array.isArray(options.scopes) ? options.scopes : []

  return {
    allowSignup: options.allowSignup === false ? false : true,
    clientId: options.clientId,
    login: options.login || null,
    redirectUrl: options.redirectUrl || null,
    scopes: scopesNormalized,
    state: Math.random().toString(36).substr(2),
    url: `${BASE_URL}?client_id=${options.clientId}`
  }
}
