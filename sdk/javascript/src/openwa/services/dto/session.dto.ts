export type WASession = {
    id: string,
    name: string,
    status: string,
    phone: string,
    pushName: string,
    connectedAt: string,
    lastActive: string,
    createdAt: string,
    updatedAt: string,
}

export type OpenWAError = {
  message: string,
  error: string,
  statusCode: number
}