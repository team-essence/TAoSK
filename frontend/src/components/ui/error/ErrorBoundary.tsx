import React, { Component, ReactNode } from 'react'
import { ErrorScreen } from './ErrorScreen'

type Props = {
  children: ReactNode
  fallback?: any // FIXME: そのうち撲滅させる
}

export class ErrorBoundary extends Component<Props> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (error && !fallback) return <ErrorScreen error={error} />
    if (error) return fallback({ error })

    return children
  }
}
